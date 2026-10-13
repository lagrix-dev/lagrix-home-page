# 16. Node Operator Guide: Deployment (Docker Compose, Prometheus, Grafana и правила алертинга)

Финальный этап развертывания Супер-Узла Lagrix — сборка изолированной контейнеризированной среды с автоматической оркестрацией и непрерывным мониторингом. Ошибки в работе инфраструктуры (простой, пропущенные PING-запросы в Kademlia DHT, задержки ответа Envoy Proxy) стоят оператору дохода, а после 30 дней вне сети узел выбывает с возвратом залога; к slashValidator() в контракте ValidatorStaking.sol ведёт только доказанный обман (документ 06).

Стек мониторинга на базе Prometheus, Grafana и Alertmanager с интегрированным Node Exporter и Envoy Statsd гарантирует оператору мгновенное обнаружение аномалий до того, как они приведут к финансовым штрафам (Slashing).

## 16.1 Манифест контейнеризации (docker-compose.yml)

Для обеспечения изоляции сетевых ресурсов, ограничения потребления RAM и автоматического перезапуска при сбоях узел разворачивается в виде мульти-контейнерного стека.

```yaml
version: '3.8'

networks:
  lagrix-mesh:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16

volumes:
  lagrix-data:
  prometheus-data:
  grafana-data:

services:
  # 1. Главный исполнительный узел (Control Plane + Kademlia DHT)
  lagrix-core:
    image: ghcr.io/lagrix-dev/lagrix-node:v6.0.0
    container_name: lagrix-core
    restart: unless-stopped
    network_mode: host # Обязательно для пробивки NAT и работы STUN/TURN
    volumes:
      - /etc/lagrix/node.toml:/etc/lagrix/node.toml:ro
      - /etc/lagrix/node_key.json:/etc/lagrix/node_key.json:ro
      - lagrix-data:/var/lib/lagrix/data
    environment:
      - RUST_LOG=info,lagrix_core=debug
      - NODE_CONFIG=/etc/lagrix/node.toml
    logging:
      driver: "json-file"
      options:
        max-size: "100m"
        max-file: "3"

  # 2. Envoy Proxy (Data Plane / mTLS / Dynamic xDS)
  lagrix-envoy:
    image: envoyproxy/envoy:v1.30-latest
    container_name: lagrix-envoy
    restart: unless-stopped
    network_mode: host
    volumes:
      - /etc/lagrix/envoy.yaml:/etc/envoy/envoy.yaml:ro
    command: envoy -c /etc/envoy/envoy.yaml --service-cluster super-relay --service-node lagrix-core
    depends_on:
      - lagrix-core

  # 3. Сервер сбора метрик (Prometheus)
  prometheus:
    image: prom/prometheus:v2.51.0
    container_name: lagrix-prometheus
    restart: unless-stopped
    networks:
      lagrix-mesh:
        ipv4_address: 172.28.0.10
    ports:
      - "127.0.0.1:9090:9090" # Закрыт извне, доступен локально или через SSH-туннель
    volumes:
      - /etc/lagrix/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'

  # 4. Система визуализации (Grafana)
  grafana:
    image: grafana/grafana:10.4.0
    container_name: lagrix-grafana
    restart: unless-stopped
    networks:
      lagrix-mesh:
        ipv4_address: 172.28.0.11
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=CHANGE_THIS_SECURE_PASSWORD
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
      - /etc/lagrix/grafana/dashboards:/etc/grafana/provisioning/dashboards:ro
    depends_on:
      - prometheus

  # 5. Менеджер оповещений (Alertmanager)
  alertmanager:
    image: prom/alertmanager:v0.27.0
    container_name: lagrix-alertmanager
    restart: unless-stopped
    networks:
      lagrix-mesh:
        ipv4_address: 172.28.0.12
    volumes:
      - /etc/lagrix/alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro
```

## 16.2 Конфигурация Prometheus (prometheus.yml)

Prometheus непрерывно собирает метрики состояния p2p-сети, задержек Envoy и баланса стейблкоинов/газа.

```yaml
global:
  scrape_interval: 10s
  evaluation_interval: 10s

rule_files:
  - "/etc/prometheus/alerts.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['172.28.0.12:9093']

scrape_configs:
  - job_name: 'lagrix-core-node'
    static_configs:
      - targets: ['localhost:9090'] # Локальный эндпоинт метрик Rust-ядра

  - job_name: 'lagrix-envoy-proxy'
    static_configs:
      - targets: ['localhost:9901'] # Envoy Admin / Stats endpoint
    metrics_path: '/stats/prometheus'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
```

## 16.3 Правила алертинга (alerts.yml)

Система оповещений должна мгновенно триггерить тревогу при возникновении условий, угрожающих стейку оператора:

```yaml
groups:
  - name: LagrixNodeCriticalAlerts
    rules:
      # 1. Потеря дохода (Выпадение из сети)
      - alert: LagrixNodeDown
        expr: up{job="lagrix-core-node"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "КРИТИЧЕСКАЯ ОШИБКА: Супер-Узел Lagrix отключен!"
          description: "Контейнер lagrix-core недоступен более 1 минуты. Пока узел недоступен, он ничего не зарабатывает, а после 30 дней вне сети выбывает (документ 06)."

      # 2. Потеря связности Kademlia DHT
      - alert: KademliaPeersLow
        expr: lagrix_kademlia_active_peers < 5
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "Низкое количество P2P-соседей"
          description: "Узел подключен всего к {{ $value }} узлам Kademlia. Проверьте блокировку UDP порта 4001."

      # 3. Рост задержек маршрутизации (Envoy Latency)
      - alert: HighMtlsLatency
        expr: histogram_quantile(0.99, sum(rate(envoy_http_downstream_rq_time_bucket[5m])) by (le)) > 200
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Высокая задержка mTLS Data Plane (>200ms)"
          description: "99-й перцентиль задержки Envoy превышает 200 мс. Риск сброса пакетов и получения Fraud Proof!"

      # 4. Истощение баланса нативного газа для Bundler/Relay
      - alert: LowRelayGasBalance
        expr: lagrix_node_native_gas_balance_eth < 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Заканчивается ETH на кошельке узла"
          description: "Баланс газа для обслуживания UserOps ниже 0.05 ETH. Возможен останов отправки транзакций."
```

## 16.4 Настройка Alertmanager (alertmanager.yml)

Настройка прямой маршрутизации критических уведомлений в Telegram/PagerDuty дежурному DevOps-инженеру:

```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 30s
  repeat_interval: 2h
  receiver: 'telegram-notifications'

receivers:
  - name: 'telegram-notifications'
    telegram_configs:
      - bot_token: 'YOUR_TELEGRAM_BOT_TOKEN'
        chat_id: YOUR_TELEGRAM_CHAT_ID
        send_resolved: true
        parse_mode: 'HTML'
        message: |
          <b>{{ if eq .Status "firing" }}🚨 АЛЕРТ: {{ .CommonAnnotations.summary }}{{ else }}✅ РЕШЕНО: {{ .CommonAnnotations.summary }}{{ end }}</b>
          <b>Описание:</b> {{ .CommonAnnotations.description }}
          <b>Уровень:</b> {{ .CommonLabels.severity }}
          <b>Время:</b> {{ .StartsAt }}
```

## 16.5 Итоговая архитектура панели Grafana (Core Metrics Dashboard)

Панель мониторинга Grafana включает 4 ключевых визуальных виджета:

Network Health: Количество активных соседей в k-buckets, статус прохождения PING-чеков от сетевых хранилищ.

Relay Throughput: Скорость прокачки зашифрованного E2EE-трафика в Мбит/с, количество активных TURN-сессий.

Financial Accounting: накопленная доля супер-узла в комиссиях сделок и плате за поиск (USDC), награды периодов в $LGX и состояние его залога.

Slashing Risk Metrics: Счетчик зафиксированных аномалий и таймер времени до безопасного вывода стейка (Unbonding Countdown).

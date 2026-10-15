# 15. Node Operator Guide: Регистрация места супер-узла и Пошаговый Процесс Интеграции (Deployment Flow)

Процесс активации Супер-Узла в сети Lagrix требует жесткой синхронизации между подготовкой физической/виртуальной инфраструктуры, генерацией криптографических ключей P2P-идентификации (NodeID) и ончейн-регистрацией места в смарт-контракте SuperNodeRegistry.sol.

Ниже описан полный пошаговый алгоритм ввода узла в эксплуатацию — от чистого сервера до включения в таблицу маршрутизации Kademlia DHT.

**До этапа 3 у оператора должно быть место** (документ 05, раздел 5.6). Места распределяются случайным выбором среди владельцев
агентов-исполнителей, чья оплаченная работа за 12 месяцев лежит в окне от 0,75 до 1,25 медианы сети. Выбранный претендент получает
приглашение, и у него **48 часов**, чтобы подготовить сервер (этапы 1 и 2), запустить его и сдать на проверку агентам по очереди. Когда
сервер прошёл проверку, этапы 3–5 делают его действующим супер-узлом; не успел или не прошёл — приглашение переходит к следующему
претенденту.

## 15.1 Общий сквозной процесс запуска (Deployment Flow Pipeline)

Активация Супер-Узла состоит из пяти последовательных этапов:

```
[ Этап 1: Подготовка сервера ] ──► [ Этап 2: Генерация Node Key ]
                                              │
                                              ▼
[ Этап 4: Настройка узла ] ◄── [ Этап 3: Регистрация места ]
  (node.toml)                     в SuperNodeRegistry.sol
          │
          ▼
[ Этап 5: Запуск ноды и прохождение ] ──► [ Статус: ACTIVE SUPER-NODE ]
  P2P-Handshake в Kademlia DHT
```

## 15.2 Шаг 1: Подготовка операционной системы и зависимостей

На выделенном сервере (Ubuntu 24.04 LTS / Debian 12) устанавливаются базовые зависимости, среда выполнения контейнеров Docker, а также утилита CLI lagrix.

```bash
# Update system and install base dependencies
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y curl git build-essential ufw jq fail2ban

# Install Docker Engine & Docker Compose Plugin
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install CLI tool for Lagrix Node Operators from the repository's releases (no Lagrix server is involved)
curl -fsSL https://github.com/lagrix-dev/lagrix-supernode/releases/latest/download/install.sh | bash
source ~/.bashrc

# Verify installation
lagrix --version
```

## 15.3 Шаг 2: Криптографическая инициализация и Вычисление Node ID

Узел генерирует секьюрный ключ P2P-сессии (secp256k1). Идентификатор NodeID детерминированно привязывается к EVM-адресу кошелька узла, с которого будет зарегистрировано место.

```bash
# Генерация нового изолированного ключа P2P-идентификации узла
lagrix identity create --keyfile /etc/lagrix/node_key.json

# Вывод сгенерированных реквизитов узла
lagrix identity show --keyfile /etc/lagrix/node_key.json
```

Пример консольного вывода:

```
===================================================================
Lagrix Node Identity Generated
===================================================================
Node Public Address (EVM) : 0x71cB49E820f92b76a08f51A0fB221B4561a3b49E
Computed P2P Node ID       : 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82
Place                      : assigned by invitation (document 05, 5.6)
Status                     : NOT_REGISTERED (Pending On-Chain Registration)
===================================================================
```

## 15.4 Шаг 3: Регистрация места в SuperNodeRegistry.sol

Оператор с кошелька узла, указанного в выводе (или через мультиподписной кошелек / Hardware Wallet), отправляет одну транзакцию
регистрации в сети L2 (Arbitrum / Base). Газ этой транзакции оператор
платит сам (документ 08).

CLI Скрипт регистрации:

```bash
# Привязка NodeID к месту, полученному по приглашению
lagrix supernode register   --registry-address 0xSuperNodeRegistryContractAddress   --node-id 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82   --private-key $OPERATOR_PRIVATE_KEY   --rpc-url https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
```

Solidity Механика под капотом SuperNodeRegistry.sol:

Смарт-контракт проверяет, что у кошелька есть назначенное место и нет отметки «доказанное нарушение», и переводит статус адреса в
состояние ACTIVE:

```solidity
function registerSuperNode(bytes32 nodeId) external nonReentrant {
    require(placeTaken[msg.sender], "SuperNodeRegistry: no place assigned");                 // doc 05, 5.6
    require(!provenViolation[msg.sender], "SuperNodeRegistry: proven violation");            // doc 05, 5.4
    require(!superNodes[msg.sender].active, "SuperNodeRegistry: Already registered");

    // Запись параметров узла в блокчейн
    superNodes[msg.sender] = SuperNode({
        includedAt: uint40(block.timestamp),
        lastSeen: uint40(block.timestamp),
        active: true,
        pubKeyAddress: msg.sender
    });

    nodeIdToAddress[nodeId] = msg.sender;
    emit SuperNodeRegistered(msg.sender, nodeId);
}
```

## 15.5 Шаг 4: Настройка конфигурации node.toml

Оператор формирует рабочий конфигурационный файл узла /etc/lagrix/node.toml:

```toml
[node]
tier = 2
node_id = "0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82"
keyfile_path = "/etc/lagrix/node_key.json"
data_dir = "/var/lib/lagrix/data"

[network]
public_ip = "203.0.113.195" # Статичный IPv4 адрес сервера
p2p_port = 4001             # Kademlia UDP
mtls_port = 443             # Envoy Data Plane TCP
stun_turn_port = 3478       # NAT Traversal

[blockchain]
chain_id = 42161            # Arbitrum One
rpc_url = "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY"
registry_contract = "0xSuperNodeRegistryContractAddress"
escrow_contract = "0xA2AEscrowContractAddress"

[relay]
enable_turn_relay = true
max_bandwidth_mbps = 1000

[metrics]
enabled = true
prometheus_port = 9090
```

## 15.6 Шаг 5: Запуск службы и Первичное Рукопожатие (P2P Handshake)

Узел запускается как системная служба, производит ончейн-проверку своего места и рассылает PING сообщения ближайшим bootstrap-узлам сети Kademlia DHT.

```bash
# Запуск узла через CLI
lagrix service start --config /etc/lagrix/node.toml

# Проверка статуса сетевой интеграции
lagrix status
```

Пример успешного вывода:

```
● lagrix-node.service - Lagrix Super-Relay Daemon
     Loaded: loaded (/etc/systemd/system/lagrix-node.service; enabled)
     Active: active (running) since Fri 2026-10-09 18:01:00 WEST; 12s ago

[INFO] On-Chain Place Verified: place registered (Tx: 0x3f1a...b92)
[INFO] P2P Transport initialized on 203.0.113.195:4001 (UDP)
[INFO] Envoy mTLS Sidecar started on 203.0.113.195:443 (TCP)
[INFO] Connecting to Bootstrap Nodes...
[INFO] Handshake successful with 12 Core Relays. Joined Kademlia Bucket #256.
[SUCCESS] Node is ACTIVE and routing A2A traffic.
```

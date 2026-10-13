# 15. Node Operator Guide: Стейкинг Валидатора и Пошаговый Процесс Интеграции (Deployment Flow)

Процесс активации Супер-Узла в сети Lagrix требует жесткой синхронизации между подготовкой физической/виртуальной инфраструктуры, генерацией криптографических ключей P2P-идентификации (NodeID) и ончейн-внесением гарантийного залога в смарт-контракт ValidatorStaking.sol.

Ниже описан полный пошаговый алгоритм ввода узла в эксплуатацию — от чистого сервера до включения в таблицу маршрутизации Kademlia DHT.

**До этапа 3 у оператора должно быть место.** Места 1–100 занимаются без залога. Места 101–1 000 достаются по приглашению
владельцам агентов-исполнителей с оплаченной работой за последний год; после 1 000 места открываются по два, когда сеть перегружена. В
обоих случаях сервер заявителя измеряют случайные агенты, а место назначается случайным выбором; раз в 1 год / N случайный супер-узел выбывает
по ротации, и его место заново назначается случайным выбором (документ 05, раздел 5.6). Адреса, названные основателем и связанными с ним лицами,
включая Fractera, Inc., места занять не могут (документ 05, раздел 5.5).

## 15.1 Общий сквозной процесс запуска (Deployment Flow Pipeline)

Активация Супер-Узла состоит из пяти последовательных этапов:

```
[ Этап 1: Подготовка сервера ] ──► [ Этап 2: Генерация Node Key ]
                                              │
                                              ▼
[ Этап 4: Прохождение On-Chain ] ◄── [ Этап 3: Депонирование стейка ]
  Инициализации (Staking)             в ValidatorStaking.sol
          │
          ▼
[ Этап 5: Запуск ноды и прохождение ] ──► [ Статус: ACTIVE VALIDATOR ]
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

Узел генерирует секьюрный ключ P2P-сессии (secp256k1). Идентификатор NodeID детерминированно привязывается к EVM-адресу, с которого будет производиться стейкинг.

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
Required Deposit           : none for places 1-100; a small fixed amount in earned coins for later places (document 05, 5.6)
Status                     : NOT_STAKED (Pending On-Chain Stake)
===================================================================
```

## 15.4 Шаг 3: Депонирование стейка в ValidatorStaking.sol

Оператор с кошелька, указанного в выводе (или через мультиподписной кошелек / Hardware Wallet), производит одобрение (Approve) и транзакцию блокировки залога в сети L2 (Arbitrum / Base).

CLI Скрипт внесения стейка:

```bash
# 1. Approve токенов Lagrix для контракта стейкинга
lagrix staking approve \
  --token-address 0xLagrixTokenAddressOnArbitrum \
  --staking-address 0xValidatorStakingContractAddress \
  --amount $REQUIRED_DEPOSIT \
  --private-key $OPERATOR_PRIVATE_KEY \
  --rpc-url https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY

# 2. Вызов функции registerValidator() в смарт-контракте
lagrix staking deposit \
  --staking-address 0xValidatorStakingContractAddress \
  --node-id 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82 \
  --amount $REQUIRED_DEPOSIT \
  --private-key $OPERATOR_PRIVATE_KEY
```

Solidity Механика под капотом ValidatorStaking.sol:

Смарт-контракт проверяет транзакцию, фиксирует залог и переводит статус адреса в состояние STAKED:

```solidity
function registerValidator(bytes32 nodeId, uint96 amount) external nonReentrant {
    require(placeWon[msg.sender], "ValidatorStaking: no place assigned");               // doc 05, 5.6
    require(!namedFounderAddress[msg.sender], "ValidatorStaking: founder and related addresses excluded"); // doc 05, 5.5
    require(amount >= requiredDeposit(), "ValidatorStaking: deposit below the required amount"); // doc 05, 5.6
    require(validators[msg.sender].stakeBalance == 0, "ValidatorStaking: Already registered");

    // Перевод токенов Lagrix на баланс контракта стейкинга
    lagrixToken.safeTransferFrom(msg.sender, address(this), amount);

    // Запись параметров узла в блокчейн
    validators[msg.sender] = Validator({
        stakeBalance: amount,
        lastActive: uint40(block.timestamp),
        slashCount: 0,
        blacklisted: false,
        pubKeyAddress: msg.sender
    });

    nodeIdToAddress[nodeId] = msg.sender;
    emit ValidatorRegistered(msg.sender, nodeId, amount);
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
staking_contract = "0xValidatorStakingContractAddress"
escrow_contract = "0xA2AEscrowContractAddress"

[relay]
enable_turn_relay = true
max_bandwidth_mbps = 1000

[metrics]
enabled = true
prometheus_port = 9090
```

## 15.6 Шаг 5: Запуск службы и Первичное Рукопожатие (P2P Handshake)

Узел запускается как системная служба, производит ончейн-верификацию своего стейка и рассылает PING сообщения ближайшим bootstrap-узлам сети Kademlia DHT.

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

[INFO] On-Chain Deposit Verified: required amount locked (Tx: 0x3f1a...b92)
[INFO] P2P Transport initialized on 203.0.113.195:4001 (UDP)
[INFO] Envoy mTLS Sidecar started on 203.0.113.195:443 (TCP)
[INFO] Connecting to Bootstrap Nodes...
[INFO] Handshake successful with 12 Core Relays. Joined Kademlia Bucket #256.
[SUCCESS] Node is ACTIVE and routing A2A traffic.
```

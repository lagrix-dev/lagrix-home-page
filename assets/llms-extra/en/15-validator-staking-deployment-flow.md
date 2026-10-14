# 15. Node Operator Guide: The Super-node Deposit and the Step-by-Step Integration Process (Deployment Flow)

Activating a Super-Node in the Lagrix network requires strict synchronization between preparing the physical/virtual infrastructure, generating the cryptographic P2P identity keys (NodeID) and depositing the guarantee stake on-chain into the SuperNodeDeposits.sol smart contract.

Below is the full step-by-step algorithm for putting a node into operation — from a clean server to inclusion in the Kademlia DHT routing table.

**Before stage 3, the operator must hold a place.** Places have no stages and no numbers. Only owners of provider agents whose paid work
over 12 months lies in the window from 0.75 to 1.25 of the network median can apply; the applicant's server is checked by agents in turn,
and the place goes to an applicant chosen at random (commit and reveal). New places open two at a time when the network is overloaded;
once every 1 year / N the super-node that has served longest leaves by rotation and its place opens by the same random choice (document
05, section 5.6).

## 15.1 End-to-End Launch Process (Deployment Flow Pipeline)

Activating a Super-Node consists of five sequential stages:

```
[ Stage 1: Server preparation ] ──► [ Stage 2: Node Key generation ]
                                              │
                                              ▼
[ Stage 4: On-Chain Initialization ] ◄── [ Stage 3: Stake deposit ]
  (Staking)                               into SuperNodeDeposits.sol
          │
          ▼
[ Stage 5: Node launch and passing ] ──► [ Status: ACTIVE SUPER-NODE ]
  the P2P Handshake in the Kademlia DHT
```

## 15.2 Step 1: Preparing the Operating System and Dependencies

On a dedicated server (Ubuntu 24.04 LTS / Debian 12), basic dependencies, the Docker container runtime and the lagrix CLI utility are installed.

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

## 15.3 Step 2: Cryptographic Initialization and Computing the Node ID

The node generates a secure P2P session key (secp256k1). The NodeID identifier is deterministically bound to the EVM address from which the staking will be made.

```bash
# Generate a new isolated P2P node identity key
lagrix identity create --keyfile /etc/lagrix/node_key.json

# Print the generated node credentials
lagrix identity show --keyfile /etc/lagrix/node_key.json
```

Example console output:

```
===================================================================
Lagrix Node Identity Generated
===================================================================
Node Public Address (EVM) : 0x71cB49E820f92b76a08f51A0fB221B4561a3b49E
Computed P2P Node ID       : 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82
Required Deposit           : the same for everyone; earned coins, or first rewards locked until it is reached (document 05, 5.6)
Status                     : NOT_STAKED (Pending On-Chain Stake)
===================================================================
```

## 15.4 Step 3: Depositing the Stake into SuperNodeDeposits.sol

From the wallet shown in the output (or through a multisig wallet / Hardware Wallet), the operator performs an approval (Approve) and a stake-locking transaction on the L2 network (Arbitrum / Base).

Stake deposit CLI script:

```bash
# 1. Approve Lagrix tokens for the staking contract
lagrix staking approve \
  --token-address 0xLagrixTokenAddressOnArbitrum \
  --staking-address 0xSuperNodeDepositsContractAddress \
  --amount $REQUIRED_DEPOSIT \
  --private-key $OPERATOR_PRIVATE_KEY \
  --rpc-url https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY

# 2. Call the registerSuperNode() function in the smart contract
lagrix staking deposit \
  --staking-address 0xSuperNodeDepositsContractAddress \
  --node-id 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82 \
  --amount $REQUIRED_DEPOSIT \
  --private-key $OPERATOR_PRIVATE_KEY
```

Solidity mechanics under the hood of SuperNodeDeposits.sol:

The smart contract checks the transaction, records the stake and moves the address status to STAKED:

```solidity
function registerSuperNode(bytes32 nodeId, uint96 amount) external nonReentrant {
    require(placeTaken[msg.sender], "SuperNodeDeposits: no place assigned");               // doc 05, 5.6
    require(amount >= requiredDeposit(), "SuperNodeDeposits: deposit below the required amount"); // doc 05, 5.6
    require(superNodes[msg.sender].stakeBalance == 0, "SuperNodeDeposits: Already registered");

    // Transfer Lagrix tokens to the staking contract balance
    lagrixToken.safeTransferFrom(msg.sender, address(this), amount);

    // Write node parameters to the blockchain
    superNodes[msg.sender] = SuperNode({
        stakeBalance: amount,
        lastActive: uint40(block.timestamp),
        slashCount: 0,
        blacklisted: false,
        pubKeyAddress: msg.sender
    });

    nodeIdToAddress[nodeId] = msg.sender;
    emit SuperNodeRegistered(msg.sender, nodeId, amount);
}
```

## 15.5 Step 4: Configuring node.toml

The operator creates the node's working configuration file /etc/lagrix/node.toml:

```toml
[node]
tier = 2
node_id = "0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82"
keyfile_path = "/etc/lagrix/node_key.json"
data_dir = "/var/lib/lagrix/data"

[network]
public_ip = "203.0.113.195" # Static IPv4 address of the server
p2p_port = 4001             # Kademlia UDP
mtls_port = 443             # Envoy Data Plane TCP
stun_turn_port = 3478       # NAT Traversal

[blockchain]
chain_id = 42161            # Arbitrum One
rpc_url = "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY"
staking_contract = "0xSuperNodeDepositsContractAddress"
escrow_contract = "0xA2AEscrowContractAddress"

[relay]
enable_turn_relay = true
max_bandwidth_mbps = 1000

[metrics]
enabled = true
prometheus_port = 9090
```

## 15.6 Step 5: Starting the Service and the First Handshake (P2P Handshake)

The node starts as a system service, verifies its stake on-chain and sends PING messages to the nearest bootstrap nodes of the Kademlia DHT network.

```bash
# Start the node via CLI
lagrix service start --config /etc/lagrix/node.toml

# Check the network integration status
lagrix status
```

Example of successful output:

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

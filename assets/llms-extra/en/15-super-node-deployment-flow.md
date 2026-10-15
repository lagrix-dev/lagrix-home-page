# 15. Node Operator Guide: Registering a Super-node Place and the Step-by-Step Integration Process (Deployment Flow)

Activating a Super-Node in the Lagrix network requires strict synchronization between preparing the physical/virtual infrastructure, generating the cryptographic P2P identity keys (NodeID) and registering the place on-chain in the SuperNodeRegistry.sol smart contract.

Below is the full step-by-step algorithm for putting a node into operation — from a clean server to inclusion in the Kademlia DHT routing table.

**Before stage 3, the operator must hold a place** (document 05, section 5.6). Places go by random choice among owners of provider
agents whose paid work over 12 months lies in the window from 0.75 to 1.25 of the network median. The chosen applicant receives an
invitation and has **48 hours** to prepare the server (stages 1 and 2), start it and submit it for the check by agents in turn. Once the
server passes, stages 3–5 make it an active super-node; if it is not ready in time or fails, the invitation passes to the next applicant.

## 15.1 End-to-End Launch Process (Deployment Flow Pipeline)

Activating a Super-Node consists of five sequential stages:

```
[ Stage 1: Server preparation ] ──► [ Stage 2: Node Key generation ]
                                              │
                                              ▼
[ Stage 4: Node configuration ] ◄── [ Stage 3: Place registration ]
  (node.toml)                          in SuperNodeRegistry.sol
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

The node generates a secure P2P session key (secp256k1). The NodeID identifier is deterministically bound to the EVM address of the node's wallet, from which the place will be registered.

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
Place                      : assigned by invitation (document 05, 5.6)
Status                     : NOT_REGISTERED (Pending On-Chain Registration)
===================================================================
```

## 15.4 Step 3: Registering the Place in SuperNodeRegistry.sol

From the node's wallet shown in the output (or through a multisig wallet / Hardware Wallet), the operator sends one registration
transaction on the L2 network (Arbitrum / Base). The operator pays the
gas of this transaction itself (document 08).

Registration CLI script:

```bash
# Bind the NodeID to the place assigned by invitation
lagrix supernode register   --registry-address 0xSuperNodeRegistryContractAddress   --node-id 0x892a0149f82d1c238b7122a019e1f2a34bc1a82e9123812a0f819231f8291a82   --private-key $OPERATOR_PRIVATE_KEY   --rpc-url https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
```

Solidity mechanics under the hood of SuperNodeRegistry.sol:

The smart contract checks that the wallet holds an assigned place and carries no «proven violation» mark, and moves the address status to
ACTIVE:

```solidity
function registerSuperNode(bytes32 nodeId) external nonReentrant {
    require(placeTaken[msg.sender], "SuperNodeRegistry: no place assigned");                 // doc 05, 5.6
    require(!provenViolation[msg.sender], "SuperNodeRegistry: proven violation");            // doc 05, 5.4
    require(!superNodes[msg.sender].active, "SuperNodeRegistry: Already registered");

    // Write node parameters to the blockchain
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
registry_contract = "0xSuperNodeRegistryContractAddress"
escrow_contract = "0xA2AEscrowContractAddress"

[relay]
enable_turn_relay = true
max_bandwidth_mbps = 1000

[metrics]
enabled = true
prometheus_port = 9090
```

## 15.6 Step 5: Starting the Service and the First Handshake (P2P Handshake)

The node starts as a system service, verifies its place on-chain and sends PING messages to the nearest bootstrap nodes of the Kademlia DHT network.

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

[INFO] On-Chain Place Verified: place registered (Tx: 0x3f1a...b92)
[INFO] P2P Transport initialized on 203.0.113.195:4001 (UDP)
[INFO] Envoy mTLS Sidecar started on 203.0.113.195:443 (TCP)
[INFO] Connecting to Bootstrap Nodes...
[INFO] Handshake successful with 12 Core Relays. Joined Kademlia Bucket #256.
[SUCCESS] Node is ACTIVE and routing A2A traffic.
```

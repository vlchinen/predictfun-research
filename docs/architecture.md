# System Architecture Analysis

## Overview

Predict.fun architecture combines multiple decentralized application layers:

- Wallet authentication and identity management
- Embedded wallet infrastructure
- Account abstraction execution
- Application API services
- Blockchain settlement layer

The architecture separates three major responsibilities:

1. Identity - proving who the user is
2. Execution - performing blockchain actions
3. Ownership - maintaining cryptographic control

# High Level Architecture


External Wallet
```
  |
  v
```
Authentication Layer
(SIWE / Privy)
```
|
v
```

Application Identity
(User Account / Linked Wallet)
```
  |
  v
```
Smart Account Layer
(UserOperation / EntryPoint)
```
|
v
```

Blockchain Settlement

---

# 1. Identity Layer

The identity layer handles user authentication and wallet association.

Responsibilities:

- Verify wallet ownership
- Maintain user sessions
- Link wallet identities
- Provide application authorization

The identity layer does not directly execute blockchain transactions.

---

# 2. Embedded Wallet Layer

Modern Web3 applications increasingly use embedded wallet infrastructure.

Conceptually:


User Identity
```
  |
  v
```
Embedded Wallet
```
  |
  v
```
Smart Account


Benefits:

- Better onboarding experience
- Reduced wallet friction
- Application controlled workflows
- Support for account abstraction

The embedded wallet does not replace cryptographic ownership.

Instead, it provides a user-friendly identity layer that can later interact with smart account infrastructure.
---

# 3. Application API Layer

The application layer provides access to platform functionality.

Typical components:

- Account queries
- Market information
- Portfolio data
- Order management

Communication methods:

- REST API
- GraphQL API
- JSON RPC

---

# 4. Account Abstraction Layer

The platform uses smart accounts instead of directly sending transactions from EOA wallets.

Core components:


UserOperation
```
  |
  v
```
Bundler
```
  |
  v
```
EntryPoint Contract
```
  |
  v
```
Smart Account Execution


This allows:

- Gas sponsorship
- Batch execution
- Programmable account logic
- Improved UX


The execution model follows the ERC-4337 account abstraction pattern.

Instead of traditional transactions:
```
EOA
 |
Transaction
 |
Blockchain


The system uses:

UserOperation
 |
Bundler
 |
EntryPoint
 |
Smart Account
 |
Blockchain
```
---

# 5. Execution Flow

A typical blockchain interaction:


Application Request
```
    |
    v
```
Create UserOperation
```
    |
    v
```
Estimate / Sponsor Gas
```
    |
    v
```
Sign Operation
```
    |
    v
```
Submit To EntryPoint
```
    |
    v
```
Smart Account Executes


---

# Security Model

Important security boundaries:

## Authentication Security

- Wallet ownership verified through signatures
- Nonces prevent replay attacks
- Sessions are application scoped

## Execution Security

- User operations require wallet authorization
- Smart accounts enforce execution rules
- Private keys remain isolated

---

# Research Scope

This repository documents:

- architecture patterns
- API communication models
- account abstraction design
- authentication flows

It does not contain:

- production credentials
- private keys
- user session tokens
- private infrastructure data
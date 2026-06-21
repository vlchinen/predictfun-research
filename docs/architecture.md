# System Architecture Analysis

## Overview

Predict.fun architecture combines multiple layers:

- Wallet authentication
- Embedded wallet infrastructure
- Smart account execution
- Application APIs
- Blockchain settlement

The system separates identity, execution, and ownership layers.

---

# High Level Architecture


User Wallet
```
  |
  |
  v
```
Authentication Layer
(SIWE / Privy)
```
  |
  |
  v
```
Application Layer
(GraphQL / REST APIs)
```
  |
  |
  v
```
Account Abstraction Layer
(Smart Account / UserOperation)
```
  |
  |
  v
```
Blockchain Execution


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
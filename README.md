# Predict.fun Research

Research repository exploring the architecture, authentication flow, account abstraction design, and trading infrastructure of Predict.fun.

This repository focuses on understanding how modern Web3 applications combine:

- Embedded wallets
- Smart accounts
- EIP-4337 Account Abstraction
- Privy authentication infrastructure
- Session management
- UserOperation lifecycle
- Market interaction workflows

## Overview

Modern Web3 applications are moving away from traditional externally owned accounts (EOA) toward embedded wallet architectures.

This repository documents and implements research around:

```
User
|
| Authentication
|
Privy Identity Layer
|
| Wallet Provisioning
|
Embedded Wallet
|
| Smart Account
|
ERC-4337 Account Abstraction
|
| UserOperation
|
Blockchain Settlement
```

## Repository Structure

```
docs/
├── authentication-flow.md
├── account-abstraction.md
├── architecture.md
└── trading-workflow.md

research/
├── privy-analysis.md
├── embedded-wallets.md
└── settlement-flow.md

src/
├── auth/
│ └── session.js
│
├── account/
│ ├── predictAccount.js
│ └── userOperation.js
│
├── trading/
│ ├── createOrder.js
│ ├── portfolio.js
│ └── withdraw.js
│
└── utils/
└── provider.js

examples/
├── login-example.js
├── trade-lifecycle.js
└── withdraw-example.js
```


## Research Topics

### Authentication

Analysis of:

- SIWE authentication flow
- Session lifecycle
- Identity token handling
- Wallet linking architecture

### Embedded Wallets

Research around:

- Privy-managed wallets
- Wallet ownership model
- Smart account derivation
- Account abstraction patterns

### Account Abstraction

Implementation notes covering:

- ERC-4337 UserOperation structure
- EntryPoint interaction
- Gas sponsorship
- Signature flow

### Trading Infrastructure

Research around:

- Order creation lifecycle
- Typed data signing
- Market data handling
- Settlement workflow

## Disclaimer

This repository is for educational and research purposes.

No production credentials, private keys, authentication secrets, or sensitive service data are included.

The implementation focuses on understanding architecture and integration patterns used by modern Web3 applications.

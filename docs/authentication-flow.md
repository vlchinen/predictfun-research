# Authentication Flow Analysis

## Overview

Predict.fun uses a wallet-based authentication architecture built around:

- Sign-In With Ethereum (SIWE)
- Privy authentication infrastructure
- Session-based authorization
- Linked wallet identities

The authentication process separates:

1. External wallet ownership verification
2. Identity/session management
3. Application-specific authorization

---

## High Level Flow

```
EOA Wallet

|
|
| SIWE Message Signature
|
v

Privy Authentication Layer

|
|
| Identity Token
|
v

Application Backend

|
|
| Session Authorization
|
v

Trading / Account APIs
```


---

# 1. Wallet Authentication Initialization

The client begins by requesting an authentication challenge.

Conceptually:
```
POST /siwe/init

{
address: walletAddress
}
```


The authentication service returns:

- nonce
- SIWE message payload

The nonce prevents replay attacks and binds the signature request to a single session.

---

# 2. SIWE Signature

The wallet signs the provided message.

Example flow:

```
Wallet
|
| signMessage()
|
v

ECDSA Signature
```


The signature proves ownership of the Ethereum address without requiring an on-chain transaction.

---

# 3. Authentication Exchange

The signed message is submitted back: POST /siwe/authenticate


The backend verifies:

- wallet address
- nonce validity
- message integrity
- signature recovery

A successful authentication creates an application session.

---

# 4. Identity Layer

After authentication, the identity service exposes linked accounts.

A user may have:

```
User Identity

|
+-- External Wallet
|
+-- Embedded Wallet
|
+-- Application Account
```

This separation allows applications to support:

- social login
- embedded wallets
- external wallets
- account abstraction

---

# 5. Session Lifecycle

Typical lifecycle:

```
Authenticate

  |
  v
Receive Session Token

  |
  v
Application Requests

  |
  v
Refresh / Renew Session
```


Tokens should be treated as temporary credentials and never stored inside public repositories.

---

# Security Considerations

Important properties:

- Nonce based authentication prevents replay
- Private keys never participate in SIWE authentication
- Session credentials are application scoped
- Wallet ownership is verified cryptographically

---

# Research Notes

This flow demonstrates the transition from:

Traditional Web3:

```
Connect Wallet
|
Sign Transaction
|
On-chain Interaction
```

towards:

Modern Web3:

```
Identity Layer
|
Embedded Wallet
|
Smart Account
|
Application Session
|
Blockchain Execution
```

This architecture enables consumer-friendly Web3 applications while maintaining cryptographic ownership.
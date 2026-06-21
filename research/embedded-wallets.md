# Embedded Wallet Architecture Research

## Overview

Embedded wallets represent a shift from traditional externally owned accounts (EOA) toward application-integrated wallet experiences.

Instead of requiring users to manually manage wallet software, applications can provide wallet functionality through embedded wallet infrastructure.

This approach combines:

- User identity
- Wallet ownership
- Key management
- Smart account execution

---

# Traditional Wallet Model

Traditional Web3 onboarding:


User
```
|
v
```
Wallet Extension
```
|
v
```
EOA Address
```
|
v
```
Transaction Signing


Characteristics:

- User manages wallet directly
- Private key is controlled externally
- Every transaction requires wallet interaction

---

# Embedded Wallet Model

Embedded wallet architecture:


User Identity
```
  |
  v
```
Embedded Wallet Service
```
  |
  v
```
Wallet Account
```
  |
  v
```
Application Execution


The wallet becomes part of the application experience.

---

# Identity Separation

A key design principle is separating identity from execution.

Conceptually:


Identity Layer
```
|
|
v
```
Wallet Layer
```
|
|
v
```
Execution Layer


This allows applications to support:

- Social authentication
- Email-based onboarding
- Existing wallet connection
- Programmatic wallet interaction

---

# Smart Account Integration

Embedded wallets are commonly combined with account abstraction.

Architecture:


Embedded Wallet
```
  |
  v
```
Smart Account
```
  |
  v
```
EntryPoint
```
  |
  v
```
Blockchain


Benefits:

- Better user experience
- Gas abstraction
- Programmable execution
- Batch operations

---

# Security Model

Embedded wallet systems must maintain clear security boundaries.

Important components:

## Authentication

Responsible for proving user identity.

Examples:

- Signature verification
- Session authentication
- Identity tokens

## Wallet Authorization

Responsible for approving blockchain actions.

Examples:

- Transaction signatures
- User operation signatures

## Execution

Responsible for submitting approved operations.

---

# Research Notes

Embedded wallets aim to bridge the gap between Web2 user experience and Web3 ownership.

The architectural transition:

Traditional:

```
User
|
Wallet Extension
|
Blockchain
```

Modern:

```
User Identity
|
Embedded Wallet
|
Smart Account
|
Blockchain
```

This model enables applications to provide simplified onboarding while preserving cryptographic ownersh
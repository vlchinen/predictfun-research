# Account Abstraction Analysis

## Overview

Predict.fun uses an account abstraction architecture to enable smart contract based wallet execution.

Instead of directly executing transactions from an externally owned account (EOA), operations are wrapped into UserOperation objects and processed through an EntryPoint based system.

The architecture provides:

- Smart account execution
- Gas abstraction
- Sponsored transactions
- Better wallet UX

---

# Traditional Wallet Model

Traditional Web3 flow:


EOA Wallet
```
|
|
v
```
Sign Transaction
```
|
|
v
```
Blockchain Transaction


The wallet directly controls transaction execution.

---

# Account Abstraction Model

With account abstraction:


Application
```
|
|
v
```
UserOperation
```
|
|
v
```
Bundler
```
|
|
v
```
EntryPoint Contract
```
|
|
v
```
Smart Account
```
|
|
v
```
Target Contract


The smart account becomes the execution layer.

---

# UserOperation Structure

A UserOperation contains the information required for smart account execution.

Conceptually:

```json
{
  "sender": "smart_account",
  "nonce": "operation_nonce",
  "callData": "execution_data",
  "gasLimits": "execution_parameters",
  "signature": "authorization"
}

The operation is validated before execution.

EntryPoint Architecture

The EntryPoint contract acts as the central execution manager.

Responsibilities:

Validate UserOperations
Manage execution flow
Handle gas accounting
Coordinate smart account calls

Conceptual flow:

UserOperation
```
      |
      v
```
EntryPoint Validation
```
      |
      v
```
Smart Account Validation
```
      |
      v
```
Execute Call
Gas Sponsorship

Account abstraction enables third parties to sponsor gas costs.

Flow:

UserOperation
```
      |
      v
```
Paymaster / Sponsor
```
      |
      v
```
Bundler Submission
```
      |
      v
```
Execution

This improves user experience by removing the requirement for users to hold native gas tokens.

Smart Account Benefits

Compared with EOAs:

Feature	EOA	Smart Account
Programmable logic	No	Yes
Batch execution	Limited	Supported
Gas sponsorship	No	Supported
Custom validation	No	Supported
Recovery mechanisms	Limited	Possible
Signing Model

The user authorizes operations by signing execution data.

The signature represents:

operation approval
wallet ownership
execution authorization

The private key remains the root authority.

Research Notes

Account abstraction changes the wallet model from:

Wallet = Transaction Signer

to:

Wallet = Programmable Account Controller

This enables applications to build Web2-like experiences while maintaining blockchain ownership guarantees.
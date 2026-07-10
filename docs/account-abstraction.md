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
Nonce Model (2D Nonces)

ERC-4337 nonces are not a simple incrementing counter. The EntryPoint exposes:

```
function getNonce(address sender, uint192 key) view returns (uint256)
```

The returned `uint256` packs two values:

```
nonce = (key << 64) | sequence
```

- `key` (`uint192`) — an application-chosen namespace. Different validators or modules on the same smart account can maintain independent nonce sequences by using different keys.
- `sequence` (`uint64`) — increments per UserOperation within that key.

This lets a smart account run multiple independent nonce tracks in parallel, instead of being limited to a single global counter like an EOA.

---

Counterfactual Address Derivation

Smart accounts are deployed lazily — the address is known before the contract exists, since it is derived deterministically (CREATE2) from the factory address, factory init parameters, and a salt.

The EntryPoint standardizes how a caller resolves this address without deploying anything, via:

```
function getSenderAddress(bytes calldata initCode)
```

`getSenderAddress` is designed to always revert, carrying the predicted address inside a custom error:

```
error SenderAddressResult(address sender)
```

The caller decodes the address out of the revert data instead of a normal return value. This "revert-to-return-data" pattern avoids requiring a view-safe computation path in the EntryPoint for every possible factory implementation, while still letting any client resolve the eventual account address off-chain.

`initCode` itself is just `factoryAddress + factoryCalldata` — the calldata the factory receives on first use to actually deploy the account.

---

PackedUserOperation Hash (EIP-4337 v0.7)

Since EntryPoint v0.7, gas-related fields are packed into `bytes32` slots rather than passed as separate `uint256` values, reducing calldata size:

```
accountGasLimits = (verificationGasLimit << 128) | callGasLimit
gasFees          = (maxPriorityFeePerGas << 128) | maxFeePerGas
```

The UserOperation hash used for signing is computed in two stages:

```
innerHash = keccak256(
  abi.encode(
    sender, nonce,
    keccak256(initCode),
    keccak256(callData),
    accountGasLimits,
    preVerificationGas,
    gasFees,
    keccak256(paymasterAndData)
  )
)

userOpHash = keccak256(
  abi.encode(innerHash, entryPointAddress, chainId)
)
```

Binding the hash to `entryPointAddress` and `chainId` prevents a signed UserOperation from being replayed against a different EntryPoint deployment or a different chain.

`paymasterAndData` concatenates the paymaster address with its packed verification/postOp gas limits and any paymaster-specific data — the same packing approach used for the account's own gas limits above.

---

Bundler RPC Interface

Bundlers expose a JSON-RPC interface. ERC-4337 defines the standard methods:

```
eth_sendUserOperation
eth_estimateUserOperationGas
eth_getUserOperationByHash
eth_getUserOperationReceipt
eth_supportedEntryPoints
```

Many bundler providers add vendor-specific methods on top of this — for example, gas price oracles tuned for UserOperations, or an RPC method to request paymaster sponsorship before submission. These are provider extensions, not part of the ERC-4337 standard, so exact method names and payload shapes vary between vendors.

A sponsored UserOperation flow typically looks like:

```
Build UserOperation (unsigned, gas fields empty)
        |
        v
Request gas price from bundler
        |
        v
Request paymaster sponsorship
  (returns gas limits + paymasterAndData)
        |
        v
Compute UserOperation hash
        |
        v
Sign hash with account owner key
        |
        v
Submit via eth_sendUserOperation
        |
        v
Poll eth_getUserOperationReceipt
```

---

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
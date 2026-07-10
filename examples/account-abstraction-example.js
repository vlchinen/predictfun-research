/**
 * Account Abstraction Example
 *
 * Demonstrates the offline part of the ERC-4337 v0.7
 * UserOperation lifecycle:
 *
 * Build UserOperation
 *      |
 *      v
 * Pack gas fields
 *      |
 *      v
 * Compute UserOperation hash
 *
 * Resolving a live nonce or counterfactual address requires
 * a real provider/RPC endpoint, so this example sticks to the
 * pure, deterministic pieces.
 */

import {
  createUserOperation,
  attachGasParameters
} from "../src/account/userOperation.js";
import { hashUserOperation } from "../src/account/hash.js";
import { decodeNonce, encodeNonce } from "../src/account/nonce.js";

const ENTRY_POINT_V07 = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const EXAMPLE_CHAIN_ID = 56;

function main() {
  const nonce = encodeNonce(1n, 0n); // key = 1 (example validator), sequence = 0

  let userOp = createUserOperation({
    sender: "0x1234567890123456789012345678901234567890",
    callData: "0xa9059cbb",
    nonce
  });

  userOp = attachGasParameters(userOp, {
    callGasLimit: 100000n,
    verificationGasLimit: 150000n,
    maxFeePerGas: 3000000000n,
    maxPriorityFeePerGas: 1000000000n
  });

  userOp.preVerificationGas = 50000n;

  console.log("Decoded nonce:", decodeNonce(userOp.nonce));

  const userOpHash = hashUserOperation(
    userOp,
    ENTRY_POINT_V07,
    EXAMPLE_CHAIN_ID
  );

  console.log("UserOperation hash:", userOpHash);
}

main();

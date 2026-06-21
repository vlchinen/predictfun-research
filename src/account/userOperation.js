/**
 * UserOperation builder utilities
 *
 * Represents account abstraction execution requests.
 *
 * The module focuses on structure and lifecycle:
 *
 * Build
 *  |
 * Validate
 *  |
 * Sponsor
 *  |
 * Sign
 *  |
 * Submit
 */


export function createUserOperation({
  sender,
  callData,
  nonce = 0,
}) {
  return {
    sender,
    nonce,
    callData,

    // Filled during execution preparation
    callGasLimit: null,
    verificationGasLimit: null,

    maxFeePerGas: null,
    maxPriorityFeePerGas: null,

    signature: null,
  };
}


export function attachGasParameters(
  userOperation,
  gas
) {
  return {
    ...userOperation,
    callGasLimit: gas.callGasLimit,
    verificationGasLimit:
      gas.verificationGasLimit,

    maxFeePerGas:
      gas.maxFeePerGas,

    maxPriorityFeePerGas:
      gas.maxPriorityFeePerGas,
  };
}


export function attachSignature(
  userOperation,
  signature
) {
  return {
    ...userOperation,
    signature,
  };
}
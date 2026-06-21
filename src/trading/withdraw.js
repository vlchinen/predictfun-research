/**
 * Predict.fun Withdraw Module
 *
 * Responsible for:
 * - Building withdrawal calldata
 * - Preparing smart account execution data
 *
 * This module does not:
 * - send transactions directly
 * - store private keys
 * - manage user credentials
 */


import {
  zeroPadValue,
  toBeHex,
  getAddress
} from "ethers";


/**
 * Build ERC20 transfer calldata
 *
 * Used as an example of contract execution
 * through smart account / UserOperation flow.
 *
 * @param {string} tokenAddress
 * @param {string} recipient
 * @param {bigint|string|number} amount
 */
export function buildERC20TransferCallData(
  tokenAddress,
  recipient,
  amount
) {

  const selector =
    "0xa9059cbb";


  const recipientEncoded =
    zeroPadValue(
      getAddress(recipient),
      32
    ).slice(2);


  const amountEncoded =
    zeroPadValue(
      toBeHex(amount),
      32
    ).slice(2);


  return (
    selector +
    recipientEncoded +
    amountEncoded
  );
}


/**
 * Build smart account execution request
 *
 * The returned object can be passed into
 * UserOperation builder.
 */
export function buildWithdrawOperation({
  tokenAddress,
  recipient,
  amount
}) {


  const callData =
    buildERC20TransferCallData(
      tokenAddress,
      recipient,
      amount
    );


  return {

    target: tokenAddress,

    value: "0x0",

    data: callData

  };
}


/**
 * Create withdraw workflow description
 *
 * Execution layer should handle:
 *
 * 1. Build UserOperation
 * 2. Request sponsorship
 * 3. Sign operation
 * 4. Submit to EntryPoint
 */
export function describeWithdrawFlow() {

  return [

    "Create withdrawal calldata",

    "Wrap into smart account execution",

    "Build UserOperation",

    "Sponsor gas",

    "Sign UserOperation",

    "Submit through EntryPoint"

  ];
}
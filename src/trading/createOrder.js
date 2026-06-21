/**
 * Predict.fun Trading Module
 *
 * Responsible for:
 * - Building order payloads
 * - Preparing typed data
 * - Signing orders
 * - Sending order requests
 *
 * This module intentionally does not contain:
 * - private keys
 * - authentication tokens
 * - user credentials
 */

import axios from "axios";


/**
 * Build order structure
 *
 * @param {Object} params
 * @returns {Object}
 */
export function buildOrder(params) {
  const {
    maker,
    signer,
    marketId,
    tokenId,
    side,
    makerAmount,
    takerAmount,
    feeRateBps = 0,
    nonce = 0
  } = params;


  return {
    maker,
    signer,
    marketId,
    tokenId,
    side,
    makerAmount: makerAmount.toString(),
    takerAmount: takerAmount.toString(),
    feeRateBps: feeRateBps.toString(),
    nonce: nonce.toString()
  };
}


/**
 * Prepare typed data payload
 *
 * Actual domain/type definitions
 * depend on exchange implementation.
 */
export function buildTypedData(order) {

  return {
    domain: {
      name: "Predict",
      version: "1"
    },

    types: {
      Order: [
        {
          name: "maker",
          type: "address"
        },
        {
          name: "signer",
          type: "address"
        },
        {
          name: "tokenId",
          type: "uint256"
        },
        {
          name: "makerAmount",
          type: "uint256"
        },
        {
          name: "takerAmount",
          type: "uint256"
        }
      ]
    },

    message: order
  };
}


/**
 * Sign order
 *
 * signer should be injected externally.
 *
 * Example:
 *
 * const signature =
 *   await signer.signTypedData(domain, types, message)
 */
export async function signOrder(
  typedData,
  signer
) {

  const {
    domain,
    types,
    message
  } = typedData;


  return signer.signTypedData(
    domain,
    types,
    message
  );
}


/**
 * Create order request payload
 */
export function createOrderPayload(
  order,
  signature
) {

  return {

    order: {
      ...order,
      signature
    },

    strategy: "LIMIT"

  };
}


/**
 * Submit order
 *
 * Authentication should be provided
 * by caller.
 */
export async function submitOrder({
  endpoint,
  payload,
  authorization
}) {

  const response = await axios.post(
    endpoint,
    payload,
    {
      headers: {
        "content-type":
          "application/json",

        ...(authorization && {
          authorization
        })
      }
    }
  );


  return response.data;
}
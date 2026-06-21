import { getAddress } from "ethers";

/**
 * Smart Account utilities
 *
 * Handles account abstraction related operations:
 *
 * External identity
 *        |
 *        v
 * Embedded wallet
 *        |
 *        v
 * Smart account address
 *
 * Address derivation logic depends on the target
 * smart account implementation.
 */

export class SmartAccount {
  constructor({
    address,
    owner,
  }) {
    this.address = address;
    this.owner = owner;
  }


  getAccountAddress() {
    if (!this.address) {
      throw new Error(
        "Smart account address is not initialized"
      );
    }

    return getAddress(this.address);
  }


  getOwner() {
    return this.owner;
  }


  toJSON() {
    return {
      address: this.address,
      owner: this.owner,
    };
  }
}


/**
 * Creates a smart account instance
 *
 * The actual deployment / prediction mechanism
 * depends on the account factory implementation.
 */
export function createSmartAccount(config) {
  return new SmartAccount(config);
}
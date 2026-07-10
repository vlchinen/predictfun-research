import { Contract } from "ethers";

/**
 * ERC-4337 nonce utilities
 *
 * EntryPoint nonces are 2-dimensional rather than a single
 * incrementing counter:
 *
 * nonce = (key << 64) | sequence
 *
 * `key` (uint192) lets a smart account maintain independent
 * nonce sequences per validator/module, instead of being
 * limited to one global counter like an EOA.
 */

const ENTRY_POINT_ABI = [
  "function getNonce(address sender, uint192 key) view returns (uint256)"
];

export async function getAccountNonce(
  provider,
  entryPointAddress,
  sender,
  key = 0n
) {
  const entryPoint = new Contract(
    entryPointAddress,
    ENTRY_POINT_ABI,
    provider
  );

  return entryPoint.getNonce(sender, key);
}

export function decodeNonce(nonce) {
  const value = BigInt(nonce);

  return {
    key: value >> 64n,
    sequence: value & ((1n << 64n) - 1n)
  };
}

export function encodeNonce(key, sequence) {
  return (BigInt(key) << 64n) | BigInt(sequence);
}

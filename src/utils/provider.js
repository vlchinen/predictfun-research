import { ethers } from "ethers";

/**
 * Provider utilities
 *
 * This module centralizes blockchain connection handling.
 * Runtime configuration should be provided through environment variables.
 */

const DEFAULT_CHAIN_ID = 56;

export function getProvider() {
  const rpcUrl = process.env.RPC_URL;

  if (!rpcUrl) {
    throw new Error(
      "Missing RPC_URL environment variable"
    );
  }

  return new ethers.JsonRpcProvider(
    rpcUrl,
    DEFAULT_CHAIN_ID
  );
}

export function getChainId() {
  return DEFAULT_CHAIN_ID;
}
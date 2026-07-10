/**
 * Bundler RPC client
 *
 * Wraps the standard ERC-4337 bundler JSON-RPC methods.
 * The bundler endpoint is supplied by the caller — this module
 * does not assume or hardcode any specific bundler provider.
 */

async function rpcCall(endpoint, method, params) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params
    })
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message || "Bundler RPC error");
  }

  return json.result;
}

export function sendUserOperation(endpoint, userOp, entryPointAddress) {
  return rpcCall(endpoint, "eth_sendUserOperation", [
    userOp,
    entryPointAddress
  ]);
}

export function estimateUserOperationGas(endpoint, userOp, entryPointAddress) {
  return rpcCall(endpoint, "eth_estimateUserOperationGas", [
    userOp,
    entryPointAddress
  ]);
}

export function getUserOperationReceipt(endpoint, userOpHash) {
  return rpcCall(endpoint, "eth_getUserOperationReceipt", [userOpHash]);
}

export function getSupportedEntryPoints(endpoint) {
  return rpcCall(endpoint, "eth_supportedEntryPoints", []);
}

/**
 * Polls for a UserOperation receipt until it lands or the
 * timeout elapses. Bundlers only include the operation once
 * it has actually been mined, so submission and confirmation
 * are always separate steps.
 */
export async function waitForUserOperationReceipt(
  endpoint,
  userOpHash,
  { timeoutMs = 30000, intervalMs = 2000 } = {}
) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const receipt = await getUserOperationReceipt(endpoint, userOpHash);

    if (receipt) return receipt;

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error("Timed out waiting for UserOperation receipt");
}

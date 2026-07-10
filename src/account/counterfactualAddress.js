import { AbiCoder, concat, getAddress } from "ethers";

/**
 * Counterfactual smart account address resolution
 *
 * Smart accounts are deployed lazily via CREATE2, so their
 * address is known before the contract exists on-chain.
 *
 * EntryPoint.getSenderAddress(initCode) is designed to always
 * revert, carrying the predicted address inside a custom error:
 *
 * error SenderAddressResult(address sender)
 *
 * Callers decode the address from the revert data rather than
 * a normal return value — this avoids requiring a view-safe
 * computation path in the EntryPoint for every possible factory
 * implementation.
 */

const GET_SENDER_ADDRESS_SELECTOR = "0x9b249f69";

export function buildInitCode(factoryAddress, factoryCalldata) {
  return concat([factoryAddress, factoryCalldata]);
}

export async function resolveSenderAddress(
  provider,
  entryPointAddress,
  initCode
) {
  const encodedInitCode = AbiCoder.defaultAbiCoder().encode(
    ["bytes"],
    [initCode]
  );

  const data = GET_SENDER_ADDRESS_SELECTOR + encodedInitCode.slice(2);

  try {
    await provider.call({ to: entryPointAddress, data });
  } catch (err) {
    const revertData = err?.data ?? err?.error?.data;

    if (!revertData) {
      throw new Error("EntryPoint did not return revert data");
    }

    // SenderAddressResult(address) — address occupies the last 20 bytes
    return getAddress("0x" + revertData.slice(-40));
  }

  throw new Error("getSenderAddress did not revert as expected");
}

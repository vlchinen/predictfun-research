import { AbiCoder, keccak256 } from "ethers";

/**
 * PackedUserOperation hashing (EIP-4337 v0.7)
 *
 * Since EntryPoint v0.7, gas-related fields are packed into
 * bytes32 slots instead of separate uint256 values, to reduce
 * calldata size:
 *
 * accountGasLimits = (verificationGasLimit << 128) | callGasLimit
 * gasFees          = (maxPriorityFeePerGas << 128) | maxFeePerGas
 *
 * The same bit-packing is byte-equivalent to concatenating two
 * zero-padded 16-byte values, which is how paymasterAndData's
 * internal gas limits are laid out.
 */

function packUint128Pair(high, low) {
  const packed = (BigInt(high) << 128n) | BigInt(low);
  return "0x" + packed.toString(16).padStart(64, "0");
}

export function packAccountGasLimits(verificationGasLimit, callGasLimit) {
  return packUint128Pair(verificationGasLimit, callGasLimit);
}

export function packGasFees(maxPriorityFeePerGas, maxFeePerGas) {
  return packUint128Pair(maxPriorityFeePerGas, maxFeePerGas);
}

export function buildPaymasterAndData({
  paymaster,
  paymasterVerificationGasLimit,
  paymasterPostOpGasLimit,
  paymasterData = "0x"
} = {}) {
  if (!paymaster) return "0x";

  const gasLimits = packUint128Pair(
    paymasterVerificationGasLimit,
    paymasterPostOpGasLimit
  );

  return paymaster + gasLimits.slice(2) + paymasterData.replace(/^0x/, "");
}

/**
 * Computes the UserOperation hash used for signing.
 *
 * Binding the hash to entryPointAddress and chainId prevents a
 * signed UserOperation from being replayed against a different
 * EntryPoint deployment or a different chain.
 */
export function hashUserOperation(userOp, entryPointAddress, chainId) {
  const abiCoder = AbiCoder.defaultAbiCoder();

  const accountGasLimits = packAccountGasLimits(
    userOp.verificationGasLimit,
    userOp.callGasLimit
  );

  const gasFees = packGasFees(
    userOp.maxPriorityFeePerGas,
    userOp.maxFeePerGas
  );

  const paymasterAndData = buildPaymasterAndData(userOp);

  const packed = abiCoder.encode(
    [
      "address",
      "uint256",
      "bytes32",
      "bytes32",
      "bytes32",
      "uint256",
      "bytes32",
      "bytes32"
    ],
    [
      userOp.sender,
      BigInt(userOp.nonce),
      keccak256(userOp.initCode ?? "0x"),
      keccak256(userOp.callData ?? "0x"),
      accountGasLimits,
      BigInt(userOp.preVerificationGas ?? 0n),
      gasFees,
      keccak256(paymasterAndData)
    ]
  );

  const innerHash = keccak256(packed);

  const finalEncoded = abiCoder.encode(
    ["bytes32", "address", "uint256"],
    [innerHash, entryPointAddress, BigInt(chainId)]
  );

  return keccak256(finalEncoded);
}

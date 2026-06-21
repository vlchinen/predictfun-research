/**
 * Authentication Flow Example
 *
 * Demonstrates the conceptual authentication lifecycle:
 *
 * Wallet
 *   |
 *   v
 * Sign Message
 *   |
 *   v
 * Session Creation
 *   |
 *   v
 * Application Access
 *
 */


import { createSession } from "../src/auth/session.js";


async function main() {


  const walletAddress =
    "0xExampleWalletAddress";


  const session = await createSession({
    walletAddress
  });


  console.log(
    "Authentication session created:"
  );


  console.log(session);

}


main()
  .catch(console.error);
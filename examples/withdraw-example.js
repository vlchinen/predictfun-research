/**
 * Withdrawal Lifecycle Example
 *
 * Withdrawal is handled independently
 * from trading execution.
 *
 *
 * Internal Balance
 *        |
 *        v
 * Withdrawal Request
 *        |
 *        v
 * Verification
 *        |
 *        v
 * Blockchain Settlement
 *
 */


import {
  createWithdrawalRequest
}
from "../src/trading/withdraw.js";



function main(){


  const request =
    createWithdrawalRequest({

      asset: "USDC",

      amount: "100",

      destination:
        "0xExampleDestination"

    });



  console.log(
    "Withdrawal request:"
  );


  console.log(request);


}



main();
/**
 * Trading Lifecycle Example
 *
 * Demonstrates the high-level order lifecycle.
 *
 *
 * User Intent
 *      |
 *      v
 * Create Order
 *      |
 *      v
 * Validation
 *      |
 *      v
 * Execution
 *      |
 *      v
 * Settlement
 *
 */


import { createOrder } from "../src/trading/createOrder.js";


function main(){


  const order = createOrder({

    market: "example-market",

    side: "BUY",

    price: 0.5,

    size: 10

  });



  console.log(
    "Generated order request:"
  );


  console.log(order);

}


main();
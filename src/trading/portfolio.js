/**
 * Predict.fun Portfolio Module
 *
 * Responsible for:
 * - Reading account portfolio data
 * - Fetching positions
 * - Fetching trading statistics
 *
 * This module only handles data access.
 * Authentication must be provided externally.
 */

import axios from "axios";


const GRAPHQL_ENDPOINT =
  "https://graphql.predict.fun/graphql";


/**
 * Execute GraphQL request
 */
async function graphqlRequest({
  query,
  variables,
  authorization
}) {

  const response = await axios.post(
    GRAPHQL_ENDPOINT,
    {
      query,
      variables
    },
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


/**
 * Get account positions
 *
 * Returns:
 * - markets
 * - outcomes
 * - shares
 * - PnL information
 */
export async function getPositions({
  address,
  authorization
}) {

  const query = `
    query GetAccountPositions(
      $address: Address!
    ) {
      account(address: $address) {
        positions {
          edges {
            node {
              id

              shares

              pnlUsd

              valueUsd

              averageBuyPriceUsd

              market {
                id
                title
              }

              outcome {
                id
                name
              }
            }
          }
        }
      }
    }
  `;


  const result =
    await graphqlRequest({
      query,
      variables: {
        address
      },
      authorization
    });


  return (
    result
      ?.data
      ?.account
      ?.positions
      ?.edges
      ?.map(edge => edge.node)
      ||
    []
  );
}


/**
 * Get account trading statistics
 */
export async function getPortfolioStats({
  address,
  authorization
}) {

  const query = `
    query GetPortfolio(
      $address: Address!
    ) {

      account(address:$address) {

        statistics {

          volumeUsd

          positionsValueUsd

          pnlUsd

          marketsCount

        }

        leaderboard {

          totalPoints

          rank

        }

      }

    }
  `;


  const result =
    await graphqlRequest({
      query,
      variables:{
        address
      },
      authorization
    });


  return (
    result
      ?.data
      ?.account
      ||
    null
  );
}


/**
 * Calculate total position value
 */
export function calculatePortfolioValue(
  positions
) {

  return positions.reduce(
    (total, position)=>{

      return (
        total +
        Number(
          position.valueUsd || 0
        )
      );

    },
    0
  );
}
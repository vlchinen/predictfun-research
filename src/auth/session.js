/**
 * Authentication session utilities
 *
 * Handles the application authentication lifecycle:
 *
 * 1. Initialize authentication request
 * 2. Sign authentication message
 * 3. Exchange signature for session
 *
 * Credentials and endpoints are provided externally.
 */

export class AuthenticationSession {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || process.env.AUTH_BASE_URL;

    if (!this.baseUrl) {
      throw new Error(
        "Missing authentication base URL"
      );
    }
  }

  async requestNonce(address) {
    const response = await fetch(
      `${this.baseUrl}/siwe/init`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Authentication init failed: ${response.status}`
      );
    }

    return response.json();
  }


  async authenticate(payload) {
    const response = await fetch(
      `${this.baseUrl}/siwe/authenticate`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Authentication failed: ${response.status}`
      );
    }

    return response.json();
  }
}
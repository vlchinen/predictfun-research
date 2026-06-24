# predictfun-research

A technical breakdown of how Predict.fun's wallet, authentication, and trading systems fit together — built while developing automation around the platform.

This repository documents the architecture I needed to understand in order to automate wallet operations, trading, and withdrawals: SIWE-based authentication, Privy's embedded wallet model, account abstraction (ERC-4337), and the order/settlement lifecycle.

## Scope

- Authentication architecture (SIWE, Privy, session lifecycle)
- Embedded wallets and identity management
- Account abstraction (UserOperation, Bundler, EntryPoint)
- Trading lifecycle (order creation, execution, settlement, withdrawals)

## Repository Structure

```
predictfun-research/
├── docs/
│   ├── architecture.md
│   ├── authentication-flow.md
│   ├── account-abstraction.md
│   ├── trading-workflow.md
│   └── research-methodology.md
├── research/
│   ├── embedded-wallets.md
│   ├── privy-analysis.md
│   └── settlement-flow.md
├── src/
│   ├── account/        # smart account / UserOperation structure
│   ├── auth/           # session handling skeleton (SIWE init/authenticate)
│   ├── trading/        # order construction & withdrawal calldata structure
│   └── utils/          # provider / chain config helpers
└── examples/            # minimal usage demos with placeholder data
```

## What's Here vs. What Isn't

The `docs/` and `research/` notes describe the architecture in depth — how authentication, identity, and execution layers interact.

The `src/` and `examples/` code shows the **structure** of each piece (request shapes, payload construction, UserOperation lifecycle) — not a working, drop-in automation tool. Order signing domains/types, smart account address derivation, and live endpoints are intentionally left as implementation details rather than hardcoded, since those are specific to the production system.

## How I Used This

Building automation against an undocumented system meant working backwards from observed behavior: tracing requests, forming a hypothesis about what each layer expected, testing it, and adjusting when it didn't hold. This repository is the architecture model that came out of that process — useful for understanding *how* the pieces fit together, even though it isn't a turnkey tool.

## Disclaimer

This repository contains educational research and architectural analysis. It does not include:

- Private keys
- Credentials
- Production secrets
- User data
- Unauthorized access methods

## License

MIT
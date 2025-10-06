# Cashapp-Solana

[![CI](https://github.com/shubhamjain1402/Cashapp-Solana/actions/workflows/ci.yml/badge.svg)](https://github.com/shubhamjain1402/Cashapp-Solana/actions)

Cashapp-Solana is a focused frontend application that demonstrates integrating Solana wallets and building on-chain payment flows. It uses a client-side Next.js frontend to connect wallets, create transactions, accept QR-payments, and validate transfers on Solana.

## Table of contents

- [Key features](#key-features)
- [Demo](#demo)
- [Repository layout](#repository-layout)
- [Quick start](#quick-start)
- [Troubleshooting](#common-troubleshooting)
- [How to extend](#how-to-extend)
- [Contributing](#contributing)

Key features
- Wallet connection using Phantom and the `@solana/wallet-adapter` ecosystem
- Create and send SOL transfers from the connected wallet
- Generate and accept Solana Pay QR payments and validate incoming transfers
- Persist transaction history locally with a safe localStorage wrapper

Repository layout
- `frontend/` — Next.js app and entrypoint
   - `components/` — UI components (modals, transaction list, QR modal)
   - `hooks/` — Core application logic (transaction flows, local storage hook)
   - `functions/` — Small utilities (avatar generator, string helpers)

Prerequisites
- Node.js 16+ (LTS recommended)
- Yarn (or npm)
- A browser with Phantom Wallet extension installed for testing (or another injected Solana wallet)

Install
1. Clone the repository
2. Install dependencies for the frontend:

```powershell
cd frontend
yarn install
```

Run (development)

```powershell
cd frontend
yarn dev
```

Open http://localhost:3000 in a browser with Phantom installed. Use the header UI to connect a wallet.

Configuration & environment
- This project is client-first: wallet adapters initialize only in the browser. There are no server-side secrets or keys included.
- If you need to point to a different Solana cluster (devnet/testnet/mainnet), look for cluster config in the hook that builds transactions and change the network/endpoint accordingly.

Common troubleshooting
- Wallet not detected: verify Phantom is installed and enabled; check `window.solana` in console.
- WalletNotSelectedError: ensure a wallet is connected and unlocked before initiating a transaction.
- `yarn dev` issues after fresh clone: remove `node_modules` and re-run `yarn install`. Verify Node.js version.

How to extend
- Add unit tests for the `useCashApp` hook (Jest + React Testing Library)
- Add CI (GitHub Actions) to run lint and build checks on PRs
- Add E2E tests (Cypress/Playwright) to cover wallet connection and transaction flows

Contributing
- Issues and pull requests are welcome. Describe the change and provide steps to reproduce bugs.

License
- MIT

Contact
- Open an issue if you need help or want a walkthrough of the code.

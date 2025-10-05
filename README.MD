# cashapp-solana

Cashapp-Solana is a small demo app that demonstrates integrating Solana wallets (Phantom) into a React/Next.js frontend. It provides a minimal UI to connect a Phantom wallet, create and view simple transactions (for demo purposes), and shows how to wire up the Solana wallet adapter ecosystem in a client-side React app.

Features
- Connect to Phantom wallet (via the browser extension)
- Demonstrates `@solana/wallet-adapter-react` + `@solana/wallet-adapter-react-ui` usage
- Simple transactions list and UI components to show connected wallet state

Prerequisites
- Node.js 16+ (LTS recommended)
- Yarn (or npm)
- Phantom Wallet browser extension installed (or another Solana-compatible injected wallet)

Installation
1. Clone the repository (or use the provided code)
2. From the project root run:

	yarn install

Running locally
- Start the development server from the `frontend/` folder (this project uses a Next.js frontend):

	cd frontend
	yarn dev

Notes & troubleshooting
- Phantom is a browser extension that injects `window.solana`. Only test wallet connection in a real browser (localhost or over HTTPS). The app will not detect Phantom if you open the page in a non-browser environment.
- If the wallet is not detected, open the browser console and check for `window.solana` and `window.solana.isPhantom`.
- If `yarn dev` fails, ensure dependencies are installed and Node.js version matches the project's engines.

Contributing
- This repository is a demo; contributions and improvements are welcome. Open issues or PRs with clear descriptions.

License
- MIT

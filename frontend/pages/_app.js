import dynamic from 'next/dynamic'
import Head from 'next/head'
import '../styles/globals.css'
import '@solana/wallet-adapter-react-ui/styles.css';
const WalletProvider = dynamic(() => import('../context/WalletConnectionProvider'), { ssr: false });

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <title>Cash App</title>
            </Head>
            <WalletProvider>
                <Component {...pageProps} />
            </WalletProvider>
        </>
    )
}

export default MyApp

import {ConnectionProvider,WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import React, {useMemo} from 'react';

const WalletConnectionProvider = ({children})=>{
    const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', []);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default WalletConnectionProvider;
import { useState, useEffect } from 'react'
import Action from '../components/header/Action'
import NavMenu from '../components/header/NavMenu'
import Profile from '../components/header/Profile'
import SearchBar from '../components/home/SearchBar'
import NewTransactionModal from '../components/transaction/NewTransactionModal'
import TransactionsList from '../components/transaction/TransactionsList'
import { useWallet } from '@solana/wallet-adapter-react'
import TransactionQRModal from '../components/transaction/TransactionQRModal'
// import { transactions } from '../data/transactions'
import { getAvatarUrl } from "../functions/getAvatarUrl"
import {useCashApp} from '../hooks/cashapp'


const Home = () => {
    const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false)
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)
    
    
    const { connected, publicKey ,avatar ,userAddress,transactions} = useCashApp();

    return (
        <div className="flex min-h-screen ">
            <header className="flex w-[250px] flex-col bg-[#0bb534] p-12">
                <Profile setModalOpen={setTransactionQRModalOpen} avatar={avatar} userAddress={userAddress} />
                <TransactionQRModal modalOpen={transactionQRModalOpen} setModalOpen={setTransactionQRModalOpen} userAddress={userAddress} myKey={publicKey} />

                <NavMenu connected={connected} myKey={publicKey} />

                <Action setModalOpen={setNewTransactionModalOpen} />
                <NewTransactionModal modalOpen={newTransactionModalOpen} setModalOpen={setNewTransactionModalOpen} />
            </header>

            <main className="flex flex-1 flex-col">
                <SearchBar />

                <TransactionsList connected={connected} transactions={transactions} />
            </main>
        </div>
    )
}

export default Home

import { useState,useEffect } from "react";
import { getAvatarUrl } from "../functions/getAvatarUrl";
import{WalletAdapterNetwork} from'@solana/wallet-adapter-base';
import { useConnection,useWallet } from "@solana/wallet-adapter-react";
import {clusterApiUrl,Connection,Keypair,LAMPORTS_PER_SOL,PublicKey,SystemProgram,Transaction} from'@solana/web3.js';
import Bignumber from "bignumber.js";
import { tr } from "date-fns/locale";

export  const useCashApp = () => {
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    const [avatar, setAvatar] = useState("")
    const[amount,setAmount]=useState(0);
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)
    const [receiver, setReceiver] = useState('')
    const [transactionPurpose, setTransactionPurpose] = useState('')
    const {connected,  publicKey, sendTransaction} = useWallet();
    const {connection} = useConnection();

    // ...existing code...
    const useLocalStorage=(storageKey,fallbackState)=>{
        const [value,setValue]=useState(() => {
            try {
                if (typeof window === 'undefined') return fallbackState;
                const raw = window.localStorage.getItem(storageKey);
                return raw ? JSON.parse(raw) : fallbackState;
            } catch {
                return fallbackState;
            }
        });
        useEffect(() => {
            try {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(storageKey,JSON.stringify(value));
                }
            } catch {}
        },[storageKey,value]);
        return [value,setValue];
    }
 // ...existing code...
    const [transactions,setTransactions]=useLocalStorage("transactions",[]);

    // Get Avatar based on the userAddress
    useEffect(() => {
        if (connected){
            setAvatar(getAvatarUrl(publicKey.toString()))
            setUserAddress(publicKey.toString())
        }
    },[connected])

    const makeTransaction = async(fromWallet,toWallet,amount,reference) => {
        const network=WalletAdapterNetwork.Devnet;
        const endpoint=clusterApiUrl(network);
        const connection=new Connection(endpoint);
        
        const {blockhash} = await connection.getLatestBlockhash('finalized');
        const transaction = new Transaction({
            recentBlockhash:blockhash,
            feePayer:fromWallet
        });
    
//Create transfer instruction to send SOL from owner to receiver
        const transferInstruction=SystemProgram.transfer({
            fromPubkey:fromWallet,
            lamports:amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubkey:toWallet,
        });
        transferInstruction.keys.push({pubkey:reference,isSigner:false,isWritable:false});
        transaction.add(transferInstruction);

        return transaction;
    }

    //Create the function to RUN the transaction
    const doTransaction = async({amount,receiver,transactionPurpose}) => {
        const fromWallet=publicKey;
        const toWallet=new PublicKey(receiver);
        const bnAmount=new Bignumber(amount);
        const reference=Keypair.generate().publicKey;

        const transaction=await makeTransaction(fromWallet,toWallet,bnAmount,reference);
        
        const txnHash=await sendTransaction(transaction,connection);
        console.log("Transaction Hash:",txnHash);

        //Create Transaction History in the backend
        const newID=(transactions.length+1).toString()
        const newTransaction={
            id:newID,
            from:{
                name:publicKey,
                handle:publicKey,
                avatar:true,
                verified:true
            },
            to:{
                name:receiver,
                handle:'-',
                avatar:getAvatarUrl(receiver.toString()),
                verified:false
            },
            description:transactionPurpose,
            transactionDate:new Date(),
            status:'Completed',
            amount:amount,
            source:'-',
            identifier:'-'
        };
        setNewTransactionModalOpen(false)
        setTransactions([newTransaction,...transactions]);//Add the new transaction to the old transactions
        
    
    }

    return { connected,
         publicKey ,
         avatar,
         userAddress ,
         doTransaction, 
         amount,
         setAmount,
         receiver,
         setReceiver,
         transactionPurpose,
         setTransactionPurpose,
         transactions,
         setTransactions,
         setNewTransactionModalOpen,
         newTransactionModalOpen};
    }
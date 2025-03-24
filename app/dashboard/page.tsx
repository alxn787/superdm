"use client";

import { SidebarDemo } from '@/components/sidebardemo';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { get } from 'http';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Dashboard() {
       const [user, setUser] = useState<{ publicKey: string; PublicKey: number;  } | null>();
    const { wallets, connected, wallet } = useWallet();
    useEffect(() => {
        if(!connected){
            redirect('/');
        }
        getUserFromDb();

    },[connected])

    async function getUserFromDb() {
            try {
              const res = await axios.post("/api/user", {
                publicKey: wallet?.adapter.publicKey?.toString(),
              });
              const user = JSON.parse(res.data);
              console.log(res.data);
              setUser(user);
            } catch (error) {
              console.error("Error fetching user:", error);
            }
        }
    const WalletMultiButtonDynamic = dynamic(
      async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
      { ssr: false }
    );

    useEffect(() => {
        if(!connected){
            redirect('/');
        }
    },[connected])
    return (
        <div className=" h-screen"> Dashboard {wallet?.adapter.publicKey?.toString()} {JSON.stringify(user?.publicKey)}</div>
    );
}
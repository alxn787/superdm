"use client";

import { SidebarDemo } from '@/components/sidebardemo';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {

    const { wallets, connected, wallet } = useWallet();

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
     <SidebarDemo/>
    );
}
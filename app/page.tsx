'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from 'next/dynamic'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Landing from "@/components/Landing";



export default function Home() {
 const { wallets, connected } = useWallet();
  useEffect(() => {
    if(connected){
      redirect('/dashboard');
    }
  },[connected])

  return (

    <BackgroundBeamsWithCollision>
          <Landing/>
    </BackgroundBeamsWithCollision>

  );
}

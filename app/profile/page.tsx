'use client';
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { redirect } from "next/navigation";

export default function Profile(user: any) {
  const { wallet, connected} = useWallet();
  useEffect(() => {
    if(!connected){
      redirect('/');
    }
  },[connected])

  return (
    <div>
        Profile
    </div>
  )
}
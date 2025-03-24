'use client';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Landing from "@/components/Landing";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export default function Home() {
  const wallet = useWallet();
  return (

    <BackgroundBeamsWithCollision>
          <Landing/>
    </BackgroundBeamsWithCollision>


  );
}

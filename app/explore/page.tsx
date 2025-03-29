'use client';
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { redirect } from "next/navigation";
import { CreatorCard } from "@/components/CreatorCard";
import axios from "axios";

export default function Explore (){

    interface Creator {
    name: string;
    publicKey: string;
    profileImage: string;
    email: string;
    bio: string;
    id: string;
    userId: string;
  }
  const[Creators, setCreators] = useState<Creator[]>([]);
  const { wallet, connected} = useWallet();
  const [user, setUser] = useState<{ id: string; PublicKey: string } | null>(null);

      useEffect(() => {
          if(!connected){
              redirect('/');
          }
          getuserFromDb();
          getCreatorsFromDb();
      },[connected])

      async function getuserFromDb() {
        try {
          const res = await axios.post("/api/user", {
            publicKey: wallet?.adapter.publicKey?.toString(),
          });
          const user = res.data
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      async function getCreatorsFromDb() {
        const res = await axios.get(`/api/allcreators`);
        setCreators(res.data);
        console.log(res.data);
      }
    return (
        <div>
          <div className="font-bold text-center text-2xl mb-8">
            Find your Favorite Creators 
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {Creators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </div>
        </div>
      );
      
}
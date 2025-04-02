'use client';
/*eslint-disable*/
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { redirect } from "next/navigation";
import { CreatorCard } from "@/components/CreatorCard";
import axios from "axios";
import { SearchIcon } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");

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

      const filteredcreators = Creators.filter((creator) => creator.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col justify-start items-center gap-2">
           <div className="flex justify-start items-center bg-[#FF4D4D] rounded-full w-full max-w-2xl px-5 mt-2 mb-6">
              <SearchIcon className="text-white"/>
              <textarea
              placeholder="Search Creators"
              className="bg-[#FF4D4D] text-white placeholder-white outline-none text-base sm:text-lg resize-none overflow-auto break-words rounded-full text-center px-3 w-full max-w-xl size-9 mt-2 "
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
         
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {filteredcreators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </div>
        </div> 
      );
      
}
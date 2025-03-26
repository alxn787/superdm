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
  const { connected} = useWallet();
  const[Creators, setCreators] = useState<Creator[]>([]);

      useEffect(() => {
          if(!connected){
              redirect('/');
          }
          getCreatorsFromDb();
      },[connected])

      async function getCreatorsFromDb() {
        const res = await axios.get(`/api/allcreators`);
        setCreators(res.data);
        console.log(res.data);
      }

    const creators = [
        {
            name: "Author Name 1",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author descriptionjhbd",
            id: "fjdhbjdbvkdfbkvbdfkj",
        },
        {
            name: "Author Name 2",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkvbdfkj",
        },
        {
            name: "Author Name 3",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "httpwesdvcejkrve",
        },  
         {
            name: "Author Name 4",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkfvdfvbdfkj",
        },
        {
            name: "Author Name 5",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfhnhhbkvbdfkj",
        },
        {
            name: "Author Name 6",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkdfdfgdvbdfkj",
        },
         {
            name: "Author Name 7",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",  
            id: "fjdhbjdbvkdfhfnhnugbkvbdfkj",
        },
    ];
    return (
        <div>
          <div className="font-bold text-center text-2xl mb-8">
            Find your Favorite Creators 
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Creators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </div>
        </div>
      );
      
}
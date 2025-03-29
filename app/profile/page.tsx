"use client";
import GradientCard from "@/components/DetailsCard";
import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Profile() {
    const [creatorProfile, setCreatorProfile] = useState<{ id: string; userId: string; name: string; publicKey: string; email: string; bio: string; profileImage: string; superCost: string; } | null>(null);
    const { connected, wallet } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/"); 
        } else {
           getUserFromDb();
        }
    }, [connected]);
    async function getUserFromDb() {
        try {
            const res = await axios.post("/api/getcreator", {
                publicKey: wallet?.adapter.publicKey?.toString(),
            });
            const creator = res.data;
            setCreatorProfile(creator);
            console.log(creator);
        } catch (error) {
            console.error("Error fetching creator:", error);
        }
    }

    return (
        <div className="h-screen flex justify-center">
            {wallet ? (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    <div className="flex justify-center mb-5">
                        <ProfileCard creator={creatorProfile?.profileImage || "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"} />
                    </div>

                    {creatorProfile?.name? <h1 className="text-2xl font-bold">{creatorProfile?.name}</h1> : <h1 className="text-2xl font-bold">Anonymous</h1>}
                    <div className="font-semibold text-2xl mb-6 text-center w-full">
                        
                    </div>

                    {creatorProfile?.bio? <div>{creatorProfile?.bio}</div> : <div className="border border-neutral-800 rounded-xl cursor-pointer p-3 hover:bg-white/10" onClick={()=>{router.push("/creator")}}>Become a creator</div>}
                    <div className="text-white/70 text-sm sm:text-md md:text-lg font-medium mb-10 break-words text-center max-w-3xl w-full px-4">
                    </div>

                    <div className=" grid grid-cols-1 lg:grid-cols-2 max-w-2xl gap-10">
                    <GradientCard title1="Total Earnings" title2="69"/>
                    <GradientCard title1="SuperDms recieved" title2="69"/>
                    <GradientCard title1="SuperDms sent" title2="69"/>
                    <GradientCard title1="Biggest SuperFan" title2="69"/>
                    </div>
            </div>
                
            ) : (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    <div className="flex justify-center mb-5">
                        <div className="h-24 w-24 rounded-full= bg-gray-800 animate-pulse"></div>
                    </div>
                    <div className="h-6 w-48 bg-gray-800 animate-pulse rounded mb-6"></div>
        
                    <div className="h-4 w-3/4 bg-gray-800 animate-pulse rounded mb-10"></div>
                    <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-3xl flex flex-col items-center">
                        <div className="h-6 w-40 bg-gray-800 animate-pulse rounded mb-4"></div>
        
                        <div className="border border-neutral-600 bg-neutral-900 rounded-lg flex flex-col items-center w-full p-4">
                            <div className="h-20 w-full bg-gray-800 animate-pulse rounded-lg mb-4"></div>
                            <div className="h-10 w-24 bg-gray-800 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

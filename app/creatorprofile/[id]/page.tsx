"use client";

import Profile from "@/app/profile/page";
import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatorProfile() {
    const [creator, setCreator] = useState<{id: string; userId:string; name:string; publicKey:string; email:string; bio:string; profileImage:string; }>();
    const { connected } = useWallet();
    const router = useRouter();
    const params = useParams(); 
    const creatorName = params?.id as string; 

    useEffect(() => {
        // if (!connected) {
        //     router.push("/");
        // } else {
            getCreatorFromDb();
        }
    , []); 

         async function getCreatorFromDb() {
            const res = await axios.post(`/api/creator`, {
                name: creatorName,
            });
            const creator = res.data;
            setCreator(creator);
        }

    return (
        <div className="h-screen flex justify-center">
            {creator ? (
                <div className="flex justify-center p-4">
                    <ProfileCard creator={creator.profileImage}/>
                    <div>{creator.name}</div>
                </div>
                
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="flex gap-2">
                            {[...new Array(4)].map((_, idx) => (
                                <div
                                    key={`first-array-demo-1${idx}`}
                                    className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                                ></div>
                            ))}
                        </div>
                        <div className="flex flex-1 gap-2">
                            {[...new Array(2)].map((_, idx) => (
                                <div
                                    key={`second-array-demo-1${idx}`}
                                    className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

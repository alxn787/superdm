"use client";
import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Profile() {
    const [user, setUser] = useState<{ id: string; PublicKey: string; creatorProfile: { id: string; userId: string; name: string; publicKey: string; email: string; bio: string; profileImage: string; } } | null>(null);
    const { connected, wallet } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/"); 
        } else {
           // getUserFromDb();
        }
    }, [connected]);

    async function getUserFromDb() {
        try {
            const res = await axios.post("/api/user", {
                publicKey: wallet?.adapter.publicKey?.toString(),
            });
            const user = JSON.parse(res.data); // ✅ Parse JSON string
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    const WalletMultiButtonDynamic = dynamic(
        async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    return (
        <div className="h-screen flex justify-center">
            {wallet ? (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    {/* Profile Image */}
                    <div className="flex justify-center mb-5">
                        <ProfileCard creator={ "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"} />
                    </div>

                    {user?.creatorProfile.name? <h1 className="text-2xl font-bold">{user?.creatorProfile.name}</h1> : <h1 className="text-2xl font-bold">Anonymous</h1>}
                    <div className="font-semibold text-2xl mb-6 text-center w-full">
                        
                    </div>

                    {user?.creatorProfile.bio? <div>{user?.creatorProfile.bio}</div> : <div>Become a creator</div>}
                    <div className="text-white/70 text-sm sm:text-md md:text-lg font-medium mb-10 break-words text-center max-w-3xl w-full px-4">
                        </div>
            </div>
                
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="flex gap-2">
                            {[...new Array(4)].map((_, idx) => (
                                <div
                                    key={"first-array-demo-1" + idx}
                                    className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                                ></div>
                            ))}
                        </div>
                        <div className="flex flex-1 gap-2">
                            {[...new Array(2)].map((_, idx) => (
                                <div
                                    key={"second-array-demo-1" + idx}
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

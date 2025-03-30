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
    const [messages, setMessages] = useState<{ id: string; senderId: string; recieverId: string; message: string; }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Your SuperDms"); 
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/"); 
        } else {
           getUserFromDb();
        }
    }, [connected, router]);

    async function getmessages(type: "received" | "sent") {
        if (!creatorProfile?.id) return;

        try {
            const res = await axios.post(`/api/getmessages`, {
                creatorId: creatorProfile?.id,
            });

            if (type === "received") {
                setMessages(res.data.receivedMessages);
                setModalTitle("Your Received SuperDms");
            } else {
                setMessages(res.data.sentMessages);
                setModalTitle("Your Sent SuperDms");
            }

            setIsOpen(true); 
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

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

                    {creatorProfile?.name ? <h1 className="text-2xl font-bold">{creatorProfile?.name}</h1> : <h1 className="text-2xl font-bold">Anonymous</h1>}
                    <div className="font-semibold text-2xl mb-6 text-center w-full"></div>

                    {creatorProfile?.bio ? <div>{creatorProfile?.bio}</div> : <div className="border border-neutral-800 rounded-xl cursor-pointer p-3 hover:bg-white/10" onClick={() => { router.push("/creator") }}>Become a creator</div>}
                    
                    <div className="text-white/70 text-sm sm:text-md md:text-lg font-medium mb-10 break-words text-center max-w-3xl w-full px-4"></div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-2xl gap-10">
                        <GradientCard title1="Total Earnings" title2="69" />
                        <GradientCard title1="SuperDms received" title2="69" onClick={() => getmessages("received")} />
                        <GradientCard title1="SuperDms sent" title2="69" onClick={() => getmessages("sent")} />
                        <GradientCard title1="Biggest SuperFan" title2="69"  />
                    </div>

                    {/* Modal - Opens when isOpen is true */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[999] flex items-center justify-center">
                            <div className="relative bg-black bg-opacity-90 w-full max-w-2xl 
                                        flex flex-col items-center justify-start rounded-lg p-4 text-center 
                                        overflow-y-auto max-h-[500px] z-[1000] shadow-xl ml-32 border border-[#FF4D4D] border-opacity-30">
                                
                                {/* Close Button */}
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="absolute top-4 right-4 text-white/70 hover:text-white bg-neutral-800 hover:bg-[#FF4D4D]
                                            p-2 rounded-full w-8 h-8 transition duration-300 flex justify-center items-center"
                                >
                                    ✕
                                </button>

                                <div className="text-lg font-semibold text-white/70 mb-4">
                                    {modalTitle}
                                </div>
                                
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div key={index} className="flex flex-col items-center w-full max-w-3xl h-full overflow-y-auto">                            
                                            <div className="text-xl font-semibold bg-gradient-to-r from-neutral-900 via-black through-black to-neutral-900 text-white/100
                                                w-full h-24 mb-2 rounded-xl flex items-center justify-center">
                                                {message.message}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white/50 text-lg">No messages found.</div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    <div className="flex justify-center mb-5">
                        <div className="h-24 w-24 rounded-full bg-gray-800 animate-pulse"></div>
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

"use client";

import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Connection, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";


export default function CreatorProfile() {
    const [creator, setCreator] = useState<{ id: string; userId: string; name: string; publicKey: string; email: string; bio: string; profileImage: string; }>();
    const [message, setMessage] = useState("");

    const params = useParams();
    const creatorName = params?.id as string;
    const wallet = useWallet();

    useEffect(() => {
        getCreatorFromDb();
    }, []);

    async function getCreatorFromDb() {
        const res = await axios.post(`/api/creator`, { name: creatorName });
        setCreator(res.data);
    }

    async function sendTransaction() {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!creator?.publicKey) {
            alert("Creator's public key is missing!");
            return;
        }

        try {
            const connection = new Connection("https://api.devnet.solana.com");

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey('FP4mUAwWEGbp7A45LULzxcWF2usBw7SeUj2L4M1SYiub'),
                    lamports: 0.01 * LAMPORTS_PER_SOL, // 0.1 SOL
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            console.log("Transaction Signature:", signature);

            alert(`Transaction successful! Signature: ${signature}`);


            await sendMessage(signature);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Please try again.");
        }
    }
    async function sendMessage(txSignature: string) {
        try {
            console.log("🔍 Sending data to /api/send:", {
                email: creator?.email,
                name: creator?.name,
                message: message,
                transactionSignature: txSignature,
            });
    
            const res = await axios.post(`/api/send`, {
                email: creator?.email,
                name: creator?.name,
                message: message,
                transactionSignature: txSignature,
            });
    
            console.log("✅ Response from /api/send:", res.data);
            alert("Message sent successfully!");
        } catch (error) {
            console.error("❌ Failed to send message:", error);
            alert("Failed to send message. Please try again.");
        }
    }
    

    return (
        <div className="h-screen flex justify-center px-4">
                {creator ? (
        <div className="flex flex-col items-center w-full max-w-3xl">
            {/* Profile Image */}
            <div className="flex justify-center mb-5">
                <ProfileCard creator={creator.profileImage || "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"} />
            </div>

            {/* Name */}
            <div className="font-semibold text-2xl mb-6 text-center w-full">
                {creator.name}
            </div>

            {/* Bio */}
            <div className="text-white/70 text-sm sm:text-md md:text-lg font-medium mb-10 break-words text-center max-w-3xl w-full px-4">
                {creator.bio}
            </div>

            {/* Super DM Box */}
            <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-3xl flex flex-col items-center">
                <div className="text-lg sm:text-xl font-semibold mb-4 text-center">
                    <span className="text-white/70">Super</span>
                    <span className="text-[#FF4D4D]"> DM</span>
                    <span className="text-white/70"> {creator.name}</span>
                </div>

                <div className="border border-neutral-600 bg-neutral-900 rounded-lg flex flex-col items-center w-full p-4">
                    <textarea 
                        className="w-full bg-neutral-900 text-white/70 placeholder-neutral-500 outline-none text-base sm:text-md resize-none overflow-auto break-words rounded-lg text-center py-3 px-4"
                        placeholder="Type your message..."
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                    className="mt-4 px-6 py-2 bg-[#4f46e5] hover:bg-[#4f46e5]/70 text-white rounded-lg w-full sm:w-auto"
                    onClick={()=>sendTransaction()}
                    >
                        Send
                    </button>
                </div>
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

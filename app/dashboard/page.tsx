"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const [user, setUser] = useState<{ id: string; PublicKey: string } | null>(null);
    const { connected, wallet } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/"); // ✅ Correct way to redirect in client-side code
        } else {
            getUserFromDb();
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
        <div className="h-screen flex">
            {user ? (
                <div className="flex-1 p-4">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p>Wallet Address: {wallet?.adapter.publicKey?.toString()}</p>
                    <p>User PublicKey: {JSON.stringify(user?.PublicKey)}</p>
                    <p>User ID: {JSON.stringify(user?.id)}</p>
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

import { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import Profile from "@/app/profile/page";
import Explore from "@/app/explore/page";

export const DashboardComponent = ({ selectedPage }: { selectedPage: string }) => {
  const [user, setUser] = useState(null);
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.publicKey) return; 

    const fetchUser = async () => {
      try {
        const response = await axios.post("/api/user", {
          publicKey: wallet.publicKey?.toString(),
        });

        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [wallet.publicKey]);

  const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <div className="h-full w-full gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-auto">
      <div className="flex justify-between">
        <div className="text-white">
          {user ? `Hello ${user || "User"}` : "Connecting..."}
        </div>
        <div className="relative z-50">
          <WalletMultiButtonDynamic />
        </div>
      </div>
      
      {/* Conditionally render content based on selectedPage */}
      <div className="mt-6">
        {selectedPage === "explore" && <Explore />}
        {selectedPage === "profile" && <Profile user={user} />}
      </div>
    </div>
  );
};

import dynamic from 'next/dynamic';
import { Button } from './moving-border';
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Mail, Wallet2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Landing() {
    const { connected } = useWallet();
    const router = useRouter();
  
    useEffect(() => {
      if (connected) {
        router.push('/explore');
      }
    }, [connected, router]);
  
    const WalletMultiButtonDynamic = dynamic(
      async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
      { ssr: false }
    );
  
    return (
        <div className="flex flex-col items-center justify-start h-screen w-full max-w-screen-lg px-4 mx-auto overflow-y-auto">
          {/* Main Content */}
          <div className="flex flex-col items-center flex-grow w-full">
            <div className="h-16"></div>
            <motion.div 
            className="flex justify-center text-center"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mr-2">Super</h1>
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#FF4D4D]">DM</h1>
            </motion.div>
      
            <motion.div 
            className="flex flex-col items-center justify-center mt-4 mb-6"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut" }}
            >
              <h1 className="text-base md:text-lg text-white/70 text-center">
                Secure, fast, and next-gen Superchats on Solana!
              </h1>
              <h1 className="text-base md:text-lg mt-1 text-white/70 text-center">
                Super DM your favorite creators instantly
              </h1>
            </motion.div>
      
            <WalletMultiButtonDynamic />
      
            <div className="h-6"></div>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4 w-full justify-center items-center  text-center place-items-center">
                <motion.div
                initial = {{ scale: 0.8, opacity: 0 }}
                animate = {{ scale: 1, opacity: 1 }}
                transition = {{ duration: 0.5, ease:'easeInOut'}}
                >
                    <Button className="bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm p-6 flex flex-col items-center text-center h-full">
                        <img src="/solana.svg" alt="logo" className="w-8 h-8 rounded-full mb-3" />
                        <div className="text-white font-bold text-lg">Secure and Fast</div>
                        <div className="text-white/60 text-sm mt-1 text-center">
                        Built on Solana. Low fees, and top-tier security.
                        </div>
                    </Button>    
                </motion.div>

              <motion.div
                initial = {{ scale: 0.8, opacity: 0 }}
                animate = {{ scale: 1, opacity: 1 }}
                transition = {{ duration: 0.7, ease:'easeInOut', delay:0.3}}
                >      
                    <Button className="bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm p-6 flex flex-col items-center text-center h-full">
                        <Wallet2Icon className="w-8 h-8 mb-3" />
                        <div className="text-white font-bold text-lg">SuperDM Creators</div>
                        <div className="text-white/60 text-sm mt-1 text-center">
                        Sign in with your Solana wallet, send creators a SuperDM. Or become a creator yourself!
                        </div>
                    </Button>
                </motion.div>
      

              <motion.div
                initial = {{ scale: 0.8, opacity: 0 }}
                animate = {{ scale: 1, opacity: 1 }}
                transition = {{ duration: 0.5, ease:'easeInOut', delay:0.6}}
                >
                    <Button className="bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm p-6 flex flex-col items-center text-center h-full">
                        <Mail className="w-8 h-8 mb-3" />
                        <div className="text-white font-bold text-lg">Instant Creator Notifications</div>
                        <div className="text-white/60 text-sm mt-1 text-center">
                        Notifications in the app and email alerts, ensuring your SuperDM gets noticed.
                        </div>
                    </Button>       
                </motion.div>
      
            </div>
          </div>
      
          {/* Footer */}
          <footer className="w-full py-4 flex justify-center bg-transparent mb-6">
            <a href="https://x.com/Alxn787" target="_blank" className="text-white/60 text-sm">
              <div className="flex items-center">
                <span>Built by alxn787</span>
              </div>
            </a>
          </footer>
        </div>
      );
      
  }
  
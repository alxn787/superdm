import dynamic from 'next/dynamic';
import { Button } from './moving-border';
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";



export default function Landing() {

     const { connected } = useWallet();
     const router = useRouter();

      useEffect(() => {
        if(connected){
            router.push('/profile');
        }
      },[connected])


     const WalletMultiButtonDynamic = dynamic(
      async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
      { ssr: false }
    );
  return (
    <div className="flex flex-col items-center  h-screen max-w-[1024px]">
        <div className='h-24'></div>
        <div className='flex justify-center'>
            <h1 className='text-6xl font-extrabold mr-2 '>Super</h1>
            <h1 className='text-6xl font-extrabold text-[#FF4D4D]'> DM</h1>
        </div>

        <div className='flex flex-col items-center justify-center mt-6 mb-6'>
          <h1 className='text-lg text-white/70'>Secure, fast, and next-gen Superchats on Solana!</h1>
          <h1 className='text-lg mt-1 text-white/70'>Super DM your favorite creators instantly</h1>
        </div>

      <div>
      <WalletMultiButtonDynamic/>
      </div>
      <div className='h-8'></div>
        <div className='flex justify-between'>

            <div className='m-4'>
                <Button className='bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm '>
                    <div>
                        <div>
                            Hello there
                        </div>
                        <div>
                            Poda pulle
                        </div>
                    
                    </div>
                </Button>
            </div>
            <div className='m-4'>
                <Button className='bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm '>
                    <div>
                        <div>
                            Hello there
                        </div>
                        <div>
                            Poda pulle
                        </div>
                    
                    </div>
                </Button>
            </div>
            <div className='m-4'>
                <Button className='bg-black hover:bg-gradient-to-b from-black via-black to-cyan-400/20 rounded-sm '>
                    <div>
                        <div>
                            Hello there
                        </div>
                        <div>
                            Poda pulle
                        </div>
                    
                    </div>
                </Button>
            </div>
            

        </div>
    </div>
  );
}
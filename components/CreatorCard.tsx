"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CreatorCard({
  creator
}: {
  creator:  {
    name: string;
    publicKey: string;
    profileImage: string;
    email: string;
    bio: string;
    id: string;
    userId: string;
  };
})
 {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/creatorprofile/${creator.name}`);
  };
  return (
    <div className=" group/card m-1" onClick={()=>{handleClick()}}>
      <div
        className={cn(
          "relative mx-auto flex h-[280px] w-[280px] max-w-sm flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl cursor-pointer bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${creator.profileImage})` }} 
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/80 opacity-60 transition duration-300 group-hover/card:bg-black/5"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-white md:text-2xl">
            {creator.name}
          </div>
          <div className="my-2 text-sm font-normal text-white">
            {creator.bio}
          </div>
        </div>
      </div>
    </div>
  );
}


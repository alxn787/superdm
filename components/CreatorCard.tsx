"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CreatorCard({
  creator,
}: {
  creator: { name: string; image: string; description: string; id: string };
})
 {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/message/${creator.id}`);
  };
  return (
    <div className="h-72 w-72 group/card m-1" onClick={()=>{handleClick()}}>
      <div
        className={cn(
          "relative mx-auto flex h-[300px] w-[300px] max-w-sm flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl cursor-pointer bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${creator.image})` }} // ✅ Inline style for dynamic bg image
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/40 opacity-60 transition duration-300 group-hover/card:bg-white/10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-gray-50/70 md:text-2xl">
            {creator.name}
          </div>
          <div className="my-4 text-sm font-normal text-gray-50/50">
            {creator.description}
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <div className="h-screen w-full">
    <BackgroundBeamsWithCollision className="h-screen">
          <Landing/>
    </BackgroundBeamsWithCollision>
    </div>
  );
}

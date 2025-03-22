import { BackgroundLines } from "@/components/ui/background-lines";
import Image from "next/image";

export default function Home() {
  return (
    <BackgroundLines>
      <h1 className="bg-gradient-to-r from-slate-300 to-slate-600 bg-clip-text text-transparent text-4xl">Hello there</h1>
    </BackgroundLines>
  );
}

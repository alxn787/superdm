import { prisma } from "@/app/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { creatorId } = await req.json();

    try{
        const messages = await prisma.superchat.findMany({
            where: {
                receiverId: creatorId,
            },
        });
        console.log(messages);
        return new Response(JSON.stringify(messages), { status: 200 });
    }catch(error){
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
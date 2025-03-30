import { prisma } from "@/app/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { creatorId } = await req.json();

    try {
        const receivedMessages = await prisma.superchat.findMany({
            where: { receiverId: creatorId },
        });
        const sentMessages = await prisma.superchat.findMany({
            where: { senderId: creatorId },
        });
        return new Response(
            JSON.stringify({ receivedMessages, sentMessages }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching messages:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch messages" }),
            { status: 500 }
        );
    }
}

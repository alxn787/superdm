import {prisma} from "@/app/db";

export async function POST(req: Request) {
    const { publicKey } = await req.json();
    const dbUser =  await prisma.user.findFirst({
        where: {
            publicKey: publicKey
        }
    });
    return new Response(JSON.stringify(dbUser));
    
}
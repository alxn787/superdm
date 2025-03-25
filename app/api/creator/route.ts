import {prisma} from "@/app/db";

export async function POST(req: Request) {
    const { name } = await req.json();
    console.log(name);
    const creator = await prisma.creatorProfile.findFirst({
        where: {
            name
        }
    });
    return new Response(JSON.stringify(creator));
    
}
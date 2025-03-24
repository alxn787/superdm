import { prisma } from "@/app/db";


export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey) {
      return Response.json({ error: "Missing publicKey" }, { status: 400 });
    }

    let dbUser = await prisma.user.findFirst({
      where: { publicKey },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: { publicKey },
      });
    }
    return Response.json(JSON.stringify(dbUser), { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

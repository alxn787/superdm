import prisma from "@/app/db";

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey) {
      return new Response(JSON.stringify({ error: "Missing publicKey" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Try to find an existing user
    let dbUser = await prisma.user.findUnique({
      where: { publicKey },
    });

    // If user does not exist, create a new one
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          publicKey,
          SuperCost: 10,
        },
      });
    }

    return new Response(JSON.stringify(dbUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Database error:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

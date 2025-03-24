import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return Response.json({ databaseUrl: process.env.DATABASE_URL });
  }
  
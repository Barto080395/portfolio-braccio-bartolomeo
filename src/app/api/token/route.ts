// app/api/get-owner-token/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Server-side: prendi token dalla variabile d'ambiente
  const token = process.env.NEXT_PUBLIC_OWNER_TOKEN;

  return NextResponse.json({ token });
}

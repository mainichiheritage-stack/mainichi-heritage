import { Logger } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const axiom = new Logger();

  try {
    const body = await req.json();

    axiom.info("Browser Log", { data: body });

    await axiom.flush();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Axiom endpoint error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}

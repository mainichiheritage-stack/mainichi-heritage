import { Logger } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const axiom = new Logger();

  try {
    const body = await req.json();

    const events = Array.isArray(body) ? body : [body];

    events.forEach((event) => {
      // logger.ts から送られたログレベルを抽出
      const rawLevel = event.level || event._level;
      const level = (rawLevel || "info") as "info" | "warn" | "error" | "debug";

      // メッセージの抽出
      const logMessage =
        typeof event.message === "string" ? event.message : "Browser Log";

      // Axiomのメタデータとして送るコンテキストを作成
      const context = { ...event };
      delete context.level;
      delete context._level;
      delete context.message;

      if (typeof axiom[level] === "function") {
        axiom[level](logMessage, context);
      } else {
        axiom.info(logMessage, context);
      }
    });

    await axiom.flush();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Axiom dynamic logging error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}

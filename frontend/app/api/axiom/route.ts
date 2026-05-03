import { log } from "next-axiom";
import type { NextRequest } from "next/server";

interface AxiomLoggerWithHandler {
  handler: (req: NextRequest) => Promise<Response> | Response;
}

// as unknown を経由することで、ESLintの any チェックを回避しつつキャストします
export const POST = (log as unknown as AxiomLoggerWithHandler).handler;

export const runtime = "edge";

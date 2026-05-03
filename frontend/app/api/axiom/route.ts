import { AxiomRequest, withAxiom } from "next-axiom";

export const POST = withAxiom(async (req: AxiomRequest) => {
  await req.log.flush();
  return new Response(null, { status: 204 });
});

export const runtime = "edge";

import type { NextConfig } from "next";
import * as AxiomConfig from "next-axiom/dist/config";

type WithAxiomFn = (config: NextConfig) => NextConfig;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "publicdomainq.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.tomioka-silk.jp" },
      { protocol: "https", hostname: "**.lg.jp" },
      {
        protocol: "https",
        hostname: "gfycov7pwc6weila.public.blob.vercel-storage.com",
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.webpack = (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    return config;
  };
}

const axiomModule = AxiomConfig as unknown as Record<string, WithAxiomFn>;
const withAxiom = axiomModule.withAxiom;

// withAxiom が存在する場合のみ実行、そうでなければ nextConfig をそのまま返す
const finalConfig =
  typeof withAxiom === "function" ? withAxiom(nextConfig) : nextConfig;

export default finalConfig;

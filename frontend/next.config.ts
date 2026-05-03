import type { NextConfig } from "next";
import * as AxiomConfig from "next-axiom/dist/config";

type WithAxiomFn = (config: NextConfig) => NextConfig;

interface AxiomModule {
  withAxiom?: WithAxiomFn;
  default?: {
    withAxiom?: WithAxiomFn;
  };
}

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

  async rewrites() {
    return [
      {
        source: "/_axiom/logs/:path*",
        destination: "/api/axiom",
      },
    ];
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

const axiomModule = AxiomConfig as unknown as AxiomModule;

const withAxiom = axiomModule.withAxiom ?? axiomModule.default?.withAxiom;

const finalConfig =
  typeof withAxiom === "function" ? withAxiom(nextConfig) : nextConfig;

export default finalConfig;

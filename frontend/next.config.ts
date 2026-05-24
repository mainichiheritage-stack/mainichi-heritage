import type { NextConfig } from "next";
import * as AxiomConfig from "next-axiom/dist/config";

type WithAxiomFn = (config: NextConfig) => NextConfig;

interface AxiomModule {
  withAxiom?: WithAxiomFn;
  default?: {
    withAxiom?: WithAxiomFn;
  };
}

const getR2Hostname = () => {
  if (
    process.env.NEXT_PUBLIC_API_BASE_URL?.includes("stg") ||
    process.env.NODE_ENV === "development"
  ) {
    return "https://pub-11613cacfa20446fb4b7ab981c2e6006.r2.dev";
  }
  return "pub-prod-yyyyyyyyyyyy.r2.dev";
};

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "publicdomainq.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.tomioka-silk.jp" },
      { protocol: "https", hostname: "**.lg.jp" },
      {
        protocol: "https",
        hostname: getR2Hostname(),
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

const isCloudflareBuild = true;

const finalConfig =
  typeof withAxiom === "function" && !isCloudflareBuild
    ? withAxiom(nextConfig)
    : nextConfig;

export default finalConfig;

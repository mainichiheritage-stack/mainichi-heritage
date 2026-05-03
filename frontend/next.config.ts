import type { NextConfig } from "next";
import { withAxiom } from "next-axiom";

const nextConfig: NextConfig = {
  // 画像最適化の設定
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

// 開発環境（ローカル/Docker）のときだけ webpack プロパティを動的に追加
if (process.env.NODE_ENV === "development") {
  nextConfig.webpack = (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500, // 0.5秒ごとにファイルをチェック
        aggregateTimeout: 300, // 変更後300ms待ってから再ビルド
      };
    }
    return config;
  };
}

export default withAxiom(nextConfig, {
  logInDev: true,
});

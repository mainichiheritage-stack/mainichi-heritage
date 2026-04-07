import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化の設定
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'publicdomainq.net' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.tomioka-silk.jp' },
      { protocol: 'https', hostname: '**.lg.jp' },
    ],
  },

  // 既存のwebpack設定を「開発環境」のみに限定して適用
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      if (!isServer) {
        config.watchOptions = {
          poll: 500,
          aggregateTimeout: 300,
        };
      }
      return config;
    }
    
    // 本番環境（Vercel）ではカスタム設定を返さない
    return config;
  },
};

export default nextConfig;
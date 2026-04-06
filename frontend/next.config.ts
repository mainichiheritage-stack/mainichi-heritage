// frontend/next.config.ts
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
  
  // 既存のwebpack設定
  webpack: (config, { dev, isServer }) => {
    // 開発環境かつ、Docker環境でホットリロードを安定させるための設定
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500,         // 0.5秒ごとにファイルをチェック
        aggregateTimeout: 300, // 変更後300ms待ってから再ビルド
      };
    }
    return config;
  },
};

export default nextConfig;
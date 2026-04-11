import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "まいにち世界遺産",
    template: "%s | まいにち世界遺産",
  },
  description:
    "世界遺産検定の合格を目指すための勉強サービス。毎日手軽に世界遺産の知識と世界を広げましょう。",
  keywords: ["世界遺産検定", "世界遺産", "クイズ", "勉強アプリ"],
  icons: {
    icon: [
      { url: "/images/landmark.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }, // SVG非対応ブラウザ用のフォールバック
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "まいにち世界遺産",
  },
  openGraph: {
    title: "まいにち世界遺産",
    description: "世界遺産検定合格への最短ルート！クイズで楽しく学習。",
    url: "https://mainichi-heritage.vercel.app/",
    siteName: "まいにち世界遺産",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "まいにち世界遺産 | 世界遺産検定対策",
    description: "クイズと豊富な画像で世界遺産をマスターしよう！",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1, // アクセシビリティ（ズーム）を許可するため、基本は外す
  themeColor: "#ffffff", // ブラウザのヘッダー色を指定（Android/Safari）
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {" "}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  History,
  TrendingUp,
  Globe,
  GraduationCap,
  Newspaper,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import QuizSettingsModal from "@/components/QuizSettingsModal";
import { NotificationItem } from "./types";
import NotificationModal from "@/components/NotificationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const CATEGORY_MAP: { [key: number]: { label: string; color: string } } = {
    1: { label: "重要", color: "bg-red-500" },
    2: { label: "アップデート", color: "bg-blue-500" },
    3: { label: "世界遺産追加", color: "bg-emerald-500" },
    4: { label: "クイズ追加", color: "bg-yellow-500" },
    5: { label: "検定情報", color: "bg-red-500" },
    9: { label: "その他", color: "bg-slate-500" },
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/`,
        );
        const data = await response.json();
        setNotifications(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("お知らせの取得に失敗しました：", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ヒーローセクション */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 text-center px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 md:gap-3 mb-6 md:mb-8">
            {/* 文字サイズをスマホ向けに最適化 */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-800 drop-shadow-sm leading-tight">
              まいにち世界遺産
            </h1>
            <p className="text-base md:text-xl font-bold text-slate-500">
              ～昨日より、世界がもっと広くなる～
            </p>
          </div>
          <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-2">
            世界中の素晴らしい遺産を、もっと身近に。
            <br className="hidden md:block" />
            世界遺産検定合格に必要な知識を体系的に学び、
            <br className="hidden md:block" />
            クイズ形式で着実に定着させるための学習用アーカイブです。
          </p>
        </div>
      </section>

      {/* コンテンツエリア */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-4">
            <div className="flex items-center px-2">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                学習を始める
              </h2>
            </div>

            {/* 機能 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Link
                href="/about-exam"
                className="block active:scale-[0.98] transition-transform"
              >
                <FeatureCard
                  icon={<GraduationCap className="text-indigo-500" />}
                  title="世界遺産検定とは"
                  desc="検定の概要と対策方法"
                  iconBg="bg-indigo-100"
                />
              </Link>
              <Link
                href="/current-events"
                className="block active:scale-[0.98] transition-transform"
              >
                <FeatureCard
                  icon={<Newspaper className="text-orange-600" />}
                  title="時事問題"
                  desc="最新の委員会情報や世界遺産ニュース"
                  iconBg="bg-orange-100"
                />
              </Link>
              <Link
                href="/basic"
                className="block active:scale-[0.98] transition-transform"
              >
                <FeatureCard
                  icon={<Globe className="text-emerald-500" />}
                  title="基礎知識"
                  desc="世界遺産に関連する基礎知識を学ぶ"
                  iconBg="bg-emerald-100"
                />
              </Link>
              <Link
                href="/heritages"
                className="block active:scale-[0.98] transition-transform"
              >
                <FeatureCard
                  icon={<BookOpen className="text-blue-500" />}
                  title="世界遺産一覧"
                  desc="画像付きで世界遺産を学ぶ"
                  iconBg="bg-blue-100"
                />
              </Link>
              <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer active:scale-[0.98] transition-transform"
              >
                <FeatureCard
                  icon={<BrainCircuit className="text-green-500" />}
                  title="4択クイズ"
                  desc="世界遺産検定レベルの問題で、楽しく知識を定着"
                  iconBg="bg-green-100"
                />
              </div>
              <div className="active:scale-[0.98] transition-transform">
                <FeatureCard
                  icon={<History className="text-purple-500" />}
                  title="学習履歴"
                  desc="過去の結果を分析"
                  iconBg="bg-purple-100"
                  isAvailable={false}
                />
              </div>
              <div className="active:scale-[0.98] transition-transform">
                <FeatureCard
                  icon={<TrendingUp className="text-orange-500" />}
                  title="苦手分析"
                  desc="弱点を重点攻略"
                  iconBg="bg-orange-100"
                  isAvailable={false}
                />
              </div>
            </div>
          </div>

          {/* お知らせ */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="flex items-center justify-between px-2 pt-4 lg:pt-0">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                お知らせ
              </h2>
            </div>

            <div className="border border-slate-200 rounded-2xl bg-slate-50/50 overflow-hidden shadow-sm">
              <div className="max-h-[300px] lg:max-h-[450px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((item) => {
                    const config =
                      CATEGORY_MAP[item.category] || CATEGORY_MAP[9];
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedNotification(item)}
                        className="flex items-start gap-3 p-4 border-b border-slate-100 hover:bg-white active:bg-slate-100 transition-colors cursor-pointer group"
                      >
                        <div className="shrink-0 flex flex-col items-start gap-1">
                          <span
                            className={`${config.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm`}
                          >
                            {item.category_display}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 font-mono">
                            {new Date(item.published_at)
                              .toLocaleDateString("ja-JP")
                              .replace(/\//g, ".")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    現在お知らせはありません
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* todo：CTAセクション */}
      {/* <section className="m-8">
        <div className="bg-blue-600 rounded-2xl py-16 px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">今すぐ始めよう</h2>
          <p className="mb-8 opacity-90">無料でアカウントを作成して、学習を始めましょう</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition shadow-lg">
            無料で新規登録
          </button>
        </div>
      </section> */}

      <NotificationModal
        item={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />

      <QuizSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category="all"
      />
      <QuizSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category="all"
      />
    </div>
  );
}

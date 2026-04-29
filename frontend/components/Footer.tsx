"use client"; // useStateを使うため追加

import Link from "next/link";
import { Landmark } from "lucide-react";
import { useState } from "react";
import QuizSettingsModal from "./QuizSettingsModal";

const FOOTER_LINKS = {
  learning: [
    { label: "世界遺産検定とは", href: "/about-exam" },
    { label: "基礎知識", href: "/basic" },
    { label: "世界遺産一覧", href: "/heritages" },
  ],
  support: [
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "ライセンス・権利表記", href: "/license" },
    {
      label: "お問い合わせ",
      href: "https://forms.gle/nydMBWr1UyAXJZ3a6",
      external: true,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* ブランドエリア */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link
              href="/"
              className=" w-fit group flex items-center gap-2 transition hover:-translate-y-0.5"
            >
              <div className="bg-slate-800 p-1.5 rounded-lg transition-colors group-hover:bg-blue-600">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                まいにち世界遺産
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500">
              世界遺産検定の合格を目指す、すべての学習者のためのプラットフォーム。
              正しい知識を楽しく学び、世界の宝物を次世代へつなぐ一歩を。
            </p>
            <div className="inline-block px-2.5 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold rounded-md tracking-wider">
              UNOFFICIAL FAN PROJECT
            </div>
          </div>

          {/* 学習メニュー */}
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-sm">
              学習メニュー
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.learning.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  4択クイズ
                </button>
              </li>
            </ul>
          </div>

          {/* インフォメーション */}
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-sm">
              インフォメーション
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition-colors"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[11px] font-medium text-slate-400 tracking-wider">
            <p>© {currentYear} MAINICHI HERITAGE</p>
            <span className="hidden md:inline text-slate-200">|</span>
            <p>CREATED BY WORLD HERITAGE FAN PROJECT</p>
          </div>
        </div>
      </div>

      <QuizSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}

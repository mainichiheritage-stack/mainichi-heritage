"use client";

import Link from "next/link";
import {
  Landmark,
  Menu,
  X,
  BookOpen,
  Globe2,
  HelpCircle,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import QuizSettingsModal from "./QuizSettingsModal";

const NAV_ITEMS = [
  {
    label: "世界遺産検定とは",
    href: "/about-exam",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  { label: "基礎知識", href: "/basic", icon: <Globe2 className="w-5 h-5" /> },
  {
    label: "世界遺産一覧",
    href: "/heritages",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 relative">
          {/* ロゴエリア */}
          <Link
            href="/"
            className="group z-[60] flex items-center gap-2 transition hover:-translate-y-0.5"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="rounded-lg bg-slate-800 p-1.5 transition-colors group-hover:bg-blue-600">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              まいにち世界遺産
            </span>
          </Link>

          {/* --- PC用ナビゲーション --- */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-bold">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-slate-500 transition-colors hover:text-blue-600"
                >
                  4択クイズ
                </button>
              </li>
            </ul>
          </nav>

          {/* --- スマホ用メニューボタン --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[60] p-2 text-slate-600 md:hidden hover:bg-slate-50 rounded-full transition-all duration-300"
          >
            <div
              className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>

          {/* --- スマホ用ドロップダウンメニュー --- */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-900/5 md:hidden animate-in fade-in duration-300"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          <div
            className={`
            absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl md:hidden transition-all duration-300 ease-out
            ${isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
          `}
          >
            <nav className="flex flex-col p-2">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-slate-600 font-bold hover:bg-slate-50 active:bg-slate-100 transition-all
                    ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}
                  `}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl text-slate-600 font-bold hover:bg-slate-50 active:bg-slate-100 transition-all text-left
                  ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}
                `}
                style={{ transitionDelay: `${NAV_ITEMS.length * 40}ms` }}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm">4択クイズ</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <QuizSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

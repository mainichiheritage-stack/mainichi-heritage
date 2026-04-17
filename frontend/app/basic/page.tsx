"use client";

import { useState, useSyncExternalStore } from "react";
import { List, ChevronRight, X } from "lucide-react";
import { AboutSection } from "./_components/AboutSection";
import { TypesSection } from "./_components/TypesSection";
import { ConventionSection } from "./_components/ConventionSection";
import { ProcessSection } from "./_components/ProcessSection";
import { CriteriaSection } from "./_components/CriteriaSection";
import { DangerSection } from "./_components/DangerSection";
import { NegativeSection } from "./_components/NegativeSection";
import { IntangibleSection } from "./_components/IntangibleSection";
import { ReligionSection } from "./_components/ReligionSection";

const subscribe = () => () => {};

export default function WhatIsWorldHeritagePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 350);
  };

  // ハイドレーションエラー防止
  const isClient = useSyncExternalStore(
    subscribe,
    () => true, // クライアント側での値
    () => false, // サーバー側での値
  );
  if (!isClient) return null;

  const sections = [
    { id: "about", title: "世界遺産とは" },
    { id: "types", title: "遺産の種類（文化・自然・複合）" },
    { id: "convention", title: "世界遺産条約の理念" },
    { id: "process", title: "登録までのプロセス" },
    { id: "criteria", title: "10の登録基準" },
    { id: "danger", title: "危機遺産" },
    { id: "negative", title: "負の遺産（記憶の場）" },
    { id: "intangible", title: "無形遺産・世界の記憶" },
    { id: "religion", title: "世界三大宗教" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-slate-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
            世界遺産とは？
          </h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 md:flex md:gap-12 pb-32">
        {/* --- PC用サイドバー --- */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-black mb-4 flex items-center gap-2">
              <List size={20} className="text-indigo-600" /> 目次
            </h3>
            <nav className="flex flex-col border-l-2 border-slate-100">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-indigo-600 font-bold transition-all"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- コンテンツ --- */}
        <main className="flex-1 space-y-28">
          <AboutSection title={sections[0].title} />
          <TypesSection title={sections[1].title} />
          <ConventionSection title={sections[2].title} />
          <ProcessSection title={sections[3].title} />
          <CriteriaSection title={sections[4].title} />
          <DangerSection title={sections[5].title} />
          <NegativeSection title={sections[6].title} />
          <IntangibleSection title={sections[7].title} />
          <ReligionSection title={sections[8].title} />
        </main>
      </div>

      {/* --- スマホ用 目次ボタン --- */}
      <div className="md:hidden">
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
              from { transform: translateY(0); opacity: 1; }
              to { transform: translateY(100%); opacity: 0; }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes itemShow {
              from { transform: translateY(10px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed bottom-8 right-6 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-90"
          style={{ zIndex: 99999, position: "fixed" }}
        >
          <List size={24} />
        </button>

        {/* メニュー本体 */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0"
            style={{ zIndex: 100000, position: "fixed" }}
          >
            {/* 背景 */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              style={{
                animation: `${isClosing ? "fadeOut" : "fadeIn"} 0.4s ease-out forwards`,
              }}
              onClick={handleClose}
            />

            {/* ボトムシート */}
            <div
              className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] p-6 pb-8 shadow-2xl flex flex-col"
              style={{
                animation: `${isClosing ? "slideDown" : "slideUp"} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              }}
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 shrink-0" />

              <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
                  <span className="font-black text-lg text-slate-800 tracking-tight">
                    目次
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 bg-slate-100 rounded-full text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              <nav
                className="overflow-y-auto flex-1"
                style={{ maxHeight: "40vh" }}
              >
                <div className="grid gap-2">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={handleClose}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-slate-700 font-bold active:bg-indigo-600 active:text-white transition-all shadow-sm border border-transparent"
                      style={{
                        animation: !isClosing
                          ? `itemShow 0.4s ease-out ${i * 0.04}s both`
                          : "none",
                      }}
                    >
                      <span className="text-sm">{s.title}</span>
                      <ChevronRight size={16} className="opacity-30" />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Landmark } from "lucide-react";
import { useState } from "react";
import QuizSettingsModal from "./QuizSettingsModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition hover:-translate-y-0.5"
        >
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            まいにち世界遺産
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/heritages" className="hover:text-blue-600 transition">
            遺産一覧
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            クイズ
          </button>
          {/* <button className="text-sm border px-4 py-1.5 rounded-md hover:bg-slate-50">ログイン</button>
          <button className="text-sm bg-slate-900 text-white px-4 py-1.5 rounded-md hover:bg-slate-800">新規登録</button> */}
        </nav>

        <QuizSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </header>
  );
}

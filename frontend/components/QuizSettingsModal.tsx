"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  BrainCircuit,
  ChevronRight,
  Filter,
  Lock,
  Sparkles,
} from "lucide-react";
import { CURRENT_EVENTS_DATA } from "@/constants/currentEvents";

interface QuizSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  questionTitle?: string;
  code?: string;
}

export default function QuizSettingsModal({
  isOpen,
  onClose,
  category = "all",
  questionTitle = "",
  code = "",
}: QuizSettingsModalProps) {
  const router = useRouter();

  // 共通設定の状態管理
  const [questionCount, setQuestionCount] = useState("5");
  const [level, setLevel] = useState("2");

  // 時事問題(category: "c")の場合の回数選択状態
  const CURRENT_EVENTS_OPTIONS = CURRENT_EVENTS_DATA;
  const [selectedEventCode, setSelectedEventCode] = useState(
    code || CURRENT_EVENTS_OPTIONS[0].code,
  );

  if (!isOpen) return null;

  const getSubTitle = () => {
    switch (category) {
      case "c":
        return `「${questionTitle}」の問題を生成します`;
      case "g":
        return "「基礎知識（総論）」の問題を生成します";
      case "h":
        return questionTitle
          ? `「${questionTitle}」の問題を生成します`
          : "「世界遺産」に絞った問題を生成します";
      default:
        return "全範囲からランダムに問題を生成します";
    }
  };

  const handleStart = () => {
    const finalCode = category === "c" ? selectedEventCode : code;
    const params = new URLSearchParams({
      count: questionCount,
      level: level,
      code: finalCode,
      category: category,
    });

    onClose();
    router.push(`/quiz?${params.toString()}`);
  };

  const getBtnStyle = (isSelected: boolean, isDisabled: boolean = false) => {
    if (isDisabled) {
      return "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed opacity-80 bg-[repeating-linear-gradient(-45deg,transparent,transparent_5px,rgba(241,245,249,0.5)_5px,rgba(241,245,249,0.5)_10px)]";
    }
    return isSelected
      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100 scale-[1.02]"
      : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-blue-50/30";
  };

  return (
    <div className="fixed inset-0 z-[9999] isolate flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 md:p-4 text-slate-900">
      <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 max-h-[95vh] flex flex-col">
        <div className="md:hidden w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2" />

        {/* ヘッダー */}
        <div className="p-6 md:p-8 border-b border-slate-50 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 rounded-full text-slate-400 active:scale-90 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              クイズを生成
            </h2>
            <div className="flex items-center gap-2 text-blue-600">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm font-bold">{getSubTitle()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* 時事問題(category: "c")専用：開催回選択 */}
          {category === "c" && (
            <section className="animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-blue-600" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  開催回を選択
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {CURRENT_EVENTS_OPTIONS.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setSelectedEventCode(item.code)}
                    className={`py-4 rounded-2xl text-xs font-black transition-all border-2 ${getBtnStyle(
                      selectedEventCode === item.code,
                    )}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 問題数(count)設定 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3 bg-blue-600 rounded-full" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                問題数
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {["5", "10"].map((v) => (
                <button
                  key={v}
                  onClick={() => setQuestionCount(v)}
                  className={`py-4 rounded-2xl text-sm font-black transition-all border-2 ${getBtnStyle(
                    questionCount === v,
                  )}`}
                >
                  {v}問
                </button>
              ))}
            </div>
          </section>

          {/* レベル(level)設定 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3 bg-blue-600 rounded-full" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                レベル
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "3級", value: "2" },
                { label: "2級", value: "3" },
                { label: "準1級", value: "4" },
                { label: "1級", value: "5" },
              ].map((item) => {
                const isAvailable = item.value === "2";
                return (
                  <button
                    key={item.value}
                    disabled={!isAvailable}
                    onClick={() => setLevel(item.value)}
                    className={`py-4 rounded-2xl text-sm font-black transition-all border-2 flex flex-col items-center justify-center gap-1.5 ${getBtnStyle(
                      level === item.value,
                      !isAvailable,
                    )}`}
                  >
                    <span
                      className={
                        isAvailable ? "text-inherit" : "text-slate-500"
                      }
                    >
                      {item.label}
                    </span>
                    {!isAvailable && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-200/50 rounded-full border border-slate-300/50">
                        <Lock className="w-2.5 h-2.5 text-slate-400" />
                        <span className="text-[8px] font-bold text-slate-500 leading-none">
                          COMING SOON
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* 下部固定ボタン */}
        <div className="p-6 md:p-8 bg-white border-t border-slate-50">
          <button
            onClick={handleStart}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.97] transition-all hover:bg-blue-700"
          >
            開始
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

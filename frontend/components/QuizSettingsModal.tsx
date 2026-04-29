"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, BrainCircuit } from "lucide-react";

interface QuizSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  heritageCode?: string;
}

export default function QuizSettingsModal({
  isOpen,
  onClose,
  heritageCode = "",
}: QuizSettingsModalProps) {
  const [questionCount, setQuestionCount] = useState("5");
  const [level, setLevel] = useState("2");
  const router = useRouter();

  if (!isOpen) return null;

  const handleStart = () => {
    // 現在の場所（パス + クエリ）を取得
    const currentPath = window.location.pathname + window.location.search;

    // 遷移先URLを構築
    const params = new URLSearchParams({
      count: questionCount,
      level: level,
      heritageCode: heritageCode,
      from: currentPath,
    });

    onClose();
    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-600">
              <BrainCircuit className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-slate-900">クイズ設定</h2>
            </div>
            <p className="text-slate-400 text-sm">
              クイズの条件を選択してスタートしましょう
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-6">
          {/* 問題数選択 */}
          <section>
            <h3 className="text-sm font-extrabold text-slate-900 mb-4">
              問題数
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "5問", value: "5" },
                { label: "10問", value: "10" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${
                      questionCount === item.value
                        ? "border-blue-600 bg-blue-50/30"
                        : "border-slate-100 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="qCount"
                    className="w-4 h-4 accent-blue-600"
                    checked={questionCount === item.value}
                    onChange={() => setQuestionCount(item.value)}
                  />
                  <span
                    className={`text-sm font-bold ${questionCount === item.value ? "text-blue-600" : "text-slate-700"}`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* 難易度選択 */}
          <section>
            <h3 className="text-sm font-extrabold text-slate-900 mb-4">
              レベル
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "3級", value: "2" },
                { label: "2級", value: "3" },
                { label: "準1級", value: "4" },
                { label: "1級", value: "5" },
              ].map((item) => {
                const isDisabled = item.value !== "2";

                return (
                  <label
                    key={item.value}
                    className={`
                      relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all
                      ${
                        isDisabled
                          ? "bg-slate-50 border-slate-50 cursor-not-allowed opacity-60"
                          : level === item.value
                            ? "border-blue-600 bg-blue-50/30 cursor-pointer"
                            : "border-slate-100 hover:bg-slate-50 cursor-pointer"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="qLevel"
                      className="hidden"
                      checked={level === item.value}
                      onChange={() => !isDisabled && setLevel(item.value)}
                      disabled={isDisabled}
                    />

                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-bold ${level === item.value && !isDisabled ? "text-blue-600" : "text-slate-700"}`}
                      >
                        {item.label}
                      </span>
                      {isDisabled && (
                        <span className="text-[9px] text-slate-400 font-medium">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    {!isDisabled && level === item.value && (
                      <div className="absolute right-3 w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </label>
                );
              })}
            </div>
          </section>

          {/* フッターボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
            >
              キャンセル
            </button>
            <button
              onClick={handleStart}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-slate-950 hover:bg-slate-800 transition"
            >
              スタート
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

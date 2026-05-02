"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit } from "lucide-react";
import QuizSettingsModal from "./QuizSettingsModal";

interface QuizStartButtonProps {
  category: string;
  code?: string;
  questionTitle?: string;
  variant?: "pc" | "mobile";
}

export default function QuizStartButton({
  category,
  code = "",
  questionTitle = "",
  variant = "pc",
}: QuizStartButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("QuizStartButton props:", {
    category,
    code,
    questionTitle,
    variant,
  });

  const renderButton = () => {
    if (variant === "pc") {
      return (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-black px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all active:scale-95 group shadow-sm"
        >
          クイズを開始
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      );
    }

    return (
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center gap-4 bg-white border-2 border-blue-600 p-2 pr-6 rounded-2xl shadow-2xl shadow-blue-200/50 active:scale-[0.98] transition-all"
      >
        <div className="bg-blue-600 p-3 rounded-xl text-white shrink-0">
          <BrainCircuit size={24} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-black text-slate-800 leading-none">
            クイズを開始
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-blue-600" />
      </button>
    );
  };

  return (
    <>
      {renderButton()}
      <QuizSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={category}
        code={code}
        questionTitle={questionTitle}
      />
    </>
  );
}

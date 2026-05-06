"use client";

import { useEffect } from "react";
import { XCircle, X } from "lucide-react";

type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 10000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* メインコンテナ*/}
      <div className="relative overflow-hidden bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 border border-slate-700/50 backdrop-blur-md bg-opacity-95">
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

        <div className="flex-1">
          <p className="text-sm font-bold leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* --- 進捗バー --- */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-700 w-full">
          <div
            className="h-full bg-red-500"
            style={{
              animation: `shrinkWidth ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

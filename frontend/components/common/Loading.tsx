"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Loading({
  message = "読み込み中...",
  fullScreen = false,
  className = "",
}: LoadingProps) {
  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${!fullScreen ? "p-8" : ""} ${className}`}
    >
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin stroke-[1.5]" />
      {message && (
        <p className="text-slate-600 font-bold animate-pulse text-sm tracking-wider">
          {message}
        </p>
      )}
    </div>
  );

  // フルスクリーンモード
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-500">
        {content}
      </div>
    );
  }

  // インラインモード（コンポーネント内の一部として使う用）
  return content;
}

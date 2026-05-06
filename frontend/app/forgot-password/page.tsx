"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Mail,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Loading from "@/components/common/Loading";
import { log } from "@/utils/logger";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password-reset/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "メールの送信に失敗しました。アドレスが正しいか確認してください。",
        );
      }

      setIsSent(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "エラーが発生しました";
      setError(errorMessage);
      log.error("Password reset request failed", { error: err, email });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-6 py-12 relative">
      {isLoading && <Loading fullScreen message="リセットメールを送信中..." />}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 text-white mb-4">
            <Landmark size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            パスワードの再設定
          </h1>
          <p className="text-slate-500 mt-2 text-sm px-4">
            {isSent
              ? "メールを確認してください"
              : "登録済みのメールアドレスへ、再設定用のURLをお送りします。"}
          </p>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          {!isSent ? (
            /* 送信前フォーム */
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2 animate-shake">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                メールを送信する
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* 送信成功後のステート */
            <div className="text-center animate-in fade-in zoom-in-95 duration-300 py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-slate-700 font-medium mb-8 leading-relaxed px-2">
                <strong>{email}</strong> 宛に
                <br />
                再設定用のURLを送信しました。
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all"
              >
                ログイン画面に戻る
              </Link>
            </div>
          )}
        </div>

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            ログイン画面に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

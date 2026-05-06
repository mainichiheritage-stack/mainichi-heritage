"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Landmark,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Loading from "@/components/common/Loading";
import { log } from "@/utils/logger";

export default function PasswordResetConfirmPage() {
  const { token } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      setError("パスワードが一致しません");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password-reset/confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            password: formData.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("有効期限が切れているか、無効なトークンです。");
      }

      setIsSuccess(true);
      // 3秒後にログイン画面へ自動遷移
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "エラーが発生しました";
      setError(errorMessage);
      log.error("Password reset confirmation failed", { error: err });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      {isLoading && <Loading fullScreen message="パスワードを更新中..." />}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 text-white mb-4">
            <Landmark size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            新しいパスワードの設定
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            新しいパスワードを入力してください。
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* 新しいパスワード */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  新しいパスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* 確認用入力 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  パスワード（確認）
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="••••••••"
                    value={formData.password_confirm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirm: e.target.value,
                      })
                    }
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
                disabled={
                  !formData.password ||
                  formData.password !== formData.password_confirm
                }
                className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-slate-200"
              >
                パスワードを更新
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center animate-in fade-in zoom-in-95 duration-300 py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                更新が完了しました
              </h2>
              <p className="text-sm text-slate-500 mb-8">
                パスワードが正常に更新されました。
                <br />
                まもなくログイン画面へ移動します。
              </p>
              <Link
                href="/login"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                今すぐログイン画面へ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

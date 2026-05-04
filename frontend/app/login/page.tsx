"use client";

import { useState, ComponentProps } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Landmark, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { log } from "@/utils/logger";
import { LOG_MESSAGES } from "@/constants/messages";

type FormSubmitEvent = ComponentProps<"form">["onSubmit"];

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    nickname: "",
  });

  const handleSubmit: FormSubmitEvent = async (e) => {
    if (e) e.preventDefault();

    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/auth/login/" : "/auth/register/";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "エラーが発生しました");
      }

      if (isLogin) {
        // ログイン成功
        login(data.access, data.refresh, data.nickname);
        router.push("/");
      } else {
        // 新規登録成功
        alert("登録が完了しました。ログインしてください。");
        setIsLogin(true);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : LOG_MESSAGES.ERROR.AUTH_FAILED;
      setError(errorMessage);

      log.error(LOG_MESSAGES.ERROR.AUTH_FAILED, {
        error: err,
        mode: isLogin ? "login" : "register",
        email: formData.email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* ロゴ・タイトル */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 text-white mb-4">
            <Landmark size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isLogin ? "おかえりなさい" : "アカウント作成"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            {isLogin
              ? "まいにち世界遺産で学習を再開しましょう"
              : "クイズの結果を記録して、世界遺産マスターを目指そう"}
          </p>
        </div>

        {/* フォームカード */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          <form
            onSubmit={handleSubmit}
            className="space-gap-5 flex flex-col gap-5"
          >
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  ニックネーム
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="世界遺産太郎"
                    value={formData.nickname}
                    onChange={(e) =>
                      setFormData({ ...formData, nickname: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                パスワード
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  パスワード（確認）
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
            )}

            {error && (
              <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "ログイン" : "アカウント作成"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 切り替えリンク */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition"
            >
              {isLogin
                ? "アカウントをお持ちでない方はこちら"
                : "既にアカウントをお持ちの方はこちら"}
            </button>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-600 transition"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

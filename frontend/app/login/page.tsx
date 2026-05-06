"use client";

import { useState, ComponentProps } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Landmark,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { log } from "@/utils/logger";
import { LOG_MESSAGES } from "@/constants/messages";
import { loginSchema, authSchema } from "@/lib/validation";
import Loading from "@/components/common/Loading";

type FormSubmitEvent = ComponentProps<"form">["onSubmit"];

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState("");

  const { login, isLoading: authLoading, setIsNavigating } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    nickname: "",
  });

  const handlePreSubmit: FormSubmitEvent = (e) => {
    if (e) e.preventDefault();
    setError("");

    const schema = isLogin ? loginSchema : authSchema;
    const validationResult = schema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0].message;
      setError(firstError);
      return;
    }

    if (isLogin) {
      handleActualSubmit();
    } else {
      setIsConfirming(true);
    }
  };

  // 実際の送信処理（API通信）
  const handleActualSubmit = async () => {
    setIsConfirming(false);
    setIsLoading(true);

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
        // エラーメッセージの日本語置換ロジック
        const translateError = (msg: string) =>
          msg === "No active account found with the given credentials"
            ? "メールアドレスまたはパスワードが正しくありません"
            : msg;

        if (typeof data === "object" && data !== null) {
          let messages = Object.values(data).flat() as string[];
          messages = messages.map(translateError);

          if (messages.length > 0) throw new Error(messages.join(" / "));
        }

        const fallbackMsg = translateError(
          data.detail || data.message || "入力内容に誤りがあります",
        );
        throw new Error(fallbackMsg);
      }

      // 成功時：トークン保存とリダイレクト
      if (data.access && data.refresh) {
        setIsNavigating("ログイン中です...");
        login(data.access, data.refresh, data.nickname || data.email);

        router.push("/");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : LOG_MESSAGES.ERROR.AUTH_FAILED;
      setError(errorMessage);
      log.error(LOG_MESSAGES.ERROR.AUTH_FAILED, {
        error: err,
        mode: isLogin ? "login" : "register",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-6 py-12 relative">
      {isLoading && (
        <Loading
          fullScreen
          message={
            isLogin ? "ログインしています..." : "アカウントを作成しています..."
          }
        />
      )}

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

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          <form
            onSubmit={handlePreSubmit}
            className="flex flex-col gap-5"
            noValidate
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
                    placeholder="例）mainichi-heritage"
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
              {isLogin && (
                <div className="text-right px-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    パスワードを忘れた場合はこちら
                  </Link>
                </div>
              )}
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
              <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2 animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLogin ? "ログイン" : "アカウント作成"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 切り替えリンク */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  password_confirm: "",
                  nickname: "",
                });
              }}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition"
            >
              {isLogin
                ? "アカウントをお持ちでない方はこちら"
                : "既にアカウントをお持ちの方はこちら"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-600 transition"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              登録内容の確認
            </h2>

            <div className="text-left space-y-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ニックネーム
                </p>
                <p className="text-slate-700 font-medium">
                  {formData.nickname}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  メールアドレス
                </p>
                <p className="text-slate-700 font-medium">{formData.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleActualSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100"
              >
                この内容で登録する
              </button>
              <button
                onClick={() => setIsConfirming(false)}
                className="w-full bg-white hover:bg-slate-50 text-slate-500 font-bold py-3 rounded-2xl transition-all"
              >
                修正する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Landmark,
  Menu,
  X,
  BookOpen,
  Globe2,
  HelpCircle,
  GraduationCap,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import QuizSettingsModal from "./QuizSettingsModal";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "@/components/common/ConfirmModal";
import { log } from "@/utils/logger";
import Toast from "@/components/common/Toast";

const NAV_ITEMS = [
  {
    label: "世界遺産検定とは",
    href: "/about-exam",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  { label: "基礎知識", href: "/basic", icon: <Globe2 className="w-5 h-5" /> },
  {
    label: "世界遺産一覧",
    href: "/heritages",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

export default function Header() {
  const { isLoggedIn, nickname, logout, isMounted, setIsNavigating } =
    useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuizSettingsModalOpen, setIsQuizSettingsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsConfirmModalOpen(false);
    setIsNavigating("ログアウト中です...");

    try {
      await logout();
    } catch (error) {
      log.error("Logout failed:", {
        error,
        localStorageState: { ...localStorage },
      });

      setIsNavigating(null);
      setErrorMsg(
        "ログアウトに失敗しました。接続状況を確認して、もう一度お試しください。",
      );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 relative">
          {/* ロゴエリア */}
          <Link
            href="/"
            className="group z-[60] flex items-center gap-2 transition hover:-translate-y-0.5"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="rounded-lg bg-slate-800 p-1.5 transition-colors group-hover:bg-blue-600">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              まいにち世界遺産
            </span>
          </Link>

          {/* --- PC用ナビゲーション --- */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-bold">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsQuizSettingsModalOpen(true)}
                  className="text-slate-500 transition-colors hover:text-blue-600 font-bold"
                >
                  4択クイズ
                </button>
              </li>
            </ul>

            {/* 認証エリア（PC版）*/}
            <div className="ml-4 pl-6 border-l border-slate-200 flex items-center gap-5 min-w-[120px] justify-end">
              {isMounted && (
                <>
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-2 text-slate-700">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-600" />
                        </div>
                        <span className="text-sm font-bold">
                          {nickname} さん
                        </span>
                      </div>
                      <button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600 hover:border-red-100 active:scale-95"
                      >
                        <LogOut className="w-4 h-4" />
                        ログアウト
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-600 active:scale-95"
                    >
                      <LogIn className="w-4 h-4" />
                      ログイン
                    </Link>
                  )}
                </>
              )}
            </div>
          </nav>

          {/* --- スマホ用メニューボタン --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[60] p-2 text-slate-600 md:hidden hover:bg-slate-50 rounded-full transition-all duration-300"
          >
            <div
              className={`transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>

          {/* --- スマホ用ドロップダウンメニュー --- */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-900/5 md:hidden animate-in fade-in duration-300"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          <div
            className={`
            absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl md:hidden transition-all duration-300 ease-out
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }
          `}
          >
            <nav className="flex flex-col p-2">
              {/* ユーザー情報表示（スマホ版）*/}
              {isMounted && isLoggedIn && (
                <div className="flex items-center gap-4 p-4 mb-2 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">
                      ログイン中
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {nickname} さん
                    </p>
                  </div>
                </div>
              )}

              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-slate-600 font-bold hover:bg-slate-50 active:bg-slate-100 transition-all
                    ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }
                  `}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsConfirmModalOpen(true);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl text-slate-600 font-bold hover:bg-slate-50 active:bg-slate-100 transition-all text-left
                  ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }
                `}
                style={{ transitionDelay: `${NAV_ITEMS.length * 40}ms` }}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm">4択クイズ</span>
              </button>

              {/* 認証ボタン（スマホ版） */}
              <div className="mt-2 pt-2 border-t border-slate-100">
                {isMounted && (
                  <>
                    {isLoggedIn ? (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsConfirmModalOpen(true);
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl text-red-600 font-bold hover:bg-red-50 active:bg-red-100 transition-all text-left
                          ${
                            isMenuOpen
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${(NAV_ITEMS.length + 1) * 40}ms`,
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">ログアウト</span>
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl text-blue-600 font-bold hover:bg-blue-50 active:bg-blue-100 transition-all
                          ${
                            isMenuOpen
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${(NAV_ITEMS.length + 1) * 40}ms`,
                        }}
                      >
                        <LogIn className="w-5 h-5" />
                        <span className="text-sm">ログイン / 新規登録</span>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <QuizSettingsModal
        isOpen={isQuizSettingsModalOpen}
        onClose={() => setIsQuizSettingsModalOpen(false)}
        category={"all"}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleLogout}
        title="ログアウトしますか？"
        description="セッションを終了してログイン画面に戻ります。学習データは保存されていますのでご安心ください。"
        confirmText="ログアウト"
        variant="danger"
      />

      <Toast
        isVisible={!!errorMsg}
        message={errorMsg || ""}
        onClose={() => setErrorMsg(null)}
      />
    </>
  );
}

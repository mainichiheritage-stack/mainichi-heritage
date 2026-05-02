"use client";

import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Trophy,
  RotateCcw,
  Home,
  Star,
  AlertCircle,
} from "lucide-react";

interface QuizData {
  id: number;
  heritage_name: string;
  question: string;
  tips: string;
  choice_correct: string;
  choice_distractor1: string;
  choice_distractor2: string;
  choice_distractor3: string;
  explanation: string;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const count = searchParams.get("count") || "5";
  const level = searchParams.get("level") || "2";
  const code = searchParams.get("code") || "";
  const category = searchParams.get("category") || "all";
  const fromPath = searchParams.get("from") || "/";

  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<"empty" | "error" | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const hasFetched = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // --- クイズ読み込み関数 ---
  const loadQuizzes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    window.scrollTo(0, 0);

    // 10秒のタイムアウト設定
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const query = new URLSearchParams({
      count,
      level,
      code,
      category,
    });

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/quizzes/?${query.toString()}`;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const results = data.results || data;

      if (Array.isArray(results) && results.length > 0) {
        setQuizzes(results);
      } else {
        setError("empty");
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === "AbortError") {
        console.warn("10秒経過したため通信を中断しました");
      } else {
        console.error("クイズの取得に失敗しました：", err);
      }

      setError("error");
    } finally {
      setIsLoading(false);
    }
  }, [count, level, code]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    loadQuizzes();
  }, [loadQuizzes]);

  useEffect(() => {
    if (quizzes.length > 0 && quizzes[currentIndex]) {
      const current = quizzes[currentIndex];
      const choices = [
        current.choice_correct,
        current.choice_distractor1,
        current.choice_distractor2,
        current.choice_distractor3,
      ].sort(() => Math.random() - 0.5);
      setShuffledChoices(choices);
      setSelectedChoice(null);
      setIsAnswered(false);
      setShowTips(false);
    }
  }, [quizzes, currentIndex]);

  // --- ローディング画面 ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">クイズを準備中...</p>
        </div>
      </div>
    );
  }

  // --- エラー・0件時・タイムアウト ---
  if (error || quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-sm w-full bg-white rounded-[32px] p-8 text-center shadow-sm border border-slate-100">
          <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            {error === "empty"
              ? "問題が見つかりませんでした"
              : "通信エラーが発生しました"}
          </h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            {error === "empty"
              ? "選択した条件に該当する問題がまだ登録されていないようです。"
              : "ネットワーク状況を確認するか、しばらく時間をおいてから再度お試しください。"}
          </p>
          <div className="space-y-3">
            <button
              onClick={loadQuizzes}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg"
            >
              再読み込みを試す
            </button>
            <button
              onClick={() => router.push(fromPath)}
              className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition"
            >
              前の画面に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  const handleAnswer = (choice: string) => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);
    if (choice === currentQuiz.choice_correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsFinished(true);
      window.scrollTo(0, 0);
    }
  };

  const getDisplayName = (heritageName: string | null) => {
    if (heritageName) return heritageName;

    if (category === "g") return "基礎知識（総論）";
    if (category === "c") return `時事問題`;
    return "基礎知識（総論）";
  };

  // --- 結果画面 ---
  if (isFinished) {
    const accuracy = Math.round((score / quizzes.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center animate-in zoom-in duration-300">
          <div className="inline-flex p-5 bg-amber-100 rounded-full mb-6">
            <Trophy className="w-12 h-12 text-amber-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {accuracy === 100
              ? "完璧です！"
              : accuracy >= 80
                ? "素晴らしい！"
                : "お疲れ様でした！"}
          </h2>
          <p className="text-slate-400 font-bold mb-8">クイズ結果</p>
          <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
            <div className="text-6xl font-black text-slate-900 mb-2">
              {score}
              <span className="text-2xl text-slate-400">
                {" "}
                / {quizzes.length}
              </span>
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(quizzes.length)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < score ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={loadQuizzes}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <RotateCcw className="w-5 h-5" />
              新しい問題に挑戦する
            </button>
            <button
              onClick={() => router.push(fromPath)}
              className="w-full py-4 bg-white text-slate-600 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <Home className="w-5 h-5" />
              {fromPath === "/" ? "ホームに戻る" : "前の画面に戻る"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- クイズ本編 ---
  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4">
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowExitModal(false)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl border border-slate-100 animate-in zoom-in duration-200">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">
              クイズを中断しますか？
            </h3>
            <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
              これまでの回答スコアは保存されません。
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push(fromPath)}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-[0.98] transition"
              >
                中断して戻る
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-4 bg-white text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* 進捗バー */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
            <span>第 {currentIndex + 1} 問</span>
            <span>
              {currentIndex + 1} / {quizzes.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / quizzes.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* クイズカード */}
        <div
          className={`bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 transition-all ${isAnswered ? "pb-32 md:pb-8" : ""}`}
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
            {getDisplayName(currentQuiz.heritage_name)}
          </span>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 md:mb-8 leading-relaxed">
            {currentQuiz.question}
          </h2>

          <div className="space-y-3">
            {shuffledChoices.map((choice, idx) => {
              const isCorrect = choice === currentQuiz.choice_correct;
              const isSelected = choice === selectedChoice;
              let btnClass =
                "w-full p-4 text-left rounded-2xl border-2 font-semibold transition-all ";
              if (!isAnswered)
                btnClass +=
                  "border-slate-100 hover:border-blue-500 hover:bg-blue-50";
              else {
                if (isCorrect)
                  btnClass += "border-green-500 bg-green-50 text-green-700";
                else if (isSelected)
                  btnClass += "border-red-500 bg-red-50 text-red-700";
                else btnClass += "border-slate-50 text-slate-400 opacity-50";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(choice)}
                  className={btnClass}
                  disabled={isAnswered}
                >
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span>{choice}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ヒント */}
          {!isAnswered && currentQuiz.tips && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-500 transition-all"
              >
                <Lightbulb
                  className={`w-4 h-4 ${showTips ? "text-amber-500" : ""}`}
                />{" "}
                ヒントはこちら{" "}
                {showTips ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showTips && (
                <div className="mt-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-sm text-amber-900 animate-in fade-in zoom-in">
                  {currentQuiz.tips}
                </div>
              )}
            </div>
          )}

          {/* 解説と次へボタン */}
          {isAnswered && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4 text-sm leading-relaxed">
                <h4 className="font-bold text-slate-900 mb-2">解説</h4>
                {currentQuiz.explanation}
              </div>
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md md:relative md:p-0 md:bg-transparent z-50">
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                >
                  {currentIndex < quizzes.length - 1
                    ? "次の問題へ"
                    : "結果を見る"}{" "}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-8 mb-12 flex flex-col items-center gap-3">
          <button
            onClick={() => setShowExitModal(true)}
            className="
              flex items-center gap-2 px-6 py-3 
              text-slate-400 font-bold text-sm
              border-2 border-slate-200 rounded-full
              bg-white hover:bg-slate-50 hover:text-red-500 hover:border-red-100
              transition-all active:scale-95 shadow-sm
            "
          >
            <XCircle className="w-4 h-4" />
            クイズを中断して戻る
          </button>
          <p className="text-[10px] text-slate-400">
            ※学習データは保存されません
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center font-bold text-slate-500">
          読み込み中...
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}

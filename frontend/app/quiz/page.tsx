"use client";

import React, { useState, useEffect } from 'react';
import { useRouter , useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, ChevronDown, ChevronUp, Trophy, RotateCcw, Home, Star } from 'lucide-react';

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

export default function QuizPage() {
  const searchParams = useSearchParams();
  const count = searchParams.get('count') || '5';
  const level = searchParams.get('level') || '2';
  const heritageId = searchParams.get('heritageId') || '0';
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/quizzes/?count=${count}&level=${level}&heritage_id=${heritageId}`;
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.results && Array.isArray(data.results)) {
          setQuizzes(data.results);
        } else if (Array.isArray(data)) {
          setQuizzes(data);
        }

      } catch (err) {
        console.error("クイズの取得に失敗しました：", err);
      }
    };

    fetchQuizzes();
    
  }, [count, level, heritageId]);

  useEffect(() => {
    if (quizzes.length > 0) {
      const current = quizzes[currentIndex];
      const choices = [
        current.choice_correct,
        current.choice_distractor1,
        current.choice_distractor2,
        current.choice_distractor3
      ].sort(() => Math.random() - 0.5);
      setShuffledChoices(choices);
      setSelectedChoice(null);
      setIsAnswered(false);
      setShowTips(false);
    }
  }, [quizzes, currentIndex]);

  if (quizzes.length === 0) return <div className="p-10 text-center">読み込み中...</div>;

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
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const accuracy = Math.round((score / quizzes.length) * 100);
    
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center animate-in zoom-in duration-300">
          <div className="inline-flex p-5 bg-amber-100 rounded-full mb-6">
            <Trophy className="w-12 h-12 text-amber-500" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {accuracy === 100 ? "完璧です！" : accuracy >= 80 ? "素晴らしい！" : "お疲れ様でした！"}
          </h2>
          <p className="text-slate-400 font-bold mb-8">クイズ結果</p>

          <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
            <div className="text-6xl font-black text-slate-900 mb-2">
              {score}<span className="text-2xl text-slate-400"> / {quizzes.length}</span>
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(quizzes.length)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < score ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} 
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <RotateCcw className="w-5 h-5" />
              もう一度挑戦する
            </button>
            
            <button 
              onClick={() => router.push('/')}
              className="w-full py-4 bg-white text-slate-600 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <Home className="w-5 h-5" />
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 進捗バー */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
            <span>第 {currentIndex + 1} 問</span>
            <span>{currentIndex + 1} / {quizzes.length}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 問題カード */}
        <div className={`bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 transition-all ${isAnswered ? 'pb-32 md:pb-8' : ''}`}>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
            {currentQuiz.heritage_name}
          </span>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 md:mb-8 leading-relaxed">
            {currentQuiz.question}
          </h2>

          {/* 選択肢 */}
          <div className="space-y-3">
            {shuffledChoices.map((choice, idx) => {
              const isCorrect = choice === currentQuiz.choice_correct;
              const isSelected = choice === selectedChoice;
              let buttonClass = "w-full p-4 text-left rounded-2xl border-2 font-semibold transition-all ";
              if (!isAnswered) {
                buttonClass += "border-slate-100 hover:border-blue-500 hover:bg-blue-50";
              } else {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (isSelected) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += "border-slate-50 text-slate-400 opacity-50";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleAnswer(choice)}
                  className={buttonClass}
                  disabled={isAnswered}
                >
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span>{choice}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ヒントセクション */}
          {!isAnswered && currentQuiz.tips && (
            <div className="mt-6">
              <button 
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-500 transition-all mx-auto"
              >
                <Lightbulb className={`w-4 h-4 ${showTips ? 'text-amber-500' : ''}`} />
                <span>ヒントはこちら</span>
                {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showTips && (
                <div className="mt-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-sm text-amber-900 leading-relaxed animate-in fade-in zoom-in duration-200">
                  <p>{currentQuiz.tips}</p>
                </div>
              )}
            </div>
          )}
          
          {/* 回答後の解説と次のボタン */}
          {isAnswered && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
              {/* 解説エリア: スマホでは最大高さを制限してスクロール可能に */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                <h4 className="font-bold text-slate-900 text-sm mb-2">解説</h4>
                <div className="max-h-[120px] md:max-h-none overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 custom-scrollbar">
                  {currentQuiz.explanation}
                </div>
              </div>

              {/* 次へボタン: スマホでは下部にSticky固定、PCでは通常配置 */}
              <div className="
                fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] 
                md:relative md:p-0 md:bg-transparent md:border-none md:shadow-none 
                z-50 animate-in slide-in-from-bottom-full duration-300 md:animate-none
              ">
                <div className="max-w-2xl mx-auto md:mt-6">
                  <button 
                    onClick={nextQuestion}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition shadow-xl md:shadow-none"
                  >
                    {currentIndex < quizzes.length - 1 ? "次の問題へ" : "結果を見る"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
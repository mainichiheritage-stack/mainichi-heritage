import React from "react";
import {
  GraduationCap,
  Target,
  Info,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutExamPage() {
  const fullExamData = [
    {
      grade: "4級",
      eligibility: "どなたでも",
      target: "日本の全遺産\n世界の主要遺産",
      time: "45分 / 50問",
      standard: "60点 / 100点",
      study: "約20h",
    },
    {
      grade: "3級",
      eligibility: "どなたでも",
      target: "日本の全遺産\n主要遺産100件",
      time: "50分 / 60問",
      standard: "60点 / 100点",
      study: "約30〜50h",
    },
    {
      grade: "2級",
      eligibility: "どなたでも",
      target: "日本の全遺産\n主要遺産300件",
      time: "60分 / 60問",
      standard: "60点 / 100点",
      study: "約100h",
    },
    {
      grade: "準1級",
      eligibility: "2級合格者",
      target: "日本の全遺産\n主要遺産700件",
      time: "80分 / 80問",
      standard: "60点 / 100点",
      study: "約150h",
    },
    {
      grade: "1級",
      eligibility: "2級合格者",
      target: "世界の全遺産\n(1,200件超)",
      time: "90分 / 90問",
      standard: "140点 / 200点",
      study: "約200h〜",
    },
    {
      grade: "マイスター",
      eligibility: "1級合格者",
      target: "全遺産＋時事\n(論述形式)",
      time: "120分 / 3問",
      standard: "非公開",
      study: "約50h〜",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ヒーローヘッダー */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-10 md:pt-16 md:pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6 text-indigo-600">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            世界遺産検定とは
          </h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 md:mt-12 space-y-12 md:space-y-16">
        {/* 解説セクション */}
        <section className="space-y-8 py-6 md:py-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              世界遺産検定とは
            </h2>
          </div>

          <div className="space-y-8">
            {/* 概要テキスト */}
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                世界遺産検定は、人類共通の財産・宝物である「世界遺産」を通して、国際的な教養を身につけ、持続可能な社会の発展に寄与する人材の育成を目的とした検定試験です。
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                2006年の開始以来、学生からビジネスパーソン、シニア層まで幅広く受験されており、累計受験者数は40万人を超えています。単なる知識の暗記に留まらず、世界の歴史、文化、地理、さらには地球環境問題までを横断的に学ぶことができるのが最大の特徴です。
              </p>
            </div>

            {/* 目的セクション：横並び（PC）、縦並び（スマホ） */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                <Target className="text-indigo-500" size={24} />
                主な3つの目的
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "国際的な教養の習得",
                    text: "多様な文化や価値観を理解し、グローバルな視点を養う。",
                  },
                  {
                    title: "保全意識の高揚",
                    text: "遺産を未来へ引き継ぐための保護・保全の精神を学ぶ。",
                  },
                  {
                    title: "社会・地域への貢献",
                    text: "学んだ知識を観光や教育、地域活性化に活かす。",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative pl-8 md:pl-0 md:pt-8">
                    <span className="absolute left-0 top-0 md:left-0 md:-top-2 text-4xl font-black text-indigo-50 opacity-10 select-none">
                      0{i + 1}
                    </span>
                    <div className="relative">
                      <span className="block font-bold text-slate-800 mb-2 underline decoration-indigo-200 decoration-4 underline-offset-4">
                        {item.title}
                      </span>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 比較テーブルセクション */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                級別スペック表
              </h2>
            </div>
            <span className="hidden md:inline-block text-xs font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
              2026年度版
            </span>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-800 uppercase tracking-wider">
                    <th className="p-4 font-black">級</th>
                    <th className="p-4 font-black">受験資格</th>
                    <th className="p-4 font-black">形式/時間/問題</th>
                    <th className="p-4 font-black">出題範囲</th>
                    <th className="p-4 font-black text-center">合格基準</th>
                    <th className="p-4 font-black text-center">目安</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fullExamData.map((row, index) => (
                    <tr
                      key={row.grade}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#dae3ec" : "#ffffff",
                      }}
                      className="hover:bg-indigo-50/50 transition-colors"
                    >
                      <td className="p-4 font-black text-indigo-700 text-sm md:text-base">
                        {row.grade}
                      </td>
                      <td className="p-4 text-slate-700 font-bold">
                        {row.eligibility}
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {row.time}
                      </td>
                      <td className="p-4 text-slate-600 leading-relaxed whitespace-pre-line">
                        {row.target}
                      </td>
                      <td className="p-4 text-slate-700 font-bold text-center">
                        {row.standard}
                      </td>
                      <td className="p-4 text-slate-800 font-black text-center">
                        {row.study}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-slate-400 text-center italic">
            ※スマホの方は表を横にスクロールしてご確認ください
          </p>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-dashed border-indigo-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-indigo-50 p-4 rounded-2xl">
              <Info className="text-indigo-600" size={32} />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-lg font-black text-slate-800">
                最新情報・お申し込みは公式サイトへ
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                試験日程、受験料、会場、最新の登録遺産に関する詳細情報は、必ず世界遺産検定事務局の公式サイトをご確認ください。
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a
                href="https://www.sekaken.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              >
                公式サイト TOP
                <ChevronRight size={16} />
              </a>
              <a
                href="https://www.sekaken.jp/outline/schedule/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-600 px-6 py-3 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
              >
                試験日程を確認する
              </a>
            </div>
          </div>
        </section>

        {/* 誘導 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/basic"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 group"
          >
            <BookOpen className="w-5 h-5" />
            世界遺産の基礎知識について学ぶ
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

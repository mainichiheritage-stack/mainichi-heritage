"use client";

import React from "react";
import { Newspaper, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { CURRENT_EVENTS_DATA } from "@/constants/currentEvents";
import Link from "next/link";

export default function CurrentEventsPage() {
  const TOPICS = CURRENT_EVENTS_DATA;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <Newspaper className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-800">時事問題対策</h1>
          </div>
          <p className="text-slate-500 font-medium">
            世界遺産検定で頻出する、最新の委員会情報やニュースをまとめています。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-4">
        {TOPICS.map((topic, index) => (
          <Link
            href={`/current-events/${topic.id}`}
            key={topic.id}
            className="block bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {index === 0 && (
                  <span className="flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm shadow-orange-100 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    最新
                  </span>
                )}
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono">{topic.date}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
              {topic.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {topic.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

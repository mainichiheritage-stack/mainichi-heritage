import React from "react";
import {
  Globe,
  Award,
  BookOpen,
  Heart,
  MessageSquare,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Globe size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            当サイトについて
          </h1>
          <p className="text-slate-500 text-sm">
            まいにち世界遺産（mainichi-heritage.com）
          </p>
        </div>

        <div className="space-y-6">
          {/* サイトの目的 */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <Award className="text-indigo-500" size={20} />
              サイトの目的
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              「まいにち世界遺産」は、世界遺産検定の合格を目指す受験生や、世界遺産に興味を持つすべての方々をサポートするために誕生しました。
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              膨大な世界遺産の知識を効率よく、そして楽しく定着させるために、クイズ形式で学習を習慣化できる環境を提供しています。
            </p>
          </section>

          {/* コンテンツのこだわり */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <BookOpen className="text-indigo-500" size={20} />
              コンテンツのこだわり
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <ChevronRight className="text-indigo-400 shrink-0" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    試験傾向に沿った問題構成
                  </h3>
                  <p className="text-xs text-slate-500">
                    世界遺産検定の過去の傾向を分析し、特に重要度の高い基礎知識を中心に構成しています。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ChevronRight className="text-indigo-400 shrink-0" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    視覚的な学習体験
                  </h3>
                  <p className="text-xs text-slate-500">
                    Wikimedia
                    Commons等のオープンライセンスを活用し、現地の風景をイメージしながら学べるよう配慮しています。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ChevronRight className="text-indigo-400 shrink-0" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    権利・ライセンスの遵守
                  </h3>
                  <p className="text-xs text-slate-500">
                    教育目的であっても、著作権およびライセンス表記（クレジット）の徹底を行い、健全なサイト運営を心がけています。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 運営者情報 */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <Heart className="text-indigo-500" size={20} />
              運営者メッセージ
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p>はじめまして。「まいにち世界遺産」運営事務局です。</p>
              <p>
                私自身も世界遺産の魅力に惹かれ、学習を続ける一人です。学習の中で「毎日少しずつ、楽しみながら続けられる場所があればいいな」と感じたことが、このサイトを作るきっかけとなりました。
              </p>
              <p>
                単なる暗記ではなく、世界遺産が持つ歴史的背景や多様性を知ることで、皆さんの世界が少しでも広がるお手伝いができれば幸いです。
              </p>
            </div>
          </section>

          {/* お問い合わせへの誘導 */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <MessageSquare className="text-indigo-500" size={20} />
              ご意見・お問い合わせ
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              問題の内容に関する誤りのご指摘や、サイトの改善案、その他お問い合わせは下記フォームよりお寄せください。
            </p>
            <Link
              href="https://forms.gle/nydMBWr1UyAXJZ3a6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              お問い合わせはこちら
              <ExternalLink size={16} className="ml-2" />
            </Link>
          </section>
        </div>

        <div className="text-center mt-12 text-slate-400 text-xs px-4 space-y-2">
          <p>まいにち世界遺産 運営チーム</p>
          <p>世界遺産の保護と教育の普及を目指して。</p>
        </div>
      </div>
    </div>
  );
}

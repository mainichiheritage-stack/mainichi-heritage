import Link from "next/link";
import { Landmark } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* ロゴと紹介 */}
          <div className="col-span-1 md:col-span-1 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
              <div className="bg-slate-800 p-1.5 rounded-lg">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-800">
                  まいにち世界遺産
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              世界遺産検定の合格を目指す、すべての学習者のためのプラットフォーム。
              正しい知識を楽しく学び、世界の宝物を次世代へつなぐ一歩を。
            </p>
            <span className="inline-block px-3 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold rounded-md">
              UNOFFICIAL FAN PROJECT
            </span>
          </div>

          {/* 学習コンテンツ */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">学習メニュー</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/heritages"
                  className="hover:text-blue-600 transition-colors"
                >
                  世界遺産データベース
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="hover:text-blue-600 transition-colors"
                >
                  4択クイズ
                </Link>
              </li>
              {/* <li><Link href="/" className="hover:text-blue-600 transition-colors">苦手分析（準備中）</Link></li> */}
              {/* <li><Link href="/" className="hover:text-blue-600 transition-colors">用語集（準備中）</Link></li> */}
            </ul>
          </div>

          {/* サポート/情報 */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">
              インフォメーション
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {/* <li><Link href="/news" className="hover:text-blue-600 transition-colors">お知らせ一覧</Link></li> */}
              {/* <li><Link href="/about" className="hover:text-blue-600 transition-colors">このサイトについて</Link></li> */}
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="hover:text-blue-600 transition-colors"
                >
                  ライセンス・権利表記
                </Link>
              </li>
              <li>
                <Link
                  href="https://forms.gle/nydMBWr1UyAXJZ3a6"
                  className="hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* ソーシャル/連絡先 */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">コミュニティ</h3>
            <div className="flex gap-4">
              {/* <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm">
                <Github size={20} />
              </a>
              <a href="mailto:support@example.com" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm">
                <Mail size={20} />
              </a> */}
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    （準備中）
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-medium uppercase tracking-widest">
          <p>© {currentYear} Mainichi Heritage / まいにち世界遺産.</p>
          <p>Created by World Heritage Fan Project</p>
        </div>
      </div>
    </footer>
  );
}

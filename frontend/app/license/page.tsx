import React from "react";
import { ShieldCheck, Image as ImageIcon, Scale } from "lucide-react";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            ライセンス・権利表記
          </h1>
          <p className="text-slate-500">
            「まいにち世界遺産」で使用しているコンテンツの権利帰属についてお知らせします。
          </p>
        </div>

        <div className="space-y-8">
          {/* 商標、および非公式表明 */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-800">
              <Scale className="text-amber-500" size={24} />
              商標およびサービスについて
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                「世界遺産検定」および関連するロゴ・名称は、特定非営利活動法人
                世界遺産アカデミーの登録商標です。
              </p>
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-900 font-bold mb-1">
                  【重要】非公式サービスである旨の通知
                </p>
                <p className="text-amber-800">
                  当プラットフォームは個人開発による
                  <strong>非公式の学習支援ツール</strong>
                  であり、世界遺産アカデミーおよび関連団体との資本関係、提携関係、または公認を受けたものではありません。
                </p>
              </div>
            </div>
          </section>

          {/* 画像著作権について */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <ImageIcon className="text-blue-500" size={24} />
              画像データのライセンス
            </h2>

            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">
                  ■ Creative Commons (CC BY-SA)
                </h3>
                <p>
                  Wikipediaおよびウィキメディア・コモンズから提供される画像は、クリエイティブ・コモンズ
                  表示-継承ライセンス（CC
                  BY-SA）に基づき利用しています。各画像の詳細ページに記載された著作者情報を尊重し、適切にクレジットを表示しています。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-2">■ Unsplash</h3>
                <p>
                  Unsplashから提供される画像は、Unsplash
                  Licenseに基づき利用しています。著作者の表示義務はありませんが、素晴らしい作品を提供してくださるフォトグラファーへの敬意を表し、可能な限りクレジットを併記しています。
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-xs italic">
                  ※個別の画像の詳細なクレジットは、各世界遺産の詳細ページまたは画像タップ時の情報欄からご確認いただけます。
                </p>
              </div>
            </div>
          </section>

          {/* データの正確性 */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Scale className="text-emerald-500" size={24} />
              免責事項
            </h2>
            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>
                本アプリに掲載されているデータは、公的機関の情報に基づき作成されていますが、学習の便宜上、要約や編集を行っています。
              </p>
              <p className="font-bold text-slate-800">
                検定試験の正確な最新情報については、必ず主催団体の公式サイトをご確認ください。
              </p>
              <p>
                本アプリの利用により生じた結果（合否、および損害等）について、運営者は一切の責任を負いかねますので予めご了承ください。
              </p>
            </div>
          </section>

          {/* ソフトウェアライセンス */}
          <section className="text-center text-slate-400 text-[10px] pt-8">
            <p>Built with Next.js, Django REST Framework, and Lucide Icons.</p>
            <p>© 2026 まいにち世界遺産 Project (Unofficial).</p>
          </section>
        </div>
      </div>
    </div>
  );
}

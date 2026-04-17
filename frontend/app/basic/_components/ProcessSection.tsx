import { ClipboardCheck, GitPullRequest, Landmark } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface ProcessSectionProps {
  title: string;
}

export const ProcessSection = ({ title }: ProcessSectionProps) => {
  return (
    <section id="process" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={ClipboardCheck} />

      <div className="space-y-8">
        {/* リード文 */}
        <SectionText>
          世界遺産に登録されるためには、まず各国が作成する
          <HighlightIndigo>「暫定リスト」</HighlightIndigo>
          に記載されている必要があります。 そこから、
          <HighlightIndigo>
            「プレリミナリー・アセスメント（事前評価）」
          </HighlightIndigo>
          を受け、本推薦・調査を経て、最終的に世界遺産委員会で登録の可否が決定されます。
        </SectionText>

        {/* 推薦の前提となる5条件 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              推薦の前提となる5条件
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm md:text-base">
              <ul className="space-y-3">
                <li>
                  <strong className="text-slate-900">① 不動産であること</strong>
                  <p className="text-slate-500 text-sm">
                    建物や自然景観などの「動かせないもの」が対象。美術品や書籍などは対象外です。
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">
                    ② 国内法で保護されていること
                  </strong>
                  <p className="text-slate-500 text-sm">
                    日本の「文化財保護法」など、その国独自の法律で厳格に保護されていることが必須です。
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">
                    ③ 保有国からの推薦であること
                  </strong>
                  <p className="text-slate-500 text-sm">
                    他国の遺産を勝手に推薦することはできません。
                    <span className="block mt-1 text-xs italic">
                      ※【例外】「エルサレムの旧市街とその城壁群」は第三次中東戦争以降、領有権がはっきりとしていないエルサレムに存在したため、ヨルダンが代理で推薦を行いました。
                    </span>
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">
                    ④ 世界遺産条約の締約国であること
                  </strong>
                  <p className="text-slate-500 text-sm">
                    <HighlightIndigo>
                      ユネスコ自体への加盟は問いません
                    </HighlightIndigo>
                    が、条約の締約は必須条件です。
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">
                    ⑤ 暫定リストへの記載と事前評価
                  </strong>
                  <p className="text-slate-500 text-sm">
                    暫定リストに記載され、本推薦の前に諮問機関による事前評価を完了している必要があります。
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 登録までの流れ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GitPullRequest size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              登録までの流れ
            </h3>
          </div>

          {/* ヘッダー的なラベル（PCのみ） */}
          <div className="hidden md:flex justify-between px-10 mb-2 text-xs font-bold text-slate-400">
            <span>締約国（推薦側）</span>
            <span>ユネスコ・諮問機関（審査側）</span>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
            {/* ステップ1：暫定リスト（左側：国） */}
            <div className="relative flex items-center justify-between md:justify-normal md:flex-row group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 font-bold">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                <h4 className="font-bold text-slate-900">暫定リストの作成</h4>
                <p className="text-sm text-slate-500">
                  各国が候補を選定し、ユネスコに提出。
                </p>
              </div>
            </div>

            {/* ステップ2：事前評価（右側：機関） */}
            <div className="relative flex items-center justify-between md:justify-normal md:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 font-bold">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-lg border border-indigo-100 bg-indigo-50/30 shadow-sm">
                <h4 className="font-bold text-slate-900">
                  事前評価（プレリミナリー・アセスメント）
                </h4>
                <p className="text-sm text-slate-500">
                  諮問機関が書類評価を行う（本推薦の少なくとも1年前）。
                </p>
              </div>
            </div>

            {/* ステップ3：本推薦（左側：国） */}
            <div className="relative flex items-center justify-between md:justify-normal md:flex-row group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 font-bold">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                <h4 className="font-bold text-slate-900">推薦書の提出</h4>
                <p className="text-sm text-slate-500">
                  毎年2月1日までに世界遺産センターへ提出。
                </p>
              </div>
            </div>

            {/* ステップ4：現地調査（右側：機関） */}
            <div className="relative flex items-center justify-between md:justify-normal md:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 font-bold">
                4
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                <h4 className="font-bold text-slate-900">諮問機関の調査</h4>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>専門家が現地を訪れ、価値や保護体制を精査。</p>
                  <div className="text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
                    ・文化遺産 →{" "}
                    <span className="font-bold text-slate-700">ICOMOS</span>
                    <br />
                    ・自然遺産 →{" "}
                    <span className="font-bold text-slate-700">IUCN</span>
                    <br />
                    ・保存修復の助言 →{" "}
                    <span className="font-bold text-slate-700">ICCROM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ステップ5：審議（右側：機関） */}
            <div className="relative flex items-center justify-between md:justify-normal md:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 font-bold">
                5
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-lg border border-indigo-100 bg-indigo-50/30 shadow-sm">
                <h4 className="font-bold text-slate-900">
                  世界遺産委員会で審議・決定
                </h4>
                <p className="text-sm text-slate-500">
                  年1回の会議で登録の可否を最終決定。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 各種詳細情報 */}
        <div className="grid grid-cols-1 gap-6">
          <InfoBlock title="推薦書の内容：重要キーワード">
            <div className="text-xs md:text-sm space-y-2">
              <p>
                <HighlightIndigo>① 真正性</HighlightIndigo>
                ：創建当時の素材や意匠が保たれていること。
              </p>
              <p>
                <HighlightIndigo>② 完全性</HighlightIndigo>
                ：遺産の顕著な普遍的価値を証明し、保護・保全するための必要条件がすべてそろっていること
                （例：建物だけでなく周囲の環境も保全されているなど）。
              </p>
              <p>
                <HighlightBlack>③ バッファ・ゾーン</HighlightBlack>
                ：遺産の周囲に設ける緩衝地帯。
              </p>
              <p>
                <HighlightBlack>④ 登録基準</HighlightBlack>
                ：10項目ある登録基準のどれを満たすのかを記載。（各登録基準の詳細は後述）
              </p>
              <p>
                <HighlightBlack>⑤ 文化的景観</HighlightBlack>
                ：自然と人間が共同で作り上げた景観（文化遺産）。
              </p>
              <p>
                <HighlightBlack>⑥ 登録形態</HighlightBlack>
                ：シリアル・サイト（複数箇所）、トランスバンダリー・サイト（国境越え）。
              </p>
            </div>
          </InfoBlock>

          <InfoBlock title="日本国内の推薦フロー">
            <p className="text-xs">
              文化遺産であれば文化庁 or
              内閣官房、自然遺産であれば環境省と林野庁が暫定リストから候補を選定し、「世界遺産条約関係省庁連絡会議」を経て内閣が閣議了解し、世界遺産センターへ提出されます。
            </p>
          </InfoBlock>

          <InfoBlock title="緊急的登録推薦">
            <p className="text-xs">
              通常、プレリミナリー・アセスメントの申請から登録までは最短で4年（推薦提出から登録は約1年半）かかります。
              しかし、パレスチナの
              <HighlightBlack>「聖ヒラリオン修道院」</HighlightBlack>
              のように、緊急の保護が必要な場合は通常の手順を省略して登録されることがあります。
            </p>
          </InfoBlock>

          <InfoBlock title="世界遺産委員会と推薦数の制限">
            <p className="text-xs">
              21カ国で構成され、任期は6年（慣例で4年）。2年に1度開かれる世界遺産条約締約国会議で7カ国が改選されます。
              <br />
              推薦は現在 <HighlightIndigo>年1件まで</HighlightIndigo>
              です。ただし、推薦が少ない地域や自然遺産などを優先する「優先枠」となった場合には、最大2件まで推薦が可能です。
            </p>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
};

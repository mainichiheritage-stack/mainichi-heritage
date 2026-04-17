import {
  MessageSquareWarning,
  HeartHandshake,
  History,
  Flame,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface NegativeSectionProps {
  title: string;
}

export const NegativeSection = ({ title }: NegativeSectionProps) => {
  return (
    <section id="negative" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={MessageSquareWarning} />

      <div className="space-y-8">
        <SectionText>
          人類が犯した悲惨な過ち（戦争、人種差別、奴隷貿易など）を二度と繰り返さないための教訓として登録されている遺産を、日本では一般的に
          <HighlightIndigo>「負の遺産」</HighlightIndigo>
          と呼びます。
          <br />
          これらは、世界遺産条約の理念である
          <HighlightBlack>「平和の礎（いしずえ）」</HighlightBlack>
          を象徴する存在です。
        </SectionText>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 items-start">
          <MessageSquareWarning className="text-amber-600 shrink-0" size={24} />
          <div className="text-sm">
            <p className="font-bold text-amber-900 mb-1">
              【重要】用語のひっかけに注意
            </p>
            <p className="text-amber-800 leading-relaxed">
              「負の遺産」は
              <HighlightIndigo>
                ユネスコの公式用語ではありません
              </HighlightIndigo>
              。試験では「日本独自の通称である」という正誤問題が頻出します。
            </p>
          </div>
        </div>

        {/* 記憶の場（Sites of Memory） */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <History size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              最新概念：記憶の場
            </h3>
          </div>
          <SectionText>
            2023年、ユネスコは特定のコミュニティにとって重要な歴史的出来事を象徴する場所を
            <HighlightIndigo>「記憶の場（Sites of Memory）」</HighlightIndigo>
            として正式に定義しました。
            これにより、これまでの「負の遺産」に近い性質を持つ場所も、この枠組みで評価されるようになっています。
          </SectionText>
        </div>

        {/* 代表的な遺産例 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              代表的な「負の遺産」
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock title="原爆ドーム（日本）">
              <p className="text-xs">
                核兵器の惨禍を象徴。登録基準{" "}
                <HighlightIndigo>基準(vi)</HighlightIndigo>{" "}
                のみで登録されている稀な例です。
              </p>
            </InfoBlock>
            <InfoBlock title="アウシュヴィッツ・ビルケナウ（ポーランド）">
              <p className="text-xs">
                ナチス・ドイツによるホロコースト（大量虐殺）の現場。
              </p>
            </InfoBlock>
            <InfoBlock title="ゴレ島（セネガル）">
              <p className="text-xs">
                かつてアフリカからの奴隷貿易の拠点となった場所。
              </p>
            </InfoBlock>
            <InfoBlock title="ロベン島（南アフリカ）">
              <p className="text-xs">
                アパルトヘイト（人種隔離政策）に抵抗したネルソン・マンデラが収監されていた監獄。
              </p>
            </InfoBlock>
          </div>
        </div>

        {/* 平和への貢献 */}
        <InfoBlock title="理念：なぜ守るのか？">
          <div className="flex gap-4 items-start">
            <HeartHandshake className="shrink-0 text-indigo-600" size={20} />
            <p className="text-sm">
              悲劇の現場を保存することは、人類が過去に学び、
              <HighlightBlack>
                未来の平和を維持するための対話を促す
              </HighlightBlack>
              ためです。ユネスコ憲章の前文にある「戦争は人の心の中で生まれるものだから、人の心の中に平和の砦を築かなければならない」という精神を体現しています。
            </p>
          </div>
        </InfoBlock>
      </div>
    </section>
  );
};

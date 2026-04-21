import { Leaf, Palette, Mountain, Info } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface CulturalLandscapeSectionProps {
  title: string;
}

export const CulturalLandscapeSection = ({
  title,
}: CulturalLandscapeSectionProps) => {
  return (
    <section id="cultural-landscape" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={Leaf} />

      <div className="space-y-8">
        <SectionText>
          <HighlightIndigo>「文化的景観」</HighlightIndigo>とは、
          <HighlightBlack>自然と人間の長年にわたる共同作業</HighlightBlack>
          によって形作られた景観のことです。
          <br />
          1992年に世界遺産条約の作業指針に導入され、これにより「自然と文化」を切り離さず、その相互作用を評価できるようになりました。
        </SectionText>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex gap-3 items-start">
          <Info className="text-emerald-600 shrink-0" size={24} />
          <div className="text-sm">
            <p className="font-bold text-emerald-900 mb-1">
              【重要】検定頻出ポイント
            </p>
            <p className="text-emerald-800 leading-relaxed">
              世界初の文化的景観：
              <HighlightIndigo>
                トンガリロ国立公園（ニュージーランド）
              </HighlightIndigo>
              <br />
              当初は「自然遺産」でしたが、マオリの信仰対象としての価値が認められ、1993年に「複合遺産（文化的景観）」となりました。
            </p>
          </div>
        </div>

        {/* 3つの分類 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              文化的景観の3つのカテゴリー
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoBlock title="①意図的に設計された景観">
              <p className="text-xs">
                庭園や公園など、人間が明確な美学的意図を持って設計したもの。
                <br />
                例：ヴェルサイユの宮殿と庭園（フランス）
              </p>
            </InfoBlock>
            <InfoBlock title="②有機的に進化した景観">
              <p className="text-xs">
                社会的、経済的、宗教的なニーズに応じて自然に形成されたもの。現在も機能している「残存」型が試験によく出ます。
                <br />
                例：フィリピン・コルディリェーラの棚田群
              </p>
            </InfoBlock>
            <InfoBlock title="③関連する文化的景観">
              <p className="text-xs">
                物質的な証拠は少ないが、自然の中に宗教的、芸術的、文化的な強い連関があるもの。
                <br />
                例：紀伊山地の霊場と参詣道（日本）
              </p>
            </InfoBlock>
          </div>
        </div>

        {/* 日本の例 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mountain size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">日本の代表例</h3>
          </div>
          <SectionText>
            日本は地形が複雑で自然信仰も強いため、多くの遺産がこの枠組みで登録されています。
          </SectionText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock title="石見銀山遺跡とその文化的景観">
              <p className="text-xs">
                銀の採掘だけでなく、森林資源の管理や周辺の街道、港町が一体となって評価されました。
              </p>
            </InfoBlock>
            <InfoBlock title="白川郷・五箇山の合掌造り集落">
              <p className="text-xs">
                豪雪地帯の厳しい自然環境に適応した家屋と、それを支える結（ゆい）の精神が景観を作っています。
              </p>
            </InfoBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

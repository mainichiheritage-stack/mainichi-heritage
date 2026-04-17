import { Layers } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface TypesSectionProps {
  title: string;
}

export const TypesSection = ({ title }: TypesSectionProps) => {
  return (
    <section id="types" className="scroll-mt-24 space-y-10">
      {/* 見出し */}
      <SectionHeader title={title} icon={Layers} />

      <div className="space-y-8">
        {/* リード文 */}
        <SectionText>
          世界遺産は、その特徴や価値の内容によって、大きく
          <HighlightIndigo>
            「文化遺産」「自然遺産」「複合遺産」
          </HighlightIndigo>
          の3つの種類に分類されます。
          <br />
          2025年7月の第47回世界遺産委員会終了時点で、世界遺産は
          <HighlightBlack>全1,248件</HighlightBlack>
          （文化972件、自然235件、複合41件）登録されています。日本からは
          <HighlightBlack>26件</HighlightBlack>
          （文化21件、自然5件）登録されています。
        </SectionText>

        {/* 3つの分類の解説 */}
        <div className="grid grid-cols-1 gap-4">
          <InfoBlock title="1. 文化遺産">
            <p>
              記念工作物、建造物群、遺跡など、
              <span className="font-bold text-slate-900 mx-1">人類の歴史</span>
              によって生み出された顕著な価値を持つもの。
              <br />
              <span className="text-[12px] text-slate-400 font-medium">
                例：姫路城、ピラミッド、万里の長城など
              </span>
            </p>
          </InfoBlock>

          <InfoBlock title="2. 自然遺産">
            <p>
              独自の生態系、地形、地質、絶滅の恐れがある動植物の生息地など、
              <span className="font-bold text-slate-900 mx-1">地球の自然</span>
              が生み出した顕著な価値を持つもの。
              <br />
              <span className="text-[12px] text-slate-400 font-medium">
                例：屋久島、ガラパゴス諸島、グランド・キャニオンなど
              </span>
            </p>
          </InfoBlock>

          <InfoBlock title="3. 複合遺産">
            <p>
              <HighlightIndigo>文化遺産と自然遺産の両方</HighlightIndigo>
              の価値を兼ね備えているもの。世界全体でも登録数は比較的少なめです。
              <br />
              <span className="text-[12px] text-slate-400 font-medium">
                例：マチュ・ピチュ、マウント・ピラトゥスなど
              </span>
            </p>
          </InfoBlock>
        </div>

        {/* 検定対策の補足 */}
        <InfoBlock title="試験のポイント">
          <p>
            世界遺産の大半は「文化遺産」が占めています。また、かつては文化遺産と自然遺産で評価基準が分かれていましたが、現在は
            <span className="font-bold text-slate-900 mx-1">
              統合された10項目の登録基準
            </span>
            によって判断されます。
          </p>
        </InfoBlock>
      </div>
    </section>
  );
};

import React from "react";
import { Landmark, CheckCircle, Award, Tent, TreePine } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface CriteriaSectionProps {
  title: string;
}

export const CriteriaSection = ({ title }: CriteriaSectionProps) => {
  return (
    <section id="criteria" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={Award} />

      <div className="space-y-8">
        <SectionText>
          世界遺産として登録されるためには、10項目ある
          <HighlightIndigo>「登録基準（クライテリア）」</HighlightIndigo>
          のうち、少なくとも1つ以上を満たしている必要があります。
          以前は文化遺産と自然遺産で基準が分かれていましたが、現在は
          <HighlightBlack>10項目に統合</HighlightBlack>されています。
        </SectionText>

        {/* 文化遺産の基準 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-slate-900 pl-3">
            <Landmark size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              文化遺産の基準 (i) 〜 (vi)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionCard
              num="i"
              title="人類の創造的傑作"
              desc="人類の創造的才能を表現する傑作であること。"
            />
            <CriterionCard
              num="ii"
              title="文化・価値観の交流"
              desc="建築、科学技術、記念碑、都市計画、景観設計の発展に重要な影響を与えた、ある期間にわたる価値観の交流又はある文化圏内での価値観の交流を示すものである。"
            />
            <CriterionCard
              num="iii"
              title="文明・伝統の証拠"
              desc="現存するか消滅しているかにかかわらず、ある文化的伝統又は文明の存在を伝承する物証として無二の存在(少なくとも希有な存在)である。"
            />
            <CriterionCard
              num="iv"
              title="建築・技術の見本"
              desc="歴史上の重要な段階を物語る建築物、その集合体、科学技術の集合体、あるいは景観を代表する顕著な見本である。"
            />
            <CriterionCard
              num="v"
              title="伝統的集落・土地利用"
              desc="あるひとつの文化(または複数の文化)を特徴づけるような伝統的居住形態若しくは陸上・海上の土地利用形態を代表する顕著な見本である。又は、人類と環境とのふれあいを代表する顕著な見本である(特に不可逆的な変化によりその存続が危ぶまれているもの)"
            />
            <CriterionCard
              num="vi"
              title="出来事・信仰・伝統"
              desc="顕著な普遍的価値を有する出来事(行事)、生きた伝統、思想、信仰、芸術的作品、あるいは文学的作品と直接または実質的関連がある(この基準は他の基準とあわせて用いられることが望ましい)。"
            />
          </div>
        </div>

        {/* 自然遺産の基準 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-slate-900 pl-3">
            <TreePine size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              自然遺産の基準 (vii) 〜 (x)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionCard
              num="vii"
              title="自然美・自然現象"
              desc="最上級の自然現象、又は、類まれな自然美・美的価値を有する地域を包含する。"
            />
            <CriterionCard
              num="viii"
              title="地球の歴史・地質"
              desc="生命進化の記録や、地形形成における重要な進行中の地質学的過程、あるいは重要な地形学的又は自然地理学的特徴といった、地球の歴史の主要な段階を代表する顕著な見本である。"
            />
            <CriterionCard
              num="ix"
              title="生態系・進化の過程"
              desc="陸上・淡水域・沿岸・海洋の生態系や動植物群集の進化、発展において、重要な進行中の生態学的過程又は生物学的過程を代表する顕著な見本である。"
            />
            <CriterionCard
              num="x"
              title="生物多様性・絶滅危惧種"
              desc="学術上又は保全上顕著な普遍的価値を有する絶滅のおそれのある種の生息地など、生物多様性の生息域内保全にとって最も重要な自然の生息地を包含する。"
            />
          </div>
        </div>

        {/* 試験の重要ポイント */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          <InfoBlock title="試験のポイント：基準(vi)の特殊性">
            <p>
              基準 <HighlightIndigo>(vi)</HighlightIndigo>{" "}
              は、できる限り他の基準と組み合わせて使うことが推奨されています。
              ただし、<HighlightBlack>原爆ドーム（日本）</HighlightBlack>や
              <HighlightBlack>負の遺産</HighlightBlack>
              などは、基準(vi)のみで登録されている稀なケースです。
            </p>
          </InfoBlock>

          <InfoBlock title="複合遺産の条件">
            <p>
              <HighlightIndigo>文化遺産(i〜vi)</HighlightIndigo>と
              <HighlightIndigo>自然遺産(vii〜x)</HighlightIndigo>
              の両方から、それぞれ1つ以上の基準を満たすと「複合遺産」となります。
            </p>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
};

const CriterionCard = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm flex gap-3">
    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-900 text-sm italic">
      {num}
    </span>
    <div className="space-y-1">
      <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">
        {title}
      </h4>
      <p className="text-[12px] md:text-sm text-slate-500 leading-snug">
        {desc}
      </p>
    </div>
  </div>
);

import React from "react";
import {
  Landmark,
  Church,
  Castle,
  Columns,
  Building2,
  Paintbrush,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface ArchitectureSectionProps {
  title: string;
}

export const ArchitectureSection = ({ title }: ArchitectureSectionProps) => {
  const styles = [
    {
      id: "byzantine",
      name: "ビザンツ様式",
      period: "4世紀〜",
      features: "巨大なドーム（円蓋）と、内部の豪華なモザイク画が最大の特徴。",
      heritage: "ハギア・ソフィア（トルコ）、サン・ヴィターレ聖堂（イタリア）",
      icon: (
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
          B
        </div>
      ),
    },
    {
      id: "romanesque",
      name: "ロマネスク様式",
      period: "11世紀〜",
      features: "厚い壁、小さな窓、半円アーチ。重厚で「石の塊」のような外観。",
      heritage:
        "ピサの斜塔（イタリア）、サン・ティアゴ・デ・コンポステーラ（スペイン）",
      icon: (
        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 font-bold">
          R
        </div>
      ),
    },
    {
      id: "gothic",
      name: "ゴシック様式",
      period: "12世紀後半〜",
      features:
        "尖頭アーチ、飛梁（フライング・バットレス）、ステンドグラス。高く、明るい空間。",
      heritage: "シャルトル大聖堂（フランス）、ケルン大聖堂（ドイツ）",
      icon: <Church size={18} className="text-indigo-600" />,
    },
    {
      id: "renaissance",
      name: "ルネサンス様式",
      period: "15世紀〜",
      features:
        "古代ギリシャ・ローマの再現。左右対称（シンメトリー）と黄金比による調和。",
      heritage:
        "サン・ピエトロ大聖堂（バチカン）、フィレンツェ歴史地区（イタリア）",
      icon: <Columns size={18} className="text-indigo-600" />,
    },
    {
      id: "baroque",
      name: "バロック様式",
      period: "17世紀〜",
      features:
        "動的で豪華絢爛な装飾。楕円の活用や光の演出による、劇場のような劇的な空間。",
      heritage:
        "ヴェルサイユ宮殿（フランス）、シェーンブルン宮殿（オーストリア）",
      icon: <Castle size={18} className="text-indigo-600" />,
    },
    {
      id: "rococo",
      name: "ロココ様式",
      period: "18世紀〜",
      features:
        "宮廷人の愛好した繊細で優美な内装。曲線多用とパステルカラー、貝殻模様の装飾。",
      heritage: "ヴィースの巡礼聖堂（ドイツ）、サンスーシ宮殿（ドイツ）",
      icon: <Paintbrush size={18} className="text-indigo-600" />,
    },
    {
      id: "modern",
      name: "近代建築",
      period: "19世紀末〜",
      features:
        "鉄、ガラス、コンクリートの活用。装飾を排した機能美と合理性を追求。",
      heritage: "サヴォア邸（フランス）、バウハウス関連遺産（ドイツ）",
      icon: <Building2 size={18} className="text-indigo-600" />,
    },
  ];

  return (
    <section id="architecture" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={Landmark} />

      <div className="space-y-8">
        <SectionText>
          ヨーロッパの世界遺産を理解する上で、
          <HighlightIndigo>「建築様式」</HighlightIndigo>の変遷は欠かせません。
          キリスト教の発展とともに変化した中世の様式から、人間中心のルネサンス、そして現代の近代建築まで、
          <HighlightBlack>時代の価値観が形となって表現</HighlightBlack>
          されています。
        </SectionText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {styles.map((s) => (
            <ArchitectureCard
              key={s.id}
              name={s.name}
              period={s.period}
              features={s.features}
              heritage={s.heritage}
              icon={s.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6">
          <InfoBlock title="試験のポイント：ゴシックとロマネスクの見分け方">
            <p>
              3級試験では、<HighlightIndigo>「アーチの形」</HighlightIndigo>
              がよく問われます。 半円形のアーチなら
              <HighlightBlack>ロマネスク</HighlightBlack>、
              尖ったアーチ（尖頭アーチ）なら
              <HighlightBlack>ゴシック</HighlightBlack>
              と覚えましょう。また、ステンドグラスが本格化したのはゴシックからです。
            </p>
          </InfoBlock>

          <InfoBlock title="ル・コルビュジエと近代建築">
            <p>
              近代建築の巨匠<HighlightIndigo>ル・コルビュジエ</HighlightIndigo>
              の作品群は、 7カ国にまたがる
              <HighlightBlack>「トランスバウンダリー・サイト」</HighlightBlack>
              として登録されています。
              日本の国立西洋美術館もその構成資産の一つであることは、試験の超頻出項目です。
            </p>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
};

const ArchitectureCard = ({
  name,
  period,
  features,
  heritage,
  icon,
}: {
  name: string;
  period: string;
  features: string;
  heritage: string;
  icon: React.ReactNode;
}) => (
  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-black text-slate-900 leading-none">{name}</h4>
        <p className="text-[10px] text-indigo-600 font-bold mt-1 uppercase tracking-wider">
          {period}
        </p>
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-slate-600 leading-relaxed italic">
        「{features}」
      </p>
      <div className="pt-2 border-t border-slate-50">
        <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">
          代表的な遺産
        </p>
        <p className="text-[13px] text-slate-700 font-medium">{heritage}</p>
      </div>
    </div>
  </div>
);

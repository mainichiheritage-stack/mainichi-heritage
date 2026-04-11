import React from "react";
import { AlertTriangle, ShieldAlert, History, XCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface DangerSectionProps {
  title: string;
}

export const DangerSection = ({ title }: DangerSectionProps) => {
  return (
    <section id="danger" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={AlertTriangle} />

      <div className="space-y-8">
        <SectionText>
          世界遺産リストに記載されている遺産のうち、紛争、自然災害、乱開発、密猟などによってその
          <HighlightIndigo>「顕著な普遍的価値（OUV）」</HighlightIndigo>
          が損なわれる恐れがあるものは、
          <HighlightIndigo>
            「危機遺産（危機にさらされている世界遺産リスト）」
          </HighlightIndigo>
          に登録されます。
          <br />
          2025年7月時点で、世界遺産リストに登録されている全1,248件のうち、
          <HighlightBlack>53件</HighlightBlack>が危機遺産に登録されています。
        </SectionText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock title="登録の目的">
            <p className="text-sm">
              決して「不名誉な格付け」ではありません。国際社会に危機を知らせ、
              <HighlightIndigo>世界遺産基金からの財政支援</HighlightIndigo>
              や技術協力を優先的に受け、修復・保護を加速させることが目的です。
            </p>
          </InfoBlock>
          <InfoBlock title="登録の決定">
            <p className="text-sm">
              <HighlightIndigo>世界遺産委員会</HighlightIndigo>
              が決定します。通常は保有国の同意が必要ですが、緊急時には
              <HighlightBlack>
                保有国の同意なしで登録されるケース
              </HighlightBlack>
              もあります（緊急的登録推薦など）。
            </p>
          </InfoBlock>
        </div>

        {/* 危機遺産になる主な理由 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              危機の主な要因
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-center">
              <p className="font-bold text-red-700 text-sm">武力紛争・戦争</p>
              <p className="text-[11px] text-red-600 mt-1">破壊や略奪の危険</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-center">
              <p className="font-bold text-orange-700 text-sm">
                開発・観光被害
              </p>
              <p className="text-[11px] text-orange-600 mt-1">
                ダム建設や過剰な観光
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
              <p className="font-bold text-blue-700 text-sm">
                自然災害・環境変化
              </p>
              <p className="text-[11px] text-blue-600 mt-1">
                地震、洪水、気候変動
              </p>
            </div>
          </div>
        </div>

        {/* 登録抹消の事例（試験頻出） */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              世界遺産リストからの抹消
            </h3>
          </div>
          <SectionText>
            危機遺産に登録された後、改善が見られず価値が完全に失われたと判断された場合、
            <HighlightIndigo>世界遺産リストから削除（抹消）</HighlightIndigo>
            されます。これは非常に稀なケースです。
          </SectionText>

          <div className="space-y-3">
            <div className="p-4 border-l-4 border-slate-200 bg-white shadow-sm space-y-1">
              <h4 className="font-bold text-slate-900">
                アラビアオリックスの保護区（オマーン）
              </h4>
              <p className="text-xs text-slate-500">
                資源開発による保護区の縮小と密猟により、2007年に
                <HighlightBlack>世界初の抹消</HighlightBlack>となりました。
              </p>
            </div>
            <div className="p-4 border-l-4 border-slate-200 bg-white shadow-sm space-y-1">
              <h4 className="font-bold text-slate-900">
                ドレスデン・エルベ渓谷（ドイツ）
              </h4>
              <p className="text-xs text-slate-500">
                渋滞緩和のための橋建設が景観を損なうとして、2009年に抹消されました。
              </p>
            </div>
            <div className="p-4 border-l-4 border-slate-200 bg-white shadow-sm space-y-1">
              <h4 className="font-bold text-slate-900">
                リヴァプール・海商都市（イギリス）
              </h4>
              <p className="text-xs text-slate-500">
                再開発計画が歴史的な港町の価値を損なうとして、2021年に抹消されました。
              </p>
            </div>
          </div>
        </div>

        {/* 最新時事：パレスチナ */}
        <InfoBlock title="時事トピック：パレスチナの事例">
          <div className="flex gap-4 items-start">
            <History className="shrink-0 text-indigo-600" size={20} />
            <p className="text-sm">
              2024年、紛争による破壊の危機からパレスチナの
              <HighlightIndigo>
                「聖ヒラリオン修道院／テル・ウンム・アメル」
              </HighlightIndigo>
              が緊急登録と同時に危機遺産にも記載されました。このように、緊急事態下では迅速な保護のために危機遺産制度が活用されます。
            </p>
          </div>
        </InfoBlock>
      </div>
    </section>
  );
};

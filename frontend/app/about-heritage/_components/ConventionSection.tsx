import React from "react";
import { ScrollText, HelpCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface ConventionSectionProps {
  title: string;
}

export const ConventionSection = ({ title }: ConventionSectionProps) => {
  return (
    <section id="convention" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={ScrollText} />

      <div className="space-y-8">
        {/* 基本概念 */}
        <div className="space-y-4">
          <SectionText>
            正式名称は「世界の文化遺産及び自然遺産の保護に関する条約」といい、
            <HighlightIndigo>1972年</HighlightIndigo> に採択されました。
            最大の特長は、
            <HighlightIndigo>
              文化遺産と自然遺産を1つの条約で守る
            </HighlightIndigo>
            という点です。 これは「人間の文化と自然は切り離せない」という
            <HighlightBlack>一元的な考え方</HighlightBlack>に基づいています。
          </SectionText>
        </div>

        {/* 責任と協力（危機遺産） */}
        <div className="space-y-4">
          <SectionText>
            条約の理念は「国際的な協力」ですが、
            <HighlightIndigo>
              世界遺産を守る第一の責任は、その遺産を持つ国（当事国）にある
            </HighlightIndigo>
            と定められています。
            <br />
            強制力や罰則はありませんが、価値が失われる危険がある場合は
            <HighlightIndigo>「危機遺産」</HighlightIndigo> に登録され、
            <HighlightBlack>世界遺産基金</HighlightBlack>
            や各国の国際的な援助を受けながら改善の努力がなされます。
          </SectionText>

          <InfoBlock title="世界遺産基金">
            <p>
              締約国からの<HighlightIndigo>分担金（強制）</HighlightIndigo>
              や寄付金（任意）で成り立つユネスコの信託基金。
              世界遺産委員会が決定した目的（保護や調査）にのみ使用されます。
            </p>
          </InfoBlock>
        </div>

        {/* 負の遺産と平和 */}
        <div className="space-y-4">
          <SectionText>
            世界遺産には「平和の礎」を築く側面もあり、人類が過去犯した悲惨な過ちを繰り返さない教訓としての
            <HighlightBlack>「負の遺産」</HighlightBlack> や、2023年に定義された
            <HighlightIndigo>「記憶の場」</HighlightIndigo>
            と呼ばれる遺産も存在します。
            <br />
            ただし、「負の遺産」というのは日本独自の通称であり、ユネスコ公式用語ではありません。
          </SectionText>
        </div>

        {/* アスワンハイダムの歴史 */}
        <InfoBlock title="世界遺産条約のきっかけ：アブ・シンベル神殿救済">
          <p className="space-y-2">
            1950年代、人々の安全と電力生産を目的とし、エジプトのナイル川反乱を防止する
            <HighlightIndigo>アスワン・ハイ・ダム</HighlightIndigo>
            建設が決定されました。ただし、ダムの建設によってナイル川の水位が上昇し、エジプトとスーダンにまたがる
            <HighlightIndigo>
              ヌビア遺跡（アブ・シンベル神殿など）
            </HighlightIndigo>
            が水没の危機に瀕しました。
            そこでユネスコが国際的な救済キャンペーン（ヌビアの遺跡群救済キャンペーン）を展開し、約50カ国の協力で移設に成功しました。
            <br />
            <span className="text-xs text-slate-500 block mt-2">
              当時のフランス文化大臣アンドレ・マルローは、この時「人類共通の遺産」という理念を掲げ演説し、後の世界遺産の理念形成に大きな影響を与えました。
            </span>
          </p>
        </InfoBlock>

        {/* 日本の批准 */}
        <InfoBlock title="日本の批准：1992年">
          <p>
            日本が条約を批准したのは <HighlightIndigo>1992年</HighlightIndigo>
            と世界的にみると遅めでした。
            背景には文化財保護法との兼ね合いもありましたが、批准後は世界遺産基金への分担金拠出額が世界トップクラスであり、国際的な責任を果たす姿勢が示されています。
          </p>
        </InfoBlock>
      </div>
    </section>
  );
};

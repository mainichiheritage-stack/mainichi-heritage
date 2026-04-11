import { Globe } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface AboutSectionProps {
  title: string;
}

export const AboutSection = ({ title }: AboutSectionProps) => {
  return (
    <section id="about" className="scroll-mt-24 space-y-10">
      {/* 見出し */}
      <SectionHeader title={title} icon={Globe} />

      {/* コンテンツ */}
      <div className="space-y-8">
        <SectionText>
          世界遺産とは、地球の成り立ちや人類の歴史が生み出した
          <HighlightIndigo>
            「顕著な普遍的価値（OUV = Outstanding Universal Value）」
          </HighlightIndigo>
          を持つ自然や文化財のことです。
          <br />
          これらを
          <HighlightIndigo>「世界遺産条約」</HighlightIndigo>に基づき
          <HighlightIndigo>「世界遺産リスト」</HighlightIndigo>
          に記載して、国際的に協力して守ってゆく仕組みです。
        </SectionText>

        <InfoBlock title="最初の世界遺産">
          <p>
            世界遺産の歴史は
            <HighlightBlack>1978年</HighlightBlack>
            に始まりました。
            この年、ガラパゴス諸島やイエローストーン国立公園などを含む
            <HighlightIndigo>12件</HighlightIndigo>
            が世界遺産として最初に登録されました。
          </p>
        </InfoBlock>

        <InfoBlock title="世界遺産の理念">
          <p>
            「国家間の境界を越え、全人類にとって共通の重要性を持つ」という考え方が、すべての活動の根底にあります。
          </p>
        </InfoBlock>
      </div>
    </section>
  );
};

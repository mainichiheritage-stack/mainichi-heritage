import { Hand, Cross, Moon, MapPin, Landmark } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface ReligionSectionProps {
  title: string;
}

export const ReligionSection = ({ title }: ReligionSectionProps) => {
  return (
    <section id="religion" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={Landmark} />

      <div className="space-y-8">
        <SectionText>
          世界遺産の多くは宗教的な背景を持って誕生しました。特に世界三大宗教（
          <HighlightIndigo>仏教・キリスト教・イスラム教</HighlightIndigo>
          ）の聖地や寺院は、その宗教の広がりや歴史を証明する重要な「顕著な普遍的価値」として認められています。
        </SectionText>

        {/* 仏教 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-orange-500 pl-3">
            <Hand size={20} className="text-orange-500" />
            <h3 className="text-lg font-black text-slate-900">
              仏教（Buddhism）
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                紀元前5世紀頃、ガウタマ・シッダールタによってインドで開かれました。後にアジア全域に広がり、各地で独自の建築様式（石窟寺院、塔など）を生みました。
              </p>
              <p className="text-xs">
                <HighlightBlack>【特徴】</HighlightBlack>{" "}
                悟りを開くことを目指す。初期は偶像崇拝を否定していたが、後に仏像が作られるようになった。
              </p>
            </div>
            <InfoBlock title="試験に出る関連遺産">
              <ul className="text-xs space-y-1">
                <li>
                  <HighlightIndigo>ルンビニー</HighlightIndigo>
                  （ネパール）：釈迦の生誕地。
                </li>
                <li>
                  <HighlightIndigo>ボロブドゥールの仏教寺院群</HighlightIndigo>
                  （インドネシア）：世界最大級の仏教寺院。
                </li>
                <li>
                  <HighlightIndigo>法隆寺地域の仏教建造物</HighlightIndigo>
                  （日本）：世界最古の木造建築。
                </li>
              </ul>
            </InfoBlock>
          </div>
        </div>

        {/* キリスト教 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-3">
            <Cross size={20} className="text-blue-500" />
            <h3 className="text-lg font-black text-slate-900">
              キリスト教（Christianity）
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                1世紀頃、イエス・キリストによってユダヤ教を母体に誕生しました。ローマ帝国の国教となり、ヨーロッパを中心に巨大な大聖堂や修道院が建設されました。
              </p>
              <p className="text-xs">
                <HighlightBlack>【特徴】</HighlightBlack>{" "}
                唯一神ヤハウェを信仰。聖書を教典とし、教派（カトリック、プロテスタント、正教など）により建築様式が大きく異なる。
              </p>
            </div>
            <InfoBlock title="試験に出る関連遺産">
              <ul className="text-xs space-y-1">
                <li>
                  <HighlightIndigo>バチカン市国</HighlightIndigo>
                  ：カトリックの総本山。
                </li>
                <li>
                  <HighlightIndigo>
                    サンティアゴ・デ・コンポステーラ
                  </HighlightIndigo>
                  （スペイン）：聖ヤコブの墓がある巡礼地。
                </li>
                <li>
                  <HighlightIndigo>キエフの聖ソフィア大聖堂</HighlightIndigo>
                  （ウクライナ）：東方正教会の建築。
                </li>
              </ul>
            </InfoBlock>
          </div>
        </div>

        {/* イスラム教 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
            <Moon size={20} className="text-emerald-500" />
            <h3 className="text-lg font-black text-slate-900">
              イスラム教（Islam）
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                7世紀、預言者ムハンマドが神（アッラー）の啓示を受け、アラビア半島で開かれました。モスク（礼拝堂）やミナレット（光塔）が特徴的な景観を作ります。
              </p>
              <p className="text-xs">
                <HighlightBlack>【特徴】</HighlightBlack>{" "}
                偶像崇拝を厳格に禁止。そのため、幾何学模様（アラベスク）や文字（カリグラフィー）による装飾が発達した。
              </p>
            </div>
            <InfoBlock title="試験に出る関連遺産">
              <ul className="text-xs space-y-1">
                <li>
                  <HighlightIndigo>
                    メッカのマスジド・アル・ハラーム
                  </HighlightIndigo>
                  ：最大の聖地（※世界遺産ではないが重要知識）。
                </li>
                <li>
                  <HighlightIndigo>カイロ歴史地区</HighlightIndigo>
                  （エジプト）：「千のミナレットが立つ街」。
                </li>
                <li>
                  <HighlightIndigo>アルハンブラ宮殿</HighlightIndigo>
                  （スペイン）：イスラム建築の最高傑作の一つ。
                </li>
              </ul>
            </InfoBlock>
          </div>
        </div>

        {/* 特別な場所：エルサレム */}
        <div className="mt-8">
          <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl overflow-hidden relative">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="text-indigo-400" />
                <h3 className="text-lg font-black">
                  三宗教共通の聖地：エルサレム
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <HighlightIndigo>
                  「エルサレムの旧市街とその城壁群」
                </HighlightIndigo>
                は、ユダヤ教、キリスト教、イスラム教の3つの宗教すべてにとっての聖地です。
                <br />
                ・ユダヤ教：<HighlightBlack>嘆きの壁</HighlightBlack>
                <br />
                ・キリスト教：<HighlightBlack>聖墳墓教会</HighlightBlack>
                <br />
                ・イスラム教：<HighlightBlack>岩のドーム</HighlightBlack>
                <br />
                これらが狭いエリアに共存している特殊性が、試験でも非常に重要視されます。
              </p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Landmark size={80} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

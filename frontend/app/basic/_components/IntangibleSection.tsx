import { Users, Sparkles, Languages } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionText, HighlightIndigo, HighlightBlack } from "./SectionText";
import { InfoBlock } from "./InfoBlock";

interface IntangibleSectionProps {
  title: string;
}

export const IntangibleSection = ({ title }: IntangibleSectionProps) => {
  return (
    <section id="intangible" className="scroll-mt-24 space-y-10">
      <SectionHeader title={title} icon={Sparkles} />

      <div className="space-y-8">
        <SectionText>
          ユネスコには、不動産を対象とした「世界遺産」のほかに、形のない文化を対象とした
          <HighlightIndigo>「無形文化遺産」</HighlightIndigo>があり、
          <HighlightIndigo>無形文化遺産条約</HighlightIndigo>
          によって、保護されています。
          <br /> また、記録物を対象とした
          <HighlightIndigo>「世界の記憶」</HighlightIndigo>
          があり、これらを合わせてユネスコの3大遺産事業と呼ぶことがあります。
        </SectionText>

        {/* 無形文化遺産 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">無形文化遺産</h3>
          </div>
          <SectionText>
            芸能、社会的慣習、儀式、伝統工芸技術などが対象です。世界遺産が「不動産」を守るのに対し、こちらは
            <HighlightIndigo>
              「人間」が受け継いできた形のない文化
            </HighlightIndigo>
            を守ります。
          </SectionText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock title="代表的な日本の事例">
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                <li>
                  <span className="font-bold text-slate-900">和食</span>
                  （日本人の伝統的な食文化）
                </li>
                <li>
                  <span className="font-bold text-slate-900">
                    能楽、歌舞伎、文楽
                  </span>
                </li>
                <li>
                  <span className="font-bold text-slate-900">和紙</span>
                  （日本の手漉和紙技術）
                </li>
                <li>
                  <span className="font-bold text-slate-900">風流踊</span>
                  （盆踊りなど）
                </li>
              </ul>
            </InfoBlock>
            <InfoBlock title="試験のポイント">
              <p className="text-xs">
                世界遺産とは
                <HighlightBlack>
                  別の条約（無形文化遺産保護条約）
                </HighlightBlack>
                に基づいています。そのため、「世界遺産リスト」には含まれません。
              </p>
            </InfoBlock>
          </div>
        </div>

        {/* 世界の記憶 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Languages size={20} className="text-slate-900" />
            <h3 className="text-lg font-black text-slate-900">
              世界の記憶（世界記憶遺産）
            </h3>
          </div>
          <SectionText>
            古文書、楽譜、映画、記録写真など、歴史的に価値のある
            <HighlightIndigo>「記録物」</HighlightIndigo>
            が対象です。デジタル化による保存やアクセスを促進することを目的としています。
          </SectionText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock title="代表的な日本の事例">
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                <li>
                  <span className="font-bold text-slate-900">
                    山本作兵衛による炭鉱画
                  </span>
                  （国内第1号）
                </li>
                <li>
                  <span className="font-bold text-slate-900">御堂関白記</span>
                  （藤原道長の日記）
                </li>
                <li>
                  <span className="font-bold text-slate-900">
                    舞鶴引揚記念館収蔵資料
                  </span>
                </li>
              </ul>
            </InfoBlock>
            <InfoBlock title="特徴的なルール">
              <p className="text-xs">
                他の2つと異なり、
                <HighlightBlack>
                  政府を通さなくても個人や団体が直接申請できる
                </HighlightBlack>
                点が大きな特徴です（※現在は政府の関与を強める制度変更がなされています）。
              </p>
            </InfoBlock>
          </div>
        </div>

        {/* 比較まとめ表 */}
        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-2 font-bold text-slate-900">区分</th>
                <th className="px-4 py-2 font-bold text-slate-900">対象</th>
                <th className="px-4 py-2 font-bold text-slate-900">日本の数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic">
              <tr>
                <td className="px-4 py-3 font-bold">世界遺産</td>
                <td className="px-4 py-3">不動産（記念物・自然）</td>
                <td className="px-4 py-3 text-indigo-600 font-black text-lg">
                  26件
                </td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold">無形文化遺産</td>
                <td className="px-4 py-3">芸能・慣習・技術</td>
                <td className="px-4 py-3">23件</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold">世界の記憶</td>
                <td className="px-4 py-3">記録物（文書・画像）</td>
                <td className="px-4 py-3">9件</td>
              </tr>
            </tbody>
          </table>
          <p className="p-2 text-[10px] text-slate-400 text-center bg-white border-t border-slate-100">
            ※件数は2026年4月現在の概数です。
          </p>
        </div>
      </div>
    </section>
  );
};

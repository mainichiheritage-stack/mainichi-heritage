type CriterionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface CriterionInfo {
  id: CriterionId;
  no: string;
  label: string;
  description: string;
}

export const WORLD_HERITAGE_CRITERIA: Record<CriterionId, CriterionInfo> = {
  1: {
    id: 1,
    no: "(i)",
    label: "人類の創造的才能",
    description: "人間の創造的才能を表す傑作である。",
  },
  2: {
    id: 2,
    no: "(ii)",
    label: "価値観の交流",
    description:
      "建築、科学技術、記念碑、都市計画、景観設計の発展に重要な影響を与えた、ある期間にわたる価値観の交流又はある文化圏内での価値観の交流を示すものである。",
  },
  3: {
    id: 3,
    no: "(iii)",
    label: "文明・伝統の証拠",
    description:
      "現存するか消滅しているかにかかわらず、ある文化的伝統又は文明の存在を伝承する物証として無二の存在(少なくとも希有な存在)である。",
  },
  4: {
    id: 4,
    no: "(iv)",
    label: "建築・技術の見本",
    description:
      "歴史上の重要な段階を物語る建築物、その集合体、科学技術の集合体、あるいは景観を代表する顕著な見本である。",
  },
  5: {
    id: 5,
    no: "(v)",
    label: "伝統的集落・土地利用",
    description:
      "あるひとつの文化(または複数の文化)を特徴づけるような伝統的居住形態若しくは陸上・海上の土地利用形態を代表する顕著な見本である。又は、人類と環境とのふれあいを代表する顕著な見本である(特に不可逆的な変化によりその存続が危ぶまれているもの)。",
  },
  6: {
    id: 6,
    no: "(vi)",
    label: "出来事・信仰との関連",
    description:
      "顕著な普遍的価値を有する出来事(行事)、生きた伝統、思想、信仰、芸術的作品、あるいは文学的作品と直接または実質的関連がある(この基準は他の基準とあわせて用いられることが望ましい)。",
  },
  7: {
    id: 7,
    no: "(vii)",
    label: "自然美",
    description:
      "最上級の自然現象、又は、類まれな自然美・美的価値を有する地域を包含する。",
  },
  8: {
    id: 8,
    no: "(viii)",
    label: "地球の歴史の主要な段階",
    description:
      "生命進化の記録や、地形形成における重要な進行中の地質学的過程、あるいは重要な地形学的又は自然地理学的特徴といった、地球の歴史の主要な段階を代表する顕著な見本である。",
  },
  9: {
    id: 9,
    no: "(ix)",
    label: "生態系・生物の進化",
    description:
      "陸上・淡水域・沿岸・海洋の生態系や動植物群集の進化、発展において、重要な進行中の生態学的過程又は生物学的過程を代表する顕著な見本である。",
  },
  10: {
    id: 10,
    no: "(x)",
    label: "生物多様性",
    description:
      "学術上又は保全上顕著な普遍的価値を有する絶滅のおそれのある種の生息地など、生物多様性の生息域内保全にとって最も重要な自然の生息地を包含する。",
  },
};

export const getCriterionByNo = (noStr: number) => {
  return Object.values(WORLD_HERITAGE_CRITERIA).find((c) => c.id === noStr);
};

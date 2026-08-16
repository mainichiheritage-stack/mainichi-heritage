// 画面側で環境変数を管理するためのファイル

export const API_BASE_URL =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "") || "";

export const NEXT_PUBLIC_AXIOM_DATASET =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_AXIOM_DATASET
    : "") || "";

export const NEXT_PUBLIC_AXIOM_TOKEN =
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_AXIOM_TOKEN : "") ||
  "";

const getR2BaseUrl = () => {
  // ステージング環境orローカル開発環境
  if (
    process.env.NEXT_PUBLIC_API_BASE_URL?.includes("stg") ||
    process.env.NODE_ENV === "development"
  ) {
    return "https://pub-11613cacfa20446fb4b7ab981c2e6006.r2.dev";
  }
  // 本番環境
  return "https://pub-a381eb8984ac405cb2ba44a0641b294f.r2.dev";
};

export const R2_BASE_URL = getR2BaseUrl();

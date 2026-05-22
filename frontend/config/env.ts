// 画面側で環境変数を管理するためのファイル

export const API_BASE_URL =
  (typeof process !== "undefined"
    ? process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
    : "") || "";

export const NEXT_PUBLIC_AXIOM_DATASET =
  (typeof process !== "undefined"
    ? process.env.AXIOM_DATASET || process.env.NEXT_PUBLIC_AXIOM_DATASET
    : "") || "";

export const NEXT_PUBLIC_AXIOM_TOKEN =
  (typeof process !== "undefined"
    ? process.env.AXIOM_TOKEN || process.env.NEXT_PUBLIC_AXIOM_TOKEN
    : "") || "";

import { z } from "zod";

// --- 共通ルール ---

// メール
const emailRule = z
  .string()
  .min(1, "メールアドレスを入力してください")
  // 一般的なメールアドレスのフォーマット（@と.を含み、スペースがない）
  .regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "有効なメールアドレスの形式で入力してください",
  );

// ニックネーム：漢字・ひらがな・カタカナOK / スペースのみ禁止
const nicknameRule = z
  .string()
  .trim() // 前後の空白を自動削除
  .min(1, "ニックネームを入力してください")
  .max(20, "ニックネームは20文字以内で入力してください")
  .regex(
    /^[a-zA-Z0-9!-/:-@[-`{-~]+$/,
    "半角英数字と記号のみ使用できます。スペースは含められません。",
  );

// パスワード：半角英数字記号 8文字以上
const passwordRule = z
  .string()
  .min(8, "パスワードは8文字以上で入力してください")
  .regex(/^[ -~]+$/, "パスワードは半角英数字記号のみ使用できます");

// --- スキーマ定義 ---
// ログイン
export const loginSchema = z.object({
  email: emailRule,
  password: z.string().min(1, "パスワードを入力してください"),
});

// 新規登録
export const authSchema = z
  .object({
    nickname: nicknameRule,
    email: emailRule,
    password: passwordRule,
    password_confirm: z.string().min(1, "確認用パスワードを入力してください"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "パスワードが一致しません",
    path: ["password_confirm"],
  });

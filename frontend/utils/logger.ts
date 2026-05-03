import { Logger } from "next-axiom";

/**
 * ログレベルの型定義
 */
export type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * ログに付随させる詳細情報
 */
export interface LogContext {
  userId?: string | number;
  component?: string;
  error?: unknown;
  [key: string]: unknown;
}

// Axiom ロガーのインスタンス化
const axiom = new Logger();

/**
 * ログ出力の本体処理
 * 開発環境でのコンソール表示と、Axiom への送信を制御
 */
const transport = (level: LogLevel, message: string, context?: LogContext) => {
  // 実行環境の判定
  const isProd = process.env.NODE_ENV === "production";

  // ブラウザ環境の場合pathを取得、サーバー環境の場合は"server-side"とする
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "server-side";

  // 送信データの整形（タイムスタンプと環境情報を自動付与）
  const payload = {
    ...context,
    timestamp: new Date().toISOString(),
    path: currentPath,
    env: process.env.NODE_ENV,
  };

  // 開発環境：ブラウザコンソール出力
  if (!isProd) {
    const styles: Record<LogLevel, string> = {
      info: "color: #007bff; font-weight: bold;",
      warn: "color: #ffc107; font-weight: bold;",
      error: "color: #dc3545; font-weight: bold;",
      debug: "color: #6c757d; font-weight: bold;",
    };
    console.groupCollapsed(
      `%c[${level.toUpperCase()}] ${message}`,
      styles[level],
    );
    console.table(payload); // データを表形式で表示
    console.groupEnd();

    // 開発時もAxiomにログを出したい場合は、returnをコメントアウトする
    return;
  }

  // Axiom への送信
  try {
    // 循環参照エラー対策
    const safeContext =
      context?.error instanceof Error
        ? { ...context, error: context.error.message }
        : context;

    if (level === "debug") {
      axiom.debug(message, safeContext);
    } else {
      axiom[level](message, safeContext);
    }
  } catch (e) {
    console.warn(
      "Axiom transmission failed due to circular structure. Logging message only.",
    );
    axiom[level](message, {
      _logError: "Context contained circular reference",
    });
  }
};

/**
 * アプリケーションで利用
 */
export const log = {
  debug: (msg: string, ctx?: LogContext) => transport("debug", msg, ctx),
  info: (msg: string, ctx?: LogContext) => transport("info", msg, ctx),
  warn: (msg: string, ctx?: LogContext) => transport("warn", msg, ctx),
  error: (msg: string, ctx?: LogContext) => transport("error", msg, ctx),

  /**
   * 指定することでバッファされたログを即時送信する（溜めない）
   */
  flush: async () => {
    try {
      await axiom.flush();
    } catch (e) {
      console.error("Axiom flush failed:", e);
    }
  },
};

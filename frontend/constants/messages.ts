export const LOG_MESSAGES = {
  INFO: {
    // NAVIGATION: "ページ遷移を実行",
    // SEARCH_EXECUTE: "検索処理を開始",
  },
  WARN: {
    NOT_FOUND_HERITAGES: "世界遺産の検索結果が0件です",
    QUIZ_TIMEOUT: "クイズの取得がタイムアウト",
  },
  ERROR: {
    AUTH_FAILED: "認証エラーが発生",
    FAILED_HERITAGE_FETCH: "世界遺産データの取得に失敗",
    FAILED_NOTIFICATION_FETCH: "お知らせの取得に失敗",
    FAILED_QUIZ_FETCH: "クイズの取得に失敗",
  },
} as const;

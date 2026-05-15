const mock = () => mock;

// あらゆるプロパティ参照に対して自分自身（プロキシ）を返す万能プロキシ
const safe = new Proxy(mock, {
  get: (target, prop) => {
    // ESMのデフォルトエクスポートとして自分を返す
    if (prop === "default") return safe;
    // Next.jsが内部でシンボルを触ることがあるため
    if (typeof prop === "symbol") return undefined;
    // それ以外（Readable, promises, readFileSync等）は何を聞かれてもこのプロキシを返す
    return safe;
  },
  // 関数として実行されても（例: mock()）このプロキシを返す
  apply: () => safe,
  // new 演算子で呼ばれても（例: new Readable()）このプロキシを返す
  construct: () => safe,
});

// --- 名前付きエクスポート (Cloudflareのバリデーション対策) ---
// Error: does not provide an export named 'X' と言われたらここに足す

// node:stream / node:fs 関連
export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const Duplex = safe;
export const EventEmitter = safe;
export const promises = safe;
export const readFileSync = () => "";
export const existsSync = () => true;

// OpenTelemetry / API 関連
export const api = safe;
export const opentelemetry = safe;

// デフォルトエクスポート
export default safe;

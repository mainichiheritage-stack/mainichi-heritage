const mock = () => mock;

const safe = new Proxy(mock, {
  get: (target, prop) => {
    if (prop === "default") return safe;
    if (typeof prop === "symbol") return undefined;
    return safe;
  },
  apply: () => safe,
  construct: () => safe,
});

// --- 名前付きエクスポート (Cloudflareのバリデーションを完全に黙らせるリスト) ---

// node:stream / node:events
export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const Duplex = safe;
export const EventEmitter = safe;

// node:fs
export const promises = safe;
export const readFileSync = () => "";
export const existsSync = () => true;
export const writeFile = safe;
export const readFile = safe;

// node:os (今回のエラー 'release' を含む)
export const release = () => "1.0.0";
export const platform = () => "linux";
export const arch = () => "x64";
export const hostname = () => "localhost";
export const homedir = () => "/";
export const tmpdir = () => "/tmp";
export const type = () => "Linux";
export const uptime = () => 0;
export const cpus = () => [];

// node:util / node:url / node:crypto
export const promisify = (f) => f;
export const inherits = safe;
export const format = safe;
export const inspect = safe;
export const URL = globalThis.URL;
export const randomBytes = safe;
export const createHash = safe;

// OpenTelemetry & Others
export const api = safe;
export const opentelemetry = safe;

// デフォルト
export default safe;

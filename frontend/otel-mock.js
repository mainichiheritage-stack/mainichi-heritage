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

// node:fs (今回のエラー 'fstatSync' を解決)
export const fstatSync = () => ({ size: 0, mtime: new Date() });
export const statSync = () => ({ size: 0, mtime: new Date() });
export const lstatSync = () => ({ size: 0, mtime: new Date() });
export const ReadStream = safe;
export const WriteStream = safe;
export const promises = safe;
export const readFileSync = () => "";
export const existsSync = () => true;
export const writeFile = safe;
export const readFile = safe;
export const mkdir = safe;
export const stat = safe;
export const lstat = safe;
export const readdir = safe;
export const createReadStream = safe;
export const createWriteStream = safe;
export const openSync = safe;
export const closeSync = safe;
export const readSync = safe;

// node:crypto
export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const randomFillSync = safe;
export const createHash = safe;
export const createHmac = safe;
export const randomBytes = safe;
export const timingSafeEqual = safe;
export const getCipherInfo = safe;
export const webcrypto = globalThis.crypto || safe;

// node:process
export const env = globalThis.process?.env || {};
export const nextTick = globalThis.queueMicrotask || safe;
export const cwd = () => "/";
export const stderr = safe;
export const stdout = safe;
export const stdin = safe;
export const argv = [];
export const pid = 1;

// node:http / node:https
export const request = safe;
export const get = safe;
export const Agent = safe;
export const createServer = safe;

// node:buffer
export const Buffer = globalThis.Buffer || safe;

// node:stream / node:events
export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const Duplex = safe;
export const EventEmitter = safe;

// node:os
export const release = () => "1.0.0";
export const platform = () => "linux";
export const arch = () => "x64";
export const hostname = () => "localhost";
export const homedir = () => "/";
export const tmpdir = () => "/tmp";
export const type = () => "Linux";
export const uptime = () => 0;
export const cpus = () => [];

// node:util / node:url / node:path / node:querystring
export const promisify = (f) => f;
export const inherits = safe;
export const format = safe;
export const inspect = safe;
export const URL = globalThis.URL;
export const join = safe;
export const resolve = safe;
export const normalize = safe;
export const parse = safe;
export const stringify = safe;

// node:zlib / node:net / node:tls
export const createGzip = safe;
export const createGunzip = safe;
export const connect = safe;
export const createConnection = safe;

// OpenTelemetry & Others
export const api = safe;
export const opentelemetry = safe;

// デフォルト
export default safe;

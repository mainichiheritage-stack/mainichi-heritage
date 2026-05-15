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

// --- 名前付きエクスポート (バリデーションを完全に沈黙させるリスト) ---

// node:http / node:https (今回のエラー 'request' を含む)
export const request = safe;
export const get = safe;
export const Agent = safe;
export const createServer = safe;

// node:zlib (圧縮関連)
export const createGzip = safe;
export const createGunzip = safe;
export const createDeflate = safe;
export const inflate = safe;
export const deflate = safe;
export const gunzip = safe;
export const gzip = safe;

// node:module
export const createRequire = () => () => ({});

// node:process
export const versions = { node: "22.0.0", v8: "12.0.0", uv: "1.0.0" };
export const env = globalThis.process?.env || {};
export const nextTick = globalThis.queueMicrotask || safe;
export const cwd = () => "/";
export const platform = "linux";
export const arch = "x64";
export const argv = [];
export const pid = 1;

// node:os
export const release = () => "1.0.0";
export const hostname = () => "localhost";
export const homedir = () => "/";
export const tmpdir = () => "/tmp";
export const type = () => "Linux";
export const uptime = () => 0;
export const cpus = () => [];
export const networkInterfaces = () => ({});

// node:util
export const promisify = (f) => f;
export const inherits = safe;
export const format = safe;
export const inspect = safe;
export const types = safe;

// node:async_hooks
export const AsyncLocalStorage =
  globalThis.AsyncLocalStorage ||
  class {
    enterWith(value) {
      this.value = value;
    }
    run(value, callback) {
      return callback();
    }
    getStore() {
      return this.value;
    }
  };

// node:fs
export const fstatSync = () => ({ size: 0, mtime: new Date() });
export const statSync = () => ({ size: 0, mtime: new Date() });
export const lstatSync = () => ({ size: 0, mtime: new Date() });
export const readFileSync = () => "";
export const existsSync = () => true;
export const readdirSync = () => [];

// node:path
export const sep = "/";
export const delimiter = ":";
export const join = safe;
export const resolve = safe;
export const relative = safe;
export const dirname = safe;
export const basename = safe;

// node:crypto
export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const sign = safe;
export const verify = safe;
export const createPrivateKey = safe;
export const createPublicKey = safe;
export const webcrypto = globalThis.crypto || safe;
export const createHash = safe;
export const createHmac = safe;

// その他
export const exec = safe;
export const spawn = safe;
export const Buffer = globalThis.Buffer || safe;
export const EventEmitter = safe;
export const Readable = safe;
export const Writable = safe;
export const URL = globalThis.URL;

// OpenTelemetry & Others
export const api = safe;
export const opentelemetry = safe;

export default safe;

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

// node:module / createRequire 対策
export const createRequire = () => () => ({});

// node:process
export const versions = { node: "22.0.0", v8: "12.0.0", uv: "1.0.0" };
export const env = globalThis.process?.env || {};
export const nextTick = globalThis.queueMicrotask || safe;
export const cwd = () => "/";
export const platform = "linux";
export const arch = "x64";

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

// node:path
export const sep = "/";
export const delimiter = ":";
export const join = safe;
export const resolve = safe;

// node:crypto
export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const sign = safe;
export const verify = safe;
export const createPrivateKey = safe;
export const webcrypto = globalThis.crypto || safe;

// その他、ライブラリがインポートしがちなもの
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

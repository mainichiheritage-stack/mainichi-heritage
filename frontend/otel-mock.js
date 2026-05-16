const mock = function () {
  return safe;
};

const safe = new Proxy(mock, {
  get: (target, prop) => {
    if (prop === Symbol.toPrimitive) {
      return (hint) => (hint === "number" ? 0 : "");
    }
    if (prop === "toString" || prop === "valueOf") {
      return () => "";
    }
    if (prop === "default") return safe;
    if (typeof prop === "symbol") return undefined;
    return safe;
  },
  apply: () => safe,
  construct: () => safe,
});

// --- 名前付きエクスポート (バリデーションを通過させるための全リスト) ---

// node:fs (今回の 'readFile' エラー対策)
export const readFile = safe;
export const readFileSync = () => "";
export const writeFile = safe;
export const writeFileSync = safe;
export const promises = safe;
export const fstatSync = () => ({ size: 0, mtime: new Date() });
export const statSync = () => ({ size: 0, mtime: new Date() });
export const lstatSync = () => ({ size: 0, mtime: new Date() });
export const readdirSync = () => [];

// node:stream / node:events / node:zlib
export const Duplex = safe; // 前回の原因
export const PassThrough = safe;
export const Stream = safe;
export const pipeline = safe;
export const finished = safe;
export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const EventEmitter = function () {
  return safe;
};
export const createGzip = safe;
export const createGunzip = safe;

// node:url / node:querystring
export const parse = safe;
export const stringify = safe;
export const format = safe;
export const resolveObject = safe;
export const URL = globalThis.URL;
export const URLSearchParams = globalThis.URLSearchParams;

// node:module
export const createRequire = () => () => ({});

// node:http / node:https
export const request = safe;
export const get = safe;
export const Agent = safe;
export const createServer = safe;

// node:process
export const versions = { node: "22.0.0", v8: "12.0.0", uv: "1.0.0" };
export const env = globalThis.process?.env || {};
export const nextTick = (f) => {
  if (typeof f === "function") globalThis.queueMicrotask(f);
};
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
export const AsyncResource = safe;

// node:path
export const sep = "/";
export const delimiter = ":";
export const join = (...args) => args.filter(Boolean).join("/");
export const resolve = (...args) => args.filter(Boolean).join("/");
export const normalize = (p) => p;
export const basename = (p) => p;
export const dirname = (p) => p;
export const extname = (p) => "";
export const relative = (f, t) => t;
export const isAbsolute = () => true;

// node:crypto
export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const sign = safe;
export const verify = safe;
export const createHash = safe;
export const createHmac = safe;
export const randomBytes = (s) => new Uint8Array(s);
export const webcrypto = globalThis.crypto || safe;

// node:util
export const promisify = (f) => f;
export const inherits = safe;
export const types = safe;
export const inspect = (v) => "";

// node:child_process
export const exec = safe;
export const execSync = safe;
export const spawn = safe;

export const Buffer = globalThis.Buffer || {
  from: () => ({}),
  alloc: () => ({}),
};

// OpenTelemetry / Others
export const api = safe;
export const opentelemetry = safe;

export default safe;

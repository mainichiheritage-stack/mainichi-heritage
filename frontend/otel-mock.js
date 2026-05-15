const mock = function () {
  return safe;
};

const safe = new Proxy(mock, {
  get: (target, prop) => {
    // プリミティブ変換への対応 (Symbol.toPrimitive)
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

// --- 名前付きエクスポート (以下、前回のリストを維持) ---

export const createRequire = () => () => ({});
export const request = safe;
export const get = safe;
export const Agent = safe;
export const createServer = safe;

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

export const release = () => "1.0.0";
export const hostname = () => "localhost";
export const homedir = () => "/";
export const tmpdir = () => "/tmp";
export const type = () => "Linux";
export const uptime = () => 0;
export const cpus = () => [];
export const networkInterfaces = () => ({});

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

export const fstatSync = () => ({ size: 0, mtime: new Date() });
export const statSync = () => ({ size: 0, mtime: new Date() });
export const lstatSync = () => ({ size: 0, mtime: new Date() });
export const readFileSync = () => "";
export const existsSync = () => true;
export const readdirSync = () => [];
export const writeFile = safe;
export const readFile = safe;
export const mkdir = safe;
export const stat = safe;
export const lstat = safe;
export const readdir = safe;
export const createReadStream = safe;
export const createWriteStream = safe;
export const promises = safe;
export const ReadStream = safe;
export const WriteStream = safe;

export const sep = "/";
export const delimiter = ":";
export const join = (...args) => args.join("/");
export const resolve = (...args) => args.join("/");
export const normalize = (p) => p;
export const basename = (p) => p;
export const dirname = (p) => p;
export const extname = (p) => "";
export const relative = (f, t) => t;
export const isAbsolute = () => true;

export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const sign = safe;
export const verify = safe;
export const createHash = safe;
export const createHmac = safe;
export const randomBytes = (s) => new Uint8Array(s);
export const webcrypto = globalThis.crypto || safe;

export const promisify = (f) => f;
export const inherits = safe;
export const format = (...args) => args.join(" ");
export const inspect = (v) => "";
export const types = safe;

export const createGzip = safe;
export const createGunzip = safe;
export const gzip = safe;
export const gunzip = safe;

export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const Duplex = safe;
export const EventEmitter = function () {
  return safe;
};

export const exec = safe;
export const execSync = safe;
export const spawn = safe;
export const spawnSync = safe;

export const Buffer = globalThis.Buffer || {
  from: () => ({}),
  alloc: () => ({}),
};
export const URL = globalThis.URL;

export const api = safe;
export const opentelemetry = safe;

export default safe;

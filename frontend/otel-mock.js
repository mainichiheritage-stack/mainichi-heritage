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

// --- 名前付きエクスポート (バリデーションを完全に黙らせるフルリスト) ---

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
export const nextTick = globalThis.queueMicrotask || safe;
export const cwd = () => "/";
export const platform = "linux";
export const arch = "x64";
export const argv = [];
export const pid = 1;
export const stdout = safe;
export const stderr = safe;
export const stdin = safe;

// node:os
export const release = () => "1.0.0";
export const hostname = () => "localhost";
export const homedir = () => "/";
export const tmpdir = () => "/tmp";
export const type = () => "Linux";
export const uptime = () => 0;
export const cpus = () => [];
export const networkInterfaces = () => ({});

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

// node:fs
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

// node:path
export const sep = "/";
export const delimiter = ":";
export const join = safe;
export const resolve = safe;
export const normalize = safe;
export const basename = safe;
export const dirname = safe;
export const extname = safe;
export const relative = safe;
export const isAbsolute = () => true;

// node:crypto
export const getRandomValues = (v) =>
  globalThis.crypto?.getRandomValues(v) || v;
export const sign = safe;
export const verify = safe;
export const createHash = safe;
export const createHmac = safe;
export const randomBytes = safe;
export const createPrivateKey = safe;
export const createPublicKey = safe;
export const createSecretKey = safe;
export const webcrypto = globalThis.crypto || safe;

// node:util
export const promisify = (f) => f;
export const inherits = safe;
export const format = safe;
export const inspect = safe;
export const types = safe;

// node:zlib
export const createGzip = safe;
export const createGunzip = safe;
export const gzip = safe;
export const gunzip = safe;

// node:stream / node:events / node:net / node:tls
export const Readable = safe;
export const Writable = safe;
export const Transform = safe;
export const Duplex = safe;
export const EventEmitter = safe;
export const connect = safe;
export const createConnection = safe;

// node:child_process
export const exec = safe;
export const execSync = safe;
export const spawn = safe;
export const spawnSync = safe;
export const fork = safe;

// node:buffer
export const Buffer = globalThis.Buffer || safe;

// node:url / node:querystring
export const URL = globalThis.URL;
export const parse = safe;
export const stringify = safe;

// OpenTelemetry & Others
export const api = safe;
export const opentelemetry = safe;

export default safe;

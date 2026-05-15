const mock = () => mock;

mock.createContextKey = () => Symbol.for("ck");
mock.getTracer = () => mock;
mock.asynchronous = () => mock;
mock.iterable = () => mock;

const safe = new Proxy(mock, {
  get: (target, prop) => {
    if (prop === "createContextKey") return target.createContextKey;
    if (prop === "default") return safe;
    if (typeof prop === "symbol") return undefined;
    return safe;
  },
});

export default safe;
export const api = safe;
export const opentelemetry = safe;
export const readFileSync = () => "";
export const existsSync = () => true;
export const promises = safe;

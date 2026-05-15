const mock = () => mock;
mock.createContextKey = () => Symbol.for("ck");
mock.getTracer = () => mock;
const safe = new Proxy(mock, {
  get: (t, p) =>
    p === "createContextKey" ? mock.createContextKey : t[p] || mock,
});
export default safe;
export const api = safe;
export const opentelemetry = safe;

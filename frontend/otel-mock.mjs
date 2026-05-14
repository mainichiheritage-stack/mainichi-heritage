const createSafeMock = () => {
  const mock = (...args) => {
    // api.createContextKey() が呼ばれた際に Symbol を返す
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      args[0].includes("contextKey")
    ) {
      return Symbol.for("ck");
    }
    return mock;
  };
  return new Proxy(mock, {
    get: (target, prop) => {
      if (prop === "createContextKey") return () => Symbol.for("ck");
      if (prop === "resolve" || prop === "toStringTag") return () => "";
      return mock;
    },
  });
};

const safeMock = createSafeMock();

// ESM 用エクスポート
export const api = safeMock;
export const opentelemetry = safeMock;
export default safeMock;

// CommonJS 用エクスポート (Next.js内部用)
if (typeof module !== "undefined") {
  module.exports = safeMock;
  module.exports.api = safeMock;
}

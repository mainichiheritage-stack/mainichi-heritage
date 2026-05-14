const createSafeMock = () => {
  const mock = (...args) => {
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      args[0].includes("contextKey")
    ) {
      return Symbol("ck");
    }
    return mock;
  };
  return new Proxy(mock, {
    get: (target, prop) => {
      if (prop === "createContextKey") return () => Symbol("ck");
      if (prop === "resolve") return () => "";
      return mock;
    },
  });
};

const safeMock = createSafeMock();

// Next.jsが期待する名前でエクスポート
export const api = safeMock;
export const opentelemetry = safeMock;
export default safeMock;

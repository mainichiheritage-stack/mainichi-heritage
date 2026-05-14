const createSafeMock = () => {
  const mock = (...args) => {
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
      // require.resolve() や path.resolve() 等への対応
      if (prop === "resolve") return () => "";
      if (prop === "toStringTag") return "Module";
      return mock;
    },
  });
};

const safeMock = createSafeMock();

// ESM exports
export const api = safeMock;
export const opentelemetry = safeMock;
export default safeMock;

// CommonJS exports
if (typeof module !== "undefined") {
  module.exports = safeMock;
}

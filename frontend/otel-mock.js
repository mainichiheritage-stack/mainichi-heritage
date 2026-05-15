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
      if (prop === "resolve") return () => "";
      if (prop === "toStringTag") return "Module";

      return target;
    },
  });
};

const safeMock = createSafeMock();

// CommonJS 形式
if (typeof module !== "undefined") {
  module.exports = safeMock;
  module.exports.api = safeMock;
  module.exports.opentelemetry = safeMock;
  module.exports.default = safeMock;
}

// ESM 形式
export const api = safeMock;
export const opentelemetry = safeMock;
export default safeMock;

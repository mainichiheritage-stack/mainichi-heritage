// frontend/wrangler-noop.mjs
export const codeFrameColumns = () => "";
export const SourceMapConsumer = function () {};
export default function () {
  return {
    transform: () => ({ code: "" }),
    consume: () => ({}),
  };
}

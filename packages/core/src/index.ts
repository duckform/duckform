import * as Core from "./exports";
export * from "./exports";
import { globalThisPolyfill } from "@duckform/shared";

const AnyGlobal = globalThisPolyfill as any;

if (AnyGlobal?.Designable?.Core) {
  /** @ts-ignore */
  if (module.exports) {
    /** @ts-ignore */
    module.exports = {
      __esModule: true,
      ...AnyGlobal.Designable.Core,
    };
  }
} else {
  AnyGlobal.Designable = AnyGlobal.Designable || {};
  AnyGlobal.Designable.Core = Core;
}

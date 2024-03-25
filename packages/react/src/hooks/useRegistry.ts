import { GlobalRegistry, IDesignerRegistry } from "@duckform/core";
import { globalThisPolyfill } from "@duckform/shared";

export const useRegistry = (): IDesignerRegistry => {
  return (globalThisPolyfill as any).__DESIGNER_REGISTRY__ || GlobalRegistry;
};

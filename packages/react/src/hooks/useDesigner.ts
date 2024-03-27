import { Engine } from "@duckform/core";
import { globalThisPolyfill, isFn } from "@duckform/core/shared";
import { useContext, useEffect } from "react";
import { DesignerEngineContext } from "../context";
export type IEffects = (engine: Engine) => void;

export const useDesigner = (effects?: IEffects): Engine => {
  const designer: Engine =
    (globalThisPolyfill as any).__DESIGNABLE_ENGINE__ ||
    useContext(DesignerEngineContext);
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer);
    }
  }, []);
  return designer;
};

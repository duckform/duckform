import { globalThisPolyfill } from "@duckform/shared";
import { useContext } from "react";
import { DesignerLayoutContext } from "../context";
import { IDesignerLayoutContext } from "../types";

export const useLayout = (): IDesignerLayoutContext => {
  return (
    (globalThisPolyfill as any).__DESIGNABLE_LAYOUT__ ||
    useContext(DesignerLayoutContext)
  );
};

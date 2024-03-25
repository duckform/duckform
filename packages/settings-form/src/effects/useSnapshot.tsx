import { Operation } from "@duckform/core";
import { onFieldInputValueChange } from "@formily/core";

let timeRequest = -1;

export const useSnapshot = (operation: Operation) => {
  onFieldInputValueChange("*", () => {
    clearTimeout(timeRequest);
    timeRequest = window.setTimeout(() => {
      operation.snapshot("update:node:props");
    }, 1000);
  });
};

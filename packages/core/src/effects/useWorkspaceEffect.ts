import { ICustomEvent } from "@duckform/shared";
import { SelectNodeEvent } from "../events";
import { Engine } from "../models";
import { IEngineContext } from "../types";

export const useWorkspaceEffect = (engine: Engine) => {
  engine.subscribeWith<ICustomEvent<any, IEngineContext>>(
    [
      "append:node",
      "insert:after",
      "insert:before",
      "insert:children",
      "drag:node",
      "drop:node",
      "prepend:node",
      "remove:node",
      "select:node",
      "update:children",
      "wrap:node",
      "update:node:props",
    ],
    (event) => {
      if (event.context?.workbench) {
        engine.workbench.setActiveWorkspace(event.context.workspace!);
      }
    },
  );
  engine.subscribeTo(SelectNodeEvent, (event) => {
    engine.workbench.eachWorkspace((workspace) => {
      if (workspace !== event.context!.workspace!) {
        workspace.operation.selection.clear();
      }
    });
  });
};

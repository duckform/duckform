import { observer } from "@formily/reactive-react";
import React from "react";
import { useWorkbench } from "../hooks";
import { Workspace } from "./Workspace";

export const Workbench: React.FC<React.PropsWithChildren> = observer(
  (props) => {
    const workbench = useWorkbench();
    return (
      <Workspace id={workbench.currentWorkspace?.id}>
        {props.children}
      </Workspace>
    );
  },
);

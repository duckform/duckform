import { Engine, TreeNode } from "@duckform/core";
import { createContext } from "react";
import {
  IDesignerComponents,
  IDesignerLayoutContext,
  IWorkspaceContext,
} from "./types";

export const DesignerComponentsContext = createContext<IDesignerComponents>({});

export const DesignerLayoutContext = createContext<IDesignerLayoutContext>(
  null!,
);

export const DesignerEngineContext = createContext<Engine>(null!);

export const TreeNodeContext = createContext<TreeNode>(null!);

export const WorkspaceContext = createContext<IWorkspaceContext>(null!);

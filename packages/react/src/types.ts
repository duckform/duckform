import { Engine, IBehavior, IResource } from "@duckform/core";
import React from "react";

export interface IDesignerLayoutProps {
  prefixCls?: string;
  theme?: "dark" | "light" | (string & {});
  variables?: Record<string, string>;
  position?: "fixed" | "absolute" | "relative";
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine;
}

export interface IDesignerComponents {
  [key: string]: DnFC<any> | DnComponent<any>;
}

export interface IDesignerLayoutContext {
  theme?: "dark" | "light" | (string & {});
  prefixCls: string;
  position: "fixed" | "absolute" | "relative";
}

export interface IWorkspaceContext {
  id: string;
  title?: string;
  description?: string;
}

export type DnFC<P = {}> = React.FC<React.PropsWithChildren<P>> & {
  Resource?: IResource[];
  Behavior?: IBehavior[];
};

export type DnComponent<P = {}> = React.ComponentType<P> & {
  Resource?: IResource[];
  Behavior?: IBehavior[];
};

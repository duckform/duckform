import { TreeNode } from "@duckform/core";
import cls from "classnames";
import React from "react";
import { useDesigner, usePrefix } from "../../hooks";
import { IconWidget } from "../IconWidget";

export interface ITranslateHandlerProps {
  node: TreeNode;
}

export const TranslateHandler: React.FC<
  React.PropsWithChildren<ITranslateHandlerProps>
> = (props) => {
  const designer = useDesigner();
  const prefix = usePrefix("aux-node-translate-handler");
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeTranslateAttrName!]: value,
      className: cls(prefix, value),
    };
  };
  const allowTranslate = props.node.allowTranslate();
  if (!allowTranslate) return null;
  return (
    <>
      <div {...createHandler("translate")}>
        <IconWidget infer="FreeMove" />
      </div>
    </>
  );
};

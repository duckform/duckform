import { TreeNode } from "@duckform/core";
import { observer } from "@formily/reactive-react";
import React, { Fragment } from "react";
export interface INodeTitleWidgetProps {
  node: TreeNode;
}

export const NodeTitleWidget: React.FC<
  React.PropsWithChildren<INodeTitleWidgetProps>
> = observer((props) => {
  const sourceNode = props.node;
  const takeNode = () => {
    const node = sourceNode;
    if (node.componentName === "$$ResourceNode$$") {
      return node.children[0];
    }
    return node;
  };
  const node = takeNode();
  return (
    <Fragment>
      {sourceNode.sourceName || node.getMessage("title") || node.componentName}
    </Fragment>
  );
});

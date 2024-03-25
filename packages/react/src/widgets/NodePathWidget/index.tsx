import { observer } from "@formily/reactive-react";
import { Breadcrumb } from "antd";
import React from "react";
import {
  useHover,
  usePrefix,
  useSelectedNode,
  useSelection,
} from "../../hooks";
import { IconWidget } from "../IconWidget";
import { NodeTitleWidget } from "../NodeTitleWidget";
import "./styles.less";

export interface INodePathWidgetProps {
  workspaceId?: string;
  maxItems?: number;
}

export const NodePathWidget: React.FC<
  React.PropsWithChildren<INodePathWidgetProps>
> = observer((props) => {
  const selected = useSelectedNode(props.workspaceId);
  const selection = useSelection(props.workspaceId);
  const hover = useHover(props.workspaceId);
  const prefix = usePrefix("node-path");
  if (!selected) return <React.Fragment />;
  const maxItems = props.maxItems ?? 3;
  const nodes = selected
    .getParents()
    .slice(0, maxItems - 1)
    .reverse()
    .concat(selected);
  return (
    <Breadcrumb className={prefix}>
      {nodes.map((node, key) => {
        return (
          <Breadcrumb.Item key={key}>
            {key === 0 && (
              <IconWidget infer="Position" style={{ marginRight: 3 }} />
            )}
            <a
              href=""
              onMouseEnter={() => {
                hover.setHover(node);
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                selection.select(node);
              }}
            >
              <NodeTitleWidget node={node} />
            </a>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});

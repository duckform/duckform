import { observer } from "@formily/reactive-react";
import React from "react";
import { usePrefix, useTree } from "../../hooks";
import { IconWidget } from "../IconWidget";
import "./styles.less";

export interface IEmptyWidgetProps {
  dragTipsDirection?: "left" | "right";
}

export const EmptyWidget: React.FC<React.PropsWithChildren<IEmptyWidgetProps>> =
  observer((props) => {
    const tree = useTree();
    const prefix = usePrefix("empty");
    const renderEmpty = () => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="animations">Happy Coding! 🎉</div>
          <div className="hotkeys-list">
            <div>
              Selection <IconWidget infer="Command" /> + Click /{" "}
              <IconWidget infer="Shift" /> + Click /{" "}
              <IconWidget infer="Command" /> + A
            </div>
            <div>
              Copy <IconWidget infer="Command" /> + C / Paste{" "}
              <IconWidget infer="Command" /> + V
            </div>
            <div>
              Delete <IconWidget infer="Delete" />
            </div>
          </div>
        </div>
      );
    };
    if (!tree?.children?.length) {
      return (
        <div className={prefix}>
          {props.children ? props.children : renderEmpty()}
        </div>
      );
    }
    return null;
  });

EmptyWidget.defaultProps = {
  dragTipsDirection: "left",
};

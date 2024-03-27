import { IconWidget, usePrefix } from "@duckform/react";
import { observer, useField } from "@formily/react";
import cls from "classnames";
import React, { useState } from "react";
import "./styles.less";

export interface ICollapseItemProps {
  className?: string;
  style?: React.CSSProperties;
  defaultExpand?: boolean;
}

export const CollapseItem: React.FC<
  React.PropsWithChildren<ICollapseItemProps>
> = observer((props) => {
  const prefix = usePrefix("collapse-item");
  const field = useField();
  const [expand, setExpand] = useState(props.defaultExpand ?? true);
  return (
    <div
      className={cls(prefix, props.className, { expand })}
      style={props.style}
    >
      <div
        className={`${prefix}-header`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        <div className={`${prefix}-header-expand`}>
          <IconWidget infer="Expand" size={10} />
        </div>
        <div className={`${prefix}-header-content`}>{field.title}</div>
      </div>
      <div className={`${prefix}-content`}>{props.children}</div>
    </div>
  );
});

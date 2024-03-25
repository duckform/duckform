import cls from "classnames";
import React from "react";
import { usePrefix } from "../../hooks";
import "./styles.less";
export interface IPCSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}
export const PCSimulator: React.FC<React.PropsWithChildren<IPCSimulatorProps>> =
  (props) => {
    const prefix = usePrefix("pc-simulator");
    return (
      <div {...props} className={cls(prefix, props.className)}>
        {props.children}
      </div>
    );
  };

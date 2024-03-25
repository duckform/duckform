import { CursorStatus } from "@duckform/core";
import { observer } from "@formily/reactive-react";
import React from "react";
import { useCursor, usePrefix, useTransformHelper } from "../../hooks";

export const SnapLine = observer(() => {
  const cursor = useCursor();
  const transformHelper = useTransformHelper();
  const prefix = usePrefix("aux-snap-line");
  const createLineStyle = (rect: DOMRect) => {
    const baseStyle: React.CSSProperties = {
      top: 0,
      left: 0,
      height: rect.height || 1,
      width: rect.width || 1,
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      background: "#b0b1f3",
      position: "absolute",
      zIndex: 2,
    };
    return baseStyle;
  };
  if (cursor.status !== CursorStatus.Dragging) return null;
  return (
    <>
      {transformHelper.closestSnapLines.map((line, key) => {
        if (line.type !== "normal") return null;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={key}
            className={prefix}
            style={createLineStyle(line.rect as any)}
          ></div>
        );
      })}
    </>
  );
});

SnapLine.displayName = "SnapLine";

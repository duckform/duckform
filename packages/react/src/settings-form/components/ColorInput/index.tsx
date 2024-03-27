import { usePrefix } from "@duckform/react";
import { Input, Popover } from "antd";
import React, { useRef } from "react";
import { SketchPicker } from "react-color";
import "./styles.less";

export interface IColorInputProps {
  value?: string;
  onChange?: (color: string) => void;
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const prefix = usePrefix("color-input");
  const color = props.value as string;
  const picker = (
    <SketchPicker
      color={color}
      onChange={({ rgb }: any) => {
        props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
      }}
    />
  );
  return (
    <div ref={container} className={prefix}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current!}
            content={picker}
          >
            <div
              className={`${prefix}-color-tips`}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  );
};

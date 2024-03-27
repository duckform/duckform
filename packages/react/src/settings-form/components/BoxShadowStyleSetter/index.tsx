import { usePrefix } from "@duckform/react";
import { observer, useField } from "@formily/react";
import cls from "classnames";
import React from "react";
import { ColorInput } from "../ColorInput";
import { FoldItem } from "../FoldItem";
import { InputItems } from "../InputItems";
import { SizeInput } from "../SizeInput";

export interface IBoxShadowStyleSetterProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
}

export const BoxShadowStyleSetter: React.FC<
  React.PropsWithChildren<IBoxShadowStyleSetterProps>
> = observer((props) => {
  const field = useField();
  const prefix = usePrefix("shadow-style-setter");
  const createBoxShadowConnector = (position: number) => {
    const splited = String(props.value || "")
      .trim()
      .split(" ");
    return {
      value: splited[position],
      onChange: (value: any) => {
        splited[position] = value;
        props.onChange?.(
          `${splited[0] || ""} ${splited[1] || ""} ${splited[2] || ""} ${
            splited[3] || ""
          } ${splited[4] || ""}`,
        );
      },
    };
  };
  return (
    <FoldItem
      className={cls(prefix, props.className)}
      style={props.style}
      label={field.title}
    >
      <FoldItem.Base>
        <ColorInput {...createBoxShadowConnector(4)} />
      </FoldItem.Base>
      <FoldItem.Extra>
        <InputItems width="50%">
          <InputItems.Item icon="AxisX">
            <SizeInput
              exclude={["inherit", "auto"]}
              {...createBoxShadowConnector(0)}
            />
          </InputItems.Item>
          <InputItems.Item icon="AxisY">
            <SizeInput
              exclude={["inherit", "auto"]}
              {...createBoxShadowConnector(1)}
            />
          </InputItems.Item>
          <InputItems.Item icon="Blur">
            <SizeInput
              exclude={["inherit", "auto"]}
              {...createBoxShadowConnector(2)}
            />
          </InputItems.Item>
          <InputItems.Item icon="Shadow">
            <SizeInput
              exclude={["inherit", "auto"]}
              {...createBoxShadowConnector(3)}
            />
          </InputItems.Item>
        </InputItems>
      </FoldItem.Extra>
    </FoldItem>
  );
});

import { usePrefix } from "@duckform/react";
import { Input, Select } from "@formily/antd";
import { Field, observer, useField } from "@formily/react";
import cls from "classnames";
import React from "react";
import { ColorInput } from "../ColorInput";
import { FoldItem } from "../FoldItem";
import { BackgroundImageInput } from "../ImageInput";
import { InputItems } from "../InputItems";
import { BackgroundSizeInput } from "../SizeInput";

export interface IBackgroundStyleSetterProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BackgroundStyleSetter: React.FC<
  React.PropsWithChildren<IBackgroundStyleSetterProps>
> = observer((props) => {
  const field = useField();
  const prefix = usePrefix("background-style-setter");
  return (
    <FoldItem className={cls(prefix, props.className)} label={field.title}>
      <FoldItem.Base>
        <Field
          name="backgroundColor"
          basePath={field.address.parent()}
          component={[ColorInput]}
        />
      </FoldItem.Base>
      <FoldItem.Extra>
        <InputItems>
          <InputItems.Item icon="Image">
            <Field
              name="backgroundImage"
              basePath={field.address.parent()}
              component={[BackgroundImageInput]}
            />
          </InputItems.Item>
          <InputItems.Item icon="ImageSize" width="50%">
            <Field
              name="backgroundSize"
              basePath={field.address.parent()}
              component={[BackgroundSizeInput]}
            />
          </InputItems.Item>
          <InputItems.Item icon="Repeat" width="50%">
            <Field
              name="backgroundRepeat"
              basePath={field.address.parent()}
              component={[
                Select,
                { style: { width: "100%" }, placeholder: "Repeat" },
              ]}
              dataSource={[
                {
                  label: "No Repeat",
                  value: "no-repeat",
                },
                {
                  label: "Repeat",
                  value: "repeat",
                },
                {
                  label: "Repeat X",
                  value: "repeat-x",
                },
                {
                  label: "Repeat Y",
                  value: "repeat-y",
                },
                {
                  label: "Space",
                  value: "space",
                },
                {
                  label: "Round",
                  value: "round",
                },
              ]}
            />
          </InputItems.Item>
          <InputItems.Item icon="Position">
            <Field
              name="backgroundPosition"
              basePath={field.address.parent()}
              component={[Input, { placeholder: "center center" }]}
            />
          </InputItems.Item>
        </InputItems>
      </FoldItem.Extra>
    </FoldItem>
  );
});

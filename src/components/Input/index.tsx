import { createBehavior, createResource } from "@duckform/core";
import { DnFC } from "@duckform/react";
import { Input as FormilyInput } from "@formily/antd";
import React from "react";
import * as AllLocales from "./locale";
import * as AllSchemas from "./schema";
import { createFieldSchema } from "../Field";
import { ThunderboltOutlined } from "@ant-design/icons";

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> = (
  props,
) => {
  console.log(`🚀 ~ props:`, props);
  return <FormilyInput {...props}></FormilyInput>;
};

Input.Behavior = createBehavior(
  {
    name: "Input",
    extends: ["Field"],
    selector: (node) => node.props?.["x-component"] === "Input",
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input),
    },
    designerLocales: AllLocales.Input,
  },
  {
    name: "Input.TextArea",
    extends: ["Field"],
    selector: (node) => node.props?.["x-component"] === "Input.TextArea",
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input.TextArea),
    },
    designerLocales: AllLocales.TextArea,
  },
);

Input.Resource = createResource(
  {
    icon: <ThunderboltOutlined></ThunderboltOutlined>,
    elements: [
      {
        componentName: "Field",
        props: {
          type: "string",
          title: "Input",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
      },
    ],
  },
  {
    icon: "TextAreaSource",
    elements: [
      {
        componentName: "Field",
        props: {
          type: "string",
          title: "TextArea",
          "x-decorator": "FormItem",
          "x-component": "Input.TextArea",
        },
      },
    ],
  },
);

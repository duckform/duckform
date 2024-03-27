import { ISchema } from "@formily/react";

export const CSSStyle: ISchema = {
  type: "void",
  properties: {
    "style.width": {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    "style.height": {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    "style.display": {
      "x-component": "DisplayStyleSetter",
    },
    "style.background": {
      "x-component": "BackgroundStyleSetter",
    },
    "style.boxShadow": {
      "x-component": "BoxShadowStyleSetter",
    },
    "style.font": {
      "x-component": "FontStyleSetter",
    },
    "style.margin": {
      "x-component": "BoxStyleSetter",
    },
    "style.padding": {
      "x-component": "BoxStyleSetter",
    },
    "style.borderRadius": {
      "x-component": "BorderRadiusStyleSetter",
    },
    "style.border": {
      "x-component": "BorderStyleSetter",
    },
    "style.opacity": {
      "x-decorator": "FormItem",
      "x-component": "Slider",
      "x-component-props": {
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
};

export const FormLayout: ISchema = {
  type: "object",
  properties: {
    labelCol: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    wrapperCol: {
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    labelWidth: {
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    wrapperWidth: {
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    colon: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
      "x-component-props": {
        defaultChecked: true,
      },
    },
    feedbackLayout: {
      type: "string",
      enum: ["loose", "terse", "popover", "none", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "loose",
      },
    },
    size: {
      type: "string",
      enum: ["large", "small", "default", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "default",
      },
    },
    layout: {
      type: "string",
      enum: ["vertical", "horizontal", "inline", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "horizontal",
      },
    },
    tooltipLayout: {
      type: "string",
      enum: ["icon", "text", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "icon",
      },
    },
    labelAlign: {
      type: "string",
      enum: ["left", "right", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "right",
      },
    },
    wrapperAlign: {
      type: "string",
      enum: ["left", "right", null!],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "left",
      },
    },
    labelWrap: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
    },
    wrapperWrap: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
    },

    fullness: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
    },
    inset: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
    },
    shallow: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
      "x-component-props": {
        defaultChecked: true,
      },
    },
    bordered: {
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": "Switch",
      "x-component-props": {
        defaultChecked: true,
      },
    },
  },
};

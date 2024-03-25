import { Form } from "@formily/core";
import React from "react";
export interface ISettingFormProps {
  className?: string;
  style?: React.CSSProperties;
  uploadAction?: string;
  components?: Record<string, React.FC<React.PropsWithChildren<any>>>;
  effects?: (form: Form) => void;
  scope?: any;
}

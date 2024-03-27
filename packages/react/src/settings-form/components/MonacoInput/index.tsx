import { uid } from "@duckform/core/shared";
import { IconWidget, TextWidget, usePrefix } from "@duckform/react";
import Editor, { EditorProps, loader } from "@monaco-editor/react";
import { Tooltip } from "antd";
import cls from "classnames";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useRef, useState } from "react";
import "./config";
import { initMonaco } from "./config";
import "./styles.less";

export type Monaco = typeof monaco;
export interface MonacoInputProps extends Omit<EditorProps, "onChange"> {
  helpLink?: string | boolean;
  helpCode?: string;
  helpCodeViewWidth?: number | string;
  extraLib?: string;
  onChange?: (value: string) => void;
}

export const MonacoInput: React.FC<
  React.PropsWithChildren<MonacoInputProps>
> & {
  loader?: typeof loader;
} = ({
  className,
  language,
  defaultLanguage,
  width,
  helpLink,
  helpCode,
  helpCodeViewWidth,
  height,
  onMount,
  onChange,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  // const theme = useTheme();
  const valueRef = useRef(props.value || props.defaultValue);
  // const validateRef = useRef<number | null>(null);
  // const submitRef = useRef<number | null>(null);
  // const declarationRef = useRef<string[]>([]);
  const extraLibRef = useRef<monaco.IDisposable>(null!);
  const monacoRef = useRef<Monaco>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const computedLanguage = useRef<string>(language || defaultLanguage!);
  const realLanguage = useRef<string>("");
  const unmountedRef = useRef(false);
  const changedRef = useRef(false);
  const uidRef = useRef(uid());
  const prefix = usePrefix("monaco-input");
  const input = props.value || props.defaultValue;

  useEffect(() => {
    unmountedRef.current = false;
    initMonaco();
    return () => {
      if (extraLibRef.current) {
        extraLibRef.current.dispose();
      }
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current && props.extraLib) {
      updateExtraLib();
    }
  }, [props.extraLib]);

  const updateExtraLib = () => {
    if (extraLibRef.current) {
      extraLibRef.current.dispose();
    }
    extraLibRef.current =
      monacoRef.current!.languages.typescript.typescriptDefaults.addExtraLib(
        props.extraLib!,
        `${uidRef.current}.d.ts`,
      );
  };

  const isFileLanguage = () => {
    const lang = computedLanguage.current;
    return lang === "javascript" || lang === "typescript";
  };

  const isExpLanguage = () => {
    const lang = computedLanguage.current;
    return lang === "javascript.expression" || lang === "typescript.expression";
  };

  const renderHelper = () => {
    const getHref = () => {
      if (typeof helpLink === "string") return helpLink;
      if (isFileLanguage()) {
        return "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript";
      }
      if (isExpLanguage()) {
        return "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators";
      }
    };
    if (helpLink === false) return null;
    const href = getHref();
    return (
      href && (
        <Tooltip
          title={
            <TextWidget token="SettingComponents.MonacoInput.helpDocument" />
          }
        >
          <div className={`${prefix}-helper`}>
            <a target="_blank" href={href} rel="noreferrer">
              <IconWidget infer="Help" />
            </a>
          </div>
        </Tooltip>
      )
    );
  };

  const onMountHandler = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    onMount?.(editor, monaco);
    const model = editor.getModel();
    // const currentValue = editor.getValue();
    (model as any).getDesignerLanguage = () => computedLanguage.current;
    setLoaded(true);
    if (props.extraLib) {
      updateExtraLib();
    }
    editor.onDidChangeModelContent(() => {
      onChangeHandler(editor.getValue());
    });
  };

  const onChangeHandler = (value: string) => {
    changedRef.current = true;
    valueRef.current = value;
    onChange(value);
  };
  computedLanguage.current = language || defaultLanguage!;
  realLanguage.current = /(?:javascript|typescript)/gi.test(
    computedLanguage.current,
  )
    ? "typescript"
    : computedLanguage.current;

  const renderHelpCode = () => {
    if (!helpCode) return null;
    return (
      <div
        className={`${prefix}-view`}
        style={{ width: helpCodeViewWidth || "50%" }}
      >
        <Editor
          value={helpCode}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            ...props.options,
            lineNumbers: "off",
            readOnly: true,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            minimap: {
              enabled: false,
            },
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false,
            },
          }}
          width="100%"
          height="100%"
        />
      </div>
    );
  };

  return (
    <div
      className={cls(prefix, className, {
        loaded,
      })}
      style={{ width, height }}
    >
      {renderHelper()}
      <div className={`${prefix}-view`}>
        <Editor
          {...props}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            glyphMargin: true,
            ...props.options,
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false,
            },
          }}
          value={input}
          width="100%"
          height="100%"
          onMount={onMountHandler}
        />
      </div>
      {renderHelpCode()}
    </div>
  );
};

MonacoInput.loader = loader;

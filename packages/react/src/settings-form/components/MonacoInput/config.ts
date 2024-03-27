import { loader } from "@monaco-editor/react";

let initialized = false;

export const initMonaco = () => {
  if (initialized) return;
  loader.init().then((monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true,
    });
    // monaco.languages.registerDocumentFormattingEditProvider("typescript", {
    //   async provideDocumentFormattingEdits(model) {
    //     return [
    //       {
    //         text: model.getValue(),
    //         range: model.getFullModelRange(),
    //       },
    //     ];
    //   },
    // });
    initialized = true;
  });
};

import Editor from "@monaco-editor/react";
import { OneDarkProTheme} from "./OneDarkProTheme.ts";


export const CodeEditor = ({ value, file, height, options, theme}) => {

    return value && <Editor
        options={options}
        height={height ?? "100%"}
        theme={theme ?? "OneDarkPro"}
        beforeMount={(monaco) => {
            OneDarkProTheme(monaco);
        }}
        path={file}
        value={value}
    />;
};
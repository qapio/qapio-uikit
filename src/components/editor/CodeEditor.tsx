import Editor from "@monaco-editor/react";
import { OneDarkProTheme, CodeBlockTheme } from "./OneDarkProTheme.ts";
import {connect, combineLatestObject} from "@qapio/qapi-reactjs";
import {codeBlockOptions} from "@/components/editor/CodeBlockOptions";



export const CodeEditor = ({ value, file, height, options, theme, language}) => {

    const path = file?.endsWith(".tsx") ? "file.jsx" : file;

    return value && <Editor
        options={options}
        height={height ?? "100%"}
        theme={theme ?? "OneDarkPro"}
        beforeMount={(monaco) => {
            OneDarkProTheme(monaco);
        }}
        language={language}
        path={`${Math.random()}${path}`}
        value={typeof value == "string" ? value : value.toString()}
        onMount={(editor, monaco) => {
            const container = editor.getContainerDomNode();
            const resize = () => {
                const contentHeight = editor.getContentHeight();
                container.style.height = `${contentHeight}px`;
                editor.layout(); // ✅ Recalculate layout after height change
            };

            resize(); // Initial resize
            editor.onDidChangeModelContent(resize); // Resize on content change
        }}
    />;
};

export const ResourceEditor =  connect((qapi, {path, endpoint}) => {
    return combineLatestObject({value: qapi.Source(`${endpoint}.FileSystem.ReadAllText('${path}')`), file: path})

})(CodeEditor)

export const CodeBlockEditor =  connect((qapi, {path, endpoint}) => {
    return combineLatestObject({value: qapi.Source(`${endpoint}.FileSystem.ReadAllText('${path}')`), file: path, options: codeBlockOptions})

})(CodeEditor)
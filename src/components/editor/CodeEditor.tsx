import Editor from "@monaco-editor/react";
import { OneDarkProTheme, CodeBlockTheme } from "./OneDarkProTheme.ts";
import {connect, combineLatestObject} from "@qapio/qapi-reactjs";

export const codeBlockOptions = {
    readOnly: true,
    domReadOnly: true,
    contextmenu: false,
    folding: false,
    lineNumbers: "off",
    minimap: { enabled: false },
    glyphMargin: false,
    scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
        useShadows: false,
    },
    scrollBeyondLastLine: false,
    renderLineHighlight: "none",
    hover: { enabled: false },
    renderLineNumbers: "off",
    hideCursorInOverviewRuler: true,
    overviewRulerLanes: 0,
    renderIndentGuides: false,
    padding: {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
    },
};

export const CodeEditor = ({ value, file, height, options, theme, language, codeBlock = false}) => {

    const path = file?.endsWith(".tsx") ? "file.jsx" : file;

    const mergedOptions = {

        ...(codeBlock ? codeBlockOptions : {}),
        ...(options || {}),
        padding: {
            ...(codeBlock ? codeBlockOptions.padding || {} : {}),
            ...(options?.padding || {}),
        },
    };

    return value && <Editor
        options={mergedOptions}
        height={height ?? "100%"}
        theme={theme ?? "OneDarkPro"}
        beforeMount={(monaco) => {
            CodeBlockTheme(monaco);
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

export const CodeBlockEditor =  connect((qapi, {path, endpoint, codeBlock=false}) => {
    return combineLatestObject({value: qapi.Source(`${endpoint}.FileSystem.ReadAllText('${path}')`), file: path, codeBlock: codeBlock})

})(CodeEditor)
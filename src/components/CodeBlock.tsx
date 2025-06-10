import * as React from "react";
import Editor from "@monaco-editor/react";
import {OneDarkProTheme} from "@/components/editor/OneDarkProTheme.ts";
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

const CodeEditor = ({ value, path: file, height, options, theme, language, onChange}) => {

    const path = file?.endsWith(".tsx") ? "file.jsx" : file;

    return value && <Editor
        options={options}
        height={height ?? "100%"}
        theme={theme ?? "OneDarkPro"}
        beforeMount={(monaco) => {
            OneDarkProTheme(monaco);
        }}
        // onChange={onChange}
        language={language}
        path={path}
        value={value}
        onMount={(editor, monaco) => {
            const container = editor.getContainerDomNode();
            const resize = () => {
                const contentHeight = editor.getContentHeight();
                container.style.height = `${contentHeight}px`;
    /*            const contentWidth = editor.getContentWidth();
                container.style.width = `${contentWidth}px`;*/
                editor.layout(); // ✅ Recalculate layout after height change
            };

            resize(); // Initial resize*!/
            editor.onDidChangeModelContent(resize); // Resize on content change
        }}
    />;
};

export const CodeBlock = ({value, language, path}) => {
    return (
        <div className={"flex w-full h-full bg-[#171717] p-2 rounded-lg z-10"}>
            <CodeEditor
                path={path}
                value={value}
                language={language}
                options={codeBlockOptions}
            />
        </div>
    )
}

/*
export const CodeBlockEditor =  connect((qapi, {path, endpoint}) => {
    return combineLatestObject({value: qapi.Source(`${endpoint}.FileSystem.ReadAllText('${path}')`), file: path, options: codeBlockOptions})

})(CodeEditor)*/

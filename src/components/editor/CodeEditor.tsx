import Editor from "@monaco-editor/react";
import { OneDarkProTheme, CodeBlockTheme } from "./OneDarkProTheme.ts";
import {connect, combineLatestObject} from "@qapio/qapi-reactjs";
import {codeBlockOptions} from "@/components/CodeBlock.tsx";



export const CodeEditor = ({ value, path: file, height, options, theme, language, onChange}) => {

    console.log(value, file, height, options, theme, language)
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
        /*onMount={(editor, monaco) => {
            const container = editor.getContainerDomNode();
            const resize = () => {
                const contentHeight = editor.getContentHeight();
                container.style.height = `${contentHeight}px`;
                editor.layout(); // ✅ Recalculate layout after height change
            };

            resize(); // Initial resize*!/
            editor.onDidChangeModelContent(resize); // Resize on content change
        }}*/
    />;
};

export const ResourceEditor =  () => connect((qapi, props) => {

    return qapi.Source(`ResourceEditor.Qapi.EditorModel(${JSON.stringify(props)})`)

}, (disp) =>  ({onChange: disp.Dispatch('updateValue')}))(CodeEditor)



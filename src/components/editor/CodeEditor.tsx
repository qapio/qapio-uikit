import Editor from "@monaco-editor/react";
import { OneDarkProTheme} from "./OneDarkProTheme.ts";
import {connect, combineLatestObject} from "@qapio/qapi-reactjs";

export const CodeEditor = ({ value, file, height, options, theme}) => {

    const path = file?.endsWith(".tsx") ? "file.jsx" : file;

    return value && <Editor
        options={options}
        height={height ?? "100%"}
        theme={theme ?? "OneDarkPro"}
        beforeMount={(monaco) => {
            OneDarkProTheme(monaco);
        }}
        path={path}
        value={typeof value == "string" ? value : value.toString()}
    />;
};

export const ResourceEditor =  connect((qapi, {path, endpoint}) => {
    return combineLatestObject({value: qapi.Source(`${endpoint}.FileSystem.ReadAllText('${path}')`), file: path})

})(CodeEditor)
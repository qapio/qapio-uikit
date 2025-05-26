import {CodeEditor} from "@/components/editor/CodeEditor";
import * as React from "react";
import {codeBlockOptions} from "@/components/editor/CodeBlockOptions";


export const CodeBlock = ({value, language}) => {
    return (
        <div className={"flex w-full h-full bg-[#171717] p-2 rounded-lg z-10"}>
            <CodeEditor value={value} language={language} options={codeBlockOptions}/>
        </div>
    )
}
import {CodeBlock, MarkdownViewer, Step, Steps} from "qapio-uikit";
import * as React from "react";
import {useStream} from "@qapio/qapi-reactjs";


export const TheBasics = () => {

    const code = JSON.stringify(useStream((qapi) => qapi.Source("Qap1.Identify()")), null, 2)


    return (
        <Steps
            title={"Building a Reactive Flow in Minutes"}
            subtitle={"Let's set up an interactive streaming pipeline with QAPI."}
            text={""}
            items={[
                <Step title={"Say Hello 👋 - Let's start by Pinging our Qaps (nodes) using Qapi"}
                      text={"Each DSL snippet queries a Qap via QAPI, retrieving its unique identifier. This helps us understand which nodes are available to us."}
                      content={<CodeBlock value={code} language={"javascript"}/>}
                />

            ]}
        />
    );
}
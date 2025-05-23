import {Step, Steps} from "../Steps"
import {CodeBlock, MarkdownViewer} from "@/components";
import * as React from "react";
import {useStream} from "@qapio/qapi-reactjs";


export const TheBasics = () => {

    const code = useStream((qapi) => qapi.Source("Source.Tick(10000)"))

    return (
        <Steps
            title={"Building a Reactive Flow in Minutes"}
            subtitle={"Let's set up an interactive streaming pipeline with QAPI."}
            text={""}
            items={[
                <CodeBlock value={`heisann ${code}`} language={"javascript"}
                />,
                <Step title={"Say Hello 👋 - Let's start by Pinging our Qaps (nodes) using Qapi"}
                      text={"Each DSL snippet queries a Qap via QAPI, retrieving its unique identifier. This helps us understand which nodes are available to us."}
                      content={<div>
                          <MarkdownViewer text={"```\n" +
                              "# code block\n" +
                              "print '3 backticks or'\n" +
                              "print 'indent 4 spaces'\n" +
                              "```"}/>
                      </div>}
                />,
                <Step title={"Say Hello 👋 - Let's start by Pinging our Qaps (nodes) using Qapi"}
                      text={"Each DSL snippet queries a Qap via QAPI, retrieving its unique identifier. This helps us understand which nodes are available to us."}
                      content={<div>
                          <MarkdownViewer text={"```\n" +
                              "# code block\n" +
                              "print '3 backticks or'\n" +
                              "print 'indent 4 spaces'\n" +
                              "```"}/>
                      </div>}
                />,
                <Step title={"Say Hello 👋 - Let's start by Pinging our Qaps (nodes) using Qapi"}
                      text={"Each DSL snippet queries a Qap via QAPI, retrieving its unique identifier. This helps us understand which nodes are available to us."}
                      content={<div>
                          <MarkdownViewer text={"```\n" +
                              "# code block\n" +
                              "print '3 backticks or'\n" +
                              "print 'indent 4 spaces'\n" +
                              "```"}/>
                      </div>}
                />

            ]}
        />
    );
}
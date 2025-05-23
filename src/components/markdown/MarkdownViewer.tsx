import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const MarkdownViewer = ({ text }) => {

    return (
        <Markdown rehypePlugins={[rehypeRaw]}
                  className={"w-full"}>
            {text}
        </Markdown>
    );
}

import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const MarkdownViewer = ({ text }) => {

    return (
        <div className="prose prose-invert max-w-none">
            <Markdown rehypePlugins={[rehypeRaw]}>
                {text}
            </Markdown>
        </div>
    );
}

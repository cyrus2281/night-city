import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./MarkdownRenderer.scss";

function MarkdownRenderer({
  markdown,
  className = "",
  theme = "light",
}: {
  markdown: string;
  className?: string;
  theme?: "light" | "dark";
}) {
  if (!markdown) return null;
  return (
    <div className={"markdown-body " + className} data-theme={theme}>
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;

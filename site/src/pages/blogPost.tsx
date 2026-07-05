import { useMemo } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTextFetch } from "@/hooks/useTextFetch";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { NavigationData } from "@/nav-config";
import { useJsonFetch } from "@/hooks/useJsonFetch";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { BlogIndexData } from "./blog";
import { Badge } from "@/components/ui/badge";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug || "";
  const { data, loading, error } = useTextFetch(`/blog/${slug}.md`);

  const { data: blogData } = useJsonFetch<BlogIndexData>("/blog/index.json");
  const postMeta = useMemo(() => {
    return blogData?.blogPosts.find((post) => post.slug === slug);
  }, [blogData?.blogPosts, slug]);

  usePageMeta({
    title: postMeta?.title || "",
    description: postMeta?.description || "",
    path: `/blog/${slug}`,
    structuredData: getBreadcrumbSchema(
      NavigationData.getPageConfig("blog").breadcrumbs,
    ),
  });

  return (
    <div className="flex flex-col grow p-0 md:p-6">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        {postMeta?.title}
        <span className="text-primary-2">.</span>
      </h1>

      <div className="flex flex-col gap-2 mb-6">
        {postMeta?.date && (
          <p className="text-xs text-muted-foreground">
            Published {postMeta.date}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {postMeta?.tags?.map((tag) => (
          <Badge variant="default" key={tag}>
            #{tag}
          </Badge>
        ))}
      </div>

      {loading && <p className="text-sm">Loading article...</p>}
      {error && (
        <p className="text-sm text-destructive">
          Error loading article: {error.message}
        </p>
      )}

      {data && (
        <div className="article-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    wrapLongLines={true}
                    className="markdown-code-block"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="markdown-code-block">{children}</code>
                );
              },
            }}
          >
            {data}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

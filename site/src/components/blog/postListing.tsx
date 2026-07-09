import { NavLink } from "react-router";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string[];
}

export default function BlogPostListing({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="flex flex-col gap-4">
      {posts?.map((article) => (
        <Card
          key={article.slug}
          className="cyber-card bg-transparent backdrop-blur-xs font-mono"
        >
          <CardHeader>
            <NavLink to={`/blog/${article.slug}`}>
              <CardTitle className="font-mono font-light text-primary text-base">
                {article.title}
              </CardTitle>
            </NavLink>
            <p className="text-xs text-muted-foreground">{article.date}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm">{article.description}</p>
            <NavLink to={`/blog/${article.slug}`} className="self-end">
              <Button size="sm" className="cursor-pointer">
                Read article
              </Button>
            </NavLink>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

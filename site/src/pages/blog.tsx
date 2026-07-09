import { useMemo,useState } from "react";

import BlogFilters from "@/components/blog/blogFilters";
import { BlogPagination } from "@/components/blog/blogPagination";
import BlogPostListing, { type BlogPost } from "@/components/blog/postListing";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsonFetch } from "@/hooks/useJsonFetch";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { NavigationData } from "@/nav-config";
import type { PageMeta } from "@/types/seo";

export interface BlogIndexData {
  blogPosts: BlogPost[];
}

const PAGE_SIZE = 10;

const uniqueArray = (arr: string[]): string[] => {
  return Array.from(
    new Map(arr.map((item) => [item.toLowerCase(), item])).values(),
  );
};

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const { data } = useJsonFetch<PageMeta>("/data/blog.json");

  const {
    data: blogData,
    loading,
    error,
  } = useJsonFetch<BlogIndexData>("/blog/index.json");

  usePageMeta({
    title: data?.title || "Blog",
    description: data?.description || "Latest posts.",
    path: "/blog",
    structuredData: getBreadcrumbSchema(
      NavigationData.getPageConfig("blog").breadcrumbs,
    ),
  });

  const allCategories = useMemo(() => {
    return uniqueArray(
      blogData?.blogPosts?.flatMap((post) => post.categories) || [],
    );
  }, [blogData?.blogPosts]);

  const allTags = useMemo(() => {
    return uniqueArray(blogData?.blogPosts?.flatMap((post) => post.tags) || []);
  }, [blogData?.blogPosts]);

  // Filter posts based on selected categories and tags
  const filteredPosts = useMemo(() => {
    let filtered = blogData?.blogPosts || [];

    if (selectedCategories.size > 0) {
      filtered = filtered.filter((post) =>
        post.categories.some((cat) =>
          selectedCategories.has(cat.toLowerCase()),
        ),
      );
    }

    if (selectedTags.size > 0) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => selectedTags.has(tag.toLowerCase())),
      );
    }

    return filtered;
  }, [blogData?.blogPosts, selectedCategories, selectedTags]);

  // Recalculate pagination based on filtered posts
  const filteredTotalPosts = filteredPosts.length;
  const filteredTotalPages = Math.ceil(filteredTotalPosts / PAGE_SIZE);
  const filteredStartIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(
    filteredStartIndex,
    filteredStartIndex + PAGE_SIZE,
  );

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1); // Reset to page 1 when filters change
    setSelectedCategories((prev) => {
      const updated = new Set(prev);
      if (updated.has(category.toLowerCase())) {
        updated.delete(category.toLowerCase());
      } else {
        updated.add(category.toLowerCase());
      }
      return updated;
    });
  };

  const handleTagChange = (tag: string) => {
    setCurrentPage(1); // Reset to page 1 when filters change
    setSelectedTags((prev) => {
      const updated = new Set(prev);
      if (updated.has(tag.toLowerCase())) {
        updated.delete(tag.toLowerCase());
      } else {
        updated.add(tag.toLowerCase());
      }
      return updated;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col grow p-0 md:p-6">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Blog<span className="text-primary-2">.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 md:grow gap-8 mt-6">
        <aside className="md:col-span-2 md:order-last">
          {loading && !error ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <BlogFilters
              categories={allCategories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              tags={allTags}
              selectedTags={selectedTags}
              handleTagChange={handleTagChange}
            />
          )}
        </aside>

        <div className="md:col-span-10">
          <div className="flex flex-col grow h-full justify-between">
            {loading && !error && (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {error && (
              <p className="mt-6 text-sm text-destructive">
                Error loading articles: {error.message}
              </p>
            )}

            <BlogPostListing posts={paginatedPosts || []} />

            <BlogPagination
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

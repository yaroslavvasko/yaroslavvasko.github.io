import { Badge } from "../ui/badge";
import { FieldGroup, FieldLegend, FieldSet } from "../ui/field";

export interface BlogFiltersProps {
  categories: string[];
  selectedCategories: Set<string>;
  handleCategoryChange: (category: string) => void;
  tags: string[];
  selectedTags: Set<string>;
  handleTagChange: (tag: string) => void;
}

export default function BlogFilters({
  categories,
  selectedCategories,
  handleCategoryChange,
  tags,
  selectedTags,
  handleTagChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <FieldSet>
        <FieldLegend variant="label">Category:</FieldLegend>
        <FieldGroup className="flex flex-row flex-wrap gap-2">
          {categories?.map((category) => (
            <Badge
              variant={
                selectedCategories.has(category.toLowerCase())
                  ? "default"
                  : "outline"
              }
              key={category}
              className="cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">Tags:</FieldLegend>
        <FieldGroup className="flex flex-row flex-wrap gap-2">
          {tags?.map((tag) => (
            <Badge
              variant={
                selectedTags.has(tag.toLowerCase()) ? "default" : "outline"
              }
              key={tag}
              className="cursor-pointer"
              onClick={() => handleTagChange(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

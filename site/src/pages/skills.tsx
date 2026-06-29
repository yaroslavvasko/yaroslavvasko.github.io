import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJsonFetch } from "@/hooks/useJsonFetch";

type SkillsData = {
  description: string[];
  stack: {
    type: string;
    skills: string[];
  }[];
};

export default function SkillsPage() {
  const { data } = useJsonFetch<SkillsData>("/data/skills.json");

  return (
    <div className="flex flex-col grow p-0 md:p-6">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Tech stack<span className="text-primary-2">.</span>
      </h1>

      <div className="my-6">
        {data?.description.map((paragraph, index) => (
          <p className="text-xl mt-2" key={index}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {data?.stack.map((category, index) => (
          <Card
            className="cyber-card bg-transparent backdrop-blur-xs font-mono flex-1 "
            key={index}
          >
            <CardHeader>
              <CardTitle className="font-mono font-light text-primary text-base">
                {category.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {category.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-primary-2 m-2"
                  >
                    {skill}
                  </Badge>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

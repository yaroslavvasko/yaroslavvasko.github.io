import { NavLink } from "react-router";
import TextTransformer from "@/components/text-transformation/text-transformer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJsonFetch } from "@/hooks/useJsonFetch";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  getPersonSchema,
  getProfessionalServiceSchema,
  getBreadcrumbSchema,
} from "@/lib/structured-data";

import "./home.css";
import type { PageMeta } from "@/types/seo";
import { NavigationData } from "@/nav-config";

interface MainData {
  heading: string[];
  subheading: string[];
  description: string[];
  mainInfo: string[];
  metaData: PageMeta;
}

export default function HomePage() {
  const { data } = useJsonFetch<MainData>("/data/home.json");

  // Set page meta and structured data
  usePageMeta({
    title: data?.metaData?.title || "",
    description: data?.metaData?.description || "",
    path: data?.metaData?.path || "",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        getPersonSchema(),
        getProfessionalServiceSchema(),
        getBreadcrumbSchema(NavigationData.getPageConfig("home").breadcrumbs),
      ],
    },
  });

  return (
    <div className="squared-bg flex flex-col md:flex-row grow">
      <div className="flex flex-col md:w-1/2 p-0 md:p-6">
        <Badge variant="outline" className="text-primary">
          <BadgeCheck data-icon="inline-start" />
          SYS.STATUS: ONLINE
        </Badge>
        {data?.heading?.map((heading, index) => (
          <h1 key={index} className="text-6xl lg:text-8xl font-medium mt-6">
            {heading}
            <span
              className={index % 2 == 0 ? "text-primary" : "text-primary-2"}
            >
              .
            </span>
          </h1>
        ))}

        {data?.subheading?.map((heading, index) => (
          <p key={index} className="text-3xl mt-6">
            {heading}
          </p>
        ))}

        {data?.description?.map((heading, index) => (
          <p key={index} className="text-lg text-muted-foreground mt-4">
            {heading}
          </p>
        ))}

        <div className="flex-row mt-4">
          <NavLink to={"/contact"}>
            <Button size="lg" className="cursor-pointer">
              Contact
            </Button>
          </NavLink>
          <NavLink to={"/about"}>
            <Button className="ml-4 cursor-pointer" variant="outline" size="lg">
              Learn more
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col md:max-w-1/2 p-0 md:p-6 items-center justify-center my-6 md:my-0">
        <Card className="cyber-card h-80 p-6 bg-transparent backdrop-blur-xs font-mono">
          <CardHeader>
            <CardTitle className="font-mono font-light text-primary text-base">
              $yaroslav.vasko:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextTransformer
              sentences={data?.mainInfo}
              className="text-xl break-all md:break-normal pt-4 font-thin"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

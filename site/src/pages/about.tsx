import "./about.css";

import { FlaskConical, MapPinCheckInside, ShieldCheck } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJsonFetch } from "@/hooks/useJsonFetch";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { NavigationData } from "@/nav-config";
import type { PageMeta } from "@/types/seo";

interface AboutData {
  description: string[];
  location: string;
  certifications: {
    name: string;
    issuer: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    description: string;
  }[];
  metaData: PageMeta;
}

const getYearsSince = (year: number): number => {
  return new Date().getFullYear() - year;
};

export default function AboutPage() {
  const { data } = useJsonFetch<AboutData>("/data/about.json");
  const [yearsOfExperience] = useState<number | null>(getYearsSince(2018));

  // Set page meta and structured data
  usePageMeta({
    title: data?.metaData?.title || "",
    description: data?.metaData?.description || "",
    path: data?.metaData?.path || "",
    structuredData: getBreadcrumbSchema(
      NavigationData.getPageConfig("about").breadcrumbs,
    ),
  });

  return (
    <div className="flex flex-col grow p-0 md:p-6">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        About me<span className="text-primary-2">.</span>
      </h1>

      <div className="flex flex-col md:flex-row grow gap-6">
        <div className="flex flex-col md:w-1/3">
          <Card className="cyber-card mt-2 p-6 bg-transparent backdrop-blur-xs font-mono">
            <CardHeader>
              <CardTitle className="font-mono font-light text-primary text-base">
                $yaroslav.vasko:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col mt-4">
                <p className="inline-flex font-bold text-primary-2">
                  <MapPinCheckInside size={14} className="mr-2" /> Location:
                </p>
                <p className="text-sm"> {data?.location} </p>
              </div>
              <div className="flex flex-col mt-4">
                <p className="inline-flex font-bold text-primary-2">
                  <FlaskConical size={14} className="mr-2" /> Experience:
                </p>
                <p className="text-sm"> {yearsOfExperience} yrs </p>
              </div>
              <div className="flex flex-col mt-4">
                <p className="inline-flex font-bold text-primary-2">
                  <ShieldCheck size={14} className="mr-2" />
                  Certifications:
                </p>
                <p className="text-sm">
                  {data?.certifications
                    .map((cert) => cert.name)
                    .join(", ")}{" "}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col md:max-w-2/3">
          {data?.description.map((paragraph, index) => (
            <p className="text-xl mt-2" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Experience<span className="text-primary-2">.</span>
      </h1>
      <div className="flex flex-col p-4">
        {data?.experience.map((exp, index) => (
          <div key={index} className="experience-card mb-6">
            <Card className="cyber-card bg-transparent backdrop-blur-xs font-mono ">
              <CardHeader>
                <CardTitle className="font-mono font-light text-primary text-base">
                  {exp.role}
                  <span className="text-primary-2"> @ </span> {exp.company}
                </CardTitle>
                <CardDescription className="text-sm">
                  {exp.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{exp.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Education<span className="text-primary-2">.</span>
      </h1>
      <div className="flex flex-col p-6">
        {data?.education.map((exp, index) => (
          <div key={index} className="experience-card mb-6">
            <Card className="cyber-card bg-transparent backdrop-blur-xs font-mono ">
              <CardHeader>
                <CardTitle className="font-mono font-light text-primary text-base">
                  {exp.degree}
                  <span className="text-primary-2"> @ </span> {exp.institution}
                </CardTitle>
                <CardDescription className="text-sm">
                  {exp.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{exp.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

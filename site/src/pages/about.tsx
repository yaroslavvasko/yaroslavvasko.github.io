import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJsonFetch } from "@/hooks/useJsonFetch";
import { FlaskConical, MapPinCheckInside, ShieldCheck } from "lucide-react";
import { useState } from "react";
import "./about.css";

type AboutData = {
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
};

const getYearsSince = (year: number): number => {
  return new Date().getFullYear() - year;
};

export default function AboutPage() {
  const { data } = useJsonFetch<AboutData>("/data/about.json");
  const [yearsOfExperience] = useState<number | null>(getYearsSince(2018));

  return (
    <div className="flex flex-col grow">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        About me<span className="text-primary-2">.</span>
      </h1>

      <div className="flex flex-col md:flex-row grow">
        <div className="flex flex-col md:w-1/3 p-6">
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
        <div className="flex flex-col md:max-w-1/2 p-6">
          {data?.description.map((paragraph, index) => (
            <p className="text-lg mt-2" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Experience<span className="text-primary-2">.</span>
      </h1>
      <div className="flex flex-col p-6">
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

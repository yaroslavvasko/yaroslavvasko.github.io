import TextTransformer from "@/components/text-transformation/text-transformer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./home.css";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const sentences = [
  "full stack software developer specializing in .NET, Azure, and React.",
  "several years of enterprise experience across international projects.",
  "turning complex business requirements into elegant, scalable solutions.",
  "from Kraków, Poland — building software that works across borders.",
  "may your builds always pass and your users always stay.",
  "if this resonates — share it with someone who builds things too.",
];

export default function HomePage() {
  return (
    <div className="squared-bg flex flex-col md:flex-row grow">
      <div className="flex flex-col md:w-1/2 p-6">
        <Badge variant="outline" className="text-primary">
          <BadgeCheck data-icon="inline-start" />
          SYS.STATUS: ONLINE
        </Badge>
        <h1 className="text-6xl lg:text-8xl font-medium mt-6">
          Hello<span className="text-primary-2">.</span>
        </h1>
        <h1 className="text-6xl lg:text-8xl font-medium ">
          I am Yaroslav<span className="text-primary">.</span>
        </h1>
        <p className="text-3xl mt-6">
          Full Stack Web Developer focused on scalable SaaS, clean systems, and
          fast user experiences.
        </p>
        <p className="text-lg text-muted-foreground mt-4">
          Experienced in building enterprise SaaS products, with a focus on
          .NET, React and Azure.
        </p>

        <div className="flex-row mt-4">
          <Button size="lg">Contact</Button>
          <Button className="ml-4" variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:max-w-1/2 p-6 items-center justify-center">
        <Card className="cyber-card h-80 p-6 bg-transparent backdrop-blur-xs font-mono">
          <CardHeader>
            <CardTitle className="font-mono font-light text-primary text-base">
              $yaroslav.vasko:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextTransformer
              sentences={sentences}
              className="text-xl break-all md:break-normal pt-4 font-thin"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

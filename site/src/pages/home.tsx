import TextTransformer from "@/components/text-transformation/text-transformer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./home.css";

const sentences = [
  "Full stack software developer specializing in .NET, Azure, and React.",
  "Several years of enterprise experience across international projects.",
  "Turning complex business requirements into elegant, scalable solutions.",
  "From Kraków, Poland — building software that works across borders.",
  "May your builds always pass and your users always stay.",
  "If this resonates — share it with someone who builds things too.",
];

export default function HomePage() {
  return (
    <div className="squared-bg flex flex-col md:flex-row grow">
      <div className="flex flex-col justify-center p-6">
        <h1 className="text-6xl lg:text-9xl font-medium">
          Hello<span className="text-primary-2">.</span>
        </h1>
        <h1 className="text-6xl lg:text-9xl font-medium ">
          I am Yaroslav<span className="text-primary">.</span>
        </h1>
      </div>
      <div className="flex flex-col md:max-w-1/2 p-6 items-center justify-center">
        <Card className="cyber-card h-80 p-6 bg-transparent backdrop-blur-xs font-mono">
          <CardHeader>
            <CardTitle className="font-mono font-light">Sys.Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TextTransformer
              sentences={sentences}
              className="text-2xl break-all md:break-normal pt-4 font-thin"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

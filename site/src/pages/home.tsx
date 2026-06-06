import TextTransformer from "@/components/text-transformation/text-transformer";

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
    <div className="flex-col">
      <h1 className="text-6xl lg:text-9xl font-medium">
        Hello<span className="text-primary-2">.</span>
      </h1>
      <h1 className="text-6xl lg:text-9xl font-medium ">
        I am Yaroslav<span className="text-primary">.</span>
      </h1>

      <TextTransformer sentences={sentences} className="text-2xl pt-4" />
    </div>
  );
}

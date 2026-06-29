import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJsonFetch } from "@/hooks/useJsonFetch";

type ContactData = {
  description: string[];
  email: string;
  social: {
    name: string;
    url: string;
  }[];
};

export default function ContactPage() {
  const { data } = useJsonFetch<ContactData>("/data/contact.json");

  return (
    <div className="flex flex-col grow p-0 md:p-6">
      <h1 className="text-6xl lg:text-8xl font-medium mt-6">
        Contact me<span className="text-primary-2">.</span>
      </h1>

      {data?.description.map((paragraph, index) => (
        <p className="text-3xl mt-6" key={index}>
          {paragraph}
        </p>
      ))}

      <div className="flex flex-col md:flex-row ">
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <a href={"mailto:" + data?.email}>
            <Card className="cyber-card streamline bg-transparent backdrop-blur-xs font-mono min-w-sm md:min-w-md p-6">
              <CardHeader className="px-0">
                <CardTitle className="font-mono font-light text-primary text-base p-0 pb-0 md:p-6">
                  $email:
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-xl md:text-3xl p-o md:p-6">{data?.email}</p>
              </CardContent>
            </Card>
          </a>

          {data?.social.map((social, index) => (
            <a href={social.url}>
              <Card
                className="cyber-card bg-transparent backdrop-blur-xs font-mono flex-1 min-w-xs"
                key={index}
              >
                <CardContent>
                  <p className="font-mono font-light text-primary text-base">
                    {social.name}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

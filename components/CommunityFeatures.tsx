import { Code, MessageSquare, Users, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommunityFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CommunityFeatureCard({ icon, title, description }: CommunityFeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-card">
      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
    </div>
  );
}

export function CommunityFeatures() {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Builder Channels",
      description: "Every active builder gets a personalized channel to share updates and progress on their products."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Expert Networking",
      description: "Connect with experienced founders, developers, and technical experts in various domains."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Feedback & Support",
      description: "Get constructive feedback, troubleshooting help, and emotional support from community members."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Resource Sharing",
      description: "Access to valuable tools, guides, templates, and opportunities shared by the community."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-4">
            <Badge>Community Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
              A Community Built for Tech Entrepreneurs
            </h2>
            <p className="text-lg max-w-2xl text-muted-foreground">
              Our Discord community is designed specifically for founders and builders in the tech space.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <CommunityFeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
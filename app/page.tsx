import { HeroSection } from "@/components/hero-section";
import { TechNavbar } from "@/components/TechNavbar";
import { CommunityFeatures } from "@/components/CommunityFeatures";
import { FeaturedBuilderProjects } from "@/components/FeaturedBuilderProjects";
import { DiscordFooter } from "@/components/DiscordFooter";
import { recentProjects, trendingProjects, newBuilderProjects } from "@/lib/projectData";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TechNavbar 
        logoUrl="/logo.png"
        ctaButton={{
          text: "Join Discord",
          href: "https://discord.gg/techentrepreneurs",
          icon: undefined
        }}
      />
      <main>
        <HeroSection 
          badge={{
            text: "Join our growing community",
            action: {
              text: "Learn more",
              href: "#community-features",
            },
          }}
          title="TECH ENTREPRENEURS"
          description="A community for tech founders and builders"
          actions={[
            {
              text: "Join Discord",
              href: "https://discord.gg/techentrepreneurs",
              icon: <ExternalLink className="h-5 w-5" />,
              variant: "default"
            }
          ]}
          image={{
            light: "/hero-banner.png",
            dark: "/hero-banner.png",
            alt: "Tech Entrepreneurs Community"
          }}
        />
        
        <CommunityFeatures />
        
        <FeaturedBuilderProjects 
          recentProjects={recentProjects}
          trendingProjects={trendingProjects}
          newBuilderProjects={newBuilderProjects}
        />
      </main>
      
      <DiscordFooter logoUrl="/logo.png" />
    </div>
  );
}

import { HeroSection } from "@/components/HeroSection";
import { TechNavbar } from "@/components/TechNavbar";
import { CommunityFeatures } from "@/components/CommunityFeatures";
import { FeaturedBuilderProjects } from "@/components/FeaturedBuilderProjects";
import { DiscordFooter } from "@/components/DiscordFooter";
import { recentProjects, trendingProjects, newBuilderProjects } from "@/lib/projectData";

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
          title="TECH ENTREPRENEURS"
          tagline="A community for tech founders and builders"
          bannerUrl="/banner.png"
          ctaText="Join Discord"
          ctaUrl="https://discord.gg/techentrepreneurs"
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

import { HeroSection } from "@/components/hero-section";
import { MainNavBar } from "@/components/MainNavBar";
import { CommunityFeatures } from "@/components/CommunityFeatures";
import { FeaturedBuilderProjects } from "@/components/FeaturedBuilderProjects";
import { DiscordFooter } from "@/components/DiscordFooter";
import { StatsSection } from "@/components/StatsSection";
import { recentProjects, trendingProjects, newBuilderProjects } from "@/lib/projectData";
import { ExternalLink } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { DiscordButton } from "@/components/ui/discord-button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavBar />
      <main>
        <section id="home">
          <HeroSection 
            badge={{
              text: "Join our growing community",
              action: {
                text: "Learn more",
                href: "#about",
              },
            }}
            title="Where Builders"
            animatedWords={["Launch", "Grow", "Succeed"]}
            description="Join a thriving community of innovators and entrepreneurs."
            actions={[]}
            customActions={
              <div className="mt-2 relative z-[101] pointer-events-auto flex flex-col items-center">
                <DiscordButton 
                  href="https://discord.gg/2ACAxkBhMB" 
                  className="transform scale-110"
                />
                <div className="mt-16 mb-8 w-full">
                  <StatsSection />
                </div>
              </div>
            }
            image={{
              light: "/hero-banner.png",
              dark: "/hero-banner.png",
              alt: "Tech Entrepreneurs Discord Community"
            }}
          />
        </section>
        
        <section id="about">
          <CommunityFeatures />
        </section>
        
        <section id="builders">
          <FeaturedBuilderProjects 
            recentProjects={recentProjects}
            trendingProjects={trendingProjects}
            newBuilderProjects={newBuilderProjects}
          />
        </section>
        
        <section id="events" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
            <div className="grid place-items-center p-10 bg-muted rounded-lg">
              <p className="text-xl text-center">Stay tuned for exciting community events!</p>
            </div>
          </div>
        </section>
      </main>
      
      <DiscordFooter logoUrl="/logo.png" />
    </div>
  );
}

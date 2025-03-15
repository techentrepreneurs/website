import { HeroSection } from "@/components/hero-section";
import { MainNavBar } from "@/components/MainNavBar";
import { CommunityFeatures } from "@/components/CommunityFeatures";
import { FeaturedBuilderProjects } from "@/components/FeaturedBuilderProjects";
import { ModernFooter } from "@/components/ModernFooter";
import { StatsSection } from "@/components/StatsSection";
import {
  recentProjects,
  trendingProjects,
  newBuilderProjects,
} from "@/lib/projectData";
import { DiscordButton } from "@/components/ui/discord-button";
import { env } from "@/lib/env";

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
                <div className="mb-8 w-full">
                  <StatsSection />
                </div>
                <DiscordButton
                  href={env.NEXT_PUBLIC_DISCORD_URL}
                  className="transform scale-110 mt-8"
                />
              </div>
            }
            image={{
              light: "/hero-banner.png",
              dark: "/hero-banner.png",
              alt: "Tech Startups Community",
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
      </main>

      <ModernFooter
        logoUrl="/logo.png"
        discordInviteUrl={env.NEXT_PUBLIC_DISCORD_URL}
      />
    </div>
  );
}

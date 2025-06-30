import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GovernanceSection } from '@/components/sections/GovernanceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { InsideSection } from '@/components/sections/InsideSection'
import { AllInOneSection } from '@/components/sections/AllInOneSection'
import { DifferenceSection } from '@/components/sections/DifferenceSection'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section id="overview">
          <HeroSection />
        </section>

        <section id="governance">
          <GovernanceSection />
        </section>

        <section id="inside">
          <InsideSection />
        </section>

        <section id="allinone">
          <AllInOneSection />
        </section>

        <section id="difference">
          <DifferenceSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

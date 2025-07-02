"use client";

import Image from "next/image";

export function GovernanceSection() {
  return (
    <section
      id="governance"
      className="relative w-full max-w-7xl m-auto mt-16 overflow-hidden py-12 md:py-24"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-16 flex flex-col space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground">
            Governance by Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Every member is voted in by the community, not gatekeeping. Just
            peers.
          </p>
        </div>

        <div className="mb-24 sm:mx-16 lg:mx-0">
          <div className="hidden lg:block relative aspect-[24/5] w-full overflow-hidden rounded-lg">
            <Image
              className="object-cover"
              src="/assets/governance-examples.webp"
              alt="Voting Examples"
              fill
              priority
            />
          </div>
          <div className="lg:hidden relative aspect-[3/5] w-full overflow-hidden rounded-lg">
            <Image
              className="lg:hidden object-cover"
              src="/assets/governance-examples-mobile.webp"
              alt="Voting Examples"
              fill
              priority
            />
          </div>
        </div>

        <div className="sm:mx-24 lg:mx-16">
          <div className="hidden lg:block relative aspect-[26/3] w-full overflow-hidden rounded-lg">
            <Image
              className="object-cover"
              src="/assets/governance-steps.webp"
              alt="Steps for Voting"
              fill
              priority
            />
          </div>
          <div className="lg:hidden relative aspect-[1/1] w-full overflow-hidden rounded-lg">
            <Image
              className="lg:hidden object-cover"
              src="/assets/governance-steps-mobile.webp"
              alt="Steps for Voting"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

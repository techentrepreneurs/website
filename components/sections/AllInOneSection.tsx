"use client";

import Image from "next/image";

export function AllInOneSection() {
  return (
    <section
      id="allinone"
      className="relative w-full max-w-7xl m-auto mt-16 overflow-hidden  py-12 md:py-24"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-16 flex flex-col space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground">
            All in One Place
          </h1>
        </div>

        <div className="mx-8 sm:mx-16 lg:mx-0 relative lg:block">
          <div className="hidden lg:block relative aspect-[14/9] w-full overflow-hidden rounded-lg">
            <Image
              className="object-cover"
              src="/assets/allinone-preview.webp"
              alt="Tech Startups All in One Place Preview"
              fill
              priority
            />
          </div>
          <div className="lg:hidden relative aspect-[5/12] w-full overflow-hidden rounded-lg">
            <Image
              className="object-cover"
              src="/assets/allinone-preview-mobile.webp"
              alt="Tech Startups All in One Place Preview"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

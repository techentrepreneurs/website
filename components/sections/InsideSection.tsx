"use client";

import Image from "next/image";

export function InsideSection() {
  return (
    <section
      id="inside"
      className="relative w-full max-w-7xl m-auto mt-16 overflow-hidden  py-12 md:py-24"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-16 flex flex-col space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground">
            Inside the Server
          </h1>
        </div>

        <div className="relative lg:block">
          <div className="mx-0 sm:mx-16 lg:mx-0 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg">
              <Image
                className="object-cover"
                src="/assets/inside-members.svg"
                alt="7000+ Members"
                fill
                priority
              />
            </div>
            <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg">
              <Image
                className="object-cover"
                src="/assets/inside-builders.webp"
                alt="Active Builders"
                fill
                priority
              />
            </div>
            <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg">
              <Image
                className="object-cover"
                src="/assets/inside-conversation.webp"
                alt="High quality Conversation"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

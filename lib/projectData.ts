import { env } from "./env";

export const recentProjects = [
  {
    id: "1",
    name: "Artasaka",
    description: "Creative art platform and digital content agency",
    category: "Creative Tech",
    status: "Active" as const,
    update: {
      message:
        "Reached out to another developer to hire them for 3 months full time. If it works out well, it might transition to a full time position.",
      author: {
        name: "Lost",
        handle: "lostdoesart",
        image: "",
      },
      timestamp: "Just now",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    githubLink: "",
    externalLink: "",
  },
  {
    id: "2",
    name: "RustGFX",
    description: "Rust design and development services",
    category: "Design",
    status: "Active" as const,
    update: {
      message:
        "Acquired a team of 9 designers, 3 video editors and 2 developers. Made an agreement with a rust design group to handle the workload while I manage marketing.",
      author: {
        name: "Lost",
        handle: "lostdoesart",
        image: "",
      },
      timestamp: "Just now",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    externalLink: "https://rustgfx.com",
  },
  {
    id: "3",
    name: "InfraCharm",
    description: "InfraCharm is an MSSP based out of Virginia Beach",
    category: "System Administration",
    status: "Active" as const,
    update: {
      message:
        "Had a phenomenal call with a prospective client - big potential project in immediate pipeline.",
      author: {
        name: "Jared",
        handle: "infracharm",
        image: "",
      },
      timestamp: "Recently",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    githubLink: "",
    externalLink: "",
  },
];

export const trendingProjects = [
  {
    id: "4",
    name: "TeraCast Networks",
    description: "Modern web platform and networking solutions",
    category: "Web Development",
    status: "Active" as const,
    update: {
      message:
        "Main page is basically done! Currently working on tweaks, mobile support, and adding light mode styling. Next I'll focus on adding each other page.",
      author: {
        name: "Patrick",
        handle: "pyuwu17",
        image: "",
      },
      timestamp: "Recently",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    externalLink: "",
  },
  {
    id: "5",
    name: "RustGFX",
    description: "Rust design and development services",
    category: "Design",
    status: "Active" as const,
    update: {
      message:
        "The team is very open to getting art direction and guidance at the start of our collaboration. Excited to grow our service offerings.",
      author: {
        name: "Lost",
        handle: "lostdoesart",
        image: "",
      },
      timestamp: "Just now",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    githubLink: "",
    externalLink: "https://rustgfx.com",
  },
  {
    id: "6",
    name: "Artasaka",
    description: "Creative art platform and digital content agency",
    category: "Creative Tech",
    status: "Funding" as const,
    update: {
      message:
        "Expanding our team with new talent. Looking to grow our creative capabilities with specialized developers.",
      author: {
        name: "Lost",
        handle: "lostdoesart",
        image: "",
      },
      timestamp: "Just now",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    externalLink: "",
  },
];

export const newBuilderProjects = [
  {
    id: "7",
    name: "InfraCharm",
    description: "InfraCharm is an MSSP based out of Virginia Beach",
    category: "System Administration",
    status: "Active" as const,
    update: {
      message:
        "Had a phenomenal call with a prospective client - big potential project in immediate pipeline.",
      author: {
        name: "Jared",
        handle: "infracharm",
        image: "",
      },
      timestamp: "Recently",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    githubLink: "",
    externalLink: "",
  },
  {
    id: "8",
    name: "TeraCast Networks",
    description: "Modern web platform and networking solutions",
    category: "Web Development",
    status: "Active" as const,
    update: {
      message:
        "Making good progress on our web platform. Planning to add more pages soon after completing current mobile optimization work.",
      author: {
        name: "Patrick",
        handle: "pyuwu17",
        image: "",
      },
      timestamp: "Recently",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
    githubLink: "",
  },
  {
    id: "9",
    name: "RustGFX",
    description: "Rust design and development services",
    category: "Design",
    status: "Active" as const,
    update: {
      message:
        "Building a comprehensive design and development service. Recently expanded with a large team to handle all client workload.",
      author: {
        name: "Lost",
        handle: "lostdoesart",
        image: "",
      },
      timestamp: "Just now",
    },
    channelLink: env.NEXT_PUBLIC_DISCORD_URL,
  },
];

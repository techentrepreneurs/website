// we could consider using a build-time env validation library like https://env.t3.gg/

export const env = {
  NEXT_PUBLIC_DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL!,
} as const;

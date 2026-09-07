export const banners = {
  "/hero/hea1.jpeg": { width: 1600, height: 666, tone: "bg-[#1c4a32]" },
  "/hero/hea2.jpeg": { width: 1600, height: 666, tone: "bg-white" },
  "/hero/hea3.jpeg": { width: 1600, height: 667, tone: "bg-[#1a3a1a]" },
  "/hero/hea4.jpeg": { width: 1600, height: 666, tone: "bg-[#d7eef6]" },
} as const;

export type BannerSrc = keyof typeof banners;

export function getBanner(src: string) {
  return banners[src as BannerSrc];
}

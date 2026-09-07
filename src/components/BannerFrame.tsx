import Image from "next/image";
import { getBanner } from "@/data/banners";

export function BannerFrame({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const art = getBanner(src) ?? { width: 1600, height: 666, tone: "bg-sand" };

  return (
    <div className={`overflow-hidden ${art.tone} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={art.width}
        height={art.height}
        className="h-auto w-full"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { GOSHALA_VIDEOS, type GalleryVideo } from "@/data/gallery";

interface GoshalaVideoSectionProps {
  title?: string;
  subtitle?: string;
}

export function GoshalaVideoSection({
  title = "Live Goshala Video Darshan",
  subtitle = "Experience our sanctuary life — filmed live at our Goshala sanctuary in Dhawda, Bhokardan.",
}: GoshalaVideoSectionProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // References to video elements
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (video: GalleryVideo) => {
    const el = videoRefs.current[video.id];
    if (!el) return;

    if (el.paused) {
      // Pause other playing videos
      Object.entries(videoRefs.current).forEach(([id, otherEl]) => {
        if (id !== video.id && otherEl && !otherEl.paused) {
          otherEl.pause();
        }
      });
      el.play();
      setPlayingVideoId(video.id);
    } else {
      el.pause();
      setPlayingVideoId(null);
    }
  };

  const verticalVideo = GOSHALA_VIDEOS.find((v) => v.orientation === "vertical");
  const horizontalVideo = GOSHALA_VIDEOS.find((v) => v.orientation === "horizontal");

  return (
    <section className="py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest border border-forest/15">
          <span className="h-2 w-2 rounded-full bg-leaf animate-pulse" />
          Live Sanctuary Darshan
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl text-forest">{title}</h2>
        <p className="mt-2.5 text-sm md:text-base text-muted leading-relaxed">{subtitle}</p>
      </div>

      {/* Grid: 9:16 Reel on Left/Center + 16:9 Cinematic on Right/Center */}
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================ */}
        {/* 1. VERTICAL REEL VIDEO (9:16) */}
        {/* ============================================================ */}
        {verticalVideo && (
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[360px] mx-auto">
              {/* Reel Card Container (Fixed 9:16 ratio) */}
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2.25rem] bg-stone-950 shadow-2xl ring-4 ring-forest/10">
                <video
                  ref={(el) => {
                    videoRefs.current[verticalVideo.id] = el;
                  }}
                  src={verticalVideo.src}
                  poster={verticalVideo.poster}
                  playsInline
                  controls
                  preload="metadata"
                  onPlay={() => setPlayingVideoId(verticalVideo.id)}
                  onPause={() => {
                    if (playingVideoId === verticalVideo.id) setPlayingVideoId(null);
                  }}
                  className="h-full w-full object-cover"
                />

                {/* Initial Click-to-Play Overlay (Disappears once playing) */}
                {playingVideoId !== verticalVideo.id && (
                  <div
                    onClick={() => togglePlay(verticalVideo)}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/40 cursor-pointer transition-opacity"
                  >
                    {/* Top Pill */}
                    <div className="self-start">
                      <span className="rounded-full bg-forest/80 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-xs border border-lime/30">
                        {verticalVideo.category}
                      </span>
                    </div>

                    {/* Big Center Play Icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-forest shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="w-full text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-lime">
                        Duration: {verticalVideo.duration}
                      </p>
                      <h3 className="font-serif text-lg font-bold leading-tight mt-0.5">
                        {verticalVideo.title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-2 mt-1">
                        {verticalVideo.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Action */}
              <div className="mt-4 p-2 text-center sm:text-left">
                <h4 className="font-serif text-base font-bold text-forest">{verticalVideo.title}</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">{verticalVideo.desc}</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted border-t border-forest/10 pt-2">
                  <span>Filmed at Bhokardan Goshala</span>
                  <span className="font-semibold text-leaf">Goshala Sanctuary</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. HORIZONTAL WIDESCREEN VIDEO */}
        {/* ============================================================ */}
        {horizontalVideo && (
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <div>
              {/* 16:9 Video Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-stone-950 shadow-2xl ring-4 ring-forest/10">
                <video
                  ref={(el) => {
                    videoRefs.current[horizontalVideo.id] = el;
                  }}
                  src={horizontalVideo.src}
                  poster={horizontalVideo.poster}
                  playsInline
                  controls
                  preload="metadata"
                  onPlay={() => setPlayingVideoId(horizontalVideo.id)}
                  onPause={() => {
                    if (playingVideoId === horizontalVideo.id) setPlayingVideoId(null);
                  }}
                  className="h-full w-full object-contain bg-black"
                />

                {/* Play Button Overlay (Disappears on play) */}
                {playingVideoId !== horizontalVideo.id && (
                  <div
                    onClick={() => togglePlay(horizontalVideo)}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-stone-950/40 cursor-pointer transition-opacity"
                  >
                    {/* Top Pill */}
                    <div className="self-start">
                      <span className="rounded-full bg-forest/80 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-xs border border-lime/30">
                        {horizontalVideo.category}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-lime text-forest shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Bottom Info */}
                    <div className="w-full text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-lime">
                        Duration: {horizontalVideo.duration}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl font-bold leading-tight mt-0.5">
                        {horizontalVideo.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/80 line-clamp-2 mt-1">
                        {horizontalVideo.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Accompanying Information Card */}
            <div className="rounded-2xl bg-white p-5 border border-forest/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-leaf">
                  Goshala Sanctuary Life
                </span>
                <span className="text-xs text-muted">Jalna, Maharashtra</span>
              </div>
              <h3 className="font-serif text-xl text-forest font-bold">{horizontalVideo.title}</h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">{horizontalVideo.desc}</p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20watched%20your%20Goshala%20videos%20and%20would%20like%20to%20visit!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-cream transition hover:bg-leaf active:scale-95 shadow-xs"
                >
                  <span>Connect on WhatsApp for Live Video Call</span>
                  <span>💬</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

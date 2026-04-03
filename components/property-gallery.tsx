"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: Props) {
  const safeImages = images.length > 0 ? images : ["https://placehold.co/1200x800?text=Property+Photo"];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = safeImages[activeIndex] || safeImages[0];

  function goTo(index: number) {
    const nextIndex = (index + safeImages.length) % safeImages.length;
    setActiveIndex(nextIndex);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-[32px] bg-slate-100 shadow-sm">
        <Image
          src={activeImage}
          alt={`${title} image ${activeIndex + 1}`}
          width={1400}
          height={900}
          className="h-[420px] w-full object-cover"
        />

        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-sm transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-slate-950/70 px-3 py-2">
              {safeImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/40"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => goTo(index)}
            className={`overflow-hidden rounded-[22px] border bg-white text-left shadow-sm transition ${index === activeIndex ? "border-slate-950" : "border-slate-200 hover:border-slate-300"}`}
            aria-label={`Preview image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              width={800}
              height={600}
              className="h-24 w-full object-cover sm:h-28"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

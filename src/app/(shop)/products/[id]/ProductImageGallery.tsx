"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  title: string;
  thumbnail: string;
  images: string[];
}

export default function ProductImageGallery({
  title,
  thumbnail,
  images,
}: ProductImageGalleryProps) {
  const allImages = useMemo(() => {
    const merged = [thumbnail, ...images].filter(Boolean);
    return Array.from(new Set(merged));
  }, [thumbnail, images]);

  const [selectedImage, setSelectedImage] = useState(allImages[0] ?? thumbnail);

  return (
    <div className="space-y-4">
      <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-50 md:h-[420px]">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((image, index) => {
            const isActive = image === selectedImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative h-20 overflow-hidden rounded-lg border bg-slate-50 transition ${
                  isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-400"
                }`}
                aria-label={`Xem ảnh ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

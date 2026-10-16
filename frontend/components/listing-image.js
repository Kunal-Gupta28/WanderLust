"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85";

export default function ListingImage({
  src,
  alt = "WanderLust sanctuary stay",
  fill = false,
  priority = false,
  sizes,
  className = "",
  onLoad,
  ...props
}) {
  const initial = src || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = useState(initial);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || FALLBACK_IMAGE);
    setHasError(false);
  }, [src]);

  return (
    <Image
      src={hasError ? FALLBACK_IMAGE : imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      onLoad={onLoad}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
      {...props}
    />
  );
}

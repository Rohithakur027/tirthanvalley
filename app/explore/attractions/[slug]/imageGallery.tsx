"use client"

import { useState } from "react"
import Image from "next/image"

// ✅ CLIENT COMPONENT - Only handles interactive image gallery
interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  // ✅ CLIENT-SIDE STATE - Only interactive logic here
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* ✅ MAIN IMAGE DISPLAY */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
        <Image
          loading="lazy"
          src={images[activeImageIndex] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-all duration-500"
        />
      </div>

      {/* ✅ THUMBNAIL NAVIGATION - Interactive buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              activeImageIndex === index
                ? "border-emerald-500 dark:border-emerald-400"
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`${title} ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

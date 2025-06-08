"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/gallaryData";
import { GalleryImage } from "@/data/gallaryData";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [filteredImages, setFilteredImages] =
    useState<GalleryImage[]>(galleryImages);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentCategory === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === currentCategory)
      );
    }
  }, [currentCategory]);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedIndex > 0) {
      setSelectedImage(filteredImages[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevImage();
    } else if (e.key === "ArrowRight") {
      handleNextImage();
    } else if (e.key === "Escape") {
      setSelectedImage(null);
    }
  };

  return (
    <div
      className="container px-4 py-12 md:px-6 md:py-24"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex flex-col space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl slide-up">
            Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto slide-up">
            Explore the beauty of Tirthan Valley through our collection of
            images
          </p>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          value={currentCategory}
          onValueChange={(value) => {
            setCurrentCategory(value);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 500);
          }}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <TabsTrigger
                value="all"
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="Landscapes"
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
              >
                Landscapes
              </TabsTrigger>
              <TabsTrigger
                value="Wildlife"
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
              >
                Wildlife
              </TabsTrigger>
              <TabsTrigger
                value="Culture"
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
              >
                Culture
              </TabsTrigger>
              <TabsTrigger
                value="Activities"
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
              >
                Activities
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={currentCategory} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scale-in">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group hover-lift"
                    onClick={() => handleImageClick(image, index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <h3 className="text-white font-medium">{image.alt}</h3>
                        <p className="text-white/80 text-sm">
                          {image.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95 backdrop-blur-lg border-0">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>

              <div className="relative h-[80vh] w-full">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-white">
                  {selectedImage.alt}
                </h3>
                <p className="text-sm text-white/80">
                  {selectedImage.description}
                </p>
              </div>

              {selectedIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </button>
              )}

              {selectedIndex < filteredImages.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

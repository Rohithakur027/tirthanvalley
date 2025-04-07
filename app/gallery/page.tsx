"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

interface GalleryImage {
  src: string;
  alt: string;
  description: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/tirthan-river02.jpg",
    alt: "Tirthan River",
    description:
      "The crystal clear waters of Tirthan River flowing through the valley.",
    category: "Landscapes",
  },
  {
    src: "/images/ghnp.jpg",
    alt: "Great Himalayan National Park",
    description: "A panoramic view of the Great Himalayan National Park.",
    category: "Landscapes",
  },
  {
    src: "/images/monal.webp",
    alt: "Himalayan Monal",
    description:
      "The colorful Himalayan Monal, state bird of Himachal Pradesh.",
    category: "Wildlife",
  },
  {
    src: "/images/house.webp",
    alt: "Traditional Kullu House",
    description:
      "A traditional wooden house in the Kullu style of architecture.",
    category: "Culture",
  },
  {
    src: "/images/trout-fishing.jpg",
    alt: "Trout Fishing",
    description: "Angling for trout in the pristine waters of Tirthan River.",
    category: "Activities",
  },
  {
    src: "/images/serolsar.jpeg",
    alt: "Serolsar Lake",
    description: "The serene Serolsar Lake surrounded by dense forests.",
    category: "Landscapes",
  },
  {
    src: "/images/black-bear.jpg",
    alt: "Himalayan Black Bear",
    description:
      "A rare sighting of the Himalayan Black Bear in its natural habitat.",
    category: "Wildlife",
  },
  {
    src: "/images/culture01.jpg",
    alt: "Local Festival",
    description:
      "Locals celebrating a traditional festival with colorful costumes.",
    category: "Culture",
  },
  {
    src: "/images/blog-seasons.jpg",
    alt: "Trekking Trail",
    description:
      "A scenic trekking trail through the forests of Tirthan Valley.",
    category: "Activities",
  },

  {
    src: "/images/himalyan-griffon.jpg",
    alt: "Himalayan Griffon",
    description: "A Himalayan Griffon soaring high above the valley.",
    category: "Wildlife",
  },
  {
    src: "/images/blog-siddu.jpg",
    alt: "Traditional Cuisine",
    description:
      "A spread of traditional Himachali dishes served on a brass thali.",
    category: "Culture",
  },
  {
    src: "/images/riverside-camping03.jpg",
    alt: "Camping by the River",
    description:
      "Tents set up by the riverside for an overnight camping experience.",
    category: "Activities",
  },
  {
    src: "/images/ghnp02.jpg",
    alt: "Alpine Meadows",
    description: "Lush green alpine meadows dotted with wildflowers.",
    category: "Landscapes",
  },
  {
    src: "/images/himalyan-tahr.jpg",
    alt: "Himalayan Tahr",
    description: "A Himalayan Tahr perched on a rocky outcrop.",
    category: "Wildlife",
  },
  {
    src: "/images/locals02.jpg",
    alt: "Local Handicrafts",
    description: "Intricate handwoven shawls and other local handicrafts.",
    category: "Culture",
  },
  {
    src: "/images/deodar-forest.jpg",
    alt: "Balne Forest",
    description:
      "A dense deodar forest perfect for nature walks and birdwatching.",
    category: "Landscapes",
  },
  {
    src: "/images/snow-leopard.jpg",
    alt: "Snow Leopard",
    description:
      "A rare and elusive predator found in the higher altitudes of GHNP.",
    category: "Wildlife",
  },
  {
    src: "/images/mask-festival.jpeg",
    alt: "Faguli Festival",
    description:
      "A unique mask festival celebrated in Tirthan Valley with traditional dances and rituals.",
    category: "Culture",
  },
  {
    src: "/images/balo-panjo.webp",
    alt: "Local Mela",
    description:
      "A vibrant local fair featuring folk music, food stalls, and cultural performances.",
    category: "Culture",
  },
  {
    src: "/images/kath-kuni-house.jpg",
    alt: "Kath-Kuni Architecture",
    description:
      "A traditional style of building using interlocking wood and stone, earthquake resistant and aesthetic.",
    category: "Culture",
  },
  {
    src: "/images/locals04.jpg",
    alt: "Wool Weaving",
    description:
      "Local women weaving warm woolen clothes using age-old handloom techniques.",
    category: "Culture",
  },
  {
    src: "/images/musk-deer.jpg",
    alt: "Musk Deer",
    description:
      "A shy and endangered deer species known for its scent glands, seen in the GHNP.",
    category: "Wildlife",
  },
  {
    src: "/images/himalyan-bulbul.jpg",
    alt: "Himalayan Bulbul",
    description:
      "A melodious bird often seen perched on rhododendron branches.",
    category: "Wildlife",
  },
  {
    src: "/images/locals05.jpg",
    alt: "Himachali Folk Music",
    description:
      "Traditional Himachali folk performances with instruments like the 'narsingha' and 'dhol'.",
    category: "Culture",
  },
  {
    src: "/images/himachali-dham.webp",
    alt: "Himachali Dham",
    description:
      "A festive traditional meal served on leaves, prepared during weddings and festivals.",
    category: "Culture",
  },
  {
    src: "/images/rhododendron.webp",
    alt: "Rhododendron Bloom",
    description:
      "Bright pink rhododendron flowers blooming in the forests during spring.",
    category: "Landscapes",
  },

  {
    src: "/images/ghnp03.jpg",
    alt: "Shepherd Huts",
    description:
      "Stone huts used by shepherds during seasonal migration to highland pastures.",
    category: "Culture",
  },
  {
    src: "/images/night-sky.jpg",
    alt: "Night Sky in Tirthan",
    description:
      "A clear night sky offering breathtaking stargazing opportunities.",
    category: "Landscapes",
  },
  {
    src: "/images/shangarh02.jpg",
    alt: "Sainj Valley",
    description:
      "A lesser-known gem near Tirthan Valley, ideal for peaceful nature retreats.",
    category: "Landscapes",
  },

  {
    src: "/images/himalyan-gray-langur.png",
    alt: "Himalayan Grey Langur",
    description:
      "A long-tailed monkey species commonly seen near forested areas.",
    category: "Wildlife",
  },
  {
    src: "/images/river-crossing.jpg",
    alt: "Traditional River Crossing",
    description:
      "Wooden bridges and trolley crossings connecting remote villages over rivers.",
    category: "Activities",
  },
  {
    src: "/images/homestay.jpg",
    alt: "Traditional Homestays",
    description:
      "Rustic yet cozy homestays run by locals offering authentic village experiences.",
    category: "Culture",
  },
  {
    src: "/images/himalyan-thrush.jpg",
    alt: "Himalayan Thrush",
    description: "A beautiful mountain bird known for its melodic calls.",
    category: "Wildlife",
  },
];

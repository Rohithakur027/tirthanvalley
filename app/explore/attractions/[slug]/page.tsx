"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Info,

  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { attractions } from "@/data/attractiondata";
import { relatedAttractions } from "@/data/attractiondata";
interface AttractionPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export default function AttractionPage({ params }: AttractionPageParams) {
  const { slug } = React.use(params);
  const attraction = getAttractionBySlug(slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!attraction) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Attraction not found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The attraction you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/explore/attractions">View all attractions</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container py-12 md:py-24">
        <Button
          asChild
          variant="ghost"
          className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Link href="/explore/attractions" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all attractions
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                {attraction.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{attraction.location}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <Image
                  src={
                    attraction.images[activeImageIndex] || "/placeholder.svg"
                  }
                  alt={attraction.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {attraction.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImageIndex === index
                        ? "border-emerald-500 dark:border-emerald-400"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${attraction.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About {attraction.title}</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {attraction.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attraction.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
                  >
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2 text-emerald-600 dark:text-emerald-400">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{highlight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activities */}
            {attraction.activities && attraction.activities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Activities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {attraction.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
                    >
                      <h3 className="font-medium mb-2">{activity}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flora and Fauna (for GHNP) */}
            {attraction.floraFauna && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Flora and Fauna</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Flora</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {attraction.floraFauna.flora.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Fauna</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {attraction.floraFauna.fauna.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                <iframe
                  src={attraction.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Quick Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Visiting Hours</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attraction.visitingHours}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Best Time to Visit</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attraction.bestTimeToVisit}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Entry Fee</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attraction.entryFee}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Tips for Visitors</h3>
              <ul className="space-y-2">
                {attraction.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      •
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Website */}
            {attraction.officialWebsite && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
                <h3 className="text-xl font-bold">Official Information</h3>
                <a
                  href={attraction.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Official Website
                </a>
              </div>
            )}

            {/* Nearby Attractions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Nearby Attractions</h3>
              <ul className="space-y-3">
                {attraction.nearbyAttractions.map((nearby, index) => (
                  <li key={index}>
                    <Link
                      href={`/explore/attractions/${nearby.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={nearby.image || "/placeholder.svg"}
                          alt={nearby.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {nearby.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {nearby.distance} away
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Attractions */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedAttractions
              .filter((related) => related.slug !== slug)
              .slice(0, 4)
              .map((attraction, index) => (
                <Link
                  key={index}
                  href={`/explore/attractions/${attraction.slug}`}
                  className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {attraction.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {attraction.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getAttractionBySlug(slug: string) {
  // In a real app, you would fetch this from a database or API

  return attractions.find((attraction) => attraction.slug === slug);
}


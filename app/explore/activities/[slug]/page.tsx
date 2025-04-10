"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  User,
  Star,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { activities } from "@/data/activitydata";

interface ActivityPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export default function ActivityPage({ params }: ActivityPageParams) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const activity = activities.find((activity) => activity.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activity) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The activity you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/explore/activities">View all activities</Link>
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
          <Link href="/explore/activities" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all activities
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                {activity.category}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                {activity.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{activity.duration}</span>
                </div>
                {activity.difficulty && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Difficulty: {activity.difficulty}</span>
                  </div>
                )}
                <div className="flex items-center gap-1"></div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <Image
                  src={activity.images[activeImageIndex] || "/placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {activity.images.map((image, index) => (
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
                      alt={`${activity.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About This Activity</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {activity.description.map((paragraph, index) => (
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
            {activity.highlights && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
                    >
                      <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2 text-emerald-600 dark:text-emerald-400">
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{highlight}</h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {activity.itinerary && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Itinerary</h2>
                <div className="space-y-6">
                  {activity.itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-emerald-200 dark:border-emerald-900"
                    >
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What to Bring */}
            {activity.whatToBring && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">What to Bring</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.whatToBring.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                <iframe
                  src={activity.mapUrl}
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
                    <span className="font-medium">Duration</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.duration}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Best Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.bestTime}
                    </p>
                  </div>
                </li>
                {activity.price && (
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                    <div>
                      <span className="font-medium">Price Range</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.price}
                      </p>
                    </div>
                  </li>
                )}
                {activity.groupSize && (
                  <li className="flex items-start gap-3">
                    <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Group Size</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.groupSize}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Tips for Participants</h3>
              <ul className="space-y-2">
                {activity.tips.map((tip, index) => (
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

            {/* Booking Info */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Booking Information</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                To book this activity or for more information, please contact:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    +91 78078 18119
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    exploretirthanvalley@gmail.com
                  </span>
                </li>
              </ul>
              <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
                Inquire Now
              </Button>
            </div>

            {/* Related Activities */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Similar Activities</h3>
              <ul className="space-y-3">
                {activities
                  .filter(
                    (related) =>
                      related.slug !== slug &&
                      related.category === activity.category
                  )
                  .slice(0, 3)
                  .map((related, index) => (
                    <li key={index}>
                      <Link
                        href={`/explore/activities/${related.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                          {/* error */}
                          <Image
                            src={related.heroimage || "/placeholder.svg"}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {related.category}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Activities */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities
              .filter((related) => related.slug !== slug)
              .slice(0, 4)
              .map((activity, index) => (
                <Link
                  key={index}
                  href={`/explore/activities/${activity.slug}`}
                  className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={activity.heroimage || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                      {activity.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {activity.shortDescription}
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

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { ArrowLeft, Clock, MapPin, Calendar, User, Star, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { activities } from "@/data/activitydata"
import ImageGallery from "../../attractions/[slug]/imageGallery"
import Breadcrumb from "@/components/Breadcrumb"

const metaDescriptions: Record<string, string> = {
  "trekking-ghnp":
    "Trekking in Great Himalayan National Park from Tirthan Valley — Tirthan Trek, Sainj Valley Trek, Raktisar Trek. Routes, difficulty levels, permits & packing guide.",
  "trout-fishing":
    "Trout fishing in Tirthan River — catch brown & rainbow trout in crystal-clear Himalayan waters. Permits, best spots, season, equipment & guided fishing trips.",
  "riverside-camping":
    "Riverside camping in Tirthan Valley — camp by the Tirthan River with bonfires, stargazing & nature walks. Best campsites, costs, what to bring & booking guide.",
  "village-tours":
    "Village tours in Tirthan Valley — visit Gushaini, Nagini, Shoja & traditional Himachali villages. Experience local culture, wooden architecture & warm hospitality.",
  "bird-watching":
    "Bird watching in Tirthan Valley & GHNP — spot 300+ species including Western Tragopan, Himalayan Monal, Crested Kingfisher & Asian Paradise Flycatcher. Best trails, seasons & tips.",
  "jalori-pass-trek":
    "Jalori Pass trek from Tirthan Valley — moderate day trek to 3,120m with panoramic Himalayan views. Routes to Serolsar Lake & Raghupur Fort, best season & what to pack.",
  "cooking-classes":
    "Himachali cooking classes in Tirthan Valley — learn to make Siddu, Babru, Aktori & trout curry at local homestays with village cooks. Hands-on 2-3 hour sessions.",
  "photography-tours":
    "Photography tours in Tirthan Valley — capture GHNP landscapes, Himalayan wildlife, traditional villages & river valleys. Best spots, golden hour tips & seasonal guide.",
  "nature-learning-center-walk":
    "GHNP Nature Learning Center walk at Sai Ropa, Tirthan Valley — interactive ecology exhibits, animal models & forest displays. Easy 1-2 hour family-friendly walk.",
  "craft-workshops":
    "Traditional Himachali craft workshops in Tirthan Valley — learn wool weaving, wood carving & basket making from village artisans. Hands-on 2-4 hour sessions.",
}

export async function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }))
}

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const activity = activities.find((a) => a.slug === slug)

  if (!activity) {
    return {
      title: "Activity Not Found | Tirthan Valley",
      description: "This activity doesn't exist.",
      robots: { index: false, follow: false },
    }
  }

  const title = `${activity.title} | Tirthan Valley`
  const description =
    metaDescriptions[slug] ||
    activity.description?.[0]?.slice(0, 160) ||
    `Experience ${activity.title} in Tirthan Valley — ${activity.category} activity in the beautiful Himalayas.`
  const imageUrl = activity.heroimage || "/default-og-image.jpg"
  const canonicalUrl = `https://thetirthanvalley.in/explore/activities/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Tirthan Valley",
      type: "article",
      images: [
        {
          url: `https://thetirthanvalley.in${imageUrl}`,
          width: 1200,
          height: 630,
          alt: `${activity.title} in Tirthan Valley`,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://thetirthanvalley.in${imageUrl}`],
    },
  }
}

function getActivityBySlug(slug: string) {
  return activities.find((activity) => activity.slug === slug)
}

export default async function ActivityPage({ params }: Params) {
  const { slug } = await params
  const activity = getActivityBySlug(slug)

  if (!activity) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">The activity you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/explore/activities">View all activities</Link>
        </Button>
      </div>
    )
  }

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": activity.title,
    "description": activity.shortDescription || activity.description?.[0]?.substring(0, 200),
    "image": `https://thetirthanvalley.in${activity.heroimage}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tirthan Valley",
      "addressRegion": "Himachal Pradesh",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.638,
      "longitude": 77.347
    },
    "isAccessibleForFree": true,
    "publicAccess": true,
    "touristType": ["Adventure seekers", "Nature lovers", "Families"]
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
      />
      <div className="container py-12 md:py-24">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Activities", href: "/explore/activities" },
            { label: activity.title },
          ]}
        />

        <Button asChild variant="ghost" className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href="/explore/activities" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all activities
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                {activity.category}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{activity.title}</h1>
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
              </div>
            </div>

            <ImageGallery images={activity.images} title={activity.title} />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About This Activity</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {activity.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

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
                      <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activity.whatToBring && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">What to Bring</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Quick Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Duration</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.duration}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Best Time</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.bestTime}</p>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.price}</p>
                    </div>
                  </li>
                )}
                {activity.groupSize && (
                  <li className="flex items-start gap-3">
                    <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Group Size</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.groupSize}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Tips for Participants</h3>
              <ul className="space-y-2">
                {activity.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Booking Information</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                To book this activity or for more information, please contact:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <span className="text-gray-600 dark:text-gray-400">+91 78078 18119</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-600 dark:text-gray-400">exploretirthanvalley@gmail.com</span>
                </li>
              </ul>
              <Button asChild className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
                <a href="https://wa.me/917807818119?text=Hi%2C%20I%20want%20to%20inquire%20about%20activities%20in%20Tirthan%20Valley" target="_blank" rel="noopener noreferrer">Inquire Now</a>
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Similar Activities</h3>
              <ul className="space-y-3">
                {activities
                  .filter((related) => related.slug !== slug && related.category === activity.category)
                  .slice(0, 3)
                  .map((related, index) => (
                    <li key={index}>
                      <Link href={`/explore/activities/${related.slug}`} className="flex items-start gap-3 group">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={related.heroimage || "/placeholder.svg"}
                            alt={`${related.title} activity in Tirthan Valley`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{related.category}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities
              .filter((related) => related.slug !== slug)
              .slice(0, 4)
              .map((relActivity, index) => (
                <Link
                  key={index}
                  href={`/explore/activities/${relActivity.slug}`}
                  className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={relActivity.heroimage || "/placeholder.svg"}
                      alt={`${relActivity.title} activity in Tirthan Valley`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                      {relActivity.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {relActivity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {relActivity.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

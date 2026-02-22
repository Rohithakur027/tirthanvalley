import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { ArrowLeft, Clock, MapPin, Calendar, Info, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { attractions } from "@/data/attractiondata"
import { relatedAttractions } from "@/data/attractiondata"
import ImageGallery from "./imageGallery"
import Breadcrumb from "@/components/Breadcrumb"

const metaDescriptions: Record<string, string> = {
  "great-himalayan-national-park":
    "Great Himalayan National Park (GHNP) — UNESCO World Heritage Site near Tirthan Valley. Trek routes, entry fees, permits, wildlife, best time to visit & travel tips.",
  "jalori-pass":
    "Jalori Pass at 3,120m — one of the lowest Himalayan passes near Tirthan Valley. How to reach, trekking routes to Serolsar Lake & Raghupur Fort, best season to visit.",
  "serolsar-lake":
    "Serolsar Lake — serene high-altitude lake near Jalori Pass in Tirthan Valley. Easy 5km trek, Budhi Nagin temple, photography spots & complete visitor guide.",
  "tirthan-river":
    "Tirthan River — crystal-clear river flowing through Tirthan Valley, famous for trout fishing, riverside camping, and scenic beauty. Activities & best spots guide.",
  "chehni-kothi":
    "Chehni Kothi — ancient 1500-year-old tower near Tirthan Valley. Architecture, history, trek route, and why this Himachali heritage site is a must-visit.",
  "raghupur-fort":
    "Raghupur Fort — ancient hilltop ruins at 3,300m near Jalori Pass with 360-degree Himalayan panorama. Easy trek route, history, best season to visit & photography guide.",
  "jibhi":
    "Jibhi — charming Himalayan hamlet near Tirthan Valley with ancient temples, waterfall treks, cafes & wooden architecture. How to reach, things to do & stay guide.",
  "sharchi-village":
    "Sharchi Village — traditional Himachali settlement near Tirthan Valley with Kath-Kuni architecture, terraced farms & authentic mountain village life. Visitor guide.",
  "shairopa":
    "Sai Ropa Nature Learning Centre — GHNP ecological museum near Tirthan Valley with wildlife exhibits, nature trails & park permit office. Timings, entry & guide.",
}

export async function generateStaticParams() {
  return attractions.map((attraction) => ({
    slug: attraction.slug,
  }))
}

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const attraction = attractions.find((a) => a.slug === slug)

  if (!attraction) {
    return {
      title: "Not Found | Tirthan Valley",
      description: "This attraction doesn't exist.",
      robots: { index: false, follow: false },
    }
  }

  const title = `${attraction.title} | Tirthan Valley`
  const description =
    metaDescriptions[slug] ||
    attraction.description?.[0]?.slice(0, 160) ||
    `Discover ${attraction.title} in Tirthan Valley — a hidden gem of Himachal.`
  const imageUrl = attraction.heroimage || "/default-og-image.jpg"
  const canonicalUrl = `https://thetirthanvalley.in/explore/attractions/${slug}`

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
          alt: `${attraction.title} in Tirthan Valley`,
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

function getAttractionBySlug(slug: string) {
  return attractions.find((attraction) => attraction.slug === slug)
}

export default async function AttractionPage({ params }: Params) {
  const { slug } = await params
  const attraction = getAttractionBySlug(slug)

  if (!attraction) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Attraction not found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">The attraction you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/explore/attractions">View all attractions</Link>
        </Button>
      </div>
    )
  }

  const attractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.title,
    description: attraction.description?.[0] || "",
    image: `https://thetirthanvalley.in${attraction.heroimage}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Himachal Pradesh",
      addressCountry: "IN",
    },
    geo: attraction.latitude
      ? {
          "@type": "GeoCoordinates",
          latitude: attraction.latitude,
          longitude: attraction.longitude,
        }
      : undefined,
    isAccessibleForFree: attraction.entryFee === "No entry fee",
    publicAccess: true,
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />
      <div className="container py-12 md:py-24">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Attractions", href: "/explore/attractions" },
            { label: attraction.title },
          ]}
        />

        <Button asChild variant="ghost" className="mb-8 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Link href="/explore/attractions" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all attractions
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{attraction.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{attraction.location}</span>
                </div>
              </div>
            </div>

            <ImageGallery images={attraction.images} title={attraction.title} />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About {attraction.title}</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {attraction.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

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
                      <p className="text-sm text-gray-600 dark:text-gray-400">{highlight.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

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

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Quick Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Visiting Hours</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{attraction.visitingHours}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Best Time to Visit</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{attraction.bestTimeToVisit}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Entry Fee</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{attraction.entryFee}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Tips for Visitors</h3>
              <ul className="space-y-2">
                {attraction.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

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

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
              <h3 className="text-xl font-bold">Nearby Attractions</h3>
              <ul className="space-y-3">
                {attraction.nearbyAttractions.map((nearby, index) => (
                  <li key={index}>
                    <Link href={`/explore/attractions/${nearby.slug}`} className="flex items-start gap-3 group">
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={nearby.image || (nearby as Record<string, string>).heroimage || "/placeholder.svg"}
                          alt={`${nearby.title} near ${attraction.title} in Tirthan Valley`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {nearby.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{nearby.distance} away</p>
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
            {relatedAttractions
              .filter((related) => related.slug !== slug)
              .slice(0, 4)
              .map((relAttraction, index) => (
                <Link
                  key={index}
                  href={`/explore/attractions/${relAttraction.slug}`}
                  className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={relAttraction.image || "/placeholder.svg"}
                      alt={`${relAttraction.title} attraction in Tirthan Valley`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {relAttraction.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {relAttraction.shortDescription}
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

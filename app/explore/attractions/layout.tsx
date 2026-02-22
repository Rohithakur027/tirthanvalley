import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Attractions | Tirthan Valley",
  description:
    "Top attractions in Tirthan Valley — Great Himalayan National Park, Jalori Pass, Serolsar Lake, Tirthan River & Chehni Kothi. Plan your sightseeing itinerary.",
  alternates: {
    canonical: "https://thetirthanvalley.in/explore/attractions",
  },
  openGraph: {
    title: "Attractions | Tirthan Valley",
    description:
      "Top attractions in Tirthan Valley — Great Himalayan National Park, Jalori Pass, Serolsar Lake, Tirthan River & Chehni Kothi.",
    url: "https://thetirthanvalley.in/explore/attractions",
    siteName: "Tirthan Valley",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attractions | Tirthan Valley",
    description:
      "Top attractions in Tirthan Valley — Great Himalayan National Park, Jalori Pass, Serolsar Lake, Tirthan River & Chehni Kothi.",
  },
}

export default function AttractionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

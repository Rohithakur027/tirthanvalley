import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Photo Gallery | Tirthan Valley",
  description:
    "Tirthan Valley photo gallery — stunning images of Great Himalayan National Park, Jalori Pass, Tirthan River, local villages & Himalayan landscapes.",
  alternates: {
    canonical: "https://thetirthanvalley.in/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Tirthan Valley",
    description:
      "Tirthan Valley photo gallery — stunning images of Great Himalayan National Park, Jalori Pass, Tirthan River, local villages & Himalayan landscapes.",
    url: "https://thetirthanvalley.in/gallery",
    siteName: "Tirthan Valley",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Tirthan Valley",
    description:
      "Tirthan Valley photo gallery — stunning images of Great Himalayan National Park, Jalori Pass, Tirthan River, local villages & Himalayan landscapes.",
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

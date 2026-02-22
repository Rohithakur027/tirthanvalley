import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact Us | Tirthan Valley",
  description:
    "Contact Tirthan Valley travel experts — get help planning your trip, booking stays, hiring guides. Phone, email & location in Banjar, Kullu, Himachal Pradesh.",
  alternates: {
    canonical: "https://thetirthanvalley.in/contact",
  },
  openGraph: {
    title: "Contact Us | Tirthan Valley",
    description:
      "Contact Tirthan Valley travel experts — get help planning your trip, booking stays, hiring guides.",
    url: "https://thetirthanvalley.in/contact",
    siteName: "Tirthan Valley",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Tirthan Valley",
    description:
      "Contact Tirthan Valley travel experts — get help planning your trip, booking stays, hiring guides.",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tirthan Valley Travel Guide",
  "description": "Local travel experts helping visitors explore Tirthan Valley, Great Himalayan National Park, and the best of Himachal Pradesh.",
  "url": "https://thetirthanvalley.in",
  "telephone": "+91-78078-18119",
  "email": "exploretirthanvalley@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Banjar",
    "addressLocality": "Kullu",
    "addressRegion": "Himachal Pradesh",
    "postalCode": "175123",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.638,
    "longitude": 77.347
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/thetirthanvalley/"
  ]
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  )
}

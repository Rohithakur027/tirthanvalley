import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GoogleAnalytics } from "@next/third-parties/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thetirthanvalley.in'),
  manifest: '/images/favico/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  title: "Tirthan Valley - A Hidden Gem in the Himalayas",
  description:
    "Discover Tirthan Valley — explore Great Himalayan National Park, Jalori Pass, trout fishing, homestays & trekking trails. Your complete travel guide to Himachal Pradesh's hidden gem.",
  alternates: {
    canonical: "https://thetirthanvalley.in",
  },
  openGraph: {
    title: "Tirthan Valley - A Hidden Gem in the Himalayas",
    description:
      "Discover Tirthan Valley — explore Great Himalayan National Park, Jalori Pass, trout fishing, homestays & trekking.",
    url: "https://thetirthanvalley.in",
    siteName: "Tirthan Valley",
    images: [
      {
        url: "https://thetirthanvalley.in/images/main.webp",
        width: 1200,
        height: 630,
        alt: "Tirthan Valley panoramic mountain landscape in Himachal Pradesh",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirthan Valley - A Hidden Gem in the Himalayas",
    description:
      "Discover Tirthan Valley — explore Great Himalayan National Park, Jalori Pass, trout fishing, homestays & trekking.",
    images: ["https://thetirthanvalley.in/images/main.webp"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-HSBP2F8WP9" />
      <body className={cn("min-h-screen font-sans antialiased w-full overflow-x-hidden", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tirthan Valley",
              "alternateName": "The Tirthan Valley",
              "url": "https://thetirthanvalley.in",
              "description": "Complete travel guide to Tirthan Valley in Himachal Pradesh — attractions, activities, accommodations, and travel tips for the gateway to Great Himalayan National Park.",
              "inLanguage": "en",
              "publisher": {
                "@type": "Organization",
                "name": "Tirthan Valley",
                "url": "https://thetirthanvalley.in",
                "email": "exploretirthanvalley@gmail.com",
                "telephone": "+91-78078-18119",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Banjar",
                  "addressRegion": "Himachal Pradesh",
                  "addressCountry": "IN"
                },
                "sameAs": [
                  "https://www.instagram.com/thetirthanvalley/"
                ]
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Tirthan Valley",
              description:
                "Tirthan Valley is a scenic destination in Kullu District, Himachal Pradesh, India — gateway to Great Himalayan National Park (UNESCO), known for trekking, trout fishing, and pristine Himalayan beauty.",
              url: "https://thetirthanvalley.in",
              image: "https://thetirthanvalley.in/images/main.webp",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Banjar",
                addressRegion: "Himachal Pradesh",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 31.638,
                longitude: 77.347,
              },
              telephone: "+91-78078-18119",
              touristType: ["Nature lovers", "Trekkers", "Adventure seekers", "Families"],
              includesAttraction: [
                {
                  "@type": "TouristAttraction",
                  name: "Great Himalayan National Park",
                  description: "UNESCO World Heritage Site spanning 754 sq km",
                },
                {
                  "@type": "TouristAttraction",
                  name: "Jalori Pass",
                  description: "Mountain pass at 3,120m altitude",
                },
                {
                  "@type": "TouristAttraction",
                  name: "Serolsar Lake",
                  description: "High-altitude lake near Jalori Pass",
                },
                {
                  "@type": "TouristAttraction",
                  name: "Tirthan River",
                  description: "Crystal-clear river famous for trout fishing",
                },
                {
                  "@type": "TouristAttraction",
                  name: "Chehni Kothi",
                  description: "Ancient 1500-year-old tower",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}

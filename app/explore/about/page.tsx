import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About Tirthan Valley | Tirthan Valley",
  description:
    "Learn about Tirthan Valley in Kullu, Himachal Pradesh — history, culture, geography, how to reach, and why it's one of India's best offbeat Himalayan destinations.",
  alternates: {
    canonical: "https://thetirthanvalley.in/explore/about",
  },
  openGraph: {
    title: "About Tirthan Valley | Tirthan Valley",
    description:
      "Learn about Tirthan Valley in Kullu, Himachal Pradesh — history, culture, geography, how to reach, and why it's one of India's best offbeat Himalayan destinations.",
    url: "https://thetirthanvalley.in/explore/about",
    siteName: "Tirthan Valley",
    type: "website",
    images: [
      {
        url: "https://thetirthanvalley.in/images/main.webp",
        width: 1200,
        height: 630,
        alt: "Panoramic view of Tirthan Valley with mountains and Tirthan River in Himachal Pradesh",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tirthan Valley | Tirthan Valley",
    description:
      "Learn about Tirthan Valley in Kullu, Himachal Pradesh — history, culture, geography, how to reach, and why it's one of India's best offbeat Himalayan destinations.",
    images: ["https://thetirthanvalley.in/images/main.webp"],
  },
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About Tirthan Valley" },
          ]}
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            About Tirthan Valley
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Nestled in the Kullu District of Himachal Pradesh, Tirthan Valley is
            a paradise for nature lovers and adventurers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              A Hidden Gem in the Himalayas
            </h2>
            <p className="text-muted-foreground">
              Named after the Tirthan River, which originates from the glaciers
              of Hanskund Peak, Tirthan Valley is one of the most pristine and
              unexplored valleys in Himachal Pradesh. Located at an altitude
              ranging from 1,600 to 3,200 meters above sea level, it offers
              breathtaking views of snow-capped mountains, lush forests, and
              crystal-clear rivers.
            </p>
            <p className="text-muted-foreground">
              The valley is home to the Great Himalayan National Park, a UNESCO
              World Heritage Site known for its rich biodiversity and pristine
              wilderness. With its untouched beauty and tranquil environment,
              Tirthan Valley provides a perfect escape from the hustle and
              bustle of city life.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/main.webp"
              alt="Panoramic view of Tirthan Valley with mountains and Tirthan River in Himachal Pradesh"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden md:order-first order-last">
            <Image
              src="/images/culture01.webp"
              alt="Traditional Himachali culture and festival celebrations in Tirthan Valley"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Culture and Heritage</h2>
            <p className="text-muted-foreground">
              The culture of Tirthan Valley is deeply rooted in the traditions
              of Himachal Pradesh. The local people, known for their warmth and
              hospitality, follow a simple way of life that has remained largely
              unchanged for generations. Their customs, festivals, and rituals
              reflect their deep connection with nature and their reverence for
              the mountains.
            </p>
            <p className="text-muted-foreground">
              The valley is dotted with ancient temples and shrines that
              showcase the rich architectural heritage of the region. The
              traditional wooden houses, with their intricate carvings and
              distinctive Himachali style, are a testament to the skilled
              craftsmanship of the local artisans.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden border-0 shadow-lg hover-lift">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54570.14806326748!2d77.41693716953123!3d31.63500710000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904f8c0a4e1bea3%3A0x7a73af102a4eb05a!2sTirthan%20Valley!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Geography</h3>
            <p className="text-muted-foreground">
              Tirthan Valley is situated in the western Himalayas, surrounded by
              towering peaks and dense forests. The Tirthan River, a tributary
              of the Beas River, flows through the valley, adding to its scenic
              beauty. The valley&apos;s diverse topography includes alpine meadows,
              dense forests, and rugged mountains.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Climate</h3>
            <p className="text-muted-foreground">
              The valley experiences a temperate climate with distinct seasons.
              Summers (April to June) are mild and pleasant, with temperatures
              ranging from 15°C to 25°C. Monsoons (July to September) bring
              moderate rainfall, while winters (October to March) can be quite
              cold, with temperatures dropping below freezing point and
              occasional snowfall.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Biodiversity</h3>
            <p className="text-muted-foreground">
              Tirthan Valley is a biodiversity hotspot, home to a wide variety
              of flora and fauna. The Great Himalayan National Park, which forms
              a significant part of the valley, harbors over 375 species of
              fauna, including the endangered snow leopard, Himalayan brown
              bear, and musk deer. The valley is also rich in plant life, with
              over 1,700 species of plants, including many rare medicinal herbs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How to Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 space-y-2">
              <h3 className="font-bold">By Air</h3>
              <p className="text-sm text-muted-foreground">
                The nearest airport is Bhuntar Airport in Kullu, approximately
                50 km from Tirthan Valley. From there, you can hire a taxi to
                reach the valley.
              </p>
            </div>
            <div className="border rounded-lg p-6 space-y-2">
              <h3 className="font-bold">By Rail</h3>
              <p className="text-sm text-muted-foreground">
                The nearest railway station is in Una, about 220 km from Tirthan
                Valley. From there, you can take a bus or taxi to reach the
                valley.
              </p>
            </div>
            <div className="border rounded-lg p-6 space-y-2">
              <h3 className="font-bold">By Road</h3>
              <p className="text-sm text-muted-foreground">
                Tirthan Valley is well-connected by road to major cities in
                Himachal Pradesh. Regular buses operate from Delhi, Chandigarh,
                and Manali to Aut, from where you can take a local bus or taxi
                to Tirthan Valley.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

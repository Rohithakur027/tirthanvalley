import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "Travel Tips | Tirthan Valley",
  description:
    "Tirthan Valley travel tips — packing list, road conditions, safety advice, budget planning, local customs & essential information for first-time visitors.",
  alternates: {
    canonical: "https://thetirthanvalley.in/travel-tips",
  },
  openGraph: {
    title: "Travel Tips | Tirthan Valley",
    description:
      "Tirthan Valley travel tips — packing list, road conditions, safety advice, budget planning, local customs & essential information for first-time visitors.",
    url: "https://thetirthanvalley.in/travel-tips",
    siteName: "Tirthan Valley",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Tips | Tirthan Valley",
    description:
      "Tirthan Valley travel tips — packing list, road conditions, safety advice, budget planning, local customs & essential information for first-time visitors.",
  },
}

export default function TravelTipsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Travel Tips" },
          ]}
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Travel Tips for Tirthan Valley
          </h1>
          <p className="text-muted-foreground">
            Essential information for planning your trip to Tirthan Valley
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Packing Essentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-bold">Clothing</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Layered clothing (temperatures vary significantly)</li>
                  <li>Waterproof jacket or rain poncho</li>
                  <li>Warm fleece or sweater (even in summer)</li>
                  <li>Comfortable trekking pants</li>
                  <li>Thermal innerwear (winter visits)</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-bold">Gear & Accessories</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Sturdy trekking shoes with good grip</li>
                  <li>Sunglasses and sunscreen (SPF 50+)</li>
                  <li>Headlamp or torch</li>
                  <li>Reusable water bottle</li>
                  <li>Power bank (charging points may be limited)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Road Conditions & Transport</h2>
            <p className="text-muted-foreground">
              The road from Aut to Banjar and beyond is generally well-maintained but narrow in places.
              During monsoon (July-August), landslides can cause temporary road closures. Check road
              conditions before traveling. Hiring a local taxi from Aut or Banjar is recommended for
              first-time visitors. Public buses run from Aut to Banjar and Gushaini.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Safety Advice</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Always inform your homestay host about trekking plans</li>
              <li>Carry a basic first-aid kit with altitude sickness medication</li>
              <li>Stay on marked trails and hire local guides for unfamiliar routes</li>
              <li>Carry sufficient water and snacks on treks</li>
              <li>Be cautious near rivers, especially during monsoon when water levels rise</li>
              <li>Download offline maps as mobile connectivity is limited</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Budget Planning</h2>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Homestay accommodation</span>
                <span className="text-muted-foreground">₹800 - ₹2,500/night</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Meals (per day)</span>
                <span className="text-muted-foreground">₹300 - ₹600</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Local transport</span>
                <span className="text-muted-foreground">₹500 - ₹2,000/day</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GHNP entry + guide</span>
                <span className="text-muted-foreground">₹500 - ₹3,000</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Trout fishing permit</span>
                <span className="text-muted-foreground">₹100 - ₹500</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Local Customs & Etiquette</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Remove shoes before entering temples and some homestays</li>
              <li>Ask permission before photographing locals</li>
              <li>Respect wildlife — do not feed or disturb animals</li>
              <li>Carry out all trash — keep the valley clean</li>
              <li>Support local businesses by buying handicrafts and eating local food</li>
              <li>Dress modestly when visiting religious sites</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

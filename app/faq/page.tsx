import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "FAQ | Tirthan Valley",
  description:
    "Tirthan Valley FAQ — answers to common questions about how to reach, best time to visit, permits, costs, safety, accommodations & things to do.",
  alternates: {
    canonical: "https://thetirthanvalley.in/faq",
  },
  openGraph: {
    title: "FAQ | Tirthan Valley",
    description:
      "Tirthan Valley FAQ — answers to common questions about how to reach, best time to visit, permits, costs, safety, accommodations & things to do.",
    url: "https://thetirthanvalley.in/faq",
    siteName: "Tirthan Valley",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Tirthan Valley",
    description:
      "Tirthan Valley FAQ — answers to common questions about how to reach, best time to visit, permits, costs, safety, accommodations & things to do.",
  },
}

const faqs = [
  {
    question: "How do I reach Tirthan Valley?",
    answer:
      "Tirthan Valley is located in Kullu District, Himachal Pradesh. The nearest airport is Bhuntar Airport (50 km away). The nearest railway station is in Una (220 km). By road, take a bus or drive from Delhi (about 510 km, 10-12 hours) or Chandigarh (about 280 km, 6-7 hours) to Aut, then continue to Banjar and into the valley.",
  },
  {
    question: "What is the best time to visit Tirthan Valley?",
    answer:
      "The best time to visit is March to June (spring/summer) and September to November (autumn). Spring brings blooming rhododendrons, summer is pleasant for trekking, and autumn offers crystal-clear views. Winter (December-February) brings snow and cold temperatures but offers a peaceful, uncrowded experience.",
  },
  {
    question: "Do I need permits for Great Himalayan National Park?",
    answer:
      "Yes, you need permits to enter the Great Himalayan National Park. Indian nationals pay ₹200 and foreign nationals pay ₹400 for entry. Additional fees apply for guides (mandatory for multi-day treks) and camping. Permits can be obtained at the Sai Ropa office or arranged through your homestay/tour operator.",
  },
  {
    question: "How much does a trip to Tirthan Valley cost?",
    answer:
      "Budget travelers can expect to spend ₹1,500-2,500 per day including homestay accommodation (₹800-1,500/night), meals (₹200-500/day), and local transport. Mid-range travelers should budget ₹3,000-5,000 per day. Activities like trout fishing, guided treks, and camping have additional costs ranging from ₹500-3,000.",
  },
  {
    question: "Is Tirthan Valley safe for solo travelers?",
    answer:
      "Yes, Tirthan Valley is very safe for solo travelers, including women. The locals are warm and hospitable. However, always inform your homestay host about your trekking plans, carry a charged phone, and avoid trekking alone in remote areas. Basic precautions like staying on marked trails and carrying sufficient water apply.",
  },
  {
    question: "What kind of accommodation is available?",
    answer:
      "Tirthan Valley offers homestays (₹800-2,500/night), riverside camps (₹1,000-3,000/night), guesthouses (₹1,500-3,000/night), and a few hotels/resorts (₹3,000-8,000/night). Homestays are the most popular option and offer authentic local food and hospitality. Book in advance during peak season (April-June, October).",
  },
  {
    question: "What are the top things to do in Tirthan Valley?",
    answer:
      "Top activities include trekking in Great Himalayan National Park, trout fishing in the Tirthan River, visiting Jalori Pass and Serolsar Lake, riverside camping, exploring traditional villages like Chehni and Sharchi, bird watching, photography tours, and tasting local Himachali cuisine like Siddu and Trout.",
  },
  {
    question: "Is there mobile network and internet in Tirthan Valley?",
    answer:
      "BSNL has the best coverage in Tirthan Valley. Jio and Airtel work in some areas near Banjar and Gushaini but become spotty in remote villages. Most homestays offer basic WiFi. Consider this a chance for a digital detox! Download offline maps before arriving.",
  },
  {
    question: "Can I visit Tirthan Valley with family and children?",
    answer:
      "Absolutely! Tirthan Valley is very family-friendly. Easy walks along the river, village visits, and the short trek to Serolsar Lake are suitable for children. Many homestays are family-run and welcome kids. The valley offers a safe, natural environment away from city pollution.",
  },
  {
    question: "What should I pack for Tirthan Valley?",
    answer:
      "Pack layers of clothing (it gets cold even in summer evenings), comfortable trekking shoes, rain jacket/umbrella (especially during monsoon), sunscreen, sunglasses, personal medicines, a torch/headlamp, reusable water bottle, and a power bank. In winter, bring heavy woolens, thermals, and snow boots.",
  },
]

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about visiting Tirthan Valley
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-3"
            >
              <h2 className="text-lg font-bold">{faq.question}</h2>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

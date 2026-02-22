import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "Terms of Service | Tirthan Valley",
  description:
    "Terms of service for thetirthanvalley.in — usage terms, disclaimers, and conditions for using our Tirthan Valley travel guide website.",
  alternates: {
    canonical: "https://thetirthanvalley.in/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Terms of Service</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>Welcome to thetirthanvalley.in. By using this website, you agree to the following terms.</p>
          <h2>Use of Content</h2>
          <p>All content on this website is for informational purposes only. We make every effort to ensure accuracy but cannot guarantee that all information is up to date. Travel conditions, prices, and availability may change.</p>
          <h2>Intellectual Property</h2>
          <p>All text, images, and content on this website are the property of Tirthan Valley and may not be reproduced without permission.</p>
          <h2>External Links</h2>
          <p>This website may contain links to external sites. We are not responsible for the content or practices of these external websites.</p>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for any damages arising from the use of information on this website. Travel at your own risk and always verify critical information with local authorities.</p>
          <h2>Contact</h2>
          <p>For questions about these terms, contact us at exploretirthanvalley@gmail.com.</p>
        </div>
      </div>
    </div>
  )
}

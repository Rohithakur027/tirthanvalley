import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy | Tirthan Valley",
  description:
    "Privacy policy for thetirthanvalley.in — how we collect, use, and protect your data on our Tirthan Valley travel guide website.",
  alternates: {
    canonical: "https://thetirthanvalley.in/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>Your privacy is important to us. This policy explains how thetirthanvalley.in handles your information.</p>
          <h2>Information We Collect</h2>
          <p>We may collect your name, email address, and message content when you use our contact form. We also use analytics to understand how visitors use our website.</p>
          <h2>How We Use Information</h2>
          <p>Information collected through the contact form is used solely to respond to your inquiries about Tirthan Valley travel. We do not sell or share your personal information with third parties.</p>
          <h2>Cookies</h2>
          <p>This website may use cookies for analytics and theme preferences. You can disable cookies in your browser settings.</p>
          <h2>Contact</h2>
          <p>For privacy-related questions, contact us at exploretirthanvalley@gmail.com.</p>
        </div>
      </div>
    </div>
  )
}

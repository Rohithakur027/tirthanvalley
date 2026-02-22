import { attractions } from "@/data/attractiondata"
import Breadcrumb from "@/components/Breadcrumb"
import AttractionsClient from "./AttractionsClient"

export default function AttractionsPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container py-12 md:py-24">
        <div className="flex flex-col space-y-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Attractions" },
            ]}
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Attractions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Explore the natural wonders and cultural heritage of Tirthan
              Valley
            </p>
          </div>
          <AttractionsClient attractions={attractions} />
        </div>
      </div>
    </div>
  )
}

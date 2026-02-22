'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Attraction {
  slug: string
  heroimage: string
  title: string
  location: string
  description: string[]
}

export default function AttractionsClient({ attractions }: { attractions: Attraction[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {attractions.map((attraction, index) => (
        <Link
          key={index}
          href={`/explore/attractions/${attraction.slug}`}
          className="block"
        >
          <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group h-full">
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={attraction.heroimage || "/placeholder.svg"}
                alt={`${attraction.title} in Tirthan Valley Himachal Pradesh`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                {attraction.title}
              </CardTitle>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {attraction.location}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {attraction.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="w-full group">
                <div className="flex items-center justify-center gap-2 text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Discover more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

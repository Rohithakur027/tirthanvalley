import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { activities } from "@/data/activitydata"

export default function ActivitiesPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Activities & Experiences</h1>
          <p className="text-muted-foreground max-w-3xl">
            Immerse yourself in the natural beauty and cultural richness of Tirthan Valley through a variety of
            activities and experiences.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="nature">Nature & Wildlife</TabsTrigger>
            <TabsTrigger value="culture">Cultural</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <Link key={index} href={`/explore/activities/${activity.slug}`} className="block group">
                  <ActivityCard activity={activity} />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adventure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Adventure")
                .map((activity, index) => (
                  <Link key={index} href={`/explore/activities/${activity.slug}`} className="block group">
                    <ActivityCard activity={activity} />
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="nature">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Nature & Wildlife")
                .map((activity, index) => (
                  <Link key={index} href={`/explore/activities/${activity.slug}`} className="block group">
                    <ActivityCard activity={activity} />
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="culture">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Cultural")
                .map((activity, index) => (
                  <Link key={index} href={`/explore/activities/${activity.slug}`} className="block group">
                    <ActivityCard activity={activity} />
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ActivityCardProps {
  activity: {
    title: string
    slug: string
    description: string[]
    heroimage: string
    location: string
    duration: string
    category: "Adventure" | "Nature & Wildlife" | "Cultural"
    difficulty?: "Easy" | "Moderate" | "Challenging"
    shortDescription: string
  }
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800 group-hover:border-emerald-500 dark:group-hover:border-emerald-400">
      <div className="relative h-[200px]">
        <Image
          src={activity.heroimage || "/placeholder.svg"}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          {activity.category}
        </div>
        {activity.difficulty && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded">
            {activity.difficulty}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {activity.title}
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{activity.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 mb-4">{activity.shortDescription}</CardDescription>
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </CardFooter>
    </Card>
  )
}

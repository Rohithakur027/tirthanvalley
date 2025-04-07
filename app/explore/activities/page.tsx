import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ActivitiesPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Activities & Experiences
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Immerse yourself in the natural beauty and cultural richness of
            Tirthan Valley through a variety of activities and experiences.
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
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adventure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Adventure")
                .map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="nature">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Nature & Wildlife")
                .map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="culture">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => activity.category === "Cultural")
                .map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface Activity {
  title: string;
  slug: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  category: "Adventure" | "Nature & Wildlife" | "Cultural";
  difficulty?: "Easy" | "Moderate" | "Challenging";
}

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={activity.image || "/placeholder.svg"}
          alt={activity.title}
          fill
          className="object-cover"
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
        <CardTitle>{activity.title}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{activity.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 mb-4">
          {activity.description}
        </CardDescription>
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/explore/activities/${activity.slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const activities: Activity[] = [
  {
    title: "Trekking in Great Himalayan National Park",
    slug: "trekking-ghnp",
    description:
      "Explore the untouched trails of the Great Himalayan National Park, a UNESCO World Heritage Site. Trek through dense forests, alpine meadows, and witness the rich biodiversity of the region.",
    image: "/images/ghnp02.jpg",
    location: "Great Himalayan National Park",
    duration: "1-7 days",
    category: "Adventure",
    difficulty: "Moderate",
  },
  {
    title: "Trout Fishing in Tirthan River",
    slug: "trout-fishing",
    description:
      "Catch trout in the crystal-clear waters of the Tirthan River. The river is known for its abundant brown and rainbow trout, making it a paradise for fishing enthusiasts.",
    image: "/images/trout-fishing.jpg",
    location: "Tirthan River",
    duration: "Half day - Full day",
    category: "Adventure",
  },
  {
    title: "Camping by the Riverside",
    slug: "riverside-camping",
    description:
      "Experience nights under the starlit Himalayan sky. Camp by the riverside, enjoy bonfires, and wake up to the sound of the flowing river and chirping birds.",
    image: "/images/riverside-camping02.jpg",
    location: "Various locations along Tirthan River",
    duration: "Overnight",
    category: "Adventure",
  },
  {
    title: "Village Tours",
    slug: "village-tours",
    description:
      "Immerse yourself in the local culture and traditions. Visit traditional Himachali villages, interact with locals, and learn about their way of life, customs, and architecture.",
    image: "/images/village03.jpg",
    location: "Various villages in Tirthan Valley",
    duration: "Half day - Full day",
    category: "Cultural",
  },
  {
    title: "Bird Watching",
    slug: "bird-watching",
    description:
      "Tirthan Valley is a haven for bird watchers with over 200 species of birds. Spot the colorful Himalayan Monal, Western Tragopan, and many other rare and endemic species.",
    image: "/images/bird-watching04.webp",
    location: "Great Himalayan National Park and surrounding areas",
    duration: "Half day - Full day",
    category: "Nature & Wildlife",
  },
  {
    title: "Jalori Pass Trek",
    slug: "jalori-pass-trek",
    description:
      "Trek to Jalori Pass, one of the lowest mountain passes in the Himalayas. From there, you can further trek to Serolsar Lake or Raghupur Fort for breathtaking views.",
    image: "/images/jalori01.jpg",
    location: "Jalori Pass",
    duration: "1 day",
    category: "Adventure",
    difficulty: "Moderate",
  },

  {
    title: "Local Cooking Classes",
    slug: "cooking-classes",
    description:
      "Learn to prepare traditional Himachali dishes from local experts. Discover the unique flavors and techniques of the regional cuisine using fresh, local ingredients.",
    image: "/images/cooking-classes.jpg",
    location: "Various homestays and resorts",
    duration: "2-3 hours",
    category: "Cultural",
  },
  {
    title: "Photography Tours",
    slug: "photography-tours",
    description:
      "Capture the breathtaking landscapes, vibrant culture, and diverse wildlife of Tirthan Valley. Guided by experienced photographers who know the best spots and lighting conditions.",
    image: "/images/tirthan-valley02.jpg",
    location: "Throughout Tirthan Valley",
    duration: "Half day - Full day",
    category: "Nature & Wildlife",
  },
  {
    title: "Medicinal Plant Walks",
    slug: "medicinal-plant-walks",
    description:
      "Join knowledgeable local guides to learn about the various medicinal plants found in the region and their traditional uses in Himalayan herbal medicine.",
    image: "/images/medicinal-plant01.jpg",
    location: "Forests around Tirthan Valley",
    duration: "2-3 hours",
    category: "Nature & Wildlife",
  },
  {
    title: "Traditional Craft Workshops",
    slug: "craft-workshops",
    description:
      "Learn traditional Himachali crafts like weaving, wood carving, and basket making from skilled local artisans. Take home your handmade souvenirs.",
    image: "/images/locals02.jpg",
    location: "Various villages in Tirthan Valley",
    duration: "2-4 hours",
    category: "Cultural",
  },
];

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AttractionsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Attractions
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore the natural wonders and cultural heritage of Tirthan Valley
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {attraction.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {attraction.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/explore/attractions/${attraction.slug}`}>
                    Discover more
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const attractions = [
  {
    title: "Great Himalayan National Park",
    slug: "great-himalayan-national-park",
    image: "/images/ghnp.jpg",
    description:
      "A UNESCO World Heritage Site known for its rich biodiversity, alpine meadows, and pristine forests. Home to numerous endangered species including the snow leopard and Himalayan brown bear.",
  },
  {
    title: "Jalori Pass",
    slug: "jalori-pass",
    image: "/images/jalori.jpg",
    description:
      "One of the lowest mountain passes in the Himalayas at an altitude of 3,120 meters, offering breathtaking views and trekking opportunities to Serolsar Lake and Raghupur Fort.",
  },
  {
    title: "Serolsar Lake",
    slug: "serolsar-lake",
    image: "/images/serolsar.jpeg",
    description:
      "A serene high-altitude lake surrounded by dense forests, believed to have mystical properties. Located about 5 km from Jalori Pass, it's a popular trekking destination.",
  },
  {
    title: "Chehni Kothi",
    slug: "chehni-kothi",
    image: "/images/chehni-kothi01.jpg",
    description:
      "An ancient stone and wood tower standing at a height of 45 meters. This architectural marvel was built in the 17th century and showcases traditional Himachali construction techniques.",
  },
  {
    title: "Shringa Rishi Temple",
    slug: "shringa-rishi-temple",
    image: "/images/shringa02.jpg",
    description:
      "An ancient temple dedicated to Sage Shringa, believed to be over 200 years old. The temple features intricate wood carvings and is an important religious site for locals.",
  },
  {
    title: "Raghupur Fort",
    slug: "raghupur-fort",
    image: "/images/raghupur.jpg",
    description:
      "The ruins of an ancient fort located on a ridge, offering panoramic views of the surrounding mountains. It's accessible via a trek from Jalori Pass.",
  },
  {
    title: "Tirthan River",
    slug: "tirthan-river01",
    image: "/images/tirthan-river01.jpg",
    description:
      "The crystal-clear river that gives the valley its name. Known for its trout fishing opportunities and pristine waters that flow through the heart of the valley.",
  },
  {
    title: "Chehni Village",
    slug: "Chehni-village",
    image: "/images/chehni.jpg",
    description:
      "A traditional Himachali village known for its ancient wooden houses with intricate carvings and the famous Chaini Kothi, a tower similar to Chehni Kothi.",
  },
  {
    title: "Shai Ropa",
    slug: "sai-ropa",
    image: "/images/shairopa.jpg",
    description:
      "The interpretation zone of the Great Himalayan National Park, featuring a museum, information center, and nature trails to learn about the park's biodiversity.",
  },
];

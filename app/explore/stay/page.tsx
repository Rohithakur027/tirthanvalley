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
import { Bed, Coffee, MapPin, Star, Tent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StayPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Places to Stay
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Find the perfect accommodation for your visit to Tirthan Valley,
            from luxury resorts to cozy homestays and riverside camps.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hotels">Hotels & Resorts</TabsTrigger>
            <TabsTrigger value="homestays">Homestays</TabsTrigger>
            <TabsTrigger value="camps">Camps</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((accommodation, index) => (
                <AccommodationCard key={index} accommodation={accommodation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hotels">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations
                .filter((acc) => acc.type === "Hotel & Resort")
                .map((accommodation, index) => (
                  <AccommodationCard
                    key={index}
                    accommodation={accommodation}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="homestays">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations
                .filter((acc) => acc.type === "Homestay")
                .map((accommodation, index) => (
                  <AccommodationCard
                    key={index}
                    accommodation={accommodation}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="camps">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations
                .filter((acc) => acc.type === "Camp")
                .map((accommodation, index) => (
                  <AccommodationCard
                    key={index}
                    accommodation={accommodation}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface Accommodation {
  name: string;
  type: "Hotel & Resort" | "Homestay" | "Camp";
  location: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  amenities: string[];
  slug: string;
}

interface AccommodationCardProps {
  accommodation: Accommodation;
}

function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Hotel & Resort":
        return <Bed className="h-4 w-4" />;
      case "Homestay":
        return <Coffee className="h-4 w-4" />;
      case "Camp":
        return <Tent className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={accommodation.image || "/placeholder.svg"}
          alt={accommodation.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
          {getTypeIcon(accommodation.type)}
          {accommodation.type}
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{accommodation.name}</CardTitle>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{accommodation.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{accommodation.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 mb-4">
          {accommodation.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {accommodation.amenities.map((amenity, index) => (
            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="font-bold">{accommodation.price}</span>
          <span className="text-sm text-muted-foreground"> / night</span>
        </div>
        <Button asChild>
          <Link href={`/explore/stay/${accommodation.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const accommodations: Accommodation[] = [
  {
    name: "The Pahadi Ghar ",
    type: "Homestay",
    location: "Shairopa, Tirthan Valley",
    description:
      "A luxury homestay nestled by the Tirthan River, offering panoramic views of the surrounding mountains and modern amenities for a comfortable stay.",
    image: "/images/homestay.webp",
    price: "2,999",
    rating: 5.0,
    amenities: ["Free WiFi", "Room Service", "Parking", "Mountain View"],
    slug: "riverside-homestay",
  },
];

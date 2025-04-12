import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { attractions } from "@/data/attractiondata";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { activities } from "@/data/activitydata";
import { testimonials } from "@/data/testimonialData";
import { blogPosts } from "@/data/blogData";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-image w-full h-[90vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        <div className="container px-4 md:px-6 space-y-8 text-white relative z-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl fade-in">
            Discover the Serenity of{" "}
            <span className="text-emerald-400">Tirthan Valley</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl fade-in opacity-90">
            A Hidden Gem in the Himalayas
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in">
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/explore/about">Explore Tirthan Valley</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/blog">Read Blogs</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl slide-up">
                About Tirthan Valley
              </h2>
              <p className="text-gray-600 dark:text-gray-400 md:text-xl slide-up">
                Nestled in the Kullu District of Himachal Pradesh, Tirthan
                Valley is a paradise for nature lovers and adventurers alike.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-lift">
                <Image
                  src="/images/main.webp"
                  alt="Tirthan Valley Landscape"
                  width={550}
                  height={400}
                  className="w-full aspect-video object-cover object-center transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm">
                    Breathtaking views of Tirthan Valley
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-left slide-in-right">
                <p className="text-gray-600 dark:text-gray-400">
                  With its pristine rivers, lush forests, and majestic
                  mountains, Tirthan Valley offers a perfect escape from the
                  hustle and bustle of city life. Named after the Tirthan River,
                  this valley is home to the Great Himalayan National Park, a
                  UNESCO World Heritage Site.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  The valley is known for its biodiversity, adventure
                  activities, and the warm hospitality of the local people.
                  Whether you're seeking adventure, tranquility, or a cultural
                  experience, Tirthan Valley has something for everyone.
                </p>
                <Button
                  asChild
                  variant="link"
                  className="w-fit p-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <Link
                    href="/explore/about"
                    className="flex items-center gap-2 group"
                  >
                    Learn more about Tirthan Valley
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Attractions */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl slide-up">
                Key Attractions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl slide-up">
                Explore the natural wonders and cultural heritage of Tirthan
                Valley
              </p>
            </div>

            {/* check */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {attractions.slice(0,3).map((attraction, index) => (
                         <Link
                           key={index}
                           href={`/explore/attractions/${attraction.slug}`}
                           className="block"
                         >
                           <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group h-full">
                             <div className="relative h-[220px] overflow-hidden">
                               <Image
                                 src={attraction.heroimage || "/placeholder.svg"}
                                 alt={attraction.title}
                                 fill
                                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                             </div>
                             <CardHeader className="pb-2">
                               <CardTitle  className="flex items-center gap-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                 <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                 {attraction.title}
                               </CardTitle>
                               <div className="text-sm text-gray-600 dark:text-gray-400">
                                 {attraction.location}
                               </div>
                             </CardHeader>
                             <CardContent>
                               <CardDescription  className="line-clamp-3">
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
                   
          </div>
        </div>
      </section>

      {/* Activities Preview */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl slide-up">
                Activities & Experiences
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl slide-up">
                Immerse yourself in the natural beauty and cultural richness of
                Tirthan Valley
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {activities.slice(0,4).map((activity, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover-lift group"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={activity.heroimage || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                    <Link
                      href={`/explore/activities/${activity.slug}`}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium group"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-12 bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/explore/activities">View All Activities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl slide-up">
                Latest from Our Blog
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl slide-up">
                Stories, tips, and insights from Tirthan Valley
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {blogPosts.slice(0, 3).map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover-lift group"
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-3 py-1 rounded-full">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium group"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-12 bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl slide-up">
              What Our Visitors Say
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl slide-up">
              Hear from travelers who have experienced the magic of Tirthan
              Valley
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover-lift"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-${
                        i < testimonial.rating ? "yellow-400" : "gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 slide-in-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Experience Tirthan Valley?
              </h2>
              <p className="text-white/90 md:text-xl">
                Plan your visit to this hidden gem in the Himalayas and create
                memories that will last a lifetime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end slide-in-right">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 border-0 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/explore">Explore Destinations</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}









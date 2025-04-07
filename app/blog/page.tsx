import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Stories, tips, and insights from Tirthan Valley
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <div className="mb-8">
              <Input
                type="search"
                placeholder="Search blog posts..."
                className="max-w-md"
              />
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="travel-tips">Travel Tips</TabsTrigger>
                <TabsTrigger value="adventure">Adventure Stories</TabsTrigger>
                <TabsTrigger value="culture">Local Culture</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post, index) => (
                    <BlogPostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="travel-tips" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter((post) => post.category === "Travel Tips")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="adventure" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter((post) => post.category === "Adventure Stories")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="culture" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter((post) => post.category === "Local Culture")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/4">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Travel Tips (4)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Adventure Stories (3)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Local Culture (2)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Wildlife (1)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">Recent Posts</h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <li key={index} className="flex gap-2">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium hover:underline line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {post.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          {post.category}
        </div>
      </div>
      <CardHeader>
        <div className="text-sm text-muted-foreground">{post.date}</div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary hover:underline"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Top 5 Treks in Tirthan Valley",
    slug: "top-5-treks-in-tirthan-valley",
    date: " April 7, 2025",
    image: "/images/blog-trek.jpg",
    excerpt:
      "Tirthan Valley offers some of the most breathtaking treks in the Himalayas. From the Great Himalayan National Park to the serene Serolsar Lake, here are the top 5 treks you must try.",
    category: "Adventure Stories",
  },

  {
    title: "Best Time to Visit Tirthan Valley",
    slug: "best-time-to-visit-tirthan-valley",
    date: "April 7, 2025",
    image: "/images/blog-seasons.jpg",
    excerpt:
      "Planning a trip to Tirthan Valley? Learn about the best seasons to visit and what each time of year has to offer for different activities and experiences.",
    category: "Travel Tips",
  },
];

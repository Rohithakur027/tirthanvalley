import type { Metadata } from "next"
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
import Breadcrumb from "@/components/Breadcrumb";
import { blogPosts } from "@/data/blogData";

export const metadata: Metadata = {
  title: "Blog | Tirthan Valley",
  description:
    "Tirthan Valley travel blog — trekking guides, local food, best time to visit, wildlife spotting tips & trip planning advice from local experts.",
  alternates: {
    canonical: "https://thetirthanvalley.in/blog",
  },
  openGraph: {
    title: "Blog | Tirthan Valley",
    description:
      "Tirthan Valley travel blog — trekking guides, local food, best time to visit, wildlife spotting tips & trip planning advice from local experts.",
    url: "https://thetirthanvalley.in/blog",
    siteName: "Tirthan Valley",
    type: "website",
    images: [
      {
        url: "https://thetirthanvalley.in/images/main.webp",
        width: 1200,
        height: 630,
        alt: "Tirthan Valley travel blog",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tirthan Valley",
    description:
      "Tirthan Valley travel blog — trekking guides, local food, best time to visit, wildlife spotting tips & trip planning advice from local experts.",
    images: ["https://thetirthanvalley.in/images/main.webp"],
  },
}

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />
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
                    <span className="text-muted-foreground">
                      Travel Tips ({blogPosts.filter((p) => p.category === "Travel Tips").length})
                    </span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">
                      Adventure Stories ({blogPosts.filter((p) => p.category === "Adventure Stories").length})
                    </span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">
                      Local Culture ({blogPosts.filter((p) => p.category === "Local Culture").length})
                    </span>
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

function BlogPostCard({ post }: { post: typeof blogPosts[number] }) {
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

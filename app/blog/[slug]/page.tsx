import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPostParams {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostParams) {
  // database call
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>By Admin</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
          </div>
          <div className="relative h-[400px] w-full mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover rounded-lg" />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{post.content}</p>
            <h2>Exploring the Beauty</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <p>
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <blockquote>
              <p>The mountains are calling and I must go.</p>
            </blockquote>
            <h2>Tips for Visitors</h2>
            <ul>
              <li>Always carry warm clothes, even in summer</li>
              <li>Respect local customs and traditions</li>
              <li>Carry a first-aid kit for emergencies</li>
              <li>Stay hydrated during treks</li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
          </div>
        </div>

        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((post, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <Link href={`/blog/${post.slug}`} className="font-medium hover:underline line-clamp-2">
                    {post.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getBlogPostBySlug(slug: string) {
  // In a real app, you would fetch this from a database or API
  const posts = [
    {
      title: "Top 5 Treks in Tirthan Valley",
      slug: "top-5-treks-in-tirthan-valley",
      date: "June 15, 2023",
      image: "/images/blog-trek.jpg",
      excerpt:
        "Tirthan Valley offers some of the most breathtaking treks in the Himalayas. From the Great Himalayan National Park to the serene Serolsar Lake, here are the top 5 treks you must try.",
      category: "Adventure Stories",
      content:
        "Tirthan Valley offers some of the most breathtaking treks in the Himalayas. From the Great Himalayan National Park to the serene Serolsar Lake, here are the top 5 treks you must try. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      title: "Local Cuisine of Tirthan Valley",
      slug: "local-cuisine-of-tirthan-valley",
      date: "May 22, 2023",
      image: "/images/blog-food.jpg",
      excerpt:
        "The local cuisine of Tirthan Valley is a delightful blend of Himachali flavors. Don't miss out on dishes like Sidu, Babru, and Aktori.",
      category: "Local Culture",
      content:
        "The local cuisine of Tirthan Valley is a delightful blend of Himachali flavors. Don't miss out on dishes like Sidu, Babru, and Aktori. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
  ]

  return posts.find((post) => post.slug === slug)
}

const relatedPosts = [
  {
    title: "Best Time to Visit Tirthan Valley",
    slug: "best-time-to-visit-tirthan-valley",
    date: "April 10, 2023",
    image: "/images/blog-seasons.jpg",
  },
  {
    title: "Wildlife Spotting in Great Himalayan National Park",
    slug: "wildlife-spotting-in-great-himalayan-national-park",
    date: "March 5, 2023",
    image: "/images/blog-wildlife.jpg",
  },
]


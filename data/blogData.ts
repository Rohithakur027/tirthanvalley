export interface BlogPost {
  title: string
  slug: string
  date: string
  image: string
  excerpt: string
  category: string
  content: string
  author: string
  datePublished: string
  dateModified: string
}

export const blogPosts: BlogPost[] = [
  {
    title: "Top 5 Treks in Tirthan Valley",
    slug: "top-5-treks-in-tirthan-valley",
    date: "June 15, 2023",
    image: "/images/blog-trek.webp",
    excerpt:
      "Tirthan Valley offers some of the most breathtaking treks in the Himalayas. From the Great Himalayan National Park to the serene Serolsar Lake, here are the top 5 treks you must try.",
    category: "Adventure Stories",
    author: "Tirthan Valley Team",
    datePublished: "2023-06-15",
    dateModified: "2026-02-22",
    content:
      "Tirthan Valley offers some of the most breathtaking treks in the Indian Himalayas. From the easy Serolsar Lake trail to multi-day GHNP expeditions, this guide covers the top five treks with difficulty levels, distances, best seasons, permits, and practical tips for each route.",
  },
  {
    title: "Local Cuisine of Tirthan Valley: Must-Try Himachali Dishes",
    slug: "local-cuisine-of-tirthan-valley",
    date: "May 22, 2023",
    image: "/images/blog-siddu.webp",
    excerpt:
      "The local cuisine of Tirthan Valley is a delightful blend of Himachali flavors. Don't miss out on dishes like Siddu, Babru, and Aktori.",
    category: "Local Culture",
    author: "Tirthan Valley Team",
    datePublished: "2023-05-22",
    dateModified: "2026-02-22",
    content:
      "Discover the authentic cuisine of Tirthan Valley — from Siddu steamed bread and Babru kachori to fresh river trout and buckwheat Aktori. This guide covers must-try dishes, the Himachali Dham feast tradition, where to eat, seasonal food calendars, and tips for food lovers.",
  },
  {
    title: "Best Time to Visit Tirthan Valley: Month-by-Month Guide",
    slug: "best-time-to-visit-tirthan-valley",
    date: "April 10, 2023",
    image: "/images/blog-seasons.webp",
    excerpt:
      "Planning a trip to Tirthan Valley? Learn about the best seasons to visit and what each time of year has to offer for different activities and experiences.",
    category: "Travel Tips",
    author: "Tirthan Valley Team",
    datePublished: "2023-04-10",
    dateModified: "2026-02-22",
    content:
      "A complete month-by-month guide to visiting Tirthan Valley covering spring wildflowers, monsoon magic, autumn colours, and winter snow. Includes temperatures, best activities per season, packing lists, and how to reach the valley from Delhi and Manali.",
  },
  {
    title: "Wildlife Spotting in Great Himalayan National Park",
    slug: "wildlife-spotting-in-great-himalayan-national-park",
    date: "March 5, 2023",
    image: "/images/blog-wildlife.webp",
    excerpt:
      "Great Himalayan National Park is home to rare Himalayan wildlife including snow leopards, musk deer, and the colorful Western Tragopan. Learn the best trails and tips for wildlife spotting.",
    category: "Adventure Stories",
    author: "Tirthan Valley Team",
    datePublished: "2023-03-05",
    dateModified: "2026-02-22",
    content:
      "A comprehensive wildlife guide to Great Himalayan National Park covering snow leopards, Himalayan brown bears, musk deer, Western Tragopan, and 209 bird species. Includes best trails, photography tips, guided safari information, permits, and seasonal advice.",
  },
]

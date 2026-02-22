import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thetirthanvalley.in'

  const staticPages = [
    '', '/explore/about', '/explore/attractions', '/explore/activities',
    '/explore/stay', '/blog', '/gallery', '/contact', '/faq', '/travel-tips',
    '/terms', '/privacy',
  ]

  const attractions = [
    'great-himalayan-national-park', 'jalori-pass', 'serolsar-lake',
    'tirthan-river', 'chehni-kothi', 'raghupur-fort', 'jibhi',
    'sharchi-village', 'shairopa',
  ]

  const activities = [
    'trekking-ghnp', 'trout-fishing', 'riverside-camping', 'village-tours',
    'bird-watching', 'jalori-pass-trek', 'cooking-classes',
    'photography-tours', 'nature-learning-center-walk', 'craft-workshops',
  ]

  const blogPosts = [
    'top-5-treks-in-tirthan-valley', 'local-cuisine-of-tirthan-valley',
    'best-time-to-visit-tirthan-valley',
    'wildlife-spotting-in-great-himalayan-national-park',
  ]

  const urls: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    })
  }

  for (const slug of attractions) {
    urls.push({
      url: `${baseUrl}/explore/attractions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  for (const slug of activities) {
    urls.push({
      url: `${baseUrl}/explore/activities/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  for (const slug of blogPosts) {
    urls.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return urls
}

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { ArrowLeft, Calendar, Tag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/Breadcrumb"
import { blogPosts } from "@/data/blogData"

type Params = {
  params: Promise<{ slug: string }>
}

const metaDescriptions: Record<string, string> = {
  "top-5-treks-in-tirthan-valley":
    "Top 5 treks in Tirthan Valley — best trekking routes ranked by difficulty with distances, duration, best season & insider tips from local guides. Updated 2026.",
  "local-cuisine-of-tirthan-valley":
    "Local cuisine of Tirthan Valley — must-try Himachali dishes including Siddu, Babru, Aktori & more. Where to eat, recipes & food culture of the valley.",
  "best-time-to-visit-tirthan-valley":
    "Best time to visit Tirthan Valley — month-by-month weather guide, seasonal activities, peak vs offseason, and what to pack for each season.",
  "wildlife-spotting-in-great-himalayan-national-park":
    "Wildlife spotting in Great Himalayan National Park — rare Himalayan animals, best trails for birdwatching, photography tips & guided wildlife safari info.",
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Not Found | Tirthan Valley",
      description: "This blog post doesn't exist.",
      robots: { index: false, follow: false },
    }
  }

  const title = `${post.title} | Tirthan Valley`
  const description = metaDescriptions[slug] || post.excerpt.slice(0, 160)
  const canonicalUrl = `https://thetirthanvalley.in/blog/${slug}`
  const imageUrl = `https://thetirthanvalley.in${post.image}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Tirthan Valley",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'article:published_time': post.datePublished,
      'article:modified_time': post.dateModified,
      'article:author': 'Tirthan Valley Team',
      'article:section': 'Travel',
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return <div>Blog post not found</div>
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  const blogContent = getBlogContent(slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: metaDescriptions[slug] || post.excerpt,
    image: `https://thetirthanvalley.in${post.image}`,
    author: {
      "@type": "Person",
      name: "Tirthan Valley Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Tirthan Valley",
      url: "https://thetirthanvalley.in",
      logo: {
        "@type": "ImageObject",
        url: "https://thetirthanvalley.in/images/logo.png",
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: `https://thetirthanvalley.in/blog/${slug}`,
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
            <span>
              By <strong>{post.author}</strong>
            </span>
            <span>&bull;</span>
            <span>Local travel experts sharing insider knowledge of Tirthan Valley</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
          </div>
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={getImageAlt(slug)}
              fill
              priority
              className="object-cover rounded-lg"
            />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">{blogContent}</div>
        </div>

        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((relPost, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={relPost.image || "/placeholder.svg"}
                    alt={relPost.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <Link href={`/blog/${relPost.slug}`} className="font-medium hover:underline line-clamp-2">
                    {relPost.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">{relPost.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getImageAlt(slug: string): string {
  const alts: Record<string, string> = {
    "top-5-treks-in-tirthan-valley": "Trekking trail through pine forest in Tirthan Valley Himachal Pradesh",
    "local-cuisine-of-tirthan-valley": "Siddu traditional Himachali bread local cuisine of Tirthan Valley",
    "best-time-to-visit-tirthan-valley": "Tirthan Valley landscape showing different seasons in the Himalayas",
    "wildlife-spotting-in-great-himalayan-national-park":
      "Wildlife in Great Himalayan National Park near Tirthan Valley",
  }
  return alts[slug] || "Tirthan Valley blog post"
}

function getBlogContent(slug: string) {
  switch (slug) {
    case "top-5-treks-in-tirthan-valley":
      return (
        <>
          <p>
            Tirthan Valley, nestled in the Kullu district of Himachal Pradesh, is one of the most rewarding trekking destinations in the Indian Himalayas. Unlike the crowded trails of Manali or Shimla, Tirthan offers pristine wilderness, untouched forests, and trails that wind through the buffer zone of the <Link href="/explore/attractions/great-himalayan-national-park">Great Himalayan National Park</Link> — a UNESCO World Heritage Site.
          </p>
          <p>
            Whether you are a seasoned mountaineer or a first-time trekker, there is a trail here for you. Here are the top five treks that showcase the best of what this valley has to offer.
          </p>

          <h2>1. Tirthan Valley to Serolsar Lake Trek</h2>
          <p>
            <strong>Difficulty:</strong> Easy to Moderate | <strong>Distance:</strong> 5 km one way | <strong>Duration:</strong> 3-4 hours | <strong>Best Season:</strong> March to June, September to November
          </p>
          <p>
            The trek to <Link href="/explore/attractions/serolsar-lake">Serolsar Lake</Link> begins from <Link href="/explore/attractions/jalori-pass">Jalori Pass</Link> at 3,120 metres. The trail meanders through dense oak and rhododendron forests before opening up to a clearing where the sacred lake sits surrounded by reeds and towering deodars. A small wooden temple dedicated to Budhi Nagin stands at the lakeside.
          </p>
          <p>
            This is an ideal trek for families and beginners. The path is well marked, the altitude gain is gentle, and the entire round trip can be completed in 5-6 hours. Pack a lunch and eat by the lake — the silence here, broken only by birdsong, is unforgettable.
          </p>
          <p>
            <strong>Tips:</strong> Start early from Jalori Pass to avoid afternoon clouds. Carry at least 2 litres of water. Rubber-soled trekking shoes are sufficient for this trail.
          </p>

          <h2>2. Great Himalayan National Park Tirthan Trek</h2>
          <p>
            <strong>Difficulty:</strong> Moderate to Difficult | <strong>Distance:</strong> 40+ km | <strong>Duration:</strong> 3-5 days | <strong>Best Season:</strong> May to June, September to October
          </p>
          <p>
            The <Link href="/explore/activities/trekking-ghnp">GHNP Tirthan Trek</Link> is the flagship trek of the valley. Starting from the Gushaini entrance, the trail follows the <Link href="/explore/attractions/tirthan-river">Tirthan River</Link> deep into the national park. You will pass through dense forests of blue pine, spruce, and Himalayan birch before reaching high-altitude alpine meadows above 3,500 metres.
          </p>
          <p>
            Wildlife sightings are common — Himalayan brown bears, musk deer, and the elusive snow leopard inhabit these forests. Over 200 species of birds have been documented along this route, making it a paradise for <Link href="/explore/activities/bird-watching">birdwatchers</Link>.
          </p>
          <p>
            You must obtain a permit from the GHNP office in Sai Ropa before entering the park. Hiring a local guide is mandatory and costs around INR 1500-2000 per day. Camping equipment can be rented from shops in Gushaini.
          </p>
          <p>
            <strong>Tips:</strong> Acclimatise for a day in Gushaini before starting. River crossings can be tricky after rain — carry trekking poles. This trek requires genuine fitness; do not attempt it without prior trekking experience.
          </p>

          <h2>3. Jalori Pass to Raghupur Fort Trek</h2>
          <p>
            <strong>Difficulty:</strong> Easy | <strong>Distance:</strong> 3 km one way | <strong>Duration:</strong> 2-3 hours | <strong>Best Season:</strong> March to November
          </p>
          <p>
            This short but rewarding trek leads to the ruins of <Link href="/explore/attractions/raghupur-fort">Raghupur Fort</Link> at approximately 3,300 metres. From the fort, on a clear day, you get a 360-degree panoramic view of the Himalayan ranges, including peaks in the Pir Panjal and Dhauladhar ranges.
          </p>
          <p>
            The trail from Jalori Pass is broad and easy to follow. It passes through meadows dotted with wildflowers in spring and early summer. The fort itself is a stone ruin that once served as a lookout point for local rulers. This trek can be combined with the Serolsar Lake trek for a full day outing from Jalori Pass.
          </p>
          <p>
            <strong>Tips:</strong> Mornings offer the clearest views — afternoon clouds often roll in by 2 PM. The fort is exposed and windy; carry a windproof jacket even in summer.
          </p>

          <h2>4. Shilt Hut Trek</h2>
          <p>
            <strong>Difficulty:</strong> Moderate | <strong>Distance:</strong> 8 km one way | <strong>Duration:</strong> 5-6 hours | <strong>Best Season:</strong> April to June, September to November
          </p>
          <p>
            Shilt Hut is a forest rest house perched at about 3,100 metres inside the GHNP buffer zone. The trek starts from Gushaini and follows a steep but beautiful trail through mixed forests. The hut itself is a basic stone structure with stunning views of the surrounding peaks.
          </p>
          <p>
            This trek offers the GHNP experience without the multi-day commitment. You can trek to the hut, spend a night (prior booking required through the forest department), and return the next morning. The trail is rich in birdlife — keep an eye out for Western Tragopan, Himalayan Monal, and various species of laughingthrush.
          </p>
          <p>
            <strong>Tips:</strong> Book the hut well in advance during peak season. Carry your own sleeping bag and food. The trail gets slippery after rain — waterproof boots are essential.
          </p>

          <h2>5. Lambri Top Trek</h2>
          <p>
            <strong>Difficulty:</strong> Moderate | <strong>Distance:</strong> 6 km one way | <strong>Duration:</strong> 4-5 hours | <strong>Best Season:</strong> April to June, September to November
          </p>
          <p>
            Lambri Top at approximately 3,440 metres offers one of the finest viewpoints in the Tirthan Valley region. The trek passes through dense forests of oak and walnut before emerging above the tree line into open meadows. On clear days, you can see snow-capped peaks stretching from the Pir Panjal range to the Great Himalayan range.
          </p>
          <p>
            The trail is less frequented than others in the area, giving it a true off-the-beaten-path feel. You might encounter shepherds with their flocks of sheep during summer months. The meadows at the top are perfect for <Link href="/explore/activities/riverside-camping">camping</Link>, though you need to be self-sufficient with food and water.
          </p>
          <p>
            <strong>Tips:</strong> There is no water source above the tree line — carry at least 3 litres. This trek is best done with a local guide as the trail markings are sparse above the forest line.
          </p>

          <h2>Practical Information for All Treks</h2>
          <p>
            <strong>Getting there:</strong> Tirthan Valley is accessible from Delhi via Aut tunnel on NH-21. The nearest airport is Bhuntar (50 km). Buses run regularly from Delhi, Chandigarh, and Manali to Aut, from where local transport reaches the valley.
          </p>
          <p>
            <strong>Permits:</strong> GHNP treks require permits from the park office in Sai Ropa. Cost is INR 50 for Indians, INR 200 for foreigners. Guide fees are separate.
          </p>
          <p>
            <strong>Best time:</strong> Post-monsoon (September-November) offers the clearest views and most stable weather. Spring (March-May) brings wildflowers and pleasant temperatures. Avoid July-August due to heavy monsoon rain and leeches.
          </p>
          <p>
            <strong>What to pack:</strong> Layered clothing, waterproof jacket, sturdy trekking shoes, trekking poles, sunscreen, first aid kit, water bottles, energy snacks, and a headlamp.
          </p>
          <p>
            <strong>Where to stay:</strong> Base yourself in Gushaini, Nagini, or Banjar for easy access to all trailheads. <Link href="/explore/stay">Homestays</Link> cost INR 800-2500 per night including meals.
          </p>
        </>
      )

    case "local-cuisine-of-tirthan-valley":
      return (
        <>
          <p>
            The cuisine of Tirthan Valley reflects the mountain life of Himachal Pradesh — hearty, warming, made from locally grown ingredients, and deeply connected to the seasons. Unlike the generic north Indian food served at tourist restaurants across the Himalayas, the traditional food of Tirthan Valley has a character entirely its own.
          </p>
          <p>
            If you visit and only eat at your hotel restaurant, you will miss one of the most authentic cultural experiences the valley offers. Here is your guide to the dishes you must try, where to find them, and the food traditions that make this valley special.
          </p>

          <h2>Siddu — The Signature Bread</h2>
          <p>
            Siddu is to Tirthan Valley what momos are to Ladakh — the one dish that defines the region. It is a steamed wheat bread stuffed with a filling of poppy seeds (khus khus), walnuts, and sometimes green peas or spinach. The dough is leavened with a natural yeast starter that families maintain for generations.
          </p>
          <p>
            Siddu is served with ghee and a tangy tomato or green chutney. The texture is soft and pillowy, the filling nutty and slightly sweet. It is traditionally a winter dish, made when families gather around the wood fire, but homestays now serve it year-round because tourists love it.
          </p>
          <p>
            <strong>Where to eat:</strong> Almost every homestay in Gushaini and Nagini serves homemade siddu. The best versions come from home kitchens rather than restaurants. Ask your <Link href="/explore/stay">homestay</Link> host to make it — they are usually proud to share this tradition. You can also learn to make it yourself at a <Link href="/explore/activities/cooking-classes">Himachali cooking class</Link>.
          </p>

          <h2>Babru — The Himachali Kachori</h2>
          <p>
            Babru is a deep-fried bread stuffed with soaked black gram (urad dal) paste. Think of it as the Himachali cousin of a kachori, but with a thinner, crispier shell and a more intensely spiced filling. It is served with tamarind chutney or a thick tomato-onion gravy.
          </p>
          <p>
            Babru is a festive food, traditionally made during Dussehra, Diwali, and other celebrations. In the valley, you will find it at local dhabas and during village fairs. It is fried in mustard oil, which gives it a distinctive pungency that softens as you bite through to the creamy dal filling.
          </p>

          <h2>Aktori — Buckwheat Pancake</h2>
          <p>
            Aktori is a lesser-known gem — a sweet pancake made from buckwheat flour and jaggery, cooked slowly on a flat iron pan until the edges caramelize. It has a nutty, earthy flavor that comes from the buckwheat, which grows abundantly in the higher reaches of the valley.
          </p>
          <p>
            Aktori is a harvest-time dish, traditionally made to celebrate the buckwheat crop. It is simple, rustic, and utterly delicious — especially when eaten warm with a cup of chai on a cold morning. You will rarely find it in restaurants; it is a home kitchen specialty that you can request at homestays.
          </p>

          <h2>Trout — The River&apos;s Gift</h2>
          <p>
            The <Link href="/explore/attractions/tirthan-river">Tirthan River</Link> is home to brown and rainbow trout, and freshly caught trout prepared in local style is arguably the finest meal you will eat in the valley. The fish is typically marinated with turmeric, salt, and red chilli, then pan-fried in mustard oil until the skin is crispy and the flesh is flaky and moist.
          </p>
          <p>
            Some cooks stuff the trout with a paste of coriander, garlic, and green chillies before frying. Others bake it wrapped in banana leaves. However it is prepared, the key is the freshness — the trout goes from river to plate within hours.
          </p>
          <p>
            <strong>Where to eat:</strong> <Link href="/explore/activities/trout-fishing">Fishing camps</Link> along the Tirthan River serve the freshest trout. Many homestays in Gushaini also offer it. If you go for a guided fishing trip, your guide can arrange to cook your catch riverside.
          </p>
          <p>
            <strong>Note:</strong> Trout fishing requires a permit from the Himachal Pradesh Fisheries Department. Your homestay host can help you arrange one.
          </p>

          <h2>Mittha — Sweet Rice</h2>
          <p>
            Mittha is a Himachali sweet dish made from rice cooked in jaggery and dried fruits. It is a festive and ceremonial dish, always present at weddings, temple offerings, and celebrations. The rice turns a deep golden brown from the jaggery, and the raisins, almonds, and cashews add richness. It is served warm, often as part of a traditional Himachali Dham feast.
          </p>

          <h2>The Himachali Dham Feast</h2>
          <p>
            Dham is the grand traditional feast of Himachal Pradesh, served on special occasions — weddings, festivals, and community gatherings. It is cooked by hereditary chefs called Botis who specialize in this cuisine. A full Dham is served on leaf plates and includes rice, dal, rajma (kidney beans), kadhi, a sweet (mittha), and sometimes a meat dish. Everything is cooked in brass vessels over wood fire, and the Boti oversees the cooking from start to finish.
          </p>
          <p>
            You may be lucky enough to experience a Dham if you visit during a local festival or wedding. Some homestays also organize Dham meals for groups upon request — this is highly recommended.
          </p>

          <h2>Where to Find Authentic Food</h2>
          <p>
            The best food in Tirthan Valley is not in restaurants — it is in homestay kitchens. Homestay hosts cook from family recipes using locally grown ingredients: rice from the terraced fields, vegetables from the kitchen garden, spices dried on the rooftop. Eating with a local family is as much a cultural experience as a culinary one.
          </p>
          <p>
            For restaurant meals, the small dhabas in Banjar and Gushaini bazaar serve good thalis and trout. Avoid ordering pizza or pasta at tourist cafes — the ingredients are trucked in and the results are mediocre.
          </p>

          <h2>Seasonal Food Calendar</h2>
          <ul>
            <li><strong>Spring (March-May):</strong> Fresh greens, stinging nettle soup (bichu ghas), wild garlic, new season&apos;s honey.</li>
            <li><strong>Summer (June-August):</strong> Stone fruits — plum, peach, apricot. Fresh trout from the river. Garden vegetables.</li>
            <li><strong>Autumn (September-November):</strong> Apple season, walnut harvest, buckwheat aktori, mushrooms from the forest floor.</li>
            <li><strong>Winter (December-February):</strong> Siddu, dried meat, preserved pickles, root vegetables, warming dal with ghee.</li>
          </ul>

          <h2>Tips for Food Lovers</h2>
          <p>
            Book a <Link href="/explore/stay">homestay that offers home-cooked meals</Link> — this is the single best food decision you can make in Tirthan Valley. Ask to watch or help in the kitchen — most hosts welcome this. Carry some cash for roadside dhabas as many do not accept digital payments. If you have dietary restrictions, inform your homestay host in advance and they will happily accommodate.
          </p>
        </>
      )

    case "best-time-to-visit-tirthan-valley":
      return (
        <>
          <p>
            Tirthan Valley is a year-round destination, but each season transforms the valley into a completely different experience. The timing of your visit will determine what you see, what you can do, and how the valley feels. This month-by-month guide will help you choose the perfect window for your trip.
          </p>

          <h2>Spring: March to May — The Valley Wakes Up</h2>
          <p>
            <strong>March:</strong> Snow begins melting at lower elevations. The valley turns green almost overnight. Temperatures range from 8 to 22 degrees Celsius. Rhododendrons start blooming in the forests above 2,500 metres, painting entire hillsides in red and pink. This is one of the most beautiful months to visit, though higher treks may still have snow patches.
          </p>
          <p>
            <strong>April:</strong> The best overall month for visiting. Weather is stable, skies are clear, and all treks are accessible. Wildflowers carpet the meadows. Temperatures are comfortable at 12 to 28 degrees. The Tirthan River runs a stunning turquoise blue with snowmelt. Bird activity peaks — this is prime time for <Link href="/explore/activities/bird-watching">birdwatchers</Link> hoping to spot the Western Tragopan and Himalayan Monal.
          </p>
          <p>
            <strong>May:</strong> Warm and dry, with temperatures reaching 30 degrees in the valley floor. Perfect for river activities — <Link href="/explore/activities/trout-fishing">trout fishing</Link>, <Link href="/explore/activities/riverside-camping">riverside camping</Link>, and swimming in natural rock pools. The forests provide shade on hot afternoons. May is popular with families during school holidays, so book homestays well in advance.
          </p>
          <p>
            <strong>What to Do in Spring:</strong> <Link href="/explore/activities/trekking-ghnp">Trekking</Link> (all trails open), birdwatching (peak season), trout fishing (season opens in March), <Link href="/explore/activities/photography-tours">photography</Link> (rhododendron blooms), <Link href="/explore/activities/village-tours">village walks</Link>.
          </p>

          <h2>Summer: June to August — Monsoon Magic and Challenges</h2>
          <p>
            <strong>June:</strong> The pre-monsoon month. Hot days, occasional thunderstorms in the afternoon. Temperatures around 18 to 32 degrees. Last comfortable month for high-altitude treks before the monsoon hits. Waterfalls start flowing as pre-monsoon showers feed the streams.
          </p>
          <p>
            <strong>July-August:</strong> Full monsoon. Heavy rainfall, leeches on forest trails, frequent landslides on roads. The <Link href="/explore/attractions/tirthan-river">Tirthan River</Link> swells and turns muddy. Most trekking trails become dangerous. GHNP treks are not recommended.
          </p>
          <p>
            However, the monsoon has its own beauty — the valley is at its greenest, clouds weave through the mountains, and waterfalls appear everywhere. If you do not mind rain and are comfortable with basic travel disruptions, a monsoon visit can be magical. Stay in a riverside homestay, read books, drink chai, and watch the rain.
          </p>
          <p>
            <strong>What to Do in Monsoon:</strong> Homestay stays (relax, read, enjoy the rain), <Link href="/explore/activities/cooking-classes">cooking classes</Link> with hosts, short village walks on clear mornings, photography (dramatic cloud formations and waterfalls), indoor cultural experiences.
          </p>

          <h2>Autumn: September to November — The Golden Season</h2>
          <p>
            <strong>September:</strong> Monsoon retreats, skies clear, and the valley is washed clean. Temperatures drop to 10-25 degrees. This is arguably the best month for trekking — trails are lush from the rains, views are crystal clear, and the crowds have not yet arrived. The river returns to its clear turquoise colour.
          </p>
          <p>
            <strong>October:</strong> The valley turns golden as deciduous trees change colour. Apple orchards are heavy with fruit. Nights get cold (dropping to 5 degrees) but days are warm and sunny. Perfect for every activity — trekking, fishing, camping, village tours. Dussehra celebrations in local villages are colourful cultural events worth witnessing.
          </p>
          <p>
            <strong>November:</strong> Winter approaches. Higher passes like <Link href="/explore/attractions/jalori-pass">Jalori Pass</Link> start receiving the first snowfall. Temperatures range from 2 to 18 degrees. The valley is quiet and peaceful — tourist numbers drop significantly. This is the month for travellers who want solitude, clear mountain views, and the crackle of a bonfire at night.
          </p>

          <h2>Winter: December to February — Snow and Silence</h2>
          <p>
            <strong>December:</strong> First proper snowfall at higher elevations. Jalori Pass closes after heavy snow. The valley floor gets occasional dustings but stays accessible. Temperatures range from minus 2 to 12 degrees. Homestays light their bukhari (wood-burning stove) and life slows down to a peaceful rhythm.
          </p>
          <p>
            <strong>January:</strong> The coldest month. Temperatures drop to minus 5 at night. The river slows, icicles form on rocks, and the forests are silent. Fresh snowfall on the surrounding peaks creates breathtaking views from the valley. This is peak season for siddu and other winter comfort food.
          </p>
          <p>
            <strong>February:</strong> Winter begins loosening its grip. Days get warmer (5-15 degrees), though nights remain freezing. Early spring flowers start appearing at lower elevations. The valley is still very quiet — a perfect month for writers, artists, and anyone seeking deep solitude.
          </p>

          <h2>Quick Summary Table</h2>
          <ul>
            <li><strong>Best for trekking:</strong> April, May, September, October</li>
            <li><strong>Best for birdwatching:</strong> March, April, May</li>
            <li><strong>Best for trout fishing:</strong> March to June, September to November</li>
            <li><strong>Best for photography:</strong> April (rhododendrons), October (autumn colours), January (snow)</li>
            <li><strong>Best for budget travel:</strong> November, February, March (off-peak pricing)</li>
            <li><strong>Best for families:</strong> April, May, October</li>
            <li><strong>Best for solitude:</strong> November, December, January, February</li>
            <li><strong>Avoid if possible:</strong> July-August (heavy monsoon, landslides, leeches)</li>
          </ul>

          <h2>How to Reach Tirthan Valley</h2>
          <p>
            <strong>By air:</strong> Nearest airport is Bhuntar (Kullu-Manali Airport), about 50 km away. Flights from Delhi operate daily but are subject to weather cancellations.
          </p>
          <p>
            <strong>By road from Delhi:</strong> Drive via Chandigarh-Mandi-Aut Tunnel (approximately 500 km, 10-12 hours). Alternatively, take an overnight Volvo bus to Aut and hire local transport to the valley.
          </p>
          <p>
            <strong>By road from Manali:</strong> About 3-4 hours via Aut Tunnel.
          </p>
          <p>
            <strong>From Aut:</strong> Local buses and shared taxis run to Banjar (the gateway town), from where Gushaini and other valley villages are 15-30 minutes further. Check our <Link href="/explore/stay">places to stay</Link> for accommodation options once you arrive.
          </p>
        </>
      )

    case "wildlife-spotting-in-great-himalayan-national-park":
      return (
        <>
          <p>
            The <Link href="/explore/attractions/great-himalayan-national-park">Great Himalayan National Park</Link> (GHNP) is one of the most biodiverse protected areas in the Western Himalayas. Spread across 1,171 square kilometres in the upper reaches of the Tirthan and Sainj valleys, GHNP is a UNESCO World Heritage Site and home to over 375 species of fauna — including some of the rarest and most elusive animals in the Himalayan ecosystem.
          </p>
          <p>
            For wildlife enthusiasts, GHNP offers something that few other Indian national parks can — the chance to see rare Himalayan species in their undisturbed natural habitat, without the crowds and commercial safari circuits that define parks like Ranthambore or Jim Corbett.
          </p>

          <h2>The Stars: Iconic Animals of GHNP</h2>

          <h3>Snow Leopard (Panthera uncia)</h3>
          <p>
            The ghost of the mountains. GHNP is one of the last strongholds of the snow leopard in India, with an estimated 8-12 individuals in and around the park boundaries. Sightings are exceptionally rare — most visitors will never see one. But knowing they are there, somewhere above the tree line in the high alpine zones, adds an electric undercurrent to every trek.
          </p>
          <p>
            The best chance of spotting snow leopard signs (paw prints, scrape marks, scat) is on multi-day <Link href="/explore/activities/trekking-ghnp">treks</Link> above 3,500 metres during winter months. Camera trap surveys by the park authorities have documented them in the upper Tirthan and Sainj valleys.
          </p>

          <h3>Himalayan Brown Bear (Ursus arctos isabellinus)</h3>
          <p>
            One of the rarest bears in the world. GHNP&apos;s population is estimated at 15-20 individuals. These massive, shaggy bears are primarily seen in alpine meadows during autumn when they feed intensively before hibernation. They are shy and generally avoid humans, but if you are on a multi-day GHNP trek in September or October, you have a realistic chance of a distant sighting. Your guide will know the areas where they have been recently active.
          </p>

          <h3>Himalayan Tahr (Hemitragus jemlahicus)</h3>
          <p>
            A wild mountain goat found on steep rocky slopes above 3,000 metres. Tahrs are more commonly spotted than bears or leopards. They live in herds of 15-30 individuals and can often be seen grazing on cliff faces that seem impossibly steep.
          </p>

          <h3>Himalayan Musk Deer (Moschus chrysogaster)</h3>
          <p>
            A small, shy deer known for the musk gland of the male — which has unfortunately made it a target for poachers. GHNP&apos;s protection has allowed its population to stabilise. You might spot them in dense undergrowth at dawn or dusk, recognised by their distinctive fangs (elongated canine teeth) rather than antlers.
          </p>

          <h3>Western Tragopan (Tragopan melanocephalus)</h3>
          <p>
            One of the world&apos;s rarest pheasants and the crown jewel of GHNP&apos;s birdlife. This stunningly coloured bird with crimson breast feathers and black-and-white spotted plumage lives in the dense temperate forests between 2,400 and 3,600 metres. GHNP is one of the most reliable places on Earth to see it, though sightings require patience, silence, and a skilled birding guide.
          </p>

          <h2>The Birdwatcher&apos;s Paradise: 209 Species</h2>
          <p>
            GHNP and the surrounding Tirthan Valley are home to over 209 documented bird species. The variety spans from tiny warblers to magnificent raptors:
          </p>
          <ul>
            <li><strong>Pheasants:</strong> Western Tragopan, Himalayan Monal (the state bird of Himachal Pradesh with its iridescent rainbow plumage), Koklass Pheasant, Cheer Pheasant.</li>
            <li><strong>Raptors:</strong> Lammergeier (Bearded Vulture) with its 2.5-metre wingspan, Himalayan Griffon Vulture, Golden Eagle, Steppe Eagle.</li>
            <li><strong>Forest Birds:</strong> Great Barbet, various species of laughingthrush, Spotted and Slaty-backed Forktail, Verditer Flycatcher, Asian Paradise Flycatcher.</li>
            <li><strong>River Birds:</strong> Brown Dipper, Plumbeous Water Redstart, White-capped Water Redstart, Crested Kingfisher — all seen along the Tirthan River.</li>
          </ul>

          <h2>Best <Link href="/explore/activities/bird-watching">Birdwatching</Link> Trails</h2>
          <p>
            <strong>GHNP Nature Learning Centre (<Link href="/explore/attractions/shairopa">Sai Ropa</Link>):</strong> Easy walk, excellent for beginners. Spotted Forktails and barbets are almost guaranteed. Open year-round with exhibits explaining GHNP ecology.
          </p>
          <p>
            <strong>Tirthan Riverside Walk (Gushaini to Nagini):</strong> A flat 4 km walk along the river. Brown Dippers, kingfishers, and water redstarts are commonly seen on rocks mid-stream. Best at dawn.
          </p>
          <p>
            <strong><Link href="/explore/attractions/jalori-pass">Jalori Pass</Link> Forest Trail:</strong> Excellent for pheasants and laughingthrushes. The dense understory and quiet trails make this one of the best birding spots in the region. April and May are peak months.
          </p>
          <p>
            <strong>GHNP Interior Trails (permit required):</strong> The only way to see Western Tragopan in the wild. Multi-day treks with a birding guide provide the best chances.
          </p>

          <h2>Photography Tips for Wildlife in GHNP</h2>
          <p>
            <strong>Gear:</strong> A 200-400mm telephoto lens is essential for bird photography. For mammals on distant slopes, 400-600mm is preferred. A sturdy lightweight tripod or monopod helps with stability on long lenses.
          </p>
          <p>
            <strong>Light:</strong> The best light in the valley is between 6-8 AM and 4-6 PM. Midday sun creates harsh shadows in the forest.
          </p>
          <p>
            <strong>Behaviour:</strong> Animals in GHNP are wild and skittish. Move slowly, speak softly, wear muted colours (no bright reds or oranges), and wait patiently at known feeding spots. Your guide&apos;s knowledge of animal habits is invaluable.
          </p>
          <p>
            <strong>Ethics:</strong> Do not use flash, playback calls, or bait to attract wildlife. Stay on trails. Maintain a safe distance. GHNP&apos;s wildlife has thrived because of minimal human disturbance — keep it that way.
          </p>

          <h2>Guided Wildlife Experiences</h2>
          <p>
            <strong>Day Walks with a Naturalist:</strong> Hire a local GHNP-certified guide for a half-day nature walk. They know where specific species have been seen recently. Cost: INR 1,000-1,500 per day.
          </p>
          <p>
            <strong>Multi-Day Wildlife Treks:</strong> 3-5 day treks deep into GHNP with dedicated wildlife guides. These offer the best chance of seeing large mammals and rare birds. Cost: INR 3,000-5,000 per day including guide, permits, and camping.
          </p>
          <p>
            <strong>Birdwatching Tours:</strong> Specialised birding guides are available in Gushaini. April and May are peak season. Dawn starts are non-negotiable for serious birding. See our <Link href="/explore/activities/bird-watching">birdwatching activity page</Link> for more details.
          </p>

          <h2>Practical Information</h2>
          <p>
            <strong>Permits:</strong> Required for entry into GHNP. Obtain from the GHNP office at Sai Ropa. Cost: INR 50 (Indian), INR 200 (foreigner). Compulsory guide fee is separate.
          </p>
          <p>
            <strong>Best Season:</strong> September-November for mammals (clear weather, animals active before winter). March-May for birds (breeding season, peak activity).
          </p>
          <p>
            <strong>What to Bring:</strong> Binoculars (essential, minimum 8x42), field guide to Himalayan birds, camera with telephoto lens, notebook for recording sightings, rain jacket, patience.
          </p>
          <p>
            <strong>Base:</strong> Stay in Gushaini or Nagini for the closest access to GHNP entry points. Check our <Link href="/explore/stay">accommodation guide</Link> for options near the park. The Sai Ropa Nature Learning Centre is 20 minutes from Gushaini.
          </p>
        </>
      )

    default:
      return <p>Content coming soon.</p>
  }
}

import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://thetirthanvalley.in${item.href}` }
        : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              {i > 0 && <span className="mx-2">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-green-700 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

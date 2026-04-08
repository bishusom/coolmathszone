import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span className="text-slate-400">/</span> : null}
                {item.href && !isCurrent ? (
                  <Link href={item.href} className="font-medium text-blue-700 transition-colors hover:text-cyan-600">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isCurrent ? 'font-semibold text-slate-900' : 'text-slate-700'}>
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// app/sitemap.ts
import { MetadataRoute } from 'next'
import { gradeLevels } from '@/data/syllabus'
import { resourceCategories } from '@/data/resources'

// Base URL - update this to your actual domain
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/grades`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exercises`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/parents-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/worksheets`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]

  // Grade level pages
  const gradeRoutes = gradeLevels.map((grade): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/grades/${grade.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Topic pages for each grade (only include if these routes exist)
  const topicRoutes = gradeLevels.flatMap((grade): MetadataRoute.Sitemap => 
    grade.topics.map((topic): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/grades/${grade.id}/${topic.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  // Resource category pages (only include actual resource categories)
  const resourceCategoryRoutes = resourceCategories.map((category): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/resources/${category.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Worksheet pages
  const worksheetGradeRoutes = gradeLevels.map((grade): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/worksheets/${grade.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const worksheetTopicRoutes = gradeLevels.flatMap((grade): MetadataRoute.Sitemap => 
    grade.topics.map((topic): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/worksheets/${grade.id}/${topic.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )
  
  // Game Routes
  const gameSlugs = [
    'math-popper', 'algebra-dash', 'fraction-slicer', 'logic-link',
    'prime-protector', 'slope-slider', 'angle-archer', 'binary-bridge',
    'root-reaper', 'operator-overload'
  ]
  const gameRoutes = gameSlugs.map((slug): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/games/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Combine all routes
  return [
    ...staticRoutes,
    ...gradeRoutes,
    ...topicRoutes,
    ...resourceCategoryRoutes,
    ...worksheetGradeRoutes,
    ...worksheetTopicRoutes,
    ...gameRoutes,
  ]
}

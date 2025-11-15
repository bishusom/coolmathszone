// app/sitemap.ts
import { MetadataRoute } from 'next'
import { gradeLevels } from '@/data/syllabus'
import { getAllGradeLevels, getGradeLevel } from '@/utils/gradeHelpers'

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
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
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
    },
    {
      url: `${baseUrl}/worksheets/generate`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Grade level pages
  const gradeRoutes = gradeLevels.map((grade): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/grades/${grade.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Topic pages for each grade
  const topicRoutes = gradeLevels.flatMap((grade): MetadataRoute.Sitemap => 
    grade.topics.map((topic): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/grades/${grade.id}/${topic.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  // Category pages for exercises
  const allCategories = Array.from(
    new Set(
      gradeLevels.flatMap(grade => 
        grade.topics.map(topic => topic.category)
      )
    )
  )

  const categoryRoutes = allCategories.map((category): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}/exercises/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Resource topic pages (if they exist)
  const resourceTopicRoutes = gradeLevels.flatMap((grade): MetadataRoute.Sitemap => 
    grade.topics.map((topic): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/resources/${topic.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

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

  // Combine all routes
  return [
    ...staticRoutes,
    ...gradeRoutes,
    ...topicRoutes,
    ...categoryRoutes,
    ...resourceTopicRoutes,
    ...worksheetGradeRoutes,
    ...worksheetTopicRoutes,
  ]
}
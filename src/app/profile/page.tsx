import { Suspense } from 'react'
import Layout from '@/components/ui/Layout'
import ProfilePageClient from '@/components/profile/ProfilePageClient'

function ProfilePageFallback() {
  return (
    <Layout backgroundClass="gradient-ocean-blue">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    </Layout>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageFallback />}>
      <ProfilePageClient />
    </Suspense>
  )
}

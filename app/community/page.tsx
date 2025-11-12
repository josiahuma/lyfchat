// app/community/page.tsx (server component)
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import CommunityPageContent from './CommunityPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CommunityPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <CommunityPageContent />
}

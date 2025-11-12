// lib/supabaseServer.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // In server components, cookie access is sync. Provide get/set/remove.
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // In RSC you can't mutate headers, so make set/remove no-ops.
        set() {},
        remove() {},
      },
    }
  )
}

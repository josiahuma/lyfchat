'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Initial session fetch
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    init()

    // Listen for auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMenuOpen(false)

    // Navigate home and force a fresh render so server guards re-run
    router.replace('/')
    router.refresh()

    // Last-resort hard refresh if a stubborn cache persists:
    // setTimeout(() => window.location.assign('/'), 0)
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-lyfOrange">
        Lyfchat
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex space-x-6">
        {user ? (
          <>
            <Link href="/interests" className="hover:text-lyfOrange">
              Interests
            </Link>
            <Link href="/community" className="hover:text-lyfOrange">
              Community
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-lyfOrange"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-lyfOrange">
              Login
            </Link>
            <Link href="/register" className="hover:text-lyfOrange">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-lyfOrange text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col items-center py-4 space-y-3 md:hidden z-50">
          {user ? (
            <>
              <Link
                href="/interests"
                className="hover:text-lyfOrange"
                onClick={() => setMenuOpen(false)}
              >
                Interests
              </Link>
              <Link
                href="/community"
                className="hover:text-lyfOrange"
                onClick={() => setMenuOpen(false)}
              >
                Community
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-lyfOrange"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-lyfOrange"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-lyfOrange"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

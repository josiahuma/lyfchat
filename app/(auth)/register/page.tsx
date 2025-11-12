'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔹 Email/password sign up
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/interests`, // after email confirm
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    // If email confirmations are enabled, Supabase will send a verify email.
    if (data?.user && !data.user.confirmed_at) {
      setMessage('Check your email to confirm your account.')
    } else {
      setMessage('Account created successfully!')
      router.push('/interests')
    }
  }

  // 🔹 Google sign up (OAuth)
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/interests`,
      },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Lyfchat Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
        >
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.toLowerCase().includes('success') || message.toLowerCase().includes('confirm')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

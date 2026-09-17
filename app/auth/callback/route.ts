import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/login', requestUrl.origin)
    )
  }

  const supabase = await createClient()

  const { error } =
    await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('AUTH CALLBACK ERROR:', error)

    return new NextResponse(
      `AUTH CALLBACK ERROR: ${error.message}`,
      {
        status: 400,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    )
  }

  return NextResponse.redirect(
    new URL('/update-password', requestUrl.origin)
  )
}
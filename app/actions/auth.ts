'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthState = {
  error: string | null
}

type CredentialsResult = {
  email: string
  password: string
  error: string | null
}

function validateCredentials(
  formData: FormData,
  isRegister = false
): CredentialsResult {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  const password = String(formData.get('password') ?? '')

  if (!email) {
    return {
      email,
      password,
      error: 'El correo electrónico es obligatorio.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return {
      email,
      password,
      error: 'Ingresa un correo electrónico válido.',
    }
  }

  if (!password) {
    return {
      email,
      password,
      error: 'La contraseña es obligatoria.',
    }
  }

  if (isRegister && password.length < 6) {
    return {
      email,
      password,
      error: 'La contraseña debe tener al menos 6 caracteres.',
    }
  }

  return {
    email,
    password,
    error: null,
  }
}

function getAuthErrorMessage(error: {
  message?: string
  code?: string
}): string {
  switch (error.code) {
    case 'invalid_credentials':
      return 'El correo o la contraseña son incorrectos.'

    case 'email_not_confirmed':
      return 'Debes confirmar tu correo electrónico antes de iniciar sesión.'

    case 'user_already_exists':
      return 'No se pudo crear la cuenta. Verifica los datos e intenta nuevamente.'

    case 'email_address_invalid':
      return 'El correo electrónico no es válido.'

    case 'weak_password':
      return 'La contraseña no cumple los requisitos de seguridad.'

    default:
      return 'No se pudo completar la operación. Intenta nuevamente.'
  }
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const credentials = validateCredentials(formData)

  if (credentials.error !== null) {
    return {
      error: credentials.error,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return {
      error: getAuthErrorMessage(error),
    }
  }

  redirect('/dashboard')
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const credentials = validateCredentials(formData, true)

  if (credentials.error !== null) {
    return {
      error: credentials.error,
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return {
      error: getAuthErrorMessage(error),
    }
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirect('/login')
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/login')
}

export async function resetPassword(
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  if (!email) {
    return {
      error: 'El correo electrónico es obligatorio.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return {
      error: 'Ingresa un correo electrónico válido.',
    }
  }

  const supabase = await createClient()

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          'https://next-supabase-auth-felidae1.vercel.app/auth/callback?next=/update-password',
      }
    )

  if (error) {
    console.error(
      'RESET PASSWORD ERROR:',
      error.message
    )

    return {
      error: error.message,
    }
  }

  return {
    error: null,
  }
}

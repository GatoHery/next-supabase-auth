'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
const [email, setEmail] = useState('')
const [error, setError] = useState('')
const [submitted, setSubmitted] = useState(false)
const [loading, setLoading] = useState(false)

async function handleSubmit(
event: React.FormEvent<HTMLFormElement>
) {
event.preventDefault()

setError('')
setSubmitted(false)

const normalizedEmail = email.trim().toLowerCase()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(normalizedEmail)) {
  setError('Ingresa un correo electrónico válido.')
  return
}

setLoading(true)

const supabase = createClient()

const { error } = await supabase.auth.resetPasswordForEmail(
  email,
  {
    redirectTo:
      'https://next-supabase-auth-felidae1.vercel.app/auth/callback?next=/update-password',
  }
)

setLoading(false)

if (error) {
  console.error(
    'RESET PASSWORD ERROR:',
    error.message
  )

  setError(
    'No se pudo procesar la solicitud. Intenta nuevamente.'
  )

  return
}

setSubmitted(true)

}

return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md">
{/* Encabezado */} <div className="mb-8 text-center"> <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
Proyecto Supabase </p>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Recuperar contraseña
      </h1>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Introduce tu correo electrónico y te enviaremos
        un enlace para restablecer tu contraseña.
      </p>
    </div>

    {/* Tarjeta */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Correo */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <p className="text-sm font-medium leading-5 text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Éxito */}
        {submitted && (
          <div
            role="status"
            className="rounded-xl border border-green-200 bg-green-50 px-4 py-3"
          >
            <p className="text-sm font-medium leading-5 text-green-700">
              Si el correo está registrado, recibirás
              instrucciones para recuperar tu contraseña.
            </p>
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enviando...
            </span>
          ) : (
            'Enviar enlace de recuperación'
          )}
        </button>
      </form>

      {/* Volver al login */}
      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <a
          href="/login"
          className="text-sm font-semibold text-gray-900 hover:underline"
        >
          ← Volver a iniciar sesión
        </a>
      </div>
    </div>

    {/* Texto inferior */}
    <p className="mt-6 text-center text-xs leading-5 text-gray-400">
      Recibirás un enlace de recuperación si el correo
      pertenece a una cuenta registrada.
    </p>
  </div>
</main>

)
}

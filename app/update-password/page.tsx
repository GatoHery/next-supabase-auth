'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
const router = useRouter()

const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [error, setError] = useState('')
const [success, setSuccess] = useState(false)
const [loading, setLoading] = useState(false)
const [ready, setReady] = useState(false)

useEffect(() => {
const supabase = createClient()

const {
  data: { subscription },
} = supabase.auth.onAuthStateChange(
  (event) => {
    if (event === 'PASSWORD_RECOVERY') {
      setReady(true)
    }
  }
)

async function checkSession() {
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    setReady(true)
  }
}

checkSession()

return () => {
  subscription.unsubscribe()
}

}, [])

async function handleSubmit(
event: React.FormEvent<HTMLFormElement>
) {
event.preventDefault()

setError('')
setSuccess(false)

if (password.length < 6) {
  setError(
    'La contraseña debe tener al menos 6 caracteres.'
  )
  return
}

if (password !== confirmPassword) {
  setError('Las contraseñas no coinciden.')
  return
}

setLoading(true)

const supabase = createClient()

const { error } = await supabase.auth.updateUser({
  password,
})

setLoading(false)

if (error) {
  console.error(
    'UPDATE PASSWORD ERROR:',
    error.message
  )

  if (
    error.message.toLowerCase().includes('same') ||
    error.message.toLowerCase().includes('previous') ||
    error.message.toLowerCase().includes('different')
  ) {
    setError(
      'La nueva contraseña debe ser diferente a la contraseña anterior.'
    )
  } else {
    setError(
      'No se pudo actualizar la contraseña. Intenta nuevamente.'
    )
  }

  return
}

setSuccess(true)

setTimeout(() => {
  router.push('/login')
}, 2000)

}

/* Estado: verificando recuperación */
if (!ready) {
return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md"> <div className="mb-8 text-center"> <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
Proyecto Supabase </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Recuperando cuenta
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Verificando el enlace de recuperación...
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

        <p className="text-sm text-gray-500">
          Un momento, estamos verificando tu sesión.
        </p>
      </div>
    </div>
  </main>
)

}

/* Estado: contraseña actualizada */
if (success) {
return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md"> <div className="mb-8 text-center"> <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
Proyecto Supabase </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Contraseña actualizada
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Tu contraseña se cambió correctamente.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <span className="text-2xl text-green-600">
            ✓
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Todo listo
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Tu contraseña ha sido actualizada.
          Serás redirigido al inicio de sesión.
        </p>

        <div className="mt-6 h-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-full animate-pulse rounded-full bg-black" />
        </div>
      </div>
    </div>
  </main>
)

}

/* Estado: formulario */
return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md">
{/* Encabezado */} <div className="mb-8 text-center"> <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
Proyecto Supabase </p>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Nueva contraseña
      </h1>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Introduce una nueva contraseña para proteger
        tu cuenta.
      </p>
    </div>

    {/* Tarjeta */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nueva contraseña */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Nueva contraseña
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            minLength={6}
            required
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <p className="mt-2 text-xs text-gray-400">
            Utiliza al menos 6 caracteres.
          </p>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            minLength={6}
            required
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
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

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Actualizando...
            </span>
          ) : (
            'Cambiar contraseña'
          )}
        </button>
      </form>

      {/* Login */}
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
      Asegúrate de elegir una contraseña que no hayas
      utilizado anteriormente.
    </p>
  </div>
</main>

)
}

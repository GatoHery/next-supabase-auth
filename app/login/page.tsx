'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signIn, type AuthState } from '@/app/actions/auth'

const initialState: AuthState = {
error: null,
}

function SubmitButton() {
const { pending } = useFormStatus()

return ( <button
   type="submit"
   disabled={pending}
   className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
 >
{pending ? ( <span className="flex items-center justify-center gap-2"> <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
Iniciando sesión... </span>
) : (
'Iniciar sesión'
)} </button>
)
}

export default function LoginPage() {
const [state, formAction] = useActionState(
signIn,
initialState
)

return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md">
{/* Encabezado */} <div className="mb-8 text-center"> <div className="mx-auto mb-5 text-center">
  <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
    Proyecto Supabase
  </p>
</div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Bienvenido de nuevo
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Inicia sesión para continuar
      </p>
    </div>

    {/* Tarjeta */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <form action={formAction} className="space-y-5">
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
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Contraseña */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-gray-600 transition hover:text-black hover:underline"
            >
              ¿La olvidaste?
            </a>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Error */}
        {state.error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <p className="text-sm font-medium text-red-700">
              {state.error}
            </p>
          </div>
        )}

        {/* Botón */}
        <SubmitButton />
      </form>

      {/* Registro */}
      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <a
            href="/register"
            className="font-semibold text-gray-900 hover:underline"
          >
            Crear cuenta
          </a>
        </p>
      </div>
    </div>

    {/* Texto inferior */}
    <p className="mt-6 text-center text-xs text-gray-400">
      Acceso seguro a tu cuenta
    </p>
  </div>
</main>

)
}

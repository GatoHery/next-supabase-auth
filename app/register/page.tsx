'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signUp, type AuthState } from '@/app/actions/auth'

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
Creando cuenta... </span>
) : (
'Crear cuenta'
)} </button>
)
}

export default function RegisterPage() {
const [state, formAction] = useActionState(
signUp,
initialState
)

return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"> <div className="w-full max-w-md">
{/* Encabezado */} <div className="mb-8 text-center"> <div className="mx-auto mb-5 text-center">
  <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
    Proyecto Supabase
  </p>
</div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Crea tu cuenta
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Regístrate para comenzar a utilizar la aplicación
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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
          />

          <p className="mt-2 text-xs text-gray-400">
            La contraseña debe tener al menos 6 caracteres.
          </p>
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

      {/* Login */}
      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/login"
            className="font-semibold text-gray-900 hover:underline"
          >
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>

    {/* Texto inferior */}
    <p className="mt-6 text-center text-xs text-gray-400">
      Tus datos se mantienen protegidos y seguros
    </p>
  </div>
</main>

)
}

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
const supabase = await createClient()

const {
data: { user },
} = await supabase.auth.getUser()

if (!user) {
redirect('/login')
}

return ( <main className="min-h-screen bg-gray-50"> <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

    {/* Header */}
    <header className="mb-8 flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Proyecto Supabase
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Mi Dashboard
        </h1>
      </div>

      <LogoutButton />
    </header>

    {/* Bienvenida */}
    <section className="mb-6 overflow-hidden rounded-2xl bg-black p-6 text-white shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Bienvenido
        </p>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Hola, {user.email}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
          Has iniciado sesión correctamente. Desde aquí
          puedes consultar la información de tu cuenta y
          acceder a las funciones disponibles.
        </p>
      </div>
    </section>

    {/* Información de la cuenta */}
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Información de la cuenta
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Datos asociados a tu sesión actual.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {/* Correo */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <span className="text-sm font-bold text-gray-700">
              @
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Correo electrónico
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-gray-900">
            {user.email}
          </p>
        </div>

        {/* Estado */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Estado
          </p>

          <p className="mt-2 text-sm font-semibold text-gray-900">
            Cuenta activa
          </p>

          <p className="mt-1 text-xs text-green-600">
            Sesión iniciada
          </p>
        </div>

        {/* Autenticación */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <span className="text-xs font-bold text-gray-700">
              AUTH
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Autenticación
          </p>

          <p className="mt-2 text-sm font-semibold text-gray-900">
            Supabase Auth
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Autenticación segura
          </p>
        </div>

      </div>
    </section>

    {/* Estado de seguridad */}
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Seguridad
          </p>

          <h2 className="mt-2 text-lg font-semibold text-gray-900">
            Tu cuenta está protegida
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            La sesión actual está gestionada mediante
            Supabase Authentication.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-xs font-semibold text-green-700">
            Sesión activa
          </span>
        </div>

      </div>
    </section>

    {/* Footer */}
    <footer className="mt-8 text-center">
      <p className="text-xs text-gray-400">
        Proyecto Supabase · Área privada
      </p>
    </footer>

  </div>
</main>

)
}

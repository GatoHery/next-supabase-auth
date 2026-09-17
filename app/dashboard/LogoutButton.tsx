'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
const router = useRouter()
const [loading, setLoading] = useState(false)

async function handleLogout() {
if (loading) return

setLoading(true)

const supabase = createClient()

await supabase.auth.signOut()

router.push('/login')
router.refresh()

}

return ( <button
   onClick={handleLogout}
   disabled={loading}
   className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-60"
 >
{loading ? ( <span className="flex items-center gap-2"> <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
Cerrando sesión... </span>
) : (
'Cerrar sesión'
)} </button>
)
}

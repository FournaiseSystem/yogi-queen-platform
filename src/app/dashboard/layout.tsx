"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n" // Notre moteur de traduction
import { PlayCircle, Tv, Heart, Settings, LogOut, Menu, Lock, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { lang, setLang, t } = useI18n()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const adminEmails = ["legall.yann92@gmail.com", "yogi-queen-platform@proton.me"]
      
      if (user && adminEmails.includes(user.email || "")) {
        setIsAdmin(true)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-zinc-200 fixed h-full z-20">
        <div className="p-6">
          <span className="text-2xl font-bold tracking-tighter">
            Yogi<span className="text-rose-500">Queen</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-zinc-900 bg-rose-50 rounded-xl font-medium transition-colors">
            <PlayCircle className="h-5 w-5 text-rose-500" />
            {t('sidebar.library')}
          </Link>
          <Link href="/dashboard/lives" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl font-medium transition-colors">
            <Tv className="h-5 w-5" />
            {t('sidebar.lives')}
          </Link>
          <Link href="/dashboard/favorites" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl font-medium transition-colors">
            <Heart className="h-5 w-5" />
            {t('sidebar.favorites')}
          </Link>

          {!loading && isAdmin && (
            <div className="pt-4 mt-4 border-t border-zinc-100">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl font-bold transition-all border border-rose-200">
                <Lock className="h-4 w-4" />
                {t('sidebar.admin')}
              </Link>
            </div>
          )}
        </nav>

        {/* --- SECTION BASSE (Langues & Compte) --- */}
        <div className="p-4 border-t border-zinc-100 space-y-2">
          
          {/* SÉLECTEUR DE LANGUE */}
          <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-zinc-50 rounded-lg border border-zinc-100">
            <Languages className="h-4 w-4 text-zinc-400" />
            <div className="flex gap-1 ml-auto">
              <button 
                onClick={() => setLang('fr')} 
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-200'}`}
              >FR</button>
              <button 
                onClick={() => setLang('en')} 
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-200'}`}
              >EN</button>
            </div>
          </div>

          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 font-medium text-sm">
            <Settings className="h-4 w-4" />
            {t('sidebar.account')}
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl font-medium text-sm w-full transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            {t('sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* --- MENU MOBILE --- */}
      <div className="md:hidden fixed top-0 w-full z-30 bg-white border-b border-zinc-200 px-4 h-16 flex items-center justify-between">
         <span className="font-bold text-lg">Yogi<span className="text-rose-500">Queen</span></span>
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="mt-8 flex flex-col gap-4">
                 <Link href="/dashboard" className="font-medium">{t('sidebar.library')}</Link>
                 <Link href="/dashboard/lives" className="font-medium">{t('sidebar.lives')}</Link>
                 <Link href="/dashboard/favorites" className="font-medium">{t('sidebar.favorites')}</Link>
                 
                 <div className="flex gap-2 py-2 border-y border-zinc-100">
                    <button onClick={() => setLang('fr')} className={`px-3 py-1 rounded-md text-sm ${lang === 'fr' ? 'bg-black text-white' : 'bg-zinc-100'}`}>FR</button>
                    <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-md text-sm ${lang === 'en' ? 'bg-black text-white' : 'bg-zinc-100'}`}>EN</button>
                 </div>

                 {isAdmin && (
                   <Link href="/admin" className="font-bold text-rose-600 flex items-center gap-2 pt-4">
                     <Lock className="h-4 w-4" /> {t('sidebar.admin')}
                   </Link>
                 )}
                 <button onClick={handleLogout} className="text-left font-medium text-rose-500 mt-4 border-t pt-4">{t('sidebar.logout')}</button>
              </div>
            </SheetContent>
         </Sheet>
      </div>

      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
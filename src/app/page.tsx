"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n" // On importe le moteur de langue
import { Button } from "@/components/ui/button"
import { PlayCircle, CheckCircle2, Sparkles, ArrowRight, Languages } from "lucide-react"

export default function LandingPage() {
  const { t, lang, setLang } = useI18n()

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <span className="text-2xl font-bold tracking-tighter">
          Yogi<span className="text-rose-500">Queen</span>
        </span>
        
        <div className="flex items-center gap-6">
          {/* SÉLECTEUR DE LANGUE DISCRET */}
          <div className="hidden sm:flex items-center gap-2 bg-zinc-50 px-2 py-1 rounded-full border border-zinc-100">
            <button onClick={() => setLang('fr')} className={`text-[10px] font-bold px-2 py-1 rounded-full ${lang === 'fr' ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}>FR</button>
            <button onClick={() => setLang('en')} className={`text-[10px] font-bold px-2 py-1 rounded-full ${lang === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}>EN</button>
          </div>

          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-600 hover:text-zinc-900">{t('landing.nav_login')}</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6">
                {t('landing.nav_signup')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-20 pb-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-8 animate-bounce">
          <Sparkles className="h-4 w-4" />
          {t('landing.hero_badge')}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          {t('landing.hero_title_1')}<span className="text-rose-500 italic">{t('landing.hero_title_italic')}</span>{t('landing.hero_title_2')}
        </h1>
        <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('landing.hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white text-lg h-14 px-8 rounded-2xl shadow-xl transition-all hover:scale-105">
              {t('landing.cta_start')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" className="text-lg h-14 px-8 rounded-2xl border-2">
            {t('landing.cta_programs')}
          </Button>
        </div>
      </section>

      {/* --- APERÇU PLATEFORME --- */}
      <section className="bg-zinc-50 py-24 px-6 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
               <div className="absolute -inset-4 bg-rose-500/10 rounded-[2rem] blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
               <img 
                 src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
                 alt="Yoga Practice" 
                 className="relative rounded-3xl shadow-2xl border border-white"
               />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">{t('landing.feature_title')}</h2>
              <ul className="space-y-4">
                {/* Note : Pour les listes comme celle-ci, on peut aussi les mettre en JSON ou les laisser ainsi si elles ne changent pas souvent */}
                <li className="flex items-center gap-3 text-lg text-zinc-600">
                  <CheckCircle2 className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  {lang === 'fr' ? "Plus de 50 vidéos HD en accès illimité" : "Over 50 HD videos with unlimited access"}
                </li>
                <li className="flex items-center gap-3 text-lg text-zinc-600">
                  <CheckCircle2 className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  {lang === 'fr' ? "Nouveaux lives chaque semaine" : "New live sessions every week"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-zinc-400 text-sm border-t border-zinc-100">
        <p>{t('landing.footer')}</p>
      </footer>
    </div>
  )
}
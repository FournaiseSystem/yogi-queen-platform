"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (loginError) throw loginError

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight italic">
            Yogi<span className="text-rose-500">Queen</span>
          </CardTitle>
          <CardDescription>{t('landing.nav_login')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}

            <div className="space-y-2">
              <Label>{t('auth.email')}</Label>
              <Input 
                type="email" 
                placeholder="nom@exemple.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t('auth.password')}</Label>
              </div>
              <Input 
                type="password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : t('landing.nav_login')}
            </Button>

            <p className="text-center text-sm text-zinc-500 mt-4">
              {t('auth.no_account') || "New here?"} {" "}
              <Link href="/signup" className="text-rose-600 font-bold hover:underline">
                {t('landing.nav_signup')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
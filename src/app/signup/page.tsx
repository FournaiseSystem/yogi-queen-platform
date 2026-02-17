"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.error_passwords_match'))
      setLoading(false)
      return
    }

    try {
      // 2. Inscription via Supabase Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            display_name: formData.username, // On stocke le pseudo ici
          }
        }
      })

      if (signupError) {
        if (signupError.message.includes("already registered")) {
          throw new Error(t('auth.error_email_exists'))
        }
        throw signupError
      }

      // 3. Succès !
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard") // Redirection vers les vidéos
      }, 2000)

    } catch (err: any) {
      setError(err.message || t('auth.error_generic'))
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
          <CardDescription>{t('auth.signup_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 text-sm border border-green-100 font-medium">
                <CheckCircle2 className="h-4 w-4" /> {t('auth.success_welcome')}
              </div>
            )}

            <div className="space-y-2">
              <Label>{t('auth.username')}</Label>
              <Input 
                type="text" 
                required 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('auth.password')}</Label>
                <Input 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('auth.confirm_password')}</Label>
                <Input 
                  type="password" 
                  required 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-11" disabled={loading || success}>
              {loading ? <Loader2 className="animate-spin" /> : t('auth.btn_signup')}
            </Button>

            <p className="text-center text-sm text-zinc-500 mt-4">
              {t('auth.already_member')}{" "}
              <Link href="/login" className="text-rose-600 font-bold hover:underline">
                {t('auth.login_link')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
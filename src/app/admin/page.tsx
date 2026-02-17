"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Pour rediriger les intrus
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, PlusCircle, Loader2, Lock } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    category: "Vinyasa",
    duration: "20 min",
    level: "Intermédiaire"
  })

  // --- LA BARRIÈRE DE SÉCURITÉ ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      // ICI : Remplace l'email par ton email ou celui de ta femme
      // C'est la liste blanche des admins
      const adminEmails = ["legall.yann92@gmail.com", "yogi-queen-platform@proton.me"]

      if (!user || !adminEmails.includes(user.email || "")) {
        // Pas connecté ou pas admin ? Allez, on dégage vers le login
        router.push("/login")
      } else {
        setIsAuthorized(true)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('videos')
        .insert([formData])

      if (error) throw error
      setSuccess(true)
      setFormData({ ...formData, title: "", description: "", video_url: "" })
    } catch (error) {
      alert("Erreur : " + error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>
  if (!isAuthorized) return null // Évite le flash de contenu avant redirection

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lock className="text-rose-600" /> Espace Studio
          </h1>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>Retour Site</Button>
        </div>

        <Card className="border-2 border-rose-100 shadow-xl">
          <CardHeader>
            <CardTitle>Ajouter une nouvelle séance</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-200">
                  <CheckCircle className="h-5 w-5" /> Vidéo en ligne !
                </div>
              )}

              <div className="space-y-2">
                <Label>Titre de la séance</Label>
                <Input 
                  placeholder="Ex: Yoga du matin" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>ID Vidéo YouTube</Label>
                <Input 
                  placeholder="Ex: v7AYKMP6rOE" 
                  value={formData.video_url}
                  onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white" disabled={uploading}>
                {uploading ? <Loader2 className="animate-spin" /> : "Publier la séance"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
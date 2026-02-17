"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n" // Import du dictionnaire magique
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, BarChart, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { t } = useI18n()
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Récupération des vidéos (Mode Client)
  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setVideos(data)
      setLoading(false)
    }
    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-rose-500 h-10 w-10" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* En-tête traduit */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            {t('dashboard.welcome')} 👋
          </h1>
          <p className="text-zinc-500">
            {t('dashboard.subtitle')}
          </p>
        </div>
      </div>

      {/* Grille des vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Message si vide (Tu peux ajouter cette clé dans ton JSON) */}
        {videos.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500">
            {t('dashboard.no_videos') || "No sessions available yet."}
          </div>
        )}

        {/* Boucle sur les vidéos */}
        {videos.map((video) => (
          <Link href={`/dashboard/video/${video.id}`} key={video.id}>
            <Card className="group cursor-pointer border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
              
              <div className="aspect-video relative bg-zinc-100 overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${video.video_url}/mqdefault.jpg`} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                  {video.duration}
                </span>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase tracking-wide">
                    {video.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <BarChart className="w-3 h-3" />
                    {video.level}
                  </div>
                </div>
                
                <h3 className="font-bold text-zinc-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
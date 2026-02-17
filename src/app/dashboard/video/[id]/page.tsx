import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, Share2, AlertCircle } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/custom/video-player" // On importe notre lecteur protégé

// On enlève le "revalidate = 0" qui faisait clignoter la page
export const dynamic = 'force-dynamic'

interface VideoPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  
  const { id } = await params

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (!video || error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
        <AlertCircle className="h-10 w-10 mb-4 text-rose-500" />
        <h2 className="text-xl font-bold">Oups, vidéo introuvable.</h2>
        <Link href="/dashboard">
          <Button variant="link" className="text-rose-600 mt-2">Retour au catalogue</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* --- COLONNE GAUCHE --- */}
      <div className="flex-1 min-w-0">
        
        {/* On utilise le lecteur protégé ici */}
        <VideoPlayer videoId={video.video_url} title={video.title} />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">{video.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
              <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none">
                {video.category}
              </Badge>
              <span>• {video.duration || "20 min"}</span>
              <span>• {video.level}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full hover:text-rose-600 hover:border-rose-200">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:text-rose-600 hover:border-rose-200">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button className="rounded-full bg-rose-600 hover:bg-rose-700">
              Marquer comme vu
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-8">
          <h3 className="font-semibold text-lg mb-4">À propos de cette séance</h3>
          <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
            {video.description || "Aucune description pour cette vidéo."}
          </p>
        </div>
      </div>

      {/* --- COLONNE DROITE --- */}
      <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
        <div className="bg-zinc-50 rounded-xl p-6 text-center border border-zinc-100">
            <p className="text-sm text-zinc-500">D'autres vidéos apparaîtront ici quand tu en auras ajouté plus !</p>
        </div>
      </div>
    </div>
  )
}
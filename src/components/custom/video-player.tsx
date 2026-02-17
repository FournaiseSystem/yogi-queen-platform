"use client"

import React from "react"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
      <iframe 
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`} 
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    </div>
  )
}
"use client"

import { useRouter } from "next/navigation"
import { Plus, Camera } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { getImagesFromDb } from "./actions"

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
]

export default function HomePage() {
  const router = useRouter()
  const [realPhotos, setRealPhotos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLatestPhotos = useCallback(async () => {
    try {
      const data = await getImagesFromDb()
      if (data && data.length > 0) {
        const urls = data.map((img: any) => img.url)
        setRealPhotos(urls)
      }
    } catch (error) {
      console.error("Erro ao carregar fotos do totem:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLatestPhotos()
    const interval = setInterval(fetchLatestPhotos, 120000) // 2 minutos
    return () => clearInterval(interval)
  }, [fetchLatestPhotos])

  const displayPhotos = realPhotos.length > 0 ? realPhotos : FALLBACK_PHOTOS

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden font-sans relative">
      
      <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none transition-opacity duration-1000">
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-[140%] -rotate-12 -translate-x-10 -translate-y-20 animate-scroll"
          style={{ willChange: 'transform' }}
        >
          {[...displayPhotos, ...displayPhotos].map((url, i) => (
            <div 
              key={`${url}-${i}`} 
              className="aspect-[3/4] bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl"
            >
              <img 
                src={url} 
                alt="" 
                loading="lazy"
                className="w-full h-full object-cover opacity-70 animate-pulse-slow" 
                style={{ animationDelay: `${(i % 12) * 0.5}s` }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/30" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-white/30" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/30" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/30" />
      </div>

      <div className="z-30 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
             <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/50 font-black">
               Live Totem Active
             </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono italic">
            NEX.LAB // {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className="relative z-30 flex flex-col items-center">
        <div className="mb-4 py-1 px-4 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
           <span className="text-[9px] uppercase tracking-[0.6em] text-white/60 font-bold">Digital Photography Studio</span>
        </div>

        <h1 className="text-[15vw] md:text-[12vw] font-[900] leading-[0.8] tracking-tighter uppercase italic text-center drop-shadow-[0_0_40px_rgba(0,0,0,1)]">
          PHOTO<br />
          <span className="text-outline text-transparent opacity-80">OPP</span>
        </h1>

        <div className="mt-12 flex flex-col items-center gap-8 w-full max-w-[300px] md:max-w-sm">
          <button 
            onClick={() => router.push("/capture")}
            className="group relative w-full bg-white text-black py-7 md:py-9 transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="relative z-10 flex items-center justify-center gap-4">
              <span className="text-sm md:text-lg font-[950] uppercase tracking-[0.4em]">
                Iniciar
              </span>
              <Camera size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
          </button>
          
          <div className="flex flex-col items-center gap-4">
            <Plus size={18} className="text-white/20 animate-spin-slow" />
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 text-center leading-loose font-bold">
              Toque para capturar sua<br />perspectiva nex.lab
            </p>
          </div>
        </div>
      </div>

      <div className="z-30 flex justify-between items-end">
        <div className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold max-w-[150px]">
          STATED AS AN EXPERIENCE
        </div>
        
        <div className="flex flex-col items-end gap-2 text-right">
           <div className="h-[1px] w-16 bg-white/20" />
           <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black italic">
             Nex.Lab Studio ©
           </p>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
        }
        
        @keyframes scroll {
          0% { transform: rotate(-12deg) translateY(0); }
          100% { transform: rotate(-12deg) translateY(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 100s linear infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .text-outline { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); }
          .animate-scroll { animation-duration: 60s; }
        }
      `}</style>
    </div>
  )
}
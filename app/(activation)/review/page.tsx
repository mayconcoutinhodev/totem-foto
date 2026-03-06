"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import { RefreshCcw, Check, Zap, Clock } from "lucide-react"

export default function ReviewPage() {
  const router = useRouter()
  const photo = useCaptureStore((state) => state.photo)
  const setPhoto: any = useCaptureStore((state) => state.setPhoto)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (!photo) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPhoto(null)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [photo, router, setPhoto])

  if (!photo) return null

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden font-sans relative">
      
      <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/30" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/30" />
      </div>

    

    <div className="z-30 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-black italic">
                        Auto_Reset_Sequence
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 border border-white/10">
                    <Clock size={12} className="text-amber-500" />
                    <span className="text-xs font-mono font-bold text-amber-500">{timeLeft}s</span>
                </div>
            </div>


      <div className="relative z-20 flex flex-col items-center justify-center flex-1">
        
        <div className="relative w-full max-w-[400px] aspect-[9/16] bg-[#050505] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          
          <img 
            src={photo} 
            alt="Result" 
            className="w-full h-full object-cover" 
          />

          <div className="absolute inset-4 pointer-events-none border border-white/5">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />
          </div>
          
    
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[400px] mt-10">
          <button 
            onClick={() => { setPhoto(null); router.push("/capture") }} 
            className="flex items-center justify-center gap-3 bg-transparent border border-white/10 py-6 transition-all group hover:bg-white/5 active:scale-95"
          >
            <RefreshCcw size={16} className="text-white/40 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Refazer</span>
          </button>
          
          <button 
            onClick={() => router.push("/download")} 
            className="flex items-center justify-center gap-3 bg-white text-black py-6 transition-all active:scale-95 hover:bg-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[10px] font-[950] uppercase tracking-[0.4em]">Avançar</span>
            <Check size={18} />
          </button>
        </div>
      </div>

      <div className="z-30 flex justify-between items-end">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
          System_A_02 // Verify
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black italic">
         Nex.Lab Studio ©
        </p>
      </div>

    </div>
  )
}
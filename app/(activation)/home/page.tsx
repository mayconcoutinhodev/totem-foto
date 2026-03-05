"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center text-center space-y-12 animate-in fade-in duration-500 px-6">
      
      <div className="space-y-1">
        <h1 className="text-6xl font-black leading-none tracking-tighter uppercase italic">
          Photo<br />Opp
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          nex.lab system
        </p>
      </div>

      <button 
        onClick={() => router.push("/capture")}
        className="w-full max-w-[280px] bg-[#3a3a3a] hover:bg-[#4a4a4a] py-5 rounded-md font-bold text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg"
      >
        Iniciar
      </button>

    </div>
  )
}
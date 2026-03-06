"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import { Zap, ArrowRight, Clock } from "lucide-react"

export default function DownloadPage() {
    const router = useRouter()
    const photo = useCaptureStore((state) => state.photo)
    const qrCode = useCaptureStore((state) => state.qrCode)
    const setPhoto: any = useCaptureStore((state) => state.setPhoto)
    const setQrCode: any = useCaptureStore((state) => state.setQrCode)

    const [timeLeft, setTimeLeft] = useState(30) 

    useEffect(() => {
        if (!photo) {
            router.push("/home")
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setPhoto(null)
                    setQrCode(null)
                    router.push("/home")
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [photo, router])

    if (!photo) return null

    return (
        <div className="min-h-screen w-full  text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden font-mono relative  bg-[#000]">
            <div className="absolute inset-4 md:inset-8 border border-white/3 pointer-events-none z-50">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
            </div>
            <div className="z-30 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold italic">
                            Transfer_Link_Ready
                        </p>
                    </div>
                    <span className="text-[8px] text-white/10 tracking-[0.3em] uppercase">Protocol: encrypted_qr</span>
                </div>
                <div className="flex items-center gap-3 bg-white/3 px-4 py-2 border border-white/10 backdrop-blur-sm">
                    <Clock size={12} className="text-amber-500" />
                    <span className="text-sm font-bold text-amber-500 tabular-nums">{timeLeft}s</span>
                </div>
            </div>
            <div className="relative z-20 flex flex-col items-center justify-center flex-1">
                <div className="relative w-full max-w-95 aspect-9/16 bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden group">
                    <img
                        src={photo}
                        alt="Capture"
                        className="w-full h-full object-cover opacity-40 grayscale-[0.5] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
                    {qrCode && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 animate-in zoom-in fade-in duration-700">
                            <div className="bg-white p-1 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />
                                <div className="w-48 h-48 md:w-55 md:h-55 bg-white flex items-center justify-center">
                                    <img
                                        src={qrCode}
                                        alt="QR Code Download"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 text-center bg-black/60 backdrop-blur-md px-6 py-3 border border-white/10">
                                <p className="text-[10px] font-mono uppercase  text-white">
                                    Aponte a Câmera do smart phone
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-4 pointer-events-none border border-white/5">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />
                    </div>
                </div>
                <div className="mt-10 w-full max-w-95">
                    <button
                        onClick={() => router.push("/final")}
                        className="group relative w-full bg-white text-black py-6 transition-all active:scale-95 shadow-xl hover:bg-gray-200 overflow-hidden"
                    >
                        <div className="flex items-center justify-center gap-4 relative z-10">
                            <span className="text-[11px] font-black uppercase tracking-[0.5em]">Próximo Passo</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                    <p className="text-center mt-4 text-[8px] text-white/20 uppercase tracking-[0.4em]">Sessão expira em {timeLeft} segundos</p>
                </div>
            </div>
            <div className="z-30 flex justify-between items-end border-tpt-6">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
                    System_A_03 // QR_Link
                </p>
                <div className="flex flex-col items-end">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black italic">
                        Nex.Lab Studio <span className="not-italic opacity-30">©</span>
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent h-40 w-full animate-scan" />
      
        </div>
    )
}
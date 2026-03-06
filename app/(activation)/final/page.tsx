"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import { Zap, Clock } from "lucide-react"

export default function FinalPage() {
    const router = useRouter()
    const qrCode = useCaptureStore((state) => state.qrCode)
    const setPhoto: any = useCaptureStore((state) => state.setPhoto)
    const setQrCode: any = useCaptureStore((state) => state.setQrCode)

    const [timeLeft, setTimeLeft] = useState(10)

    const handleFinishAll = () => {
        setPhoto(null)
        setQrCode(null)
        router.push("/home")
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    handleFinishAll()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

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

                <div className="relative w-full max-w-100 aspect-9/16 bg-[#050505] border border-white/10 flex flex-col items-center p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                    <div className="flex items-center gap-1 mb-10 opacity-50">
                        <span className="font-black text-xl italic tracking-tighter uppercase">NEX</span>
                        <span className="text-[10px] font-bold">.LAB</span>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-[950] italic uppercase tracking-tighter mb-4 text-white">
                            Obrigado!
                        </h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] leading-relaxed">
                            Escaneie o código abaixo<br />para salvar sua foto.
                        </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full mb-8">
                        <div className="w-full aspect-square bg-white rounded-sm p-6 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] relative">
                            {qrCode ? (
                                <img
                                    src={qrCode}
                                    alt="QR Code"
                                    className="w-full h-full object-contain animate-in zoom-in duration-700"
                                />
                            ) : (
                                <div className="text-black/20 font-black text-[10px] tracking-[0.4em] uppercase italic">Syncing...</div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleFinishAll}
                        className="w-full bg-white text-black py-6 rounded-sm font-[950] uppercase text-[11px] tracking-[0.4em] shadow-2xl active:scale-95 transition-all hover:bg-gray-200"
                    >
                        Encerrar Agora
                    </button>

                    <div className="absolute inset-4 pointer-events-none border border-white/5">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />
                    </div>
                </div>
            </div>
            <div className="z-30 flex justify-between items-end">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
                    Terminal_ID // 0x4FF2
                </p>
                <div className="flex flex-col items-end gap-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black italic">
                        Nex.Lab Studio ©
                    </p>
                </div>
            </div>
        </div>
    )
}
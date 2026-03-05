"use client"

import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore" 
import { useEffect, useState } from "react"

export default function DownloadPage() {
    const router = useRouter()
    const photo = useCaptureStore((state) => state.photo)
    const qrCode = useCaptureStore((state) => state.qrCode) 
    
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                router.push("/final")
            }, 3000) 
            return () => clearTimeout(timer)
        }
    }, [showModal, router])

    if (!photo) return null

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[#1a1a1a] p-4 overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-87.5 md:max-w-112.5 max-h-[90vh] px-2">
                
                <h2 className="text-lg font-bold uppercase tracking-tighter mb-4 text-gray-400 shrink-0">
                    Aponte a Câmera
                </h2>

                <div className="relative w-full aspect-9/16 bg-black shadow-inner overflow-hidden border border-gray-300 flex-1 min-h-0">
                    <img 
                        src={photo} 
                        alt="Foto capturada" 
                        className="w-full h-full object-contain" 
                    />

                    {qrCode && (
                        <div className="absolute bottom-10 right-4 w-[35%] min-w-35 bg-white p-2 rounded-lg shadow-2xl z-10 animate-in slide-in-from-right-5">
                            <p className="text-[8px] font-black uppercase mb-1 text-center text-black tracking-tighter">
                                Baixe sua foto
                            </p>
                            <div className="aspect-square bg-white flex items-center justify-center">
                                <img 
                                    src={qrCode} 
                                    alt="QR Code para Download" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                    {showModal && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                            <div className="bg-white w-full max-w-65 p-8 rounded-xl text-center shadow-2xl">
                                <h2 className="text-2xl font-black uppercase italic text-[#5a5a5a] mb-2">Pronto!</h2>
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                                    Obrigado por participar!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => !showModal && setShowModal(true)}
                    className="w-full py-4 rounded-md font-bold uppercase text-[10px] tracking-[0.2em] mt-6 bg-white text-black active:scale-95 transition-all"
                >
                    Finalizar
                </button>
            </div>
        </div>
    )
}
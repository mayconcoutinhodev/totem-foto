"use client"

import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import { useEffect, useState } from "react"

export default function DownloadPage() {
    const router = useRouter()
    const photo = useCaptureStore((state) => state.photo)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                router.push("/final")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [showModal, router])

    if (!photo) return null

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[#1a1a1a] p-4 overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-[350px] md:max-w-[450px] max-h-[90vh] px-2 animate-in fade-in duration-500">
                
                <h2 className="text-lg font-bold uppercase tracking-tighter mb-4 text-gray-400 shrink-0">
                    Aponte a Câmera
                </h2>

                {/* Container da Foto */}
                <div className="relative w-full aspect-[9/16] bg-black shadow-inner overflow-hidden border border-gray-300 flex-1 min-h-0">
                    <img 
                        src={photo} 
                        alt="Final" 
                        className="w-full h-full object-contain" 
                    />

                    {/* QR CODE RESPONSIVO E MAIOR */}
                    <div className="absolute bottom-20 right-4 w-[35%] min-w-[160px] max-w-[140px] bg-[#F5F5F5] p-3 rounded-lg shadow-2xl border border-gray-300 z-10 animate-in slide-in-from-right-5">
                        <p className="text-[7px] font-black uppercase mb-2 text-center text-gray-500 tracking-tighter">
                            Fazer Download
                        </p>
                        <div className="aspect-square bg-white border  rounded-lg border-gray-200 flex items-center justify-center p-1">
                            {/* O QR Code agora ocupa 100% deste container que é proporcional à foto */}
                            <div className="w-full h-full border rounded-lg border-gray-200 flex items-center justify-center">
                                <span className="text-[10px] text-gray-300 font-bold uppercase italic">QR</span>
                            </div>
                        </div>
                    </div>

                    {/* MODAL DE SUCESSO */}
                    {showModal && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300 z-50">
                            <div className="bg-white w-full max-w-[260px] p-8 rounded-xl text-center shadow-2xl animate-in zoom-in duration-300">
                                <h2 className="text-2xl font-black uppercase italic text-[#5a5a5a] mb-2">Obrigado!</h2>
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                                    Sua foto está<br />sendo enviada.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => !showModal && setShowModal(true)}
                    disabled={showModal}
                    className={`w-full py-4 rounded-md font-bold uppercase text-[10px] tracking-[0.2em] mt-6 shrink-0 shadow-lg transition-all ${
                        showModal ? "bg-gray-700 opacity-50" : "bg-[#5a5a5a] text-white active:scale-95"
                    }`}
                >
                    {showModal ? "Processando..." : "Finalizar"}
                </button>
            </div>
        </div>
    )
}
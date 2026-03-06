"use client"

import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"

export default function ReviewPage() {
  const router = useRouter()
  const photo = useCaptureStore((state) => state.photo)
  const setPhoto : any = useCaptureStore((state) => state.setPhoto)

  if (!photo) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-500">Nenhuma foto encontrada...</p>
        <button
          onClick={() => router.push("/capture")}
          className="text-sm underline"
        >
          Voltar para a câmera
        </button>
      </div>
    )
  }

  const handleRetake = () => {
    setPhoto(null)
    router.push("/capture")
  }

  const handleApprove = () => {
    router.push("/download")
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full  p-4 overflow-hidden" >
      <div className="flex flex-col items-center w-full max-w-87.5 md:max-w-112.5 max-h-[90vh] px-2 ">
        <h2 className="text-xl font-bold uppercase tracking-tighter mb-6 text-gray-400 shrink-0">
          Revise sua Foto
        </h2>
        <div className="relative w-full aspect-9/16 bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/20 shadow-2xl flex-1 min-h-0">
          <img src={photo} alt="Capture" className="w-full h-full object-contain" />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8 shrink-0">
          <button
            onClick={handleRetake}
            className="bg-transparent border border-white/10 py-4 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Refazer
          </button>
          <button
            onClick={handleApprove}
            className="bg-[#3a3a3a] hover:bg-[#4a4a4a] py-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
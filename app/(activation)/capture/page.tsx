"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import CameraCapture from "../../../components/CameraCapture"
import { Loader2, Camera, Zap, Clock } from "lucide-react"

export default function CapturePage() {
  const router = useRouter()
  const setPhoto = useCaptureStore((state) => state.setPhoto)
  const setQrCode = useCaptureStore((state) => state.setQrCode)

  const [countdown, setCountdown] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const cameraRef = useRef<{ takePhoto: () => string | null }>(null)

  const [timeLeft, setTimeLeft] = useState(30) 
  const photo = useCaptureStore((state) => state.photo)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPhoto("")
          setQrCode("")
          clearInterval(timer)
          router.push("/home")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [photo, router])

  const base64ToFile = (base64: string, filename: string) => {
    const [header, data] = base64.split(',')
    const mime = header.match(/:(.*?);/)?.[1]
    const bstr = atob(data)
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new File([u8arr], filename, { type: mime })
  }

  const startSequence = () => {
    if (countdown !== null || isUploading) return

    let count = 3
    setCountdown(count)

    const timer = setInterval(async () => {
      count -= 1
      setCountdown(count > 0 ? count : null)

      if (count <= 0) {
        clearInterval(timer)
        executeCapture()
      }
    }, 1000)
  }

  const executeCapture = async () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 150)

    const imageData = cameraRef.current?.takePhoto()

    if (imageData) {
      setIsUploading(true)
      try {
        const file = base64ToFile(imageData, "capture.png")
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          setPhoto(imageData)
          setQrCode(data.qrCode)
          router.push("/review")
        } else {
          console.error("Erro na resposta do servidor")
          setIsUploading(false)
        }
      } catch (error) {
        console.error("Erro na requisição:", error)
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden font-sans relative">
      <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/30" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/30" />
      </div>
      <div className="z-30 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isUploading ? 'bg-amber-500' : 'bg-red-600'} animate-pulse`} />
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-black">
            {isUploading ? 'Processing_Data' : 'Live_Capture_Feed'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/3 px-4 py-2 border border-white/10 backdrop-blur-sm">
          <Clock size={12} className="text-amber-500" />
          <span className="text-sm font-bold text-amber-500 tabular-nums">{timeLeft}s</span>
        </div>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center flex-1">
        <div className="relative w-full max-w-100 aspect-9/16 bg-[#050505] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
          <CameraCapture ref={cameraRef} />
          {showFlash && (
            <div className="absolute inset-0 bg-white z-100" />
          )}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/3 w-full h-px bg-white" />
            <div className="absolute top-2/3 w-full h-px bg-white" />
            <div className="absolute left-1/3 h-full w-px bg-white" />
            <div className="absolute left-2/3 h-full w-px bg-white" />
          </div>
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-60">
              <span className="text-9xl font-[950] italic text-white animate-ping">
                {countdown}
              </span>
            </div>
          )}
        </div>
        <div className="mt-10 w-full max-w-75">
          {!countdown && !isUploading ? (
            <button
              onClick={startSequence}
              className="group relative w-full bg-white text-black py-6 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className="text-[11px] font-[950] uppercase tracking-[0.4em]">
                  Iniciar Captura
                </span>
                <Camera size={18} />
              </div>
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <Loader2 className="animate-spin text-white/40" size={32} />
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-black">
                {isUploading ? 'Enviando_Ao_Servidor' : 'Prepare-se'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="z-30 flex justify-between items-end">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
          System_A_01 // Capture
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black italic">
          Nex.Lab Studio ©
        </p>
      </div>

    </div>
  )
}
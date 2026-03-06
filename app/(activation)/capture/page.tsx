"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import CameraCapture from "../../../components/CameraCapture"

export default function CapturePage() {
  const router = useRouter()
  const setPhoto = useCaptureStore((state) => state.setPhoto)
  const setQrCode = useCaptureStore((state) => state.setQrCode)

  const [countdown, setCountdown] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const cameraRef = useRef<{ takePhoto: () => string | null }>(null)

  const base64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new File([u8arr], filename, { type: mime })
  }

  const startSequence = () => {
    let count = 3
    setCountdown(count)

    const timer = setInterval(async () => {
      count -= 1
      setCountdown(count > 0 ? count : null)

      if (count === 0) {
        clearInterval(timer)
        const imageData = cameraRef.current?.takePhoto()

        if (imageData) {
          try {
            setIsUploading(true)

            const file = base64ToFile(imageData, "photo.png")
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const contentType = response.headers.get("content-type");

            if (!response.ok || !contentType?.includes("application/json")) {
              const text = await response.text();
              console.error("ERRO CRÍTICO DO SERVIDOR:");
              console.log("Status:", response.status);
              console.log("Conteúdo recebido:", text.substring(0, 500));

              setIsUploading(false);
              return;
            }

            const data = await response.json();
            if (data.success) {
              setPhoto(imageData)
              setQrCode(data.qrCode)
              router.push("/review")
            }
          } catch (error) {
            console.error("Erro na requisição:", error)
            alert("Falha na conexão com o servidor.")
          } finally {
            setIsUploading(false)
          }
        }
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-87.5 md:max-w-112.5 max-h-[90vh] px-2">
      <div className="relative w-full aspect-9/16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">

        <CameraCapture ref={cameraRef} />

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-60">
            <span className="text-white font-bold animate-bounce">Processando...</span>
          </div>
        )}

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50 pointer-events-none">
            <span className="text-7xl font-black italic text-white drop-shadow-2xl animate-pulse">
              {countdown}
            </span>
          </div>
        )}

        {!countdown && !isUploading && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={startSequence}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <div className="w-16 h-16 bg-white rounded-full" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
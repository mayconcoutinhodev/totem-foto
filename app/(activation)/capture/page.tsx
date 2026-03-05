"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"
import CameraCapture from "../../../components/CameraCapture"

export default function CapturePage() {
  const router = useRouter()
  const setPhoto = useCaptureStore((state) => state.setPhoto)
  const [countdown, setCountdown] = useState<number | null>(null)
  const cameraRef = useRef<{ takePhoto: () => string | null }>(null)

  const startSequence = () => {
    let count = 3
    setCountdown(count)

    const timer = setInterval(() => {
      count -= 1
      setCountdown(count > 0 ? count : null)

      if (count === 0) {
        clearInterval(timer)
        const imageData = cameraRef.current?.takePhoto()
        if (imageData) {
          setPhoto(imageData)
          router.push("/review")
        }
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
      <div className="relative w-full aspect-[9/16] rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
        
        <CameraCapture ref={cameraRef} />

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50 pointer-events-none">
            <span className="text-7xl font-black italic text-white drop-shadow-2xl animate-pulse">
              {countdown}
            </span>
          </div>
        )}

        {!countdown && (
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
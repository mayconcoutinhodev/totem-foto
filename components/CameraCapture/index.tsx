"use client"
import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from "react"

const CameraCapture = forwardRef((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = "/assets/img/logo.png" 
    img.crossOrigin = "anonymous" 
    img.onload = () => setLogoImg(img)
    img.onerror = () => console.error("Erro ao carregar a logo em /public/assets/img/logo.png")

    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: "user", 
        width: { ideal: 1920 }, 
        height: { ideal: 1080 } 
      } 
    })
    .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream })
  }, [])

  useImperativeHandle(ref, () => ({
    takePhoto: () => {
      const canvas = canvasRef.current
      const video = videoRef.current
      if (!canvas || !video) return null

      const ctx = canvas.getContext("2d")
      if (!ctx) return null

      canvas.width = 1080
      canvas.height = 1920

      const imgWidth = video.videoWidth
      const imgHeight = video.videoHeight
      const canvasRatio = canvas.width / canvas.height
      const imgRatio = imgWidth / imgHeight

      let drawWidth, drawHeight, offsetX, offsetY

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio
        drawHeight = canvas.height
        offsetX = -(drawWidth - canvas.width) / 2
        offsetY = 0
      } else {
        drawWidth = canvas.width
        drawHeight = canvas.width / imgRatio
        offsetX = 0
        offsetY = -(drawHeight - canvas.height) / 2
      }
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)

      ctx.fillStyle = "#EDEDED"
      ctx.fillRect(0, 0, canvas.width, 280)
      ctx.fillRect(0, canvas.height - 180, canvas.width, 180)

      if (logoImg) {
        const logoWidth = 220 
        const logoHeight = (logoImg.height * logoWidth) / logoImg.width
        const padding = 60
        ctx.drawImage(logoImg, padding, (280 - logoHeight) / 2, logoWidth, logoHeight)
      }

      ctx.fillStyle = "#000"
      ctx.textAlign = "right"
      ctx.font = "30px sans-serif"
      ctx.fillText("we make tech simple_", canvas.width - 60, 160)

      ctx.textAlign = "center"
      ctx.fillStyle = "#666666"
      ctx.font = "24px sans-serif"
      ctx.fillText(
        "we make tech simple_", 
        canvas.width / 2, 
        canvas.height - 80
      )

      return canvas.toDataURL("image/png")
    }
  }))

  return (
    <div className="w-full h-full relative bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
})

CameraCapture.displayName = "CameraCapture"
export default CameraCapture
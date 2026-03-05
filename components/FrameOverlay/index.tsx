"use client"

export default function FrameOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col pointer-events-none z-20">
      {/* Header da Moldura (Branco) */}
      <div className="w-full h-[15%] bg-white border-b border-gray-300 flex items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tighter leading-none">NEX</span>
          <span className="text-[10px] text-gray-400">.lab</span>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-gray-400">
          we make tech simple_
        </span>
      </div>

      {/* Espaço Vazio (Onde a câmera aparece) */}
      <div className="flex-1 bg-transparent border-x-[15px] border-white/10" />

      {/* Footer da Moldura (Branco) */}
      <div className="w-full h-[10%] bg-white border-t border-gray-300 flex items-center justify-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400">
          we make tech simple_
        </span>
      </div>
    </div>
  )
}
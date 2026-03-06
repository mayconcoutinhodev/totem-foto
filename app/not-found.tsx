"use client"; // <--- Esta linha resolve o erro de 'styled-jsx'

import Link from 'next/link'
import Image from 'next/image'
import Logo from "../public/assets/img/logo.png"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#050505] text-white px-6 overflow-hidden font-mono">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-white/[0.02] to-transparent animate-scanline pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">

        <div className="mb-8 flex items-center gap-3 px-4 py-1 border border-red-500/30 bg-red-500/5 text-red-500 text-[10px] uppercase tracking-[0.2em] animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
          System Critical: Resource Not Found
        </div>

        <div className="relative group">
          <h1 className="text-[10rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1a1a1a] select-none">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[15rem] font-black text-red-600/10 blur-xl -z-10 animate-pulse">
            404
          </span>
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-[0.4em] text-gray-400">
            [ Localização Inválida ]
          </h2>
          <p className="text-[11px] leading-relaxed text-gray-600 uppercase tracking-[0.25em]">
            A requisição ao servidor <span className="text-white">NEX-LAB-SYS</span> falhou.
            O diretório solicitado foi movido ou deletado dos arquivos centrais.
          </p>
        </div>

        <div className="mt-12 group">
          <Link
            href="/home"
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden border border-white/10 bg-transparent transition-all hover:bg-white hover:text-black active:scale-95"
          >
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em]">
              Reiniciar Protocolo Home
            </span>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="opacity-40 grayscale hover:opacity-100 transition-opacity">
          <Image src={Logo} alt="Nex Lab Logo" width={80} height={20} />
        </div>
        <p className="text-[9px] text-gray-800 uppercase tracking-[0.5em] hidden md:block italic">
          Nex Lab System v2.0.4 // Unauthorized Access Detected
        </p>
      </div>
    </div>
  )
}
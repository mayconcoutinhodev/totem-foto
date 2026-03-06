import Link from 'next/link'
import Image from 'next/image'
import Logo from "../public/assets/img/logo.png"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white px-6">
      


      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-9xl font-black tracking-tighter text-[#1a1a1a] select-none">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-300">
            Página não encontrada
          </h2>
          <p className="text-sm text-gray-500 max-w-xs">
            O recurso que você está tentando acessar não existe ou foi movido.
          </p>
        </div>

        <div className="mt-8">
          <Link 
            href="/home" 
            className="bg-[#2a2a2a] hover:bg-[#333333] border border-white/5 text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.95]"
          >
            Voltar para Home
          </Link>
        </div>
      </div>

      <p className="absolute bottom-12 text-[10px] text-gray-700 uppercase tracking-[0.3em]">
        Nex Lab System • Error Code 404
      </p>
    </div>
  )
}
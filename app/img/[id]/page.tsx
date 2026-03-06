import { prisma } from "../../../lib/prisma";
import Link from 'next/link';

export default async function ImgPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const image = await prisma.image.findUnique({
    where: { id: id },
  }).catch(() => null);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white px-6 overflow-hidden font-mono ">

      {/* Background Tech Elements */}
      <div className="absolute inset-0 z-0 opacity-10 "
        style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full max-w-lg " >
        {image ? (
          /* ESTADO: ARQUIVO ENCONTRADO (VISUAL LABORATÓRIO) */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header de Identificação do Arquivo */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4 ">
              <div>

                <h1 className="text-xl font-black italic tracking-tighter uppercase mt-10">
                  NEX<span className="text-gray-500">.LAB</span> <span className="text-[10px] not-italic ml-2 font-mono text-white/40"></span>
                </h1>
              </div>
              <span className="text-[9px] text-gray-600 mb-1 tracking-widest uppercase">Verified // 2026</span>
            </div>

            {/* Container da Imagem com Aspecto de 'Viewfinder' */}
            <div className="relative p-2 border border-white/5 bg-[#0a0a0a] shadow-2xl">
              {/* Cantoneiras de Câmera */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 -translate-x-1 -translate-y-1" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 -translate-x-1 translate-y-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 translate-x-1 translate-y-1" />

              <img
                src={image.url}
                alt="Capture Data"
                className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Ações de Download */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              <a
                href={image.url}
                download={image.filename || `nexlab-${id}.jpg`}
                className="relative flex items-center justify-center bg-white text-black py-5 group overflow-hidden transition-transform active:scale-[0.98]"
              >
                <span className="relative z-10 font-black uppercase tracking-[0.3em] text-[11px]">
                  Baixar Arquivo 
                </span>
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <p className="text-center text-[9px] text-gray-600 uppercase tracking-[0.4em] pt-2">
                Digital Memory Storage System // [ Access Granted ]
              </p>
            </div>
          </div>
        ) : (
          /* ESTADO: ERRO / NÃO ENCONTRADO */
          <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 border-2 border-red-500/20 flex items-center justify-center rounded-full bg-red-500/5">
              <span className="text-red-500 text-2xl font-black">!</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                Falha na Localização
              </h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] max-w-[280px] leading-relaxed">
                O registro solicitado não foi encontrado no banco de dados <span className="text-red-500/50">NEX.LAB</span>.
              </p>
            </div>

            <Link
              href="/"
              className="mt-4 text-[10px] text-gray-400 border border-white/10 px-6 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-widest"
            >
              Voltar ao Início
            </Link>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="absolute bottom-8 left-0 w-full px-10 flex justify-between items-center opacity-30">
        <div className="text-[8px] uppercase tracking-[0.3em]">Nex Lab Corp.</div>
        <div className="h-[1px] flex-1 mx-4 bg-white/10" />
        <div className="text-[8px] uppercase tracking-[0.3em]">Status: Online</div>
      </div>
    </div>
  );
}
import { prisma } from "../../../lib/prisma";

export default async function ImgPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Tentamos buscar a imagem
  const image = await prisma.image.findUnique({
    where: { id: id },
  }).catch(() => null); // Evita crash se o ID for inválido

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] p-4 font-sans text-center">
      {image ? (
        /* ESTADO: FOTO ENCONTRADA */
        <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="mb-4 flex items-center justify-center gap-1">
             <span className="font-black text-xl italic tracking-tighter text-black">NEX</span>
             <span className="text-[8px] text-gray-400 font-bold uppercase">.lab</span>
          </div>

          <img 
            src={image.url} 
            alt="Sua foto capturada" 
            className="w-full h-auto rounded-lg shadow-sm border border-gray-100"
          />

          <div className="mt-6 space-y-3">
            <a 
              href={image.url} 
              download={image.filename}
              className="block w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-lg"
            >
              Baixar Foto
            </a>
            <p className="text-gray-400 text-[9px] uppercase tracking-widest">
              Compartilhando momentos
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-xs w-full bg-[#252525] p-10 rounded-2xl border border-white/5 shadow-2xl animate-in fade-in duration-700">
          <div className="text-4xl mb-4">📸</div>
          <h2 className="text-white font-black uppercase italic text-xl mb-2 tracking-tighter">
            Foto não encontrada
          </h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
            O link pode ter expirado ou <br /> a foto ainda está sendo processada. 
   
          </p>
        </div>
      )}

      {/* Footer discreto */}
      <p className="mt-8 text-white/20 text-[8px] uppercase tracking-[0.5em]">
        Nex.Lab Eventos © 2026
      </p>
    </div>
  );
}
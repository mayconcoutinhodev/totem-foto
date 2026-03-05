"use client"
import { useRouter } from "next/navigation"
import { useCaptureStore } from "../../../store/useCaptureStore"

export default function FinalPage() {
    const router = useRouter()
    const resetPhoto = useCaptureStore((state) => state.resetPhoto)

    const handleFinishAll = () => {
        resetPhoto()
        router.push("/home")
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[#1a1a1a] p-4 overflow-hidden font-sans">
            <div className="relative w-full max-w-95 max-h-[92vh] aspect-9/16 bg-white flex flex-col shadow-2xl rounded-xl overflow-hidden p-8">
                <div className="flex flex-col items-center justify-center pt-4 mb-8 shrink-0">
                    <div className="flex items-center gap-1">
                        <span className="font-black text-2xl italic tracking-tighter text-black uppercase">NEX</span>
                        <span className="text-[10px] text-gray-400 font-bold">.lab</span>
                    </div>
                </div>
                <div className="text-center mb-8 shrink-0">
                    <h2 className="text-3xl font-black uppercase italic text-[#333] mb-2 tracking-tighter">Obrigado!</h2>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                        Lorem ipsum dolor sit<br />amet consectetur.
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 w-full mb-8">
                    <div className="w-full aspect-square bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl p-6 flex items-center justify-center relative">
                        <div className="w-full h-full border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-gray-200 uppercase tracking-widest text-sm italic">QR CODE</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleFinishAll}
                    className="w-full bg-[#5a5a5a] text-white py-5 rounded-md font-bold uppercase text-[11px] tracking-[0.3em] shrink-0 shadow-xl active:scale-95 transition-all"
                >
                    Finalizar
                </button>
            </div>
        </div>
    )
}
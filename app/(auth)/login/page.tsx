"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ShieldCheck, Loader2 } from "lucide-react"
import Logo from "../../../public/assets/img/logo.png"
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (res?.error) {
            setError("Falha na autenticação. Verifique os dados.")
            setIsLoading(false)
        } else {
            router.push("/") 
        }
    }

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
            <div className="absolute inset-8 md:inset-12 border border-white/5 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/20" />
            </div>
            <div className="relative z-20 w-full max-w-[400px] flex flex-col items-center">
                <div className="mb-12 flex flex-col items-center gap-6 text-center">
                    <Image 
                        src={Logo} 
                        width={180} 
                        height={60} 
                        alt="Nex.lab" 
                        priority 
                        className="brightness-200" 
                    />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-[1000] italic uppercase tracking-tighter leading-none">
                            System <span className="text-outline-thin text-transparent">Login</span>
                        </h1>
                        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black">
                            Acesso Restrito ao Operador
                        </p>
                    </div>
                </div>
                <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
                    <div className="relative group border border-white/10 bg-[#0a0a0a] transition-all focus-within:border-white/40">
                        <label className="absolute top-3 left-4 text-[8px] uppercase tracking-[0.3em] text-white/40 font-black transition-colors group-focus-within:text-white">
                            User_ID / Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-8 pb-4 outline-none text-sm font-bold tracking-widest placeholder:text-white/5"
                            placeholder="OPERATOR@NEXLAB.COM"
                            required
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                    </div>
                    <div className="relative group border border-white/10 bg-[#0a0a0a] transition-all focus-within:border-white/40">
                        <label className="absolute top-3 left-4 text-[8px] uppercase tracking-[0.3em] text-white/40 font-black transition-colors group-focus-within:text-white">
                            Access_Key
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-8 pb-4 outline-none text-sm font-bold tracking-widest"
                            required
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                    </div>
                    {error && (
                        <div className="bg-red-950/20 border border-red-500/30 p-4 animate-in fade-in zoom-in duration-300">
                            <p className="text-red-500 text-[9px] uppercase tracking-widest text-center font-black">
                                {error}
                            </p>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group cursor-pointer relative w-full bg-white text-black py-3 mt-4 transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-[11px] font-[1000] uppercase tracking-[0.4em] pl-1">Autenticar Sessão</span>
                                    <ShieldCheck size={18} />
                                </>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>
                <p className="mt-12 text-[8px] text-white/10 uppercase tracking-[0.5em] font-bold text-center">
                    Authorized Personnel Only<br />
                    Encrypted Connection // 256-Bit
                </p>
            </div>
        </div>
    )
}
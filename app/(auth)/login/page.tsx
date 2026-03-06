"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
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
            setError("Email ou senha inválidos")
            setIsLoading(false)
        } else {
            router.push("/")
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] text-white">
            <div className="flex w-full max-w-105 flex-col items-center px-6">

                <div className="mb-12">
                    <Image
                        src={Logo}
                        width={180}
                        height={60}
                        alt="Logo empresa nex.lab"
                        priority
                        className="brightness-300"
                    />
                </div>

                <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">

                    <div className="relative w-full bg-[#1a1a1a] rounded-sm transition-all focus-within:ring-1 focus-within:ring-gray-500">
                        <label className="absolute top-2 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold pointer-events-none">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-7 pb-3 text-base outline-none text-white"
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 mt-2">
                            <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>

                    <div className="relative w-full bg-[#1a1a1a] rounded-sm transition-all focus-within:ring-1 focus-within:ring-gray-500">
                        <label className="absolute top-2 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold pointer-events-none">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-7 pb-3 text-base outline-none text-white"
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 mt-2">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full px-1 text-xs text-gray-500">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                            <input
                                type="checkbox"
                                className="w-3.5 h-3.5 rounded-sm border-gray-700 bg-transparent accent-gray-500"
                            />
                            <span className="mt-0.5">Lembrar acesso</span>
                        </label>
                        <button type="button" className="hover:text-gray-300 transition-colors">
                            Esqueci minha senha
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 py-2 rounded-sm">
                            <p className="text-center text-xs text-red-500 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#2a2a2a] hover:bg-[#333333] border border-white/5 text-white py-4 rounded-md font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? "Processando..." : "Entrar"}
                        </button>
                    </div>

                </form>

                <p className="mt-12 text-[10px] text-gray-600 uppercase tracking-[0.3em]">
                    &copy; 2026 Nex Lab System
                </p>
            </div>
        </div>
    )
}
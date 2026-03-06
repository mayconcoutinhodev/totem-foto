"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
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
            setError("Credenciais inválidas. Tente novamente.")
            setIsLoading(false)
        } else {

            router.push("/")

        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] text-white">
            <div className="flex w-full max-w-sm flex-col items-center px-6">

                <div className="mb-12">
                    <Image src={Logo} width={180} height={60} alt="Nex.lab" priority className="brightness-200" />
                </div>

                <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">
                    <div className="relative w-full bg-[#1a1a1a] rounded-sm focus-within:ring-1 focus-within:ring-gray-600">
                        <label className="absolute top-2 left-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-7 pb-3 outline-none"
                            required
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 w-5 h-5 text-gray-600" />
                    </div>

                    <div className="relative w-full bg-[#1a1a1a] rounded-sm focus-within:ring-1 focus-within:ring-gray-600">
                        <label className="absolute top-2 left-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Senha</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent pl-4 pr-12 pt-7 pb-3 outline-none"
                            required
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 w-5 h-5 text-gray-600" />
                    </div>

                    {error && <p className="text-red-500 text-[10px] uppercase text-center font-bold">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Autenticando..." : "Entrar no Sistema"}
                    </button>
                </form>
            </div>
        </div>
    )
}
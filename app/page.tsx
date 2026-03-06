"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../public/assets/img/logo.png"
import { LogOut, Play } from "lucide-react"

export default function WelcomePage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white px-6">
            <div className="mb-12 animate-pulse">
                <Image
                    src={Logo}
                    width={220}
                    height={80}
                    alt="Logo Nex.lab"
                    priority
                    className="brightness-200"
                />
            </div>

            <div className="text-center mb-12 space-y-2">
                <h1 className="text-2xl font-light uppercase tracking-[0.4em] text-gray-300">
                    Bem-vindo ao Sistema
                </h1>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                    Selecione uma opção para continuar
                </p>
            </div>

            <div className="flex flex-col w-full max-w-xs gap-4">
                <Link
                    href="/home"
                    className="group flex items-center justify-between bg-white text-black px-6 py-5 rounded-sm font-bold uppercase tracking-widest transition-all hover:bg-gray-200 active:scale-[0.98]"
                >
                    <span>Iniciar App</span>
                    <Play className="w-5 h-5 fill-black group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 text-gray-400 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all hover:bg-[#222] hover:text-white"
                >
                    <span>Sair da Conta</span>
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
            <p className="absolute bottom-10 text-[9px] text-gray-700 uppercase tracking-[0.5em]">
                Nex Lab System • v1.0.4
            </p>
        </div>
    )
}
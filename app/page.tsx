"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../public/assets/img/logo.png"
import { LogOut, Play, LayoutDashboard } from "lucide-react"

export default function WelcomePage() {
    const { data: session } = useSession()
    const userRole = (session?.user as any)?.role

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white">

            <div className="mb-12">
                <Image src={Logo} width={200} height={70} alt="Logo Nex.lab" className="brightness-200" />
            </div>

            <div className="text-center mb-10 space-y-2">
                <h1 className="text-xl font-light uppercase tracking-[0.3em] text-gray-400">
                    Olá, {session?.user?.name?.split(' ')[0]}
                </h1>
                <p className="text-[9px] text-gray-600 uppercase tracking-widest">Selecione o módulo de operação</p>
            </div>

            <div className="flex flex-col w-full max-w-xs gap-4">
                {userRole === "PROMOTOR" &&

                    <Link
                        href="/home"
                        className="group flex items-center justify-between bg-white text-black px-6 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        <span>Iniciar Totem</span>
                        <Play className="w-5 h-5 fill-black" />
                    </Link>
                }
                {userRole === "ADMIN" && (
                    <Link
                        href="/admin"
                        className="group flex items-center justify-between bg-gray-200 text-black px-6 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        <span> Painel Administrativo </span>
                        <Play className="w-5 h-5 fill-black" />
                    </Link>
                )
                }

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center justify-between bg-transparent border border-white/5 text-gray-600 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-[9px] hover:text-white transition-all mt-4"
                >
                    <span>Encerrar Sessão</span>
                    <LogOut className="w-4 h-4" />
                </button>

            </div>

            <p className="absolute bottom-8 text-[8px] text-gray-800 uppercase tracking-[0.5em]">
                Nex Lab • Industrial Grade System
            </p>
        </div>
    )
}
"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../public/assets/img/logo.png"
import { LogOut, Play, LayoutDashboard, ChevronRight, Zap } from "lucide-react"

export default function WelcomePage() {
    const { data: session } = useSession()
    const userRole = (session?.user as any)?.role

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
            <div className="absolute inset-10 border border-white/5 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
            </div>
            <div className="relative z-20 w-full max-w-105 flex flex-col items-center">
                <div className="mb-12 flex flex-col items-center gap-4">
                    <Image
                        src={Logo}
                        width={180}
                        height={60}
                        alt="Logo Nex.lab"
                        className="brightness-200"
                    />
                    <div className="h-0.5 w-8 bg-white/20" />
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-[1000] italic uppercase tracking-tighter leading-none mb-2">
                        Olá, <span className="text-outline-thin text-transparent">{session?.user?.name?.split(' ')[0]}</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">
                        Acesso Nível: {userRole}
                    </p>
                </div>
                <div className="w-full space-y-4">
                    {(userRole === "PROMOTOR") && (
                        <Link
                            href="/home"
                            className="group relative flex items-center justify-between w-full bg-white text-black p-8 transition-all hover:bg-gray-200 active:scale-[0.97] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Módulo_Operacional</span>
                                <span className="text-xl font-[1000] uppercase italic tracking-tighter">Iniciar Totem</span>
                            </div>
                            <div className="bg-black text-white p-2 rounded-full group-hover:translate-x-1 transition-transform">
                                <Play size={18} fill="white" />
                            </div>
                        </Link>
                    )}
                    {userRole === "ADMIN" && (
                        <Link
                            href="/admin"
                            className="group relative flex items-center justify-between w-full bg-white text-black p-8 transition-all hover:bg-gray-200 active:scale-[0.97] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex flex-col">

                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Data_Management</span>
                                <span className="text-xl font-[1000] uppercase italic tracking-tighter">Painel Admin</span>

                            </div>

                            <LayoutDashboard size={24} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    )}
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full  cursor-pointer flex items-center justify-between px-8 py-5 text-[9px] uppercase tracking-[0.4em] font-black text-white/20 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20 mt-6"
                    >
                        <span>Encerrar Sessão</span>
                        <LogOut size={14} />
                    </button>
                </div>
            </div>
            <footer className="absolute bottom-12 w-full px-12 flex justify-between items-end opacity-20">
                <div className="flex flex-col gap-1 text-[8px] font-black uppercase tracking-widest">
                    <p>Nex.Lab Studio © 2024</p>
                    <p className="font-mono">System_Status: Nominal</p>
                </div>
                <Zap size={16} />
            </footer>

            <style jsx global>{`
                .text-outline-thin {
                    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.5);
                }
                body { background-color: black; }
            `}</style>
        </div>
    )
}
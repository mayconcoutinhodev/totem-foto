"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { 
  LayoutGrid, List, Search, Download, Eye, Calendar, 
  ChevronLeft, ChevronRight, X, HardDrive, ArrowLeft, RefreshCw 
} from "lucide-react"
import Link from "next/link"
import { getImagesFromDb } from "./actions"

interface CapturedImage {
  id: string
  url: string
  filename: string
  createdAt: Date
}

export default function AdminDashboard() {
  const [images, setImages] = useState<CapturedImage[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [selectedImage, setSelectedImage] = useState<CapturedImage | null>(null)

  const loadImages = useCallback(async (showSkeleton = false) => {
    if (showSkeleton) setIsLoading(true)
    setIsRefreshing(true)
    
    try {
      const data = await getImagesFromDb()
      setImages(data as any)
    } catch (error) {
      console.error("Erro ao sincronizar dados:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadImages(true)

    const interval = setInterval(() => {
      loadImages(false)
    }, 30000) 

    return () => clearInterval(interval)
  }, [loadImages])

  const filteredImages = useMemo(() => {
    return images.filter(img => {
      const matchesSearch = img.filename.toLowerCase().includes(searchTerm.toLowerCase())
      const imgDate = new Date(img.createdAt).toISOString().split('T')[0]
      const matchesDate = filterDate ? imgDate === filterDate : true
      return matchesSearch && matchesDate
    })
  }, [images, searchTerm, filterDate])

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDownload = async (url: string, filename: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <div className="text-sm md:text-base text-gray-500 tracking-[0.5em] uppercase animate-pulse font-black">
          Nex.lab / Sincronizando...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex flex-col gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Home
          </Link>
          
          <div className="flex items-end gap-4">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic flex items-center gap-3">
              <HardDrive className="text-blue-500" size={32} />
              Nex.lab <span className="text-gray-800 font-light">/ Storage</span>
            </h1>
            
            <div className="hidden md:flex items-center gap-2 mb-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Live Database</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => loadImages(false)}
            disabled={isRefreshing}
            className="p-3 bg-[#111] border border-white/10 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={20} className={`${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
          </button>

          <div className="flex items-center gap-2 bg-[#151515] p-1.5 border border-white/10 rounded-lg shadow-2xl">
            <button 
              onClick={() => setViewMode("grid")} 
              className={`px-6 py-2.5 rounded-md text-xs md:text-sm font-black uppercase transition-all ${viewMode === "grid" ? "bg-white text-black shadow-lg shadow-white/5" : "text-gray-500 hover:text-gray-300"}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode("table")} 
              className={`px-6 py-2.5 rounded-md text-xs md:text-sm font-black uppercase transition-all ${viewMode === "table" ? "bg-white text-black shadow-lg shadow-white/5" : "text-gray-500 hover:text-gray-300"}`}
            >
              Tabela
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="BUSCAR NOME DO ARQUIVO..." 
            className="w-full bg-[#111] border border-white/10 rounded-md py-4 pl-12 pr-4 text-sm md:text-base outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-700 uppercase font-medium"
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
          />
        </div>
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="date" 
            className="w-full bg-[#111] border border-white/10 rounded-md py-4 pl-12 pr-4 text-sm md:text-base outline-none focus:border-blue-500/50 transition-all text-white appearance-none uppercase"
            onChange={(e) => {setFilterDate(e.target.value); setCurrentPage(1)}}
          />
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {paginatedImages.map((img) => (
            <div key={img.id} className="group relative bg-[#111] border border-white/10 overflow-hidden aspect-[1/1] rounded-sm">
              <img src={img.url} alt={img.filename} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-[2px]">
                <button onClick={() => setSelectedImage(img)} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"><Eye size={20}/></button>
                <button onClick={() => handleDownload(img.url, img.filename)} className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"><Download size={20}/></button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <p className="text-[10px] md:text-xs font-mono truncate text-gray-400 uppercase tracking-tighter">{img.filename}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 overflow-x-auto rounded-lg shadow-2xl">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-[#151515] text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] border-b border-white/10">
                <th className="p-6">Preview</th>
                <th className="p-6">Arquivo</th>
                <th className="p-6">Data de Registro</th>
                <th className="p-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedImages.map((img) => (
                <tr key={img.id} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 w-24">
                    <img src={img.url} className="w-16 h-20 object-cover border border-white/10 rounded-sm" />
                  </td>
                  <td className="p-6 text-sm md:text-base font-mono font-bold">{img.filename}</td>
                  <td className="p-6 text-xs md:text-sm text-gray-500">{new Date(img.createdAt).toLocaleString()}</td>
                  <td className="p-6 text-right space-x-6">
                    <button onClick={() => setSelectedImage(img)} className="text-gray-500 hover:text-white transition-colors"><Eye size={24}/></button>
                    <button onClick={() => handleDownload(img.url, img.filename)} className="text-gray-500 hover:text-blue-500 transition-colors"><Download size={24}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 gap-10">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-3 text-gray-500 hover:text-white disabled:opacity-20 transition-all border border-white/5 rounded-full hover:border-white/20"
          >
            <ChevronLeft size={32} />
          </button>
          <span className="text-xs md:text-base uppercase tracking-[0.5em] text-gray-400 font-black">
             {currentPage} / {totalPages}
          </span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-3 text-gray-500 hover:text-white disabled:opacity-20 transition-all border border-white/5 rounded-full hover:border-white/20"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 text-white/50 hover:text-white hover:rotate-90 transition-all"><X size={40}/></button>
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <img 
              src={selectedImage.url} 
              className="max-h-[70vh] w-auto border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-sm" 
              alt="Ampliada" 
            />
            <div className="mt-10 text-center w-full">
              <p className="text-sm md:text-xl uppercase tracking-[0.4em] font-black mb-8 italic">{selectedImage.filename}</p>
              <button 
                onClick={() => handleDownload(selectedImage.url, selectedImage.filename)}
                className="bg-white text-black px-12 py-5 text-xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95"
              >
                Download High-Res Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
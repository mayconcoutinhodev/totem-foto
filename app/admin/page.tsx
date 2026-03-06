"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
  Search, Download, Eye, Calendar,
  ChevronLeft, ChevronRight, X, ArrowLeft, RefreshCw,
  LayoutGrid, List, Link as LinkIcon, FileText,
  Unplug,
} from "lucide-react"
import Link from "next/link"
import { getImagesFromDb } from "./actions"
import QRCode from "react-qr-code"
import "./style.css"

interface CapturedImage {
  id: string
  url: string
  filename: string
  createdAt: Date
}

export default function AdminDashboard() {
  const [images, setImages] = useState<CapturedImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "gallery">("gallery")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [imgLoading, setImgLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState<CapturedImage | null>(null)

  const loadImages = useCallback(async (showSkeleton = false) => {
    if (showSkeleton) setIsLoading(true)
    setIsRefreshing(true)
    try {
      const data = await getImagesFromDb()
      setImages(data as any)
    } catch (error) {
      console.error("Sync_Error:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    setImgLoading(true)
  }, [selectedImage])

  useEffect(() => {
    loadImages(true)
    const interval = setInterval(() => loadImages(false), 30000)
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
  const paginatedImages = filteredImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
    } catch (error) {
      console.error("Erro_Download:", error)
    }
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white/10 font-mono text-[10px] tracking-[0.5em] uppercase animate-pulse">Initializing_Terminal_Core...</div>

  return (
    <div className="min-h-screen bg-black text-[#d0d0d0] font-sans p-6 md:p-20 selection:bg-white selection:text-black relative">
      <div className="absolute inset-6 md:inset-10 border border-white/3 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10" />
      </div>
      <div className="relative z-10 max-w-375 mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 border-b border-white/5 pb-5">

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <ArrowLeft size={18} className="text-white/30 group-hover:text-white" />
            </Link>

            <h1 className="text-sm sm:text-xl font-bold tracking-[0.2em] uppercase italic text-white/90">
              Nex.Lab <span className="text-white/20 font-light italic">/ Storage_Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-subtle" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500/70">
              Live_Database_Sync
            </span>
          </div>

        </div>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-[#080808] border border-white/5 p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30 italic">Total de Fotos </span>
                <span className="text-4xl font-light leading-none">{images.length}</span>
              </div>
              <div className="bg-[#080808] border border-white/5 p-6 flex flex-col justify-between border-l-2 border-l-white/20">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30 italic"> Filtrado </span>
                <span className="text-4xl font-light leading-none text-white/60">{filteredImages.length}</span>
              </div>
            </div>
            <div className="md:col-span-8 bg-[#080808] border border-white/5 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white" size={16} />
                <input
                  type="text" placeholder="BUSCAR POR NOME..."
                  className="w-full bg-transparent border-b border-white/10 pl-7 py-2 text-[10px] font-black tracking-widest outline-none focus:border-white transition-all uppercase placeholder:text-white/10"
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                />
              </div>
              <div className="relative group">
                <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="date"
                  className="w-full bg-transparent border-b border-white/10 pl-7 py-2 text-[10px] font-black tracking-widest outline-none uppercase appearance-none cursor-pointer"
                  onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1) }}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => loadImages(false)} className={`p-3 border border-white/10 hover:bg-white/5 transition-all ${isRefreshing ? "animate-spin" : ""}`}>
                  <RefreshCw size={16} className="text-white/40" />
                </button>
                <div className="flex bg-black border border-white/10 p-1">
                  <button onClick={() => setViewMode("gallery")} className={`p-2 cursor-pointer transition-all ${viewMode === "gallery" ? "bg-white text-black" : "text-white/40 hover:text-white"}`} title="Visualização em Galeria"><LayoutGrid size={16} /></button>
                  <button onClick={() => setViewMode("table")} className={`p-2  cursor-pointer  transition-all ${viewMode === "table" ? "bg-white text-black" : "text-white/40 hover:text-white"}`} title="Visualização em Tabela"><List size={16} /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mb-6 pr-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Exibir:</span>
            <div className="flex gap-2.5">
              {[12, 24, 48, 96].map(n => (
                <button
                  key={n}
                  onClick={() => { setItemsPerPage(n); setCurrentPage(1) }}
                  className={`text-[10px] font-black transition-colors ${itemsPerPage === n ? "text-white underline underline-offset-4" : "text-white/20 hover:text-white/50"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          {viewMode === "table" ? (
            <div className="bg-[#080808] border border-white/10 overflow-x-auto shadow-2xl relative" >
              <table className="w-full text-left border-collapse min-w-225">
                <thead>
                  <tr className="bg-[#0d0d0d] text-[10px] uppercase font-[1000] tracking-[0.3em] text-white/30 border-b border-white/10 italic">
                    <th className="p-6">UID_System</th>
                    <th className="p-6">Timestamp_UTC</th>
                    <th className="p-6">Filename_Ref</th>
                    <th className="p-6 text-right">Operation</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                  {paginatedImages.map((img, idx) => (
                    <tr key={img.id} className="border-b border-white/3 hover:bg-white/2 transition-all group cursor-pointer" onClick={() => setSelectedImage(img)}>
                      <td className="p-6 font-mono text-white/30 text-[10px]">#{(idx + 1) + (currentPage - 1) * itemsPerPage}</td>
                      <td className="p-6 text-white/50 italic font-mono">{new Date(img.createdAt).toISOString().replace('T', ' ').split('.')[0]}</td>
                      <td className="p-6 uppercase italic">{img.filename}</td>
                      <td className="p-6 text-right"><Eye size={18} className="inline opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {paginatedImages.map((img) => (
                <div key={img.id} onClick={() => setSelectedImage(img)} className="bg-[#080808] border border-white/10 p-2 cursor-pointer group hover:border-white/30 hover:scale-[1.01] transition-all duration-300 aspect-[3/4.2] flex flex-col relative overflow-hidden">
                  <div className="flex-1 overflow-hidden bg-black mb-3 border border-white/5 relative">
                    <img src={img.url} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="text-[9px] uppercase font-[950] italic truncate tracking-tighter text-white/30 group-hover:text-white transition-colors">{img.filename}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/5">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-5 hover:text-white text-white/40 flex items-center gap-2 group transition-all">
              <ChevronLeft size={16} className="group-hover:-translate-x-1" /> Previous
            </button>
            <span className="text-[10px] font-mono text-white/20 italic tracking-[0.3em] font-black">[ {currentPage} / {totalPages} ]</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-5 hover:text-white text-white/40 flex items-center gap-2 group transition-all">
              Next <ChevronRight size={16} className="group-hover:translate-x-1" />
            </button>
          </div>
        </main>
        <footer className="max-w-375 mx-auto mt-16 pt-8 border-t border-white/5 text-center text-[9px] font-mono text-white/10 uppercase tracking-widest italic opacity-20 hover:opacity-100 transition-opacity">
          Authorized_Personnel_Only // Node_Access_v4.2 // Stay_Digital
        </footer>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-md p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300 selection:bg-black selection:text-white">

          <div className="relative max-w-4xl w-full bg-black border border-white/10 p-5 sm:p-6 md:p-12 shadow-2xl">

            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

            <button
              onClick={() => setSelectedImage(null)}
              className="
    fixed sm:absolute
    top-4 right-4 sm:top-6 sm:right-6
    z-[60] text-white/40 hover:text-white transition-all
  "
            >
              <X size={28} strokeWidth={1} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

              <div className="border border-white/5 relative group overflow-hidden bg-white/5">
                <div className="border border-white/5 relative group overflow-hidden bg-white/5 flex items-center justify-center">

                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                    </div>
                  )}

                  <img
                    src={selectedImage.url}
                    alt="Preview"
                    onLoad={() => setImgLoading(false)}
                    className={`w-full max-h-[35vh] sm:max-h-[45vh] md:max-h-[70vh] object-contain transition-opacity duration-500 ${imgLoading ? "opacity-0" : "opacity-100"
                      }`}
                  />

                </div>
              </div>

              <div className="flex flex-col space-y-5">

                <div className="space-y-2 text-center md:text-left border-l-0 md:border-l-2 border-white/10 md:pl-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-[950] italic uppercase tracking-tighter leading-none text-white break-words">
                    {selectedImage.filename}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-white/30 uppercase font-mono italic break-all">
                    Database_UID: {selectedImage.id}
                  </p>
                </div>

                <div className="bg-[#080808] border border-white/5 p-3 sm:p-4 space-y-3 relative overflow-hidden">

                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] italic">
                    <LinkIcon size={12} /> Sync_Ref_Link
                  </div>

                  <div className="flex items-center justify-between gap-2 overflow-hidden border border-white/10 px-3 py-2 bg-black">

                    <span className="text-[9px] sm:text-[10px] font-mono text-white/40 truncate italic">
                      {`http://localhost:3000/img/${selectedImage.id}`}
                    </span>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(`http://localhost:3000/img/${selectedImage.id}`)
                      }
                      className="text-[9px] font-black uppercase text-white hover:underline cursor-pointer whitespace-nowrap"
                    >
                      Copy
                    </button>

                  </div>
                </div>

                <button
                  onClick={() => handleDownload(selectedImage.url, selectedImage.filename)}
                  className="w-full bg-white cursor-pointer text-black py-3 sm:py-4 text-[10px] sm:text-[11px] font-[950] uppercase tracking-[0.3em] sm:tracking-[0.5em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl"
                >
                  Download_Original_Copy <Download size={18} />
                </button>

                <div className="flex justify-center p-3 sm:p-4">
                  <QRCode
                    className="bg-white p-3 sm:p-4 shadow-xl"
                    value={`${process.env.DATABASE_URL}/img/${selectedImage.id}`}
                    size={140}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
"use client"


export default function ActivationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center w-full relative">
        {children}
      </main>
    </div>
  )
}
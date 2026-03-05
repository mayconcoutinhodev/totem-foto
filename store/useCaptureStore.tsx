import { create } from 'zustand'

interface CaptureState {
  photo: string | null
  qrCode: string | null
  setPhoto: (photo: string) => void
  setQrCode: (qrCode: string) => void
  resetPhoto: () => void 
}

export const useCaptureStore = create<CaptureState>((set) => ({
  photo: null,
  qrCode: null,
  setPhoto: (photo) => set({ photo }),
  setQrCode: (qrCode) => set({ qrCode }),
  resetPhoto: () => set({ photo: null, qrCode: null }), 
})) 
import { create } from 'zustand'

interface CaptureState {
  photo: string | null
  setPhoto: (photo: string | null) => void
  resetPhoto: () => void
}

export const useCaptureStore = create<CaptureState>((set) => ({
  photo: null,
  setPhoto: (photo) => set({ photo }),
  resetPhoto: () => set({ photo: null }),
}))
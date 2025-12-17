import { ref, watch } from 'vue'
import type { Palette } from '@/types'

export function useLocalStorage() {
  const PALETTES_KEY = 'saved_palettes'

  const savedPalettes = ref<Palette[]>([])

  const loadPalettes = (): void => {
    const stored = localStorage.getItem(PALETTES_KEY)
    if (stored) {
      try {
        savedPalettes.value = JSON.parse(stored)
      } catch (e) {
        savedPalettes.value = []
      }
    }
  }

  const savePalettes = (): void => {
    localStorage.setItem(PALETTES_KEY, JSON.stringify(savedPalettes.value))
  }

  const savePalette = (palette: Palette): void => {
    const exists = savedPalettes.value.findIndex(p => p.id === palette.id)
    if (exists !== -1) {
      savedPalettes.value[exists] = palette
    } else {
      savedPalettes.value.push(palette)
    }
    savePalettes()
  }

  const deletePalette = (id: string): void => {
    savedPalettes.value = savedPalettes.value.filter(p => p.id !== id)
    savePalettes()
  }

  const toggleFavorite = (id: string): void => {
    const palette = savedPalettes.value.find(p => p.id === id)
    if (palette) {
      palette.favorite = !palette.favorite
      savePalettes()
    }
  }

  watch(savedPalettes, savePalettes, { deep: true })

  loadPalettes()

  return {
    savedPalettes,
    savePalette,
    deletePalette,
    toggleFavorite
  }
}
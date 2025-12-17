export interface Color {
  hex: string
  rgb: { r: number; g: number; b: number }
  locked: boolean
}

export interface Palette {
  id: string
  name: string
  colors: Color[]
  tags: string[]
  createdAt: string
  favorite: boolean
}

export type ColorFormat = 'HEX' | 'RGB'

export type PaletteType = 'random' | 'analogous' | 'monochrome' | 'triadic' | 'complementary'

export type MoodType = 'calm' | 'energetic' | 'professional'

export interface ContrastResult {
  ratio: number
  level: 'AAA' | 'AA' | 'fail'
}

export type ExportFormat = 'css' | 'scss' | 'tailwind'
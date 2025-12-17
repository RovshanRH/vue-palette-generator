import { useColorConversion } from './useColorConversion'
import type { Color, PaletteType, MoodType } from '@/types'

export function useColorGenerator() {
  const { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } = useColorConversion()

  const randomHex = (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  const createColor = (hex: string, locked = false): Color => {
    return {
      hex,
      rgb: hexToRgb(hex),
      locked
    }
  }

  const generateRandom = (count: number): Color[] => {
    return Array.from({ length: count }, () => createColor(randomHex()))
  }

  const generateAnalogous = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: Color[] = [createColor(baseHex)]
    const step = 30

    for (let i = 1; i < count; i++) {
      const newHue = (hsl.h + (i % 2 === 0 ? step : -step) * Math.ceil(i / 2)) % 360
      const newRgb = hslToRgb(newHue, hsl.s, hsl.l)
      colors.push(createColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b)))
    }

    return colors
  }

  const generateMonochrome = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: Color[] = []
    const step = 80 / (count - 1)

    for (let i = 0; i < count; i++) {
      const newL = Math.max(10, Math.min(90, hsl.l - 40 + step * i))
      const newRgb = hslToRgb(hsl.h, hsl.s, newL)
      colors.push(createColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b)))
    }

    return colors
  }

  const generateTriadic = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: Color[] = [createColor(baseHex)]
    const angles = [120, 240]

    for (let i = 0; i < count - 1; i++) {
      const angle = angles[i % angles.length]
      const newHue = (hsl.h + angle) % 360
      const newRgb = hslToRgb(newHue, hsl.s, hsl.l)
      colors.push(createColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b)))
    }

    return colors
  }

  const generateComplementary = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: Color[] = [createColor(baseHex)]
    const complementHue = (hsl.h + 180) % 360
    const complementRgb = hslToRgb(complementHue, hsl.s, hsl.l)
    colors.push(createColor(rgbToHex(complementRgb.r, complementRgb.g, complementRgb.b)))

    for (let i = 2; i < count; i++) {
      const variation = i % 2 === 0 ? hsl.h : complementHue
      const newL = hsl.l + (i % 2 === 0 ? 15 : -15)
      const newRgb = hslToRgb(variation, hsl.s, newL)
      colors.push(createColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b)))
    }

    return colors
  }

  const generateByMood = (mood: MoodType, count: number): Color[] => {
    const presets: Record<MoodType, { hueRange: [number, number]; satRange: [number, number]; lightRange: [number, number] }> = {
      calm: { hueRange: [180, 240], satRange: [30, 60], lightRange: [60, 80] },
      energetic: { hueRange: [0, 60], satRange: [70, 100], lightRange: [45, 70] },
      professional: { hueRange: [200, 250], satRange: [20, 50], lightRange: [30, 60] }
    }

    const preset = presets[mood]
    const colors: Color[] = []

    for (let i = 0; i < count; i++) {
      const h = preset.hueRange[0] + Math.random() * (preset.hueRange[1] - preset.hueRange[0])
      const s = preset.satRange[0] + Math.random() * (preset.satRange[1] - preset.satRange[0])
      const l = preset.lightRange[0] + Math.random() * (preset.lightRange[1] - preset.lightRange[0])
      const rgb = hslToRgb(h, s, l)
      colors.push(createColor(rgbToHex(rgb.r, rgb.g, rgb.b)))
    }

    return colors
  }

  const generatePalette = (type: PaletteType, count: number, baseColor?: string): Color[] => {
    if (type === 'random') return generateRandom(count)
    const base = baseColor || randomHex()
    switch (type) {
      case 'analogous': return generateAnalogous(base, count)
      case 'monochrome': return generateMonochrome(base, count)
      case 'triadic': return generateTriadic(base, count)
      case 'complementary': return generateComplementary(base, count)
      default: return generateRandom(count)
    }
  }

  return {
    generateRandom,
    generatePalette,
    generateByMood,
    createColor
  }
}
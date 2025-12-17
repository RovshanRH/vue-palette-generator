import type { Color, ContrastResult } from '@/types'

export function useAccessibility() {
  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const getContrastRatio = (color1: Color, color2: Color): number => {
    const lum1 = getLuminance(color1.rgb.r, color1.rgb.g, color1.rgb.b)
    const lum2 = getLuminance(color2.rgb.r, color2.rgb.g, color2.rgb.b)
    const lighter = Math.max(lum1, lum2)
    const darker = Math.min(lum1, lum2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  const checkContrast = (color1: Color, color2: Color): ContrastResult => {
    const ratio = getContrastRatio(color1, color2)
    let level: 'AAA' | 'AA' | 'fail' = 'fail'
    
    if (ratio >= 7) level = 'AAA'
    else if (ratio >= 4.5) level = 'AA'
    
    return { ratio: Math.round(ratio * 100) / 100, level }
  }

  const findAccessiblePairs = (colors: Color[]): Array<{ color1: Color; color2: Color; result: ContrastResult }> => {
    const pairs: Array<{ color1: Color; color2: Color; result: ContrastResult }> = []
    
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const result = checkContrast(colors[i], colors[j])
        if (result.level !== 'fail') {
          pairs.push({ color1: colors[i], color2: colors[j], result })
        }
      }
    }
    
    return pairs.sort((a, b) => b.result.ratio - a.result.ratio)
  }

  return {
    checkContrast,
    getContrastRatio,
    findAccessiblePairs
  }
}
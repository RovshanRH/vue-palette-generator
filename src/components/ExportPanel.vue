<template>
  <div class="export-panel">
    <h3>Экспорт палитры</h3>

    <div class="export-format">
      <label>Формат экспорта:</label>
      <select v-model="selectedFormat">
        <option value="css">CSS Variables</option>
        <option value="scss">SCSS Variables</option>
        <option value="tailwind">Tailwind Config</option>
      </select>
    </div>

    <div class="export-code">
      <pre>{{ exportedCode }}</pre>
      <button @click="copyCode" class="copy-btn">
        {{ copied ? 'Скопировано!' : 'Копировать' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Color, ExportFormat } from '@/types'

interface Props {
  colors: Color[]
}

const props = defineProps<Props>()

const selectedFormat = ref<ExportFormat>('css')
const copied = ref(false)

const exportedCode = computed(() => {
  if (props.colors.length === 0) return 'Нет цветов для экспорта'

  switch (selectedFormat.value) {
    case 'css':
      return generateCSS()
    case 'scss':
      return generateSCSS()
    case 'tailwind':
      return generateTailwind()
    default:
      return ''
  }
})

const generateCSS = (): string => {
  const lines = [':root {']
  props.colors.forEach((color, index) => {
    lines.push(`  --color-${index + 1}: ${color.hex};`)
  })
  lines.push('}')
  return lines.join('\n')
}

const generateSCSS = (): string => {
  const lines: string[] = []
  props.colors.forEach((color, index) => {
    lines.push(`$color-${index + 1}: ${color.hex};`)
  })
  return lines.join('\n')
}

const generateTailwind = (): string => {
  const colors: Record<string, string> = {}
  props.colors.forEach((color, index) => {
    colors[`palette-${index + 1}`] = color.hex
  })
  
  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)}
    }
  }
}`
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(exportedCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.export-panel {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.export-panel h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.export-format {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.export-format label {
  font-weight: bold;
  color: #555;
}

.export-format select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.export-code {
  position: relative;
}

.export-code pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  margin: 0;
  border: 1px solid #ddd;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #5568d3;
}
</style>
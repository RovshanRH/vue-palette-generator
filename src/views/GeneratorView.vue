<template>
  <div class="generator-view">
    <div class="header">
      <h1>Генератор палитр</h1>
      <ColorFormatToggle v-model="format" />
    </div>

    <PaletteGenerator :format="format" @update:colors="updateColors" />

    <div class="preview-section">
      <h2>Превью</h2>
      <PalettePreview :colors="colors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaletteGenerator from '@/components/PaletteGenerator.vue'
import PalettePreview from '@/components/PalettePreview.vue'
import ColorFormatToggle from '@/components/ColorFormatToggle.vue'
import type { Color, ColorFormat } from '@/types'

const format = ref<ColorFormat>('HEX')
const colors = ref<Color[]>([])

const updateColors = (newColors: Color[]) => {
  colors.value = newColors
}
</script>

<style scoped>
.generator-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header h1 {
  margin: 0;
  color: #333;
}

.preview-section h2 {
  margin: 0 0 20px 0;
  color: #333;
}
</style>
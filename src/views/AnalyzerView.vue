[file name]: AnalyzerView.vue
[file content begin]
<template>
  <div class="analyzer-view">
    <h1>Анализ доступности</h1>

    <div class="color-selector">
      <h3>Выберите цвета для анализа</h3>
      <div class="color-inputs">
        <div v-for="(colorValue, index) in colors" :key="index" class="color-input-group">
          <input
            type="color"
            v-model="colors[index]"
            class="color-picker"
          />
          <span class="color-value">{{ colors[index] }}</span>
          <button v-if="colors.length > 2" @click="removeColor(index)" class="remove-btn">
            ✕
          </button>
        </div>
        <button @click="addColor" class="add-btn">+ Добавить цвет</button>
      </div>
    </div>

    <div class="analysis-section">
      <PaletteAnalyzer :colors="colorObjects" />
    </div>

    <div class="export-section">
      <ExportPanel :colors="colorObjects" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PaletteAnalyzer from '@/components/PaletteAnalyzer.vue'
import ExportPanel from '@/components/ExportPanel.vue'
import { useColorConversion } from '@/composables/useColorConversion'
import type { Color } from '@/types'

const { hexToRgb } = useColorConversion()

const colors = ref(['#3498db', '#e74c3c', '#2ecc71'])

const colorObjects = computed((): Color[] => {
  return colors.value.map(hex => ({
    hex,
    rgb: hexToRgb(hex),
    locked: false
  }))
})

const addColor = () => {
  colors.value.push('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
}

const removeColor = (index: number) => {
  colors.value.splice(index, 1)
}
</script>

<style scoped>
.analyzer-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.analyzer-view h1 {
  margin: 0;
  color: #333;
}

.color-selector {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.color-selector h3 {
  margin: 0 0 15px 0;
  color: #555;
}

.color-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.color-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.color-picker {
  width: 50px;
  height: 50px;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.color-value {
  font-family: monospace;
  font-weight: bold;
  color: #333;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #5568d3;
}

.analysis-section,
.export-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
[file content end]
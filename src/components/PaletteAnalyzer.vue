<template>
  <div class="palette-analyzer">
    <h3>Анализ доступности</h3>

    <div v-if="colors.length < 2" class="info-message">
      Добавьте минимум 2 цвета для анализа
    </div>

    <div v-else class="analysis-results">
      <div class="accessible-pairs">
        <h4>Доступные комбинации ({{ accessiblePairs.length }})</h4>
        <div v-if="accessiblePairs.length === 0" class="no-pairs">
          Нет пар с достаточным контрастом
        </div>
        <div v-else class="pairs-list">
          <div
            v-for="(pair, index) in accessiblePairs"
            :key="index"
            class="pair-item"
          >
            <div class="pair-colors">
              <div class="pair-color" :style="{ backgroundColor: pair.color1.hex }">
                <span class="color-label">{{ pair.color1.hex }}</span>
              </div>
              <div class="pair-color" :style="{ backgroundColor: pair.color2.hex }">
                <span class="color-label">{{ pair.color2.hex }}</span>
              </div>
            </div>
            <div class="pair-info">
              <span class="contrast-ratio">{{ pair.result.ratio }}:1</span>
              <span class="contrast-level" :class="pair.result.level">
                {{ pair.result.level }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="contrast-matrix">
        <h4>Матрица контраста</h4>
        <div class="matrix-grid">
          <div class="matrix-header">
            <div></div>
            <div
              v-for="(color, index) in colors"
              :key="index"
              class="matrix-color-header"
              :style="{ backgroundColor: color.hex }"
            ></div>
          </div>
          <div
            v-for="(row, rowIndex) in colors"
            :key="rowIndex"
            class="matrix-row"
          >
            <div
              class="matrix-color-header"
              :style="{ backgroundColor: row.hex }"
            ></div>
            <div
              v-for="(col, colIndex) in colors"
              :key="colIndex"
              class="matrix-cell"
              :class="getContrastClass(row, col)"
            >
              {{ rowIndex === colIndex ? '-' : getContrastRatio(row, col) }}
            </div>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item">
            <span class="legend-color AAA"></span>
            <span>AAA (≥7:1)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color AA"></span>
            <span>AA (≥4.5:1)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color fail"></span>
            <span>Недостаточно (&lt;4.5:1)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccessibility } from '@/composables/useAccessibility'
import type { Color } from '@/types'

interface Props {
  colors: Color[]
}

const props = defineProps<Props>()

const { findAccessiblePairs, getContrastRatio: calcContrast, checkContrast } = useAccessibility()

const accessiblePairs = computed(() => findAccessiblePairs(props.colors))

const getContrastRatio = (color1: Color, color2: Color): string => {
  const ratio = calcContrast(color1, color2)
  return ratio.toFixed(1)
}

const getContrastClass = (color1: Color, color2: Color): string => {
  if (color1.hex === color2.hex) return ''
  const result = checkContrast(color1, color2)
  return result.level
}
</script>

<style scoped>
.palette-analyzer {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.palette-analyzer h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.info-message {
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
}

.analysis-results {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.accessible-pairs h4,
.contrast-matrix h4 {
  margin: 0 0 15px 0;
  color: #555;
}

.no-pairs {
  text-align: center;
  padding: 20px;
  color: #999;
}

.pairs-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pair-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.pair-colors {
  display: flex;
  gap: 5px;
}

.pair-color {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.color-label {
  font-size: 10px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 5px;
  border-radius: 2px;
}

.pair-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.contrast-ratio {
  font-weight: bold;
  font-family: monospace;
}

.contrast-level {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

.contrast-level.AAA {
  background: #28a745;
  color: white;
}

.contrast-level.AA {
  background: #ffc107;
  color: black;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-x: auto;
}

.matrix-header,
.matrix-row {
  display: flex;
  gap: 2px;
}

.matrix-color-header {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  flex-shrink: 0;
}

.matrix-cell {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  border-radius: 4px;
  flex-shrink: 0;
}

.matrix-cell.AAA {
  background: #28a745;
  color: white;
}

.matrix-cell.AA {
  background: #ffc107;
  color: black;
}

.matrix-cell.fail {
  background: #dc3545;
  color: white;
}

.legend {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.legend-color.AAA {
  background: #28a745;
}

.legend-color.AA {
  background: #ffc107;
}

.legend-color.fail {
  background: #dc3545;
}
</style>
<template>
  <div class="palette-generator">
    <div class="controls">
      <div class="control-group">
        <label>Количество цветов:</label>
        <select v-model.number="colorCount">
          <option :value="3">3</option>
          <option :value="5">5</option>
          <option :value="7">7</option>
        </select>
      </div>

      <div class="control-group">
        <label>Тип палитры:</label>
        <select v-model="paletteType">
          <option value="random">Случайная</option>
          <option value="analogous">Аналогичная</option>
          <option value="monochrome">Монохромная</option>
          <option value="triadic">Триада</option>
          <option value="complementary">Комплементарная</option>
        </select>
      </div>

      <div v-if="paletteType !== 'random'" class="control-group">
        <label>Базовый цвет:</label>
        <input type="color" v-model="baseColor">
      </div>

      <div class="control-group">
        <label>Настроение:</label>
        <select v-model="mood">
          <option value="">Не выбрано</option>
          <option value="calm">Спокойное</option>
          <option value="energetic">Энергичное</option>
          <option value="professional">Профессиональное</option>
        </select>
      </div>

      <button @click="generate" class="generate-btn">
        Генерировать палитру
      </button>

      <button @click="saveCurrent" class="save-btn">
        Сохранить палитру
      </button>
    </div>

    <div class="palette-display">
      <ColorCard
        v-for="(color, index) in colors"
        :key="index"
        :color="color"
        :format="format"
        :show-lock="true"
        @toggle-lock="toggleLock(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ColorCard from './ColorCard.vue'
import { useColorGenerator } from '@/composables/useColorGenerator'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { Color, ColorFormat, PaletteType, MoodType, Palette } from '@/types'

interface Props {
  format: ColorFormat
}

interface Emits {
  (e: 'update:colors', colors: Color[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { generatePalette, generateByMood } = useColorGenerator()
const { savePalette } = useLocalStorage()

const colors = ref<Color[]>([])
const colorCount = ref(5)
const paletteType = ref<PaletteType>('random')
const baseColor = ref('#3498db')
const mood = ref<MoodType | ''>('')

const generate = () => {
  let newColors: Color[]
  
  if (mood.value) {
    newColors = generateByMood(mood.value, colorCount.value)
  } else {
    newColors = generatePalette(
      paletteType.value,
      colorCount.value,
      paletteType.value !== 'random' ? baseColor.value : undefined
    )
  }

  colors.value = newColors.map((color, index) => {
    if (colors.value[index]?.locked) {
      return colors.value[index]
    }
    return color
  })
  
  emit('update:colors', colors.value)
}

const toggleLock = (index: number) => {
  colors.value[index].locked = !colors.value[index].locked
}

const saveCurrent = () => {
  if (colors.value.length === 0) return
  
  const palette: Palette = {
    id: Date.now().toString(),
    name: `Палитра ${new Date().toLocaleString('ru-RU')}`,
    colors: colors.value,
    tags: [paletteType.value],
    createdAt: new Date().toISOString(),
    favorite: false
  }
  
  savePalette(palette)
  alert('Палитра сохранена!')
}

onMounted(() => {
  generate()
})

watch(colors, (newColors) => {
  emit('update:colors', newColors)
}, { deep: true })
</script>

<style scoped>
.palette-generator {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.control-group select,
.control-group input[type="color"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.control-group input[type="color"] {
  width: 60px;
  height: 40px;
  cursor: pointer;
}

.generate-btn,
.save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.generate-btn {
  background: #667eea;
  color: white;
}

.generate-btn:hover {
  background: #5568d3;
}

.save-btn {
  background: #28a745;
  color: white;
}

.save-btn:hover {
  background: #218838;
}

.palette-display {
  display: flex;
  gap: 10px;
  min-height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
<template>
  <div class="palette-preview">
    <div class="theme-toggle">
      <button
        @click="darkMode = false"
        :class="{ active: !darkMode }"
        class="theme-btn"
      >
        Светлая тема
      </button>
      <button
        @click="darkMode = true"
        :class="{ active: darkMode }"
        class="theme-btn"
      >
        Тёмная тема
      </button>
    </div>

    <div class="preview-container" :class="{ dark: darkMode }">
      <div class="mockup-card" :style="cardStyle">
        <h3 :style="headerStyle">Заголовок карточки</h3>
        <p :style="textStyle">
          Это пример текста для демонстрации цветовой палитры в реальном интерфейсе.
        </p>
        <button :style="buttonStyle" class="mockup-btn">
          Кнопка действия
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Color } from '@/types'

interface Props {
  colors: Color[]
}

const props = defineProps<Props>()

const darkMode = ref(false)

const cardStyle = computed(() => {
  if (props.colors.length === 0) return {}
  return {
    backgroundColor: props.colors[0]?.hex || '#fff',
    borderColor: props.colors[1]?.hex || '#ddd'
  }
})

const headerStyle = computed(() => ({
  color: props.colors[1]?.hex || '#333'
}))

const textStyle = computed(() => ({
  color: props.colors[2]?.hex || '#666'
}))

const buttonStyle = computed(() => ({
  backgroundColor: props.colors[3]?.hex || '#007bff',
  color: props.colors[4]?.hex || '#fff'
}))
</script>

<style scoped>
.palette-preview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.theme-toggle {
  display: flex;
  gap: 10px;
}

.theme-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.theme-btn:hover {
  border-color: #667eea;
}

.theme-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.preview-container {
  padding: 40px;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.preview-container.dark {
  background: #1a1a1a;
}

.mockup-card {
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  border: 2px solid;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.mockup-card h3 {
  margin: 0 0 15px 0;
  font-size: 24px;
}

.mockup-card p {
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.mockup-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.mockup-btn:hover {
  opacity: 0.9;
}
</style>
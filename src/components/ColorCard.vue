<template>
  <div 
    class="color-card"
    :style="{ backgroundColor: color.hex }"
    @click="copyToClipboard"
  >
    <div class="color-info">
      <span class="color-value">{{ displayValue }}</span>
      <button 
        v-if="showLock"
        @click.stop="toggleLock"
        class="lock-btn"
        :class="{ locked: color.locked }"
      >
        {{ color.locked ? '🔒' : '🔓' }}
      </button>
    </div>
    <div v-if="copied" class="copied-indicator">Скопировано!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorConversion } from '@/composables/useColorConversion'
import type { Color, ColorFormat } from '@/types'

interface Props {
  color: Color
  format: ColorFormat
  showLock?: boolean
}

interface Emits {
  (e: 'toggle-lock'): void
}

const props = withDefaults(defineProps<Props>(), {
  showLock: false
})

const emit = defineEmits<Emits>()

const { formatColor } = useColorConversion()
const copied = ref(false)

const displayValue = computed(() => formatColor(props.color, props.format))

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.color.hex)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const toggleLock = () => {
  emit('toggle-lock')
}
</script>

<style scoped>
.color-card {
  flex: 1;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
}

.color-card:hover {
  transform: scale(1.05);
}

.color-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.color-value {
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
}

.lock-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.lock-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.lock-btn.locked {
  background: rgba(255, 215, 0, 0.9);
}

.copied-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  animation: fadeInOut 1.5s;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
<template>
  <div class="format-toggle">
    <button
      v-for="fmt in formats"
      :key="fmt"
      @click="$emit('update:modelValue', fmt)"
      :class="{ active: modelValue === fmt }"
      class="format-btn"
    >
      {{ fmt }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ColorFormat } from '@/types'

interface Props {
  modelValue: ColorFormat
}

defineProps<Props>()

const formats: ColorFormat[] = ['HEX', 'RGB']
</script>

<style scoped>
.format-toggle {
  display: flex;
  gap: 5px;
  background: white;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.format-btn {
  padding: 8px 16px;
  border: 2px solid transparent;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.format-btn:hover {
  background: #f0f0f0;
}

.format-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}
</style>
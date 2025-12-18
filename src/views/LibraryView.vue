<template>
  <div class="library-view">
    <h1>Библиотека палитр</h1>
    <SavedPalettes />
  </div>
</template>

<script setup lang="ts">
import SavedPalettes from '@/components/SavedPalettes.vue'
</script>

<style scoped>
.library-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.library-view h1 {
  margin: 0;
  color: #333;
}
</style>
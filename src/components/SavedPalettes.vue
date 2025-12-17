<template>
  <div class="saved-palettes">
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по названию или тегу..."
        class="search-input"
      />
      <button @click="showFavoritesOnly = !showFavoritesOnly" class="filter-btn">
        {{ showFavoritesOnly ? '⭐ Избранное' : '📋 Все' }}
      </button>
    </div>

    <div v-if="filteredPalettes.length === 0" class="empty-state">
      <p>Сохранённых палитр нет</p>
    </div>

    <div v-else class="palettes-grid">
      <div
        v-for="palette in filteredPalettes"
        :key="palette.id"
        class="palette-item"
      >
        <div class="palette-header">
          <h3>{{ palette.name }}</h3>
          <div class="palette-actions">
            <button @click="toggleFavorite(palette.id)" class="action-btn">
              {{ palette.favorite ? '⭐' : '☆' }}
            </button>
            <button @click="deletePalette(palette.id)" class="action-btn delete">
              🗑️
            </button>
          </div>
        </div>

        <div class="palette-colors">
          <div
            v-for="(color, index) in palette.colors"
            :key="index"
            class="mini-color"
            :style="{ backgroundColor: color.hex }"
            :title="color.hex"
          ></div>
        </div>

        <div class="palette-meta">
          <span class="palette-date">{{ formatDate(palette.createdAt) }}</span>
          <div class="palette-tags">
            <span v-for="tag in palette.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const { savedPalettes, deletePalette: removePalette, toggleFavorite: toggleFav } = useLocalStorage()

const searchQuery = ref('')
const showFavoritesOnly = ref(false)

const filteredPalettes = computed(() => {
  let palettes = savedPalettes.value

  if (showFavoritesOnly.value) {
    palettes = palettes.filter(p => p.favorite)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    palettes = palettes.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return palettes.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const deletePalette = (id: string) => {
  if (confirm('Удалить палитру?')) {
    removePalette(id)
  }
}

const toggleFavorite = (id: string) => {
  toggleFav(id)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.saved-palettes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filter-btn {
  padding: 10px 20px;
  border: 2px solid #667eea;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #667eea;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

.palettes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.palette-item {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.palette-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.palette-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.palette-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.palette-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: scale(1.2);
}

.action-btn.delete:hover {
  color: #dc3545;
}

.palette-colors {
  display: flex;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.mini-color {
  flex: 1;
  transition: flex 0.2s;
}

.mini-color:hover {
  flex: 1.5;
}

.palette-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.palette-date {
  font-style: italic;
}

.palette-tags {
  display: flex;
  gap: 5px;
}

.tag {
  background: #e9ecef;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 11px;
}
</style>
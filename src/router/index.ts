import { createRouter, createWebHistory } from 'vue-router'
import GeneratorView from '@/views/GeneratorView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AnalyzerView from '@/views/AnalyzerView.vue'

const routes = [
  {
    path: '/vue-palette-generator/',
    name: 'Generator',
    component: GeneratorView
  },
  {
    path: '/vue-palette-generator/library',
    name: 'Library',
    component: LibraryView
  },
  {
    path: '/vue-palette-generator/analyzer',
    name: 'Analyzer',
    component: AnalyzerView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
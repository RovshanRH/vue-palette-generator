import { createRouter, createWebHistory } from 'vue-router'
import GeneratorView from '@/views/GeneratorView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AnalyzerView from '@/views/AnalyzerView.vue'

const routes = [
  {
    path: '/',
    name: 'Generator',
    component: GeneratorView
  },
  {
    path: '/library',
    name: 'Library',
    component: LibraryView
  },
  {
    path: '/analyzer',
    name: 'Analyzer',
    component: AnalyzerView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
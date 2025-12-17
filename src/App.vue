<template>
  <div id="app">
    <header class="app-header">
      <h1>🎨 Генератор цветовых палитр</h1>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">Генератор</router-link>
        <router-link to="/library" class="nav-link">Библиотека</router-link>
        <router-link to="/analyzer" class="nav-link">Анализ</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="app-footer">
      <p>Vue 3 + TypeScript • Генератор цветовых палитр</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
  font-weight: bold;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
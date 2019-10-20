// app.js
import Vue from 'vue'
import App from '@/App.vue'
import createRouter from '@/routes'
import createStore from '@/store/index'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // Создаём экземпляр маршрутизатора
  const router = createRouter()
  const store = createStore()
  // sync so that route state is available as part of the store
  sync(store, router)
  const app = new Vue({
    // внедряем маршрутизатор в корневой экземпляр Vue
    router,
    store,
    render: h => h(App)
  })

  // возвращаем и приложение и маршрутизатор
  return { app, router, store }
}
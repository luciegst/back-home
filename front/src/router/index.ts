import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AboutView,
      meta: {
        title: 'Back Home'
      }
    }
  ]
})

const DEFAULT_TITLE = 'Back home'
router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title) || DEFAULT_TITLE
  next()
})

export default router

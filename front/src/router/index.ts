import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Back Home'
    }
  },
  {
    path: '/lost/cats',
    name: 'lost.cats',
    component: () => import('../views/LostCatsView.vue'),
    meta: {
      title: 'Chats Perdus'
    }
  },
  {
    path: '/lost/dogs',
    name: 'lost.dogs',
    component: () => import('../views/LostDogsView.vue'),
    meta: {
      title: 'Chiens Perdus'
    }
  },
  {
    path: '/write/add',
    name: 'ad.page',
    component: () => import('../views/AdPageView.vue'),
    meta: {
      title: 'Annonces'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const DEFAULT_TITLE = 'Back home'
router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title) || DEFAULT_TITLE
  next()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Back Home',
      description: 'Retrouver vos animaux perdus'
    }
  },
  {
    path: '/lost/cats',
    name: 'lost.cats',
    component: () => import('../views/LostCatsView.vue'),
    meta: {
      title: 'Chats Perdus',
      description: 'Retrouver des chats'
    }
  },
  {
    path: '/lost/dogs',
    name: 'lost.dogs',
    component: () => import('../views/LostDogsView.vue'),
    meta: {
      title: 'Chiens Perdus',
      description: 'Retrouver des chiens'
    }
  },
  {
    path: '/write/add',
    name: 'ad.page',
    component: () => import('../views/AdPageView.vue'),
    meta: {
      title: 'Annonces',
      description: 'Ecrire une annonce'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
    redirect: { name: 'account.login' },
    meta: {
      title: 'Connexion',
      description: 'Connexion'
    },
    children: [
      {
        path: '/account/login',
        name: 'account.login',
        components: {
          accountView: () => import('../views/LoginView.vue')
        },
        meta: {
          title: 'Connexion',
          description: 'Se connecter'
        }
      },
      {
        path: '/account/register',
        name: 'account.register',
        components: {
          accountView: () => import('../views/RegisterView.vue')
        },
        meta: {
          title: 'Inscription',
          description: "S'inscrire"
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const DEFAULT_TITLE = 'Back home'
const metaDescription = document.querySelector('meta[name="description"]')
router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title) || DEFAULT_TITLE
  if (metaDescription) {
    metaDescription.setAttribute('content', String(to.meta.description))
  } else {
    console.error('Meta tag for description not found!')
  }
  next()
})

export default router

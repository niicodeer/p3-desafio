// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CronogramaView from '../views/CronogramaView.vue'
import { showLoader, hideLoader } from '../state/loader.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cronograma',
      name: 'cronograma',
      component: CronogramaView // Asigna la ruta al componente
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactoView.vue') // Lazy loading
    },
    {
      path: '/artistas',
      name: 'artistas',
      component: () => import('../views/ArtistasView.vue') // Lazy loading
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: () => import('../views/EntradasView.vue') // Lazy loading
    },
    {
      path: '/checkout/:id', // Ruta dinámica para el formulario
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  showLoader(); 
  setTimeout(() => {
    next(); 
  }, 400); 
});

router.afterEach(() => {
  hideLoader(); 
});

export default router

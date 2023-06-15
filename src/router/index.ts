import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/condutor',
    name: 'condutor',
    component: () => import('../views/condutor/Listagem.vue')
  },
  {
    path: '/veiculo',
    name: 'veiculo',
    component: () => import('../views/veiculo/Listagem.vue')
  },
  {
    path: '/veiculo/:veiculo_id',
    name: 'veiculo_editar',
    component: () => import('../views/veiculo/Editar.vue')
  },
  {
    path: '/marca',
    name: 'marca',
    component: () => import('../views/marca/Listagem.vue')
  },
  {
    path: '/:nomepagina(.*)*',
    name: 'paginanaoencontrada',
    component: () => import('../views/Pagina404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

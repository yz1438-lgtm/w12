import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AddBook from '@/views/AddBook.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseSignin from '@/views/FirebaseSignin.vue'
import FirebaseRegister from '@/views/FirebaseRegister.vue'
import BookList from '../views/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/getbookcount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBook,
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignin
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegister
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  { path: '/booklist', name: 'BookList', component: BookList }
]




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // If route requires auth and user is not authenticated
    next('/access-denied')
  } else {
    next()
  }
})


export default router
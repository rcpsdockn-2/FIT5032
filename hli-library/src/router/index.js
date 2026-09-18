import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import HomeView from '../views/HomeView.vue'
import LibraryRegistrationForm from '../components/LibraryRegistrationForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/library' },
    { path: '/home', name: 'Home', component: HomeView },
    { path: '/library', name: 'Library', component: LibraryRegistrationForm },
    { path: '/about', name: 'About', component: AboutView },
    {
      path: '/firebase-register',
      name: 'FirebaseRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/firebase-signin',
      name: 'FirebaseSignin',
      component: FirebaseSigninView
    },
    { path: '/add-book', name: 'AddBook', component: AddBookView },
    { path: '/:pathMatch(.*)*', redirect: '/library' }
  ]
})

export default router

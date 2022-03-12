import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "../views/SignIn.vue";
import NotFound from "../views/NotFound.vue";
import Restaurants from "../views/Restaurants.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect:'/restaurants'
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants,
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import("../views/RestaurantsFeeds.vue")
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-top',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },

  {
    path: '/signin',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import("../views/SignUp.vue")  
  },

  {
    path: '*',
    name:'NotFound',
    component: NotFound

  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { requireAuth: true },
    redirect: '/home',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../components/Home.vue')
      },
      {
        path: '/archived',
        name: 'Archived',
        component: () => import('../components/Archived.vue')
      },
      {
        path: '/students',
        name: 'Students',
        component: () => import('../components/Students.vue')
      },
      {
        path: '/help',
        name: 'Help',
        component: () => import('../components/Help.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requireAuth: false },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*', redirect: '/'
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.sessionToken !== undefined) {
      next();
    } else {
      next({ path: "/login" });
    }
    return
  }
  next();
});
export default router

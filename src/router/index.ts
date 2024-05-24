import { createRouter, createWebHashHistory, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import usePermission from '@/hooks/permission'
import { useUserStore } from '@/store'
import PageLayout from '@/layout/page-layout.vue'
// import { isLogin } from '@/utils/auth'
import appRoutes from './modules'
import { toolRoutes } from '../views/index'

console.log(toolRoutes, PageLayout)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home-page/home-page.vue'),
    },
    ...appRoutes,
    ...toolRoutes,
    // {
    //   name: 'root',
    //   path: '/',
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/not-found.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  async function crossroads() {
    const Permission = usePermission()
    if (Permission.accessRouter(to)) await next()
    else {
      const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || {
        name: 'notFound',
      }
      await next(destination)
    }
    NProgress.done()
  }
  if (userStore.role) {
    crossroads()
  } else {
    try {
      await userStore.info()
      crossroads()
    } catch (error) {
      next({
        name: 'home',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
      NProgress.done()
    }
  }
})

export default router

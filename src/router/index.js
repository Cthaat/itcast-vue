import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: 'article/manage',
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/articleManage.vue')
        },
        {
          path: 'article/channel',
          component: () =>
            import('@/views/article/articleChannel.vue')
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/user/userAvatar.vue')
        },
        {
          path: 'user/profile',
          component: () => import('@/views/user/userProfile.vue')
        },
        {
          path: 'user/password',
          component: () => import('@/views/user/userPassword.vue')
        }
      ]
    }
  ]
})

// TODO 登录访问拦截
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    return { path: '/login' }
  }
})

export default router

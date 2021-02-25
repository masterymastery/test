import Vue from 'vue'
import Router from './yrouter'

Vue.use(Router)

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
    {
        path: '/byebye',
        component: () => import('@/components/byebye.vue'),
        hidden: true, // 导航菜单忽略该项
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/components/hello.vue'),
        name: 'hello',
    },
]

export default new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: constRoutes
  });
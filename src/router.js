import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/users/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }]
  }
]

const router = new VueRouter({
  routes
})
/* 挂载路由导航守卫 */
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪里来
  // next 是一个放行函数  next()表示放行  next('/login)表示强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router

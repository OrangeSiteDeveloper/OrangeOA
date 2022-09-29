import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 用户路由配置
const userRouter = [
  {
    path: 'joinManager',
    name: "joinManager",
    meta: { auth: 'root' },
    component: () => import('@/pages/joinManager.vue')
  },
]

// 配置路由
const routes = [
  { path: '/login', name: "Login", meta: { auth: 'universal' }, component: () => import('@/pages/Login.vue') },
  { path: '/register', name: "Register", meta: { auth: 'universal' }, component: () => import('@/components/basic/register.vue') },
  {
    path: '/',
    name: "home",
    meta: { auth: 'universal' },
    component: () => import('@/pages/home.vue'),
    children: (userRouter),
  },
]

const router = new VueRouter({ routes })

// 鉴权
router.beforeEach((to, from, next) => {

  const userAuth = sessionStorage.getItem('auth')
  let token = Vue.$cookies.get('token')
  if (!userAuth) token = null

  function checkAuth() {

    const userAuth = sessionStorage.getItem('auth')
    const rooterAuth = to.meta.auth
    let isAllow = false

    /**
     * 成功的规则:
     * rooterAuth == 'universal'
     * rooterAuth != 'universal' && userAuth == rooterAuth
    */
    if (rooterAuth != 'universal' && userAuth == rooterAuth)
      isAllow = true
    else if (rooterAuth == 'universal')
      isAllow = true

    return isAllow

  }

  /**
   * 有token、path不为白名单 next
   * 有token、path为白名单 next('/)
   * 无token、path不为白名单 next('/login')
   * 无token、path为白名单 next
  */

  if (token && (to.path != "/login" && to.path != "/loginRooter" && to.path != "/register")) {
    if (checkAuth())
      next()
    else {
      Vue.prototype.$message({ message: "无权限", type: "error" })
      res.end()
    }
  }
  else if (token && (to.path == "/login" || to.path == "/loginRooter" || to.path == "/register")) {
    next('/')
  }
  else if ((token == null || token == '') && (to.path !== '/login' && to.path !== "/loginRooter" && to.path !== "/register")) {
    Vue.prototype.$message({ message: "登录过期", type: "warning" })
    next('/login')
  }
  else if ((token == null || token == '') && (to.path == "/login" || to.path == "/loginRooter" || to.path == "/register")) {
    if (checkAuth())
      next()
    else {
      Vue.prototype.$message({ message: "无权限", type: "error" })
      res.end()
    }
  }

})

export default router

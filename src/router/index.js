import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "",
      redirect: "/login"
    },
  {
    path: "/index",
    component: () => import("../views/index/index.vue"),
    children: [
      {
        path: "",
        redirect: "zhuye"
      },
      {
        path: "zhuye",
        component: () => import("../views/index/zhuye.vue")
      },

    ]
  },
  {
    path: "/login",
    component: () => import("../views/login/login.vue")
  },

]

const router = new VueRouter({
  routes
})

export default router

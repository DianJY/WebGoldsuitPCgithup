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
      {
        path: "user",
        component: () => import("../views/systemadmin/user.vue")
      },
      {
        path: "role",
        component: () => import("../views/systemadmin/role.vue")
      },
      {
        path: "projectapply",
        component: () => import("../views/projectapplyrun/projectapply.vue")
      },
      {
        path: "loan",
        component: () => import("../views/loan/loan.vue")
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

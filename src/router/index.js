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
      {
        path: "drafts",
        component: () => import("../views/projectapplyrun/drafts.vue")
      },
      {
        path: "agencywork",
        component: () => import("../views/projectapplyrun/agencywork.vue")
      },
      {
        path: "workdone",
        component: () => import("../views/projectapplyrun/workdone.vue")
      },
      {
        path: "Banner",
        component: () => import("../views/content/Banner.vue")
      },
      {
        path: "News",
        component: () => import("../views/content/News.vue")
      },
      {
        path: "information",
        component: () => import("../views/content/information.vue")
      },
      {
        path: "feedback",
        component: () => import("../views/content/feedback.vue")
      },
      {
        path: "repaymentAlso",
        component: () => import("../views/HuanKuan/repaymentAlso.vue")
      },
      {
        path: "repaymenthave",
        component: () => import("../views/HuanKuan/repaymenthave.vue")
      },
      {
        path: "Hasbeenpayment",
        component: () => import("../views/HuanKuan/Hasbeenpayment.vue")
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

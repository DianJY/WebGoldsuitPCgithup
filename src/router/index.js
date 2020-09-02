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
        path: "approved",
        component: () => import("../views/pm/approved.vue")
      },
      {
        path: "released",
        component: () => import("../views/pm/released.vue")
      },
      {
        path: "failure",
        component: () => import("../views/pm/failure.vue")
      },
      {
        path: "payment",
        component: () => import("../views/pm/payment.vue")
      },
      {
        path: "investment",
        component: () => import("../views/pm/investment.vue")
      },
      {
        path: "depositcharge",
        component: () => import("../views/remit/depositcharge.vue")
      },
      {
        path: "deposithastodo",
        component: () => import("../views/remit/deposithastodo.vue")
      },
      {
        path: "hasbeencharged",
        component: () => import("../views/remit/hasbeencharged.vue")
      },
      {
        path: "feedback",
        component: () => import("../views/content/feedback.vue")
      },
 
      {
        path: "log",
        component: () => import("../views/logmanagement/log.vue")
      },
      {
        path: "repaymentagency",
        component: () => import("../views/repayment/repaymentagency.vue")
      },
      {
        path: "repaymenthasbeenmade",
        component: () => import("../views/repayment/repaymenthasbeenmade.vue")
      },
      {
        path: "paid",
        component: () => import("../views/repayment/paid.vue")
      },
      {
        path: "repaymentbyremittance",
        component: () => import("../views/repayment/repaymentbyremittance.vue")
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "",
  redirect: "/login"
}, {
  path: "/index",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/index/index.vue"));
    });
  },
  children: [{
    path: "",
    redirect: "zhuye"
  }, {
    path: "zhuye",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/index/zhuye.vue"));
      });
    }
  }, {
    path: "user",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/systemadmin/user.vue"));
      });
    }
  }, {
    path: "role",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/systemadmin/role.vue"));
      });
    }
  }, {
    path: "projectapply",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/projectapplyrun/projectapply.vue"));
      });
    }
  }, {
    path: "loan",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/loan/loan.vue"));
      });
    }
  }, {
    path: "drafts",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/projectapplyrun/drafts.vue"));
      });
    }
  }, {
    path: "agencywork",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/projectapplyrun/agencywork.vue"));
      });
    }
  }, {
    path: "workdone",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/projectapplyrun/workdone.vue"));
      });
    }
  }, {
    path: "Banner",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/content/Banner.vue"));
      });
    }
  }, {
    path: "News",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/content/News.vue"));
      });
    }
  }, {
    path: "information",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/content/information.vue"));
      });
    }
  }, {
    path: "approved",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/pm/approved.vue"));
      });
    }
  }, {
    path: "released",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/pm/released.vue"));
      });
    }
  }, {
    path: "failure",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/pm/failure.vue"));
      });
    }
  }, {
    path: "payment",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/pm/payment.vue"));
      });
    }
  }, {
    path: "investment",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/pm/investment.vue"));
      });
    }
  }, {
    path: "depositcharge",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/remit/depositcharge.vue"));
      });
    }
  }, {
    path: "deposithastodo",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/remit/deposithastodo.vue"));
      });
    }
  }, {
    path: "hasbeencharged",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/remit/hasbeencharged.vue"));
      });
    }
  }, {
    path: "feedback",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/content/feedback.vue"));
      });
    }
  }, {
    path: "log",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/logmanagement/log.vue"));
      });
    }
  }, {
    path: "repaymentagency",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/repayment/repaymentagency.vue"));
      });
    }
  }, {
    path: "repaymenthasbeenmade",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/repayment/repaymenthasbeenmade.vue"));
      });
    }
  }, {
    path: "paid",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/repayment/paid.vue"));
      });
    }
  }, {
    path: "repaymentbyremittance",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/repayment/repaymentbyremittance.vue"));
      });
    }
  }, {
    path: "Deposit_log",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/logmanagement/Deposit_log.vue"));
      });
    }
  }, {
    path: "Reimbursement_log",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/logmanagement/Reimbursement_log.vue"));
      });
    }
  }]
}, {
  path: "/login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/login/login.vue"));
    });
  }
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;
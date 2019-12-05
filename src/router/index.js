import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    meta: { 
      requiresAuth: true
    },
    component: () => import("../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: { 
      requiresNotLogged: true
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { 
      requiresNotLogged: true
    },
    component: () => import("../views/Register.vue")
  },
  { path: "/404", component: () => import("../views/404.vue") },
  {
    path: "/:user?",
    name: "dashboard",
    meta: { 
      requiresAuth: true
    },
    component: () => import("../views/Overview.vue")
  },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.state.status = false;
  const loggedIn = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresNotLogged)) {
    if (loggedIn) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {

    next() // make sure to always call next()!
  }
})


export default router;

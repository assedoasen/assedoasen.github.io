import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth";

const Callback = () => import("@/views/callback");
const Profile = () => import("@/views/Profile");
const Page404 = () => import("@/views/Sites/Page404");
const Page500 = () => import("@/views/Sites/Page500");
const Login = () => import("@/views/Sites/Login");
const Forgot = () => import("@/views/Sites/Forgot");
const Register = () => import("@/views/Sites/Register");

Vue.use(Router);

function requireAuth(to, from, next) {
  auth.loggedIn().then(response => {
    if (!response) {
      next({
        path: "/sites/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  });
}

const router = new Router({
  mode: "history",
  linkActiveClass: "open active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: Profile,
      beforeEnter: requireAuth,
    },
    {
      path: "/sites",
      redirect: "/sites/404",
      name: "Sites",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "forgot",
          name: "Forgot",
          component: Forgot,
        },
        {
          path: "logout",
          name: "Logout",
          beforeEnter(to, from, next) {
            auth.logout();
            next("/");
          },
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
    {
      path: "/callback",
      name: "Callback",
      component: Callback,
    },
    {
      path: "**",
      redirect: "/sites/404",
    },
  ],
});

export default router;

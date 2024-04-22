import { createRouter, createWebHistory, RouteRecordRaw,RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { usePermissionsStore } from './permissions.store';
import LoginComponent from '../views/Login.vue'
import { userStore } from "@/stores/userStore";

const menu1Guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const permissionsStore = usePermissionsStore();
  const permissions = permissionsStore.getPermissions;
  
  if (permissions.menu1) {
    next();
  } else {
    next(false);
  }
};

const menu2Guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const permissionsStore = usePermissionsStore();
  const permissions = permissionsStore.getPermissions;

  if (permissions.menu2) {
    next();
  } else {
    next(false);
  }
};

const menu3Guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const permissionsStore = usePermissionsStore();
  const permissions = permissionsStore.getPermissions;

  if (permissions.menu3) {
    next();
  } else {
    next(false);
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path:"/login",
    name : "login",
    component :LoginComponent,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    beforeEnter: [menu1Guard],
    component: ()=> import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    beforeEnter: [menu2Guard],
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/flow",
    name: "flow",
    beforeEnter: [menu3Guard],
    component: () =>
      import("../views/Flow.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/grid",
    name: "grid",
    beforeEnter: [menu3Guard],
    component: () =>
      import("../views/EditedGrid.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Call beforeEach on the router instance
router.beforeEach((to, from, next) => {
  const store = userStore()

   if (to.meta.requiresAuth && !store.isLoggedIn){
    next('/login')
   }
   else{
    next()
   }
});

export default router;

import { createRouter,createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/home/Home.vue")
      },
      {
        path: "/detail/:keywords",
        name: "Detail",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "detail" */ "@/views/detail/index.vue")
      },
      {
        path: "/detail/:keywords/:type",
        name: "detaillist",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "detail" */ "@/views/detail/detaillist.vue"
          )
      },
      {
        path: "/albums/:id",
        name: "albums",
        component: () =>
          import(
            /* webpackChunkName: "albumsdetail" */ "@/views/detail/albumsdetail.vue"
          )
      },
      {
        path: "/artists/:id",
        name: "artists",
        component: () =>
          import(
            /* webpackChunkName: "artistsdetail" */ "@/views/detail/artistsdetail.vue"
          )
      },
      {
        path: "/playlist/:id",
        name: "playlist",
        component: () =>
          import(
            /* webpackChunkName: "playlistdetail" */ "@/views/detail/playlistdetail.vue"
          )
      },
      {
        path: "/userprofile/:id",
        name: "userdetail",
        component: () =>
          import(
            /* webpackChunkName: "userdetail" */ "@/views/detail/userdetail.vue"
          )
      },
      {
        path: "/next/",
        name: "next",
        component: () =>
          import(/* webpackChunkName: "next" */ "@/views/nextlist/index.vue")
      },
      {
        path: "/settings/",
        name: "settings",
        redirect: "/settings/theme/",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/views/settings/index.vue"
          ),
        children: [
          {
            path: "/settings/theme/",
            name: "theme",
            component: () =>
              import(
                /* webpackChunkName: "theme" */ "@/views/settings/theme.vue"
              )
          },
          {
            path: "/settings/general/",
            name: "general",
            component: () =>
              import(
                /* webpackChunkName: "general" */ "@/views/settings/general.vue"
              )
          },
          {
            path: "/settings/account/",
            name: "account",
            component: () =>
              import(
                /* webpackChunkName: "account" */ "@/views/settings/account.vue"
              )
          },
          {
            path: "/settings/language/",
            name: "language",
            component: () =>
              import(
                /* webpackChunkName: "language" */ "@/views/settings/language.vue"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { x: 0, y: 0 };
  }
});

export default router;

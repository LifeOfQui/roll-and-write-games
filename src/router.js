import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dices",
      name: "dices",
      component: () =>
        import(/* webpackChunkName: "dices" */ "./views/Dices.vue")
    },
    {
      path: "/qwixx",
      name: "qwixx",
      component: () =>
        import(/* webpackChunkName: "qwixx" */ "./views/Qwixx.vue")
    },
    {
      path: "/qwixx/dices",
      name: "qwixxDices",
      component: () =>
          import(/* webpackChunkName: "qwixx" */ "./components/Qwixx/Dices.vue")
    },
    {
      path: "/qwixx/basic",
      name: "qwixxBasic",
      component: () =>
        import(/* webpackChunkName: "qwixx" */ "./components/Qwixx/Index.vue")
    },
    {
      path: "/qwixx/gemixxt",
      name: "qwixxGemixxt",
      component: () =>
          import(/* webpackChunkName: "qwixx" */ "./components/Qwixx/Gemixxt.vue")
    },
    {
      path: "/knister",
      name: "knister",
      component: () =>
        import(/* webpackChunkName: "knister" */ "./views/Knister.vue")
    },
    {
      path: "/wuerfel-bingo",
      name: "wuerfelbingo",
      component: () =>
        import(/* webpackChunkName: "wuerfelbingo" */ "./views/Wuerfelbingo.vue")
    }
  ]
});

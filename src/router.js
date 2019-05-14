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
      path: "/kniffel-dices",
      name: "kniffelDices",
      component: () =>
        import(/* webpackChunkName: "dices" */ "./components/KniffelDices.vue")
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
        import(/* webpackChunkName: "Index" */ "./components/Qwixx/Index.vue")
    },
    {
      path: "/qwixx/gemixxt",
      name: "qwixxGemixxt",
      component: () =>
        import(/* webpackChunkName: "Gemixxt" */ "./components/Qwixx/Gemixxt.vue")
    },
    {
      path: "/qwixx/connected",
      name: "qwixxConnected",
      component: () =>
        import(/* webpackChunkName: "Connected" */ "./components/Qwixx/Connected.vue")
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
    },
    {
      path: "/wuerfelland",
      name: "wuerfelland",
      component: () =>
        import(/* webpackChunkName: "wuerfelland" */ "./views/Wuerfelland.vue")
    },
    {
      path: "/wuerfelland-dices",
      name: "wuerfelland-dices",
      component: () =>
        import(/* webpackChunkName: "wuerfelland-dices" */ "./components/WLDices.vue")
    },
    {
      path: "/qwinto",
      name: "qwinto",
      component: () =>
        import(/* webpackChunkName: "qwinto" */ "./views/Qwinto.vue")
    },
    {
      path: "/qwinto/dices",
      name: "qwintoDices",
      component: () =>
        import(/* webpackChunkName: "qwintoDices" */ "./components/Qwinto/Dices.vue")
    },
    {
      path: "/krisskross",
      name: "krisskross",
      component: () =>
        import(/* webpackChunkName: "krisskross" */ "./views/KrissKross.vue")
    },
    {
      path: "/krisskross/dices",
      name: "krisskrossDices",
      component: () =>
        import(/* webpackChunkName: "krisskrossDices" */ "./components/KrissKross/Dices.vue")
    }
  ]
});

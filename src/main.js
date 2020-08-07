import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import initRem from "./utils/rem";
import plugin from "./utils/plugins";

Vue.use(initRem);
Vue.use(plugin);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

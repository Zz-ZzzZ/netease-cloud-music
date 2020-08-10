import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import initRem from "./utils/rem";
import plugin from "./utils/plugins";
import BaseIcon from "@/base/BaseIcon";
import BaseButton from "@/base/BaseButton";
import "@/assets/iconfont/iconfont";
import vconsole from "vconsole";
const vConsole = new vconsole();

Vue.use(vConsole);
Vue.use(initRem);
Vue.use(plugin);
Vue.component(BaseIcon.name, BaseIcon);
Vue.component(BaseButton.name, BaseButton);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

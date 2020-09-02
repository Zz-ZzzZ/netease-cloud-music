import Vue from "vue";
import Vuex from "vuex";
import playList from "@/store/playList";
import playStatus from "@/store/playStatus";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    playList,
    playStatus
  }
});

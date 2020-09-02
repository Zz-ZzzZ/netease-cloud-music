import Vue from "vue";
import Vuex from "vuex";
import songId from "@/store/songId";
import playStatus from "@/store/playStatus";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    songId,
    playStatus
  }
});

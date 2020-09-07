const state = {
  // 播放状态
  status: false,
  // 播放模式（列表循环0,单曲循环1,随机播放2）
  mode: 0,
  // 版权信息
  haveUrl: false
};

const getters = {
  getStatus: status => status,
  getMode: mode => mode
};

const mutations = {
  setStatus(state, data) {
    state.status = data;
  },
  setMode(state, data) {
    state.mode = data;
  },
  setHaveUrl(state, data) {
    state.haveUrl = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};

const state = {
  playList: [],
  nowPlayIndex: undefined
};

const getters = {
  getPlayList: playList => playList,
  getNowPlayIndex: nowPlayIndex => nowPlayIndex
};

const mutations = {
  setPlayList: (state, data) => {
    state.playList = data.playList;
    state.nowPlayIndex = data.nowPlayIndex;
  },
  setNextPlayIndex: (state, data) => {
    data >= state.playList.length - 1
      ? (state.nowPlayIndex = 0)
      : (state.nowPlayIndex += 1);
  },
  setPrevPlayIndex: (state, data) => {
    data <= 0
      ? (state.nowPlayIndex = state.playList.length - 1)
      : (state.nowPlayIndex -= 1);
  },
  setNowPlayIndex: (state, data) => {
    state.nowPlayIndex = data;
  }
};

const actions = {
  setPlayList: (context, data) => {
    context.commit("setPlayList", data);
  },
  setNowPlayIndex: (context, data) => {
    context.commit("setNowPlayIndex", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

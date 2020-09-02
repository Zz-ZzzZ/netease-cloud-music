const state = {
  playList: [],
  nowPlayIndex: 0
};

const getters = {
  getPlayList: songId => songId
};

const mutations = {
  setPlayList: (state, data) => {
    state.playList = data.playList.map(item => item.id);
    state.nowPlayIndex = data.nowPlayIndex;
  },
  setNewPlayIndex: (state, data) => {
    state.nowPlayIndex = data.nowPlayIndex;
  }
};

const actions = {
  setPlayList: (context, data) => {
    context.commit("setPlayList", data);
  },
  setNewPlayIndex: (context, data) => {
    context.commit("setNewPlayIndex", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

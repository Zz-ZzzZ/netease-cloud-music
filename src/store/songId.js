const state = {
  songId: 0
};

const getters = {
  getSongId: songId => songId
};

const mutations = {
  setSongId: (state, data) => {
    state.songId = data;
  }
};

const actions = {
  setSongId: (context, data) => {
    context.commit("setSongId", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

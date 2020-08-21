const state = {
  songInfo: ""
};

const getters = {
  getSongInfo: songInfo => songInfo
};

const mutations = {
  setSongInfo: (state, data) => {
    console.log(data);
    state.songInfo = data;
  }
};

const actions = {
  setSongInfo: (context, data) => {
    context.commit("setSongInfo", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

const state = {
  status: false
};

const getters = {
  getStatus: status => status
};

const mutations = {
  setStatus(state, data) {
    state.status = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};

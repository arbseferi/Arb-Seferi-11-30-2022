export default {
  namespaced: true,
  state: {
  },
  mutations: {
    LOGIN (state, payload) {
      localStorage.sessionToken = payload
    },
  },
  actions: {
    async login ({ commit }, body) {
        var users = JSON.parse(localStorage.users)
        if (users[0].email === body.email && users[0].password === body.password){
          commit('LOGIN','token-' + body.email)
        }
    },
  },
  getters: {
  },
}

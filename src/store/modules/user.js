import { loginAPI } from '@/api'

const getDefaultState = () => {
  return {
    token: null,
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const actions = {
  async loginAction({ commit }, loginData) {
    const  data  = await loginAPI(loginData)
    console.log(data);
    commit('SET_TOKEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


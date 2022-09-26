import { loginAPI, getUserInfo,getUsermsg } from '@/api'


const getDefaultState = () => {
  return {
    token: null,
    userinfo: null
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  },
}

const actions = {
  async loginAction({ commit }, loginData) {
    const data = await loginAPI(loginData)
    console.log(data);
    commit('SET_TOKEN', data)
  },
  async UserInfoAPI({ commit }) {
    const data = await getUserInfo()
    const usermsg = await getUsermsg(data.userId)
    const baseResult = { ...data, ...usermsg } // 将两个接口结果合并
    commit('SET_USERINFO', baseResult)
    return JSON.parse(JSON.stringify(baseResult))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


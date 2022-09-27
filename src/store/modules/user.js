import { loginAPI, getUserInfo,getUsermsg } from '@/api'


const getDefaultState = () => {
  return {
    token: null,
    userinfo: null,
    tokenTime:0
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
  SET_TOKENTIME: (state, tokenTime) => {
    state.tokenTime = tokenTime
  },
}

const actions = {
  async loginAction({ commit }, loginData) {
    const data = await loginAPI(loginData)
    console.log(data);
    commit('SET_TOKEN', data)
    commit('SET_TOKENTIME', new Date().getTime())
  },
  async UserInfoAPI({ commit }) {
    const data = await getUserInfo()
    const usermsg = await getUsermsg(data.userId)
    const baseResult = { ...data, ...usermsg } // 将两个接口结果合并
    commit('SET_USERINFO', baseResult)
    return JSON.parse(JSON.stringify(baseResult))
  },
  emptytoken({commit}) {
    commit('SET_TOKEN')
    commit('SET_USERINFO')
    // commit('SET_TOKENTIME')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


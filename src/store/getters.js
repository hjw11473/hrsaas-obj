const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userid: state => state.user.userinfo.userId,
  staffPhoto: state => state.user.userinfo.staffPhoto,
  tokenTime: state => state.user.tokenTime,
  companyId: store => state.user.userinfo
}
export default getters

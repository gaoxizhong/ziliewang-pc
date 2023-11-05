const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  realAvatar: state => state.user.realAvatar,
  name: state => state.user.name,
  staffAvatar: state => state.user.staffAvatar,
  staffName: state => state.user.staffName,

}
export default getters

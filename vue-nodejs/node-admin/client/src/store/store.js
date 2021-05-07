import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER',
  SET_USERNAME: 'SET_USERNAME'

}

const state = {
  isAuthenticated:false,
  user:{},
  isCollapse: false,
  userName: ''
}

const getters = {
  isAuthenticated:state=>state.isAuthenticated,
  user:state=>state.user,
  userName:state=>state.userName
}

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.SET_USER](state,user){
    if(user) state.user = user
    else state.user = false
  },
  [types.SET_USERNAME](state,userName){
    if(userName) state.userName = userName
    else state.userName = ''
  },
}

const actions = {
  setAuthenticated:({ commit },isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser:({ commit },user)=>{
    commit(types.SET_USER,user)
  },
  setUserName:({ commit },userName)=>{
    commit(types.SET_USERNAME,userName)
  },
  clearCurrentState:({ commit })=>{
    commit(types.SET_AUTHENTICATED,false)
    commit(types.SET_USER,null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

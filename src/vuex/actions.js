import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'
export default {
  async getAddress ({commit,state}){
    //发送ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //将结果发送到mutation
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  async getCategorys ({commit}){
    //发送ajax请求
    const result = await reqCategorys()
    //将结果发送到mutation
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  async getShops ({commit, state}){
    //发送ajax请求
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    //将结果发送到mutation
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  //保存用户信息
  recordUserInfo({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  //异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER_INFO)
    }
  },
  //获取商家商品信息
  async getShopGoods ({commit}, callBack){
    const result = await reqShopGoods()
    if(result.code===0){
      commit(RECEIVE_GOODS, {goods: result.data})
      callBack && callBack()
    }
  },
  //获取商家评价
  async getShopRatings ({commit}) {
    const result =await reqShopRatings()
    if(result.code===0){
      commit(RECEIVE_RATINGS, {ratings: result.data})
    }
  },
  //获取商家信息
  async getShopInfo ({commit}) {
    const result =await reqShopInfo()
    if(result.code===0){
      commit(RECEIVE_INFO, {info: result.data})
    }
  }
}

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops
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
  }
}

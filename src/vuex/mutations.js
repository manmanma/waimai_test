import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state){
    state.userInfo = {}
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state, {food}){
    if(!food.count){//第一次没有count
      //food.count = 1 给food新增一个属性并赋值为1  新增的属性没有数据劫持 数据更新但页面没有改变
      Vue.set(food, 'count', 1)//给有数据绑定的对象添加指定的属性和值
      state.shopCart.push(food)//添加到购物车
    }else{
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}){
    if(food.count){//count有值才可以减减
      food.count--
      if(food.count === 0){//如果值为0 从购物车中移除该食物
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 将所有food的count置为0
    state.shopCart.forEach(food=> food.count =0 )
    state.shopCart = []
  }
}

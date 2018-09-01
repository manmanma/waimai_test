export default {
  cartFoodCount(state) {
    return state.shopCart.reduce((preCount, food)=> preCount + food.count ,0)
  },
  cartFoodPrice (state) {
    return state.shopCart.reduce((prePrice, food)=> prePrice + food.count*food.price ,0)
  }
}

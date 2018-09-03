export default {
  //购物车商品的总数量
  cartFoodCount(state) {
    return state.shopCart.reduce((preCount, food)=> preCount + food.count ,0)
  },
  //购物车商品的总价格
  cartFoodPrice (state) {
    return state.shopCart.reduce((prePrice, food)=> prePrice + food.count*food.price ,0)
  },
  // 商家评价的总数量
  ratingsTotalCount (state) {
    return state.ratings.length
  },
  // 商家满意评价的总数量
  ratingsPositiveCount (state) {
    return state.ratings.reduce( (preCount, food)=> preCount + (food.rateType === 0 ? 1: 0),0)
  },
}

<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:cartFoodCount>0}" @click="toggleShowShop">
              <i class="iconfont icon-shopping_cart" :class="{highlight:cartFoodCount>0}"></i>
            </div>
            <div class="num"  v-if="cartFoodCount">{{cartFoodCount}}</div>
          </div>
          <div class="price" :class="{highlight: cartFoodPrice>0}">￥{{cartFoodPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" >
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="showList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in shopCart">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <div class="list-mask" v-show="showList" @click="toggleShowShop"></div>
  </div>
</template>
<script>
  import Scroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'
  import {mapState,mapGetters} from 'vuex'
  import CartControl from '../CartControl/CartControl.vue'
  export default {
    data() {
      return {
        isShow: false,
      }
    },
    computed: {
      ...mapState(['shopCart','info']),
      ...mapGetters(['cartFoodCount','cartFoodPrice']),
      //显示结算文字
      payText() {
        const {cartFoodPrice} = this
        const {minPrice} = this.info
        if(cartFoodPrice === 0){
          return `还差￥${minPrice}元起送`
        }else if(cartFoodPrice < minPrice){
          return `还差￥${minPrice - cartFoodPrice}元起送`
        }else{
          return '去结算'
        }
      },
      //是否显示购物车中的食物列表
      showList () {
        if(this.cartFoodCount===0){//如果购物车数量为0不显示
          this.isShow = false
          return false
        }
        if(this.isShow){
          //页面更新后创建scroll
          this.$nextTick(()=>{
            if(!this.scroll){//第一次打开
              this.scroll = new Scroll('.list-content', {
                click: true
              })
            }else{
              //刷新
              this.scroll.refresh()
            }
          })
        }
        return this.isShow
      },
      //显示结算样式
      payClass() {
        const {cartFoodPrice} = this
        const {minPrice} = this.info
        return cartFoodPrice>=minPrice ? 'enough' : 'not-enough'
      }
    },
    methods: {
      //是否显示加入购物车食物列表
      toggleShowShop () {
        if(this.cartFoodCount){
          this.isShow = !this.isShow
        }
      },
      //清空购物车
      clearCart () {
        MessageBox.confirm('确定清空吗？').then(
          action=> this.$store.dispatch('clearCart'),
          action=> console.log('取消')
        )
      }
    },
    components: {
      CartControl
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: #02a774
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        transform translateY(0)
        opacity 0
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom_border_1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>


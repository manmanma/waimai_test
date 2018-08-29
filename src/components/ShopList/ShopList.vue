<template>
  <div class="shop_container">
    <ul class="shop_list" v-if="shops.length>0">
      <li class="shop_li" v-for="(shop,index) in shops" :key="index">
        <a href="javascript:;">
          <div class="shop_left">
            <img :src="baseImgUrl+shop.image_path" alt="shop_img" class="shop_img">
          </div>
          <div class="shop_right">
            <div class="shop_right_top">
              <h4 class="shop_title ellipsis">{{shop.name}}</h4>
              <ul class="shop_detail_ul">
                <li v-for="(support,index) in shop.supports">{{support.icon_name}}</li>
              </ul>
            </div>
            <div class="shop_right_middle">
              <div class="shop_order_left">
                <Star :rating="shop.rating" :size="24"/>
                <div class="rating">{{shop.rating}}</div>
                <div class="sale">月售{{shop.recent_order_num}}单</div>
              </div>
              <div class="shop_order_right">
                <span class="delivery_style delivery_left">{{shop.delivery_mode.text}}</span>
                <span class="delivery_style delivery_right">准时达</span>
              </div>
            </div>
            <div class="shop_right_bottom">
              <p class="shop_delivery_msg">
                <span>￥{{shop.float_minimum_order_amount}}元起送</span>
                <span class="segmentation"> / </span>
                <span>配送费{{shop.float_delivery_fee}}元</span>
              </p>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <ul v-else>
      <li v-for="i in 10" :key="i">
        <img src="./images/shop_back.svg" alt="shop_back">
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Star from '../Star/Star.vue'
  export default {
    data () {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    computed: {
      ...mapState(['shops'])
    },
    components: {
      Star
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  $topicC = #02a774 //主题颜色
  @import "../../assets/stylus/mixins.styl"
  .shop_container
    width 100%
    height 100%
    padding-bottom 50px
    .shop_list
      width 100%
      height 100%
      .shop_li
        width 100%
        height 100%
        background-color white
        >a
          display block
          width 100%
          height 100%
          box-sizing border-box
          padding 15px 8px
          &::after
            clearFix()
          .shop_left
            float left
            box-sizing border-box
            width 23%
            height 75px
            padding-right 10px
            .shop_img
              display block
              width 100%
              height 100%
          .shop_right
            float right
            width 77%
            .shop_right_top
              width 100%
              &::after
                clearFix()
              .shop_title
                &::before
                  content '品牌'
                  display inline-block
                  font-size 11px
                  line-height 11px
                  color #333
                  background-color #ffd930
                  padding 2px
                  border-radius 2px
                  margin-right 5px
                float left
                width 140px
                font-size 16px
                line-height 16px
                font-weight 700
                color #333
              .shop_detail_ul
                float right
                margin-top 3px
                >li
                  float left
                  font-size 10px
                  color #999
                  border 1px solid #f1f1f1
                  padding 0 2px
                  border-radius 2px
            .shop_right_middle
              width 100%
              margin-top 18px
              margin-bottom 18px
              &::after
                clearFix()
              .shop_order_left
                float left
                >div
                  float left
                .rating
                  font-size 10px
                  color #ff6000
                  margin-left 4px
                .sale
                  font-size 10px
                  color #666
                  margin-left 4px
              .shop_order_right
                float right
                .delivery_style
                  display inline-block
                  font-size 12px
                  padding 1px
                  border-radius 2px
                .delivery_left
                  color #ffffff
                  background-color #02a774
                  border 1px solid #02a774
                .delivery_right
                  color #02a774
                  background-color #ffffff
                  border 1px solid #02a774
            .shop_right_bottom
              width 100%
              font-size 12px
              &::after
                clearFix()
              .shop_delivery_msg
                float left
                transform-origin 0
                transform scale(.9)
                color #666
                .segmentation
                  color #ccc

</style>

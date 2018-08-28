<template>
  <section>
    <!--头部导航-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--主题内容-->
    <Main class="home_main">
      <div class="home_container">
        <!--轮播图-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <ul class="swiper-slide">
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/1.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/2.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/3.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/4.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/5.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/6.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/7.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/8.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>

            </ul>
            <ul class="swiper-slide">
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/1.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/2.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/3.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/4.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/5.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/6.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/7.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="./images/nav/8.jpg" alt="">
                  <span>甜品饮料</span>
                </a>
              </li>

            </ul>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <!--商家列表-->
        <div class="home_shop border_px">
          <!--商家头部标题-->
          <nav class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span>附近商家</span>
          </nav>
          <!--列表显示-->
          <ShopList/>
        </div>
      </div>
    </Main>
  </section>
</template>
<script>
  import Swiper  from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  export default {
    async mounted () {
      new Swiper ('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },
    components: {
      ShopList
    },
    computed: {
      ...mapState(['address'])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  $topicC = #02a774 //主题颜色
  @import "../../assets/stylus/mixins.styl"
  section
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    .home_main
      width 100%
      height 100%
      padding-top 50px
      .swiper-container
        background-color white
        width 100%
        height 200px
        padding-bottom 10px
        .swiper-slide
          width 100%
          height 100%
          li
            float left
            width 25%
            height 50%
            >a
              width 100%
              height 100%
              display flex
              flex-direction column
              align-items center
              justify-content center
              img
                width 60px
              span
                font-size 12px
        .swiper-pagination-bullet-active
          background-color $topicC
      .home_shop
        top_border_px(#ddd)
        margin-top 10px
        background-color white
        .shop_header
          width 100%
          height 30px
          box-sizing border-box
          padding 10px 10px 0
          span
            font-size 14px
            color #999
            line-height 20px

</style>

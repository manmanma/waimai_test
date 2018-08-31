<template>
  <section>
    <!--头部导航-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <router-link to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </span>
      <span class="header_login" slot="right">
        <router-link to="/login" class="header_login_text">登录|注册</router-link>
      </span>
    </HeaderTop>
    <!--主题内容-->
    <Main class="home_main">
      <div class="home_container">
        <!--轮播图-->
        <div>
          <div class="swiper-container" v-if="categorys.length>0">
            <div class="swiper-wrapper">
              <ul class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <li v-for="(category,index) in categorys" :key="category.id">
                  <a href="javascript:;">
                    <img :src="imgBaseUrl+category.image_url" alt="">
                    <span>{{category.title}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="swiper_back" v-else>
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
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    async mounted () {
      //获取商家分类列表
      this.$store.dispatch('getCategorys')
      //获取商家列表
      this.$store.dispatch('getShops')
    },
    components: {
      ShopList
    },
    computed: {
      ...mapState(['address','categorys']),
      categorysArr () {
        const max = 8
        const {categorys} = this
        const arr = []
        let smallArr = []
        categorys.forEach((category,index) => {
          if(smallArr.length===0) {
            arr.push(smallArr)
          }
          smallArr.push(category)
          if(smallArr.length === max) {
            smallArr = []
          }
        })
        return arr
      }
    },
    watch: {
      categorys (value) {
        //监视category更新完成后调用$nextTick 回调函数中使用轮播
        this.$nextTick( () => {
          new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
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

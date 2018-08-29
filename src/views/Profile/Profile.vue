<template>
  <section>
    <!--头部导航-->
    <HeaderTop title="我的"/>
    <router-link :to="userInfo._id ? '/userinfo': '/login' ">
      <div class="user_info border_px">
          <div class="user_icon">
            <i class="iconfont icon-person"></i>
          </div>
          <div class="user_login_mobile loginClick" >
            <p v-if="!userInfo.phone"><a href="javascript:;">
              {{userInfo.name || '登录/注册'}}
            </a></p>
            <p><i class="iconfont icon-shouji"></i><span>暂无绑定手机号</span></p>
          </div>
          <div class="goto_login">
            <i class="iconfont icon-jiantou1"></i>
          </div>
      </div>
    </router-link>
    <div class="user_info_data border_px">
      <a href="javascript:;">
        <span class="my_data_top my_balance">0.00</span>元<br>
        <span class="my_data_bottom">我的余额</span>
      </a>
      <a href="javascript:;">
        <span class="my_data_top my_discount">0</span>个<br>
        <span class="my_data_bottom">我的优惠</span>
      </a>
      <a href="javascript:;">
        <span class="my_data_top my_points">0</span>分<br>
        <span class="my_data_bottom">我的积分</span>
      </a>
    </div>
    <div class="user_info_list">
      <ul>
        <li class="user_info_li">
          <a href="javascript:;">
            <span><i class="iconfont icon-order-s"></i></span>
            <span>我的订单</span>
          </a>
        </li>
        <li class="user_info_li">
          <a href="javascript:;">
            <span><i class="iconfont icon-jifen"></i></span>
            <span>积分商城</span>
          </a>
        </li>
        <li class="user_info_li">
          <a href="javascript:;">
            <span><i class="iconfont icon-vip"></i></span>
            <span>外卖会员卡</span>
          </a>
        </li>
        <li class="user_info_li margin_fuwu">
          <a href="javascript:;">
            <span><i class="iconfont icon-fuwu"></i></span>
            <span>服务中心</span>
          </a>
        </li>
      </ul>
    </div>
    <section class="user_info_logout border_px">
      <button class="logout_btn" v-if="userInfo._id" @click="logout">退出登陆</button>
    </section>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import { MessageBox, Toast } from 'mint-ui'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      logout() {
        MessageBox.confirm('确认退出吗？')
          .then(action=>{
            //发送请求退出
            this.$store.dispatch('logout')
            Toast('登出成功')
          })
          .catch(action=>{
            console.log('取消登录')
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
    .home_header
      color #fff
      position fixed
      top: 0
      left: 0
      width 100%
      height 50px
      line-height 50px
      background-color $topicC
      display flex
      z-index 100
      span
        flex 1
        a
          color #fff
        .iconfont
          font-size 25px
          margin-left 20px
      .home_address
        flex 3
        font-size 21px
      >p
        width 100%
        font-size 21px
        color #fff
        text-align center
    .user_info
      top_border_px(#ddd)
      width 100%
      height 60px
      background-color $topicC
      margin-top 50px
      padding 20px 10px
      >div
        float left
        color white
      .user_icon
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        .icon-person
          font-size 60px
          background-color #e4e4e4
          color #7D8B8C
      .user_login_mobile
        margin-top 10px
        p
          padding-bottom 10px
          a
            margin-left 15px
            font-weight bold
            font-size 18px
            color white
          & span
            font-size 14px
          .icon-shouji
            font-size 30px
            vertical-align text-top
      .goto_login
        float right
        width 12px
        height 12px
        margin-right 20px
        line-height 60px
        .icon-jiantou1
          color white
          font-size 12px
    .user_info_data
      top_border_px(#ddd)
      width 100%
      background-color #fff
      margin-top 10px
      display flex
      a
        float left
        flex 1
        text-align center
        span
          font-size 14px
          line-height 30px
          color #666
        .my_data_top
          font-size 30px
          font-weight bold

        .my_balance
          color #f90
        .my_discount
          color #ff5f3e
        .my_points
          color #6ac20b
    .user_info_list
      margin-left 15px
      margin-top 15px
      .user_info_li
        line-height 50px
        a
          color #333
          .iconfont
            font-size 30px
            vertical-align middle
          .icon-order-s
            color #02a774
          .icon-jifen
            color #ff5f3e
          .icon-vip
            color #f90
          .icon-fuwu
            color $topicC

      .margin_fuwu
        margin-top 10px
    .user_info_logout
      top_border_px(#ddd)
      margin-top 10px
      background #fff
      width 100%
      height 40px
      .logout_btn
        width 100%
        height 100%
        border 0
        background #ef4f4f
        border-radius 5px
        color #fff
        font-size 18px
        line-height 40px
</style>

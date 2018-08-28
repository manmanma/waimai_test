<template>
  <section>
    <!--头部导航-->
    <HeaderTop  title="订单列表"/>
    <div class="order_no_login">
      <img src="./images/person.png" alt="order_img">
      <h3>登录后查看外卖订单</h3>
      <button class="btn_login">立即登录</button>
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {}
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
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      h3
        color #6a6a6a
        font-size 17px
        padding 10px 0
      button
        display inline-block
        font-size 14px
        color #fff
        background-color $topicC
        padding 10px 20px
        border-radius 5px
        outline none
</style>

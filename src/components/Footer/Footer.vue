<template>
  <footer class="footer border_px">
    <a href="javascript:;" class="footer_item" :class="{active: '/home'===$route.path}" @click="goto('/home')">
      <span class="footer_iconfont">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="footer_item" :class="{active: '/search'===$route.path}" @click="goto('/search')">
      <span class="footer_iconfont">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="footer_item" :class="{active: '/order'===$route.path}" @click="goto('/order')">
      <span class="footer_iconfont">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="footer_item" :class="{active: '/profile'===$route.path}" @click="goto('/profile')">
      <span class="footer_iconfont">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>
<script>
  export default {
    methods: {
      goto(path) {
        this.$router.replace(path)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  $topicC = #02a774 //主题颜色
  @import "../../assets/stylus/mixins.styl"
  .footer
    top_border_px(#ddd)
    position fixed
    bottom 0
    left 0
    display flex
    width 100%
    height 50px
    background-color #fff
    margin-top -50px
    .footer_item
      display flex
      flex 1
      flex-direction column
      align-items center
      justify-content center
      &.active
        color $topicC
      .iconfont
        font-size 25px
      span
        font-size 12px
</style>

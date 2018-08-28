<template>
  <section>
    <!--头部导航-->
    <HeaderTop  title="搜索"/>
    <!--搜索-->
    <form action="" class="search_form">
      <input type="text" placeholder="请输入商家或美食名称" class="search_name">
      <input type="submit" value="提交" class="search_submit">
    </form>
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
    .search_form
      margin-top 50px
      background-color #ffffff
      padding 12px 8px
      &::after
        clearFix()
      >input
        outline none
      .search_name
        float left
        width 79%
        color #333
        font-size 14px
        background-color #f2f2f2
        border 4px solid #f2f2f2
      .search_submit
        float right
        width 18%
        color #fff
        font-size 17px
        border 4px solid $topicC
        background-color $topicC
</style>

<template>
  <div class="login">
    <div class="login_container">
      <a href="javascript:;" class="goback" @click="$router.history.go(-1)"><i class="iconfont icon-jiantou2"></i></a>
      <div class="login_header">
        <h3>硅谷外卖</h3>
        <a href="javascript:;" :class="{on: loginWay}" @click="setLoginWay(true)">短信登录</a>
        <a href="javascript:;" :class="{on: !loginWay}" @click="setLoginWay(false)">密码登录</a>
      </div>
      <div class="login_content">
        <div :class="{on: loginWay}">
          <section class="login_msg_mobile">
            <input type="tel"  name="mobile" placeholder="手机号" maxlength="11">
            <button disabled class="get_code">获取验证码</button>
          </section>
          <section class="login_msg_code">
            <input type="password" value="" name="code" placeholder="验证码" >
          </section>
          <section class="login_hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </section>
        </div>
        <div :class="{on: !loginWay}">
          <section class="login_msg_username">
            <input type="tel"  name="username" placeholder="手机/邮箱/用户名">
          </section>
          <section class="login_msg_pwd">
            <input type="password" value="" name="pws" placeholder="密码" >
            <div class="switch_button on">
              <div class="switch_circle right"></div>
              <span class="switch_text">123</span>
            </div>
          </section>
          <section class="login_msg_captcha">
            <input type="text" name="captcha" placeholder="验证码" maxlength="6">
            <img src="./images/captcha.svg" alt="验证码" class="get_captcha">
          </section>
        </div>
        <button class="submit_login">登录</button>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginWay: true,//true 是短信登录
      }
    },
    methods: {
      setLoginWay (loginWay) {
        this.loginWay =  loginWay
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  $topicC = #02a774
  @import "../../assets/stylus/mixins.styl"
  .login
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    background #fff
    z-index 200
    .goback
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      .icon-jiantou2
        color #999
        font-size 20px
    .login_container
      width 80%
      height 100%
      margin 0 auto
    .login_header
      padding-top 80px
      text-align center
      >h3
        font-weight bold
        font-size 40px
        color $topicC
      & a
        display inline-block
        color #333
        margin 30px 20px 0 20px
        font-size 14px
        padding-bottom 5px
        text-align center
        &.on
          color $topicC
          border-bottom 2px solid $topicC
    .login_content
      section
        position relative
        height 48px
        margin-top 5px
        .get_code,.get_captcha
          position absolute
          right 10px
          top 50%
          transform translateY(-50%)
          color #ccc
          font-size 14px
          border 0
          background transparent
        >input
          width 100%
          height 100%
          padding-left 10px
          box-sizing border-box
          border-radius 4px
          font 400 14px Arial
          outline 0
          &:focus
            border 1px solid $topicC
        .switch_button
          position absolute
          right 10px
          top 50%
          transform translateY(-50%)
          font-size 12px
          width 30px
          height 16px
          line-height 16px
          border-radius 8px
          border 1px solid #ddd
          padding 0px 6px
          transition background-color .3s, border-color .3s
          &.off
            background pink
          &.on
            background $topicC
          .switch_circle
            position absolute
            top -1px
            left -1px
            width 16px
            height 16px
            background white
            border-radius 50%
            border 1px solid #ddd
            box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
            transition transform .3s
            &.right
              transform translateX(30px)
          .switch_text
            color #ddd
        &.login_hint
          margin-top 12px
          color #999
          font-size 14px
          line-height 20px
          >a
            color $topicC
      .submit_login
        margin-top 20px
        width 100%
        height 42px
        font-size 16px
        border-radius 4px
        background-color  #4cd96f
        color white
        border 0
        outline 0
      .about_us
        display block
        width 100%
        font-size 12px
        line-height 40px
        color #999999
        text-align center
      >div
        display none
        &.on
          display block
</style>

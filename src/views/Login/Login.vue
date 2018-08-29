<template>
  <div class="login">
    <div class="login_container">
      <a href="javascript:;" class="goback" @click="$router.back()"><i class="iconfont icon-jiantou2"></i></a>
      <div class="login_header">
        <h3>硅谷外卖</h3>
        <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
        <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
      </div>
      <div class="login_content">
        <div :class="{on: loginWay}">
          <section class="login_msg_mobile">
            <input type="text"  placeholder="手机号" maxlength="11" v-model="phone">
            <button :disabled="!isRightPhone || computeTime > 0" class="get_code" :class="{on: isRightPhone}" @click.prevent="getCode">
              {{computeTime > 0  ? `已发送(${computeTime}s)` : '获取验证码'}}
            </button>
          </section>
          <section class="login_msg_code">
            <input type="text"  v-model="code" placeholder="验证码" >
          </section>
          <section class="login_hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </section>
        </div>
        <div :class="{on: !loginWay}">
          <section class="login_msg_username">
            <input type="text"  v-model="name" placeholder="手机/邮箱/用户名">
          </section>
          <section class="login_msg_pwd">
            <input :type="isShowPwd ? 'text': 'password' "  v-model="pwd" placeholder="密码" >
            <div class="switch_button" :class="isShowPwd ? 'on': 'off'" @click="isShowPwd=!isShowPwd">
              <div class="switch_circle" :class="isShowPwd ? 'right': ''"></div>
              <span class="switch_text">{{isShowPwd ? 'abc': ''}}</span>
            </div>
          </section>
          <section class="login_msg_captcha">
            <input type="text" v-model="captcha" placeholder="验证码" maxlength="6">
            <img src="http://localhost:4000/captcha" alt="验证码" class="get_captcha" @click="getCaptcha">
          </section>
        </div>
        <button class="submit_login" @click="login">登录</button>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {reqSendCode, reqPwdLogin, reqSmsLogin} from '../../api'
  export default {
    data() {
      return {
        loginWay: true,//true 是短信登录
        phone: '',//手机号
        code: '',//短信验证码
        computeTime: 0,//发送短信倒计时
        name: '',
        pwd: '',
        captcha: '',
        isShowPwd: false,//是否显示密码
      }
    },
    computed: {
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      //发送短信验证码
      async getCode () {
        //倒计时
        if(this.isRightPhone){
          this.computeTime=30
          const intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0){
              this.computeTime = 0
              clearInterval(intervalId)
            }
          },1000)
          //发送请求验证短信验证码
          const result = await reqSendCode(this.phone)
          if(result.code===0){
            //发送成功
            Toast('短信已发送')
          }else{
            //发送失败
            MessageBox.alert('验证码发送失败','提示')
            this.computeTime = 0
          }
        }
      },
      //点击获取图形验证码
      getCaptcha (event) {
        event.target.src = 'http://localhost:4000/captcha?time='+Date.now()
      },
      //弹出框
      showAlert(alertText) {
        MessageBox.alert(alertText,'提示')
      },
      //登录
      async login () {
        let result
        if(this.loginWay){//短信登录
          const {isRightPhone, phone, code} = this
          if(!isRightPhone){
            this.showAlert('请填写正确的手机号')
            return
          }else if(!/^\d{6}$/.test(code)){
            alert('a')
            this.showAlert('验证码输入错误')
            return
          }
          //发送ajax请求
          result = await reqSmsLogin({phone, code})
        }else{
          const {name, pwd, captcha} = this
          if(!name){
            this.showAlert('请填写用户名')
            return
          }else if(!pwd){
            this.showAlert('请输入密码')
            return
          }else if(!captcha){
            this.showAlert('验证码输入错误')
            return
          }
          //发送ajax请求
          result = await reqPwdLogin({name, pwd, captcha})
        }
        //停止倒计时
        this.computeTime = 0
        //处理结果
        if(result.code===0){
          Toast('登录成功')
          //将用户登录信息保存到state中
          const user = result.data
          this.$store.dispatch('recordUserInfo', user)
          // 去个人中心
          this.$router.replace('/profile')
        }else{
          this.showAlert(result.msg)
        }
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
          &.on
            color #000
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
          transition background .3s border-color .3s
          &.off
            background white
          .switch_text
            color #ddd
          &.on
            background $topicC
          .switch_circle
            position absolute
            top -1px
            left -1px
            width 16px
            height 16px
            line-height 16px
            background white
            border-radius 50%
            border 1px solid #ddd
            box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
            &.right
              transform translateX(30px)
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

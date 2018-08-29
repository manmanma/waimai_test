<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import Footer from './components/Footer/Footer.vue'
  export default {
    components: {
      Footer
    },
    mounted () {
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress','getUserInfo'])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
</style>

<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(star, index) in starClassArr" :key="index" :class="star"></span>
  </div>
</template>
<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default {
    props: {
      rating:Number,
      size:Number,
    },
    computed: {
      starClassArr () {
        const starArr = []
        const {rating} = this
        const  starInteger = Math.floor(this.rating)
        //添加类名on
        for (var i = 0; i < starInteger; i++) {
          starArr.push(CLASS_ON)
        }
        //添加类名half 四舍五入
        if(Math.round(rating-starInteger)){
          starArr.push(CLASS_HALF)
        }
        //添加类名off
        while(starArr.length<5) {
          starArr.push(CLASS_OFF)
        }
        return starArr
      }

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg_image('./images/star48_on')
        &.half
          bg_image('./images/star48_half')
        &.off
          bg_image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg_image('./images/star36_on')
        &.half
          bg_image('./images/star36_half')
        &.off
          bg_image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg_image('./images/star24_on')
        &.half
          bg_image('./images/star24_half')
        &.off
          bg_image('./images/star24_off')
</style>

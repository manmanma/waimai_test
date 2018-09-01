<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menuUl">
          <li class="menu-item" :class="{current: currentIndex === index}"
              v-for="(good, index) in goods" :key="index" @click="selectItem(index)" >
            <span class="text bottom_border_1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom_border_1px"
                  v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import Scroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'
  /*
  * 功能：
  *   1.点击左侧列表，右侧列表滑动到对应位置
  *   2.滑动右侧列表，左侧列表滑动到对应位置
  *   3.右侧滑动，左侧对应位置是否当前可见
  *     当前分类的下标 currentIndex
  *     scrollY 右侧列表滑动的Y坐标 滑动过程中动态确定 绑定scroll监听
  *     tops 右侧所有li的top值，列表初始化显示后读取
  *     计算属性  scrollY的区间 scrollY >= top && scrollY < nextTop(tops[index+1])
  * */
  export default {
    mounted () {
      this.$store.dispatch('getShopGoods', ()=> {
        this.$nextTick(()=> {
          this._initScroll()
          this._initTops()
        })
      })
    },
    data () {
      return {
        scrollY: 0,//右侧滑动距离
        tops: [],//右侧所有li的top值,
        food: {}
      }
    },
    computed: {
      ...mapState(['goods']),
      currentIndex () {
        const {scrollY, tops} =  this
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
        //当index值有变化再滑动
        if(index!==Scroll.index){
          Scroll.index = index
          //左侧滑动到指定li的位置
          this._scrollLeftList(index)
        }
        return index
      }
    },
    methods: {
      //定义滑动对象
      _initScroll () {
        //左侧滑动
        this.leftScroll = new Scroll('.menu-wrapper', {
          click: true
        })
        //右侧滑动
        this.rightScroll = new Scroll('.foods-wrapper', {
          probeType: 1,//触摸滑动时非实时触发scroll
          click: true//分发点击自定义事件
        })
        //右侧列表绑定监听 右侧列表滑动，左侧列表分类随位置变化
        this.rightScroll.on('scroll', ({x,y})=> {
          this.scrollY = Math.abs(y)
        })
        this.rightScroll.on('scrollEnd', ({x, y})=>{//最后滑动的位置
          this.scrollY = Math.abs(y)
        })
      },
      //初始化列表显示后获取所有li的top值
      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        //循环遍历所有的li计算top值将值添加到数组中
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.from(lis).forEach((li, index)=> {
          top += li.clientHeight
          tops.push(top)
        })
        //更新tops状态
        this.tops = tops
      },
      //点击左侧分类右侧列表相应变化
      selectItem (index) {
        //得到目标位置的top值
        const top = this.tops[index]
        //更新滑动的值
        this.scrollY = top
        //右侧列表平滑滚动到对应的位置
        this.rightScroll.scrollTo(0, -top, 300)
      },
      //左侧列表滑动到可见区域
      _scrollLeftList(index) {
        if(this.leftScroll){
          const li = this.$refs.menuUl.children[index]
          //滑动到li区域
          this.leftScroll.scrollToElement(li, 300)
        }
      },
      //是否显示食物详情
      showFood (food){
        this.food = food
        //父组件调用子组件的方法 是否显示Food
        this.$refs.food.toggleShow()
      }
    },
    components: {
      CartControl,
      ShopCart,
      Food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../assets/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: #02a774
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom_border_1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom_border_1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>



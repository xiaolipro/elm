<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-sub icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="sub"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  props: {
    food: Object
  },
  methods: {
    add(event) {
      if (!event._constructed) return
      // if (!this.food.count) this.food.count = 1 这样虽然浏览器上控制台检测到了但vue并没有对其进行监控
      if (!this.food.count) this.$set(this.food, 'count', 1) // vue2.x特性
      else this.food.count++
      this.$emit('add', event.target)
      // console.log(event);
    },
    sub(event) {
      if (!event._constructed) return
      if (this.food.count) this.food.count--;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    translate3d(0,0,0)
  }
  .move-enter-active {
    transition: opacity .4s ease-in;
    // transform translate3d(0, 0, 0) // 动画加速,提高流畅度
    transform rotate(180)
  }

  .cartcontrol
    // font-size 0
    .cart-sub, .cart-add
      display inline-block
      // padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      // padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
</style>

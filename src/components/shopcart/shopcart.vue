<template>
  <div>
    <!-- fixed flex布局 -->
    <div class="shopcart">
      <div class="content">
        <!-- 左侧自适应 -->
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            </div>
            <div class="num" v-if="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!-- 右侧固定 -->
        <div class="content-right" @click="topay">
          <div class="pay" :class="{'to-pay':totalPrice>=minPrice}">{{isPay}}</div>
        </div>
      </div>

      <!-- <div class="ball-container">
        <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-for="(ball,idx) in balls" :key="idx" class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>-->
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,idx) in selectFoods" :key="idx">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @add="drop"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";
const innerClsHook = "inner-hook";
export default {
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: Number,
    minPrice: Number
  },
  components: {
    cartcontrol
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      isFold: true // 默认折叠状态
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    isPay() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`; // es6新特性 用反引号可以使用${}拼接
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    listShow() {
      return !this.isFold && this.totalCount;
    }
  },
  methods: {
    topay() {
      if (this.totalPrice < this.minPrice) return;
      window.alert(`需要支付${this.totalPrice + this.deliveryPrice}元`);
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideList() {
      this.isFold = true;
    },
    toggleList() {
      if (!this.totalCount) {
        this.isFold = true;
        return;
      }
      this.isFold = !this.isFold;
    },
    drop(el) {
      // console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      // ...
      const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 32;
      const y = -(window.innerHeight - rect.top - 22);
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      // console.log("x", x, ",y:", y);
      // console.log(ball);
      // console.log(rect);
      // console.log("hight:", window.innerHeight);
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = el.style.transform = `translate3d(0,0,0)`;
        let inner = el.getElementsByClassName(innerClsHook)[0];
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        // addEventListener
        el.addEventListener("transitionend", done);
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.listContent, {
        click: true
      });
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.fold-enter, .fold-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

.fold-enter-active, .fold-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 46px;
  background: #141d27;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0; // 消除inline-block带来的间隙
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper, .price, .desc {
        display: inline-block;
        vertical-align: top;
      }

      .logo-wrapper {
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #24343c;

          &.highlight {
            background: rgb(0, 160, 220);
          }
        }

        .icon-shopping_cart {
          line-height: 44px;
          font-size: 24px;
          color: #80858a;

          &.highlight {
            color: #ffffff; // rgb(255, 255, 255)
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highlight {
          color: #ffffff;
        }
      }

      .desc {
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        font-size: 12px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight: 700;
        background: #2b333b;

        &.to-pay {
          background: #00b43c;
          color: #ffffff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.85, -0.02, 1, 1);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    bottom: 46px;
    left: 0;
    z-index: -1;
    width: 100%;

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #ffffff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-1px(rgba(7, 17, 27, 0.1));
      }

      .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 10px;
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30; // 小于.shopcart
  backdrop-filter: blur(5px);
}
</style>

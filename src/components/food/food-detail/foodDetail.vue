<template>
  <transition name="move">
    <div class="food-info" v-show="showFlag" ref="foodInfo">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" />
          <div class="back">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
        </div>
        <div class="content border-1px">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <foodSellInfo :food="food"></foodSellInfo>
          </div>
          <foodPrice :food="food"></foodPrice>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <div class="buy" @click="firstAddGoodToCart" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingSelect
            @select="onSelect"
            @toggle="onToggle"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
          ></ratingSelect>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li
                v-show="needShow(rating.rateType, rating.text)"
                v-for="(rating, idx) in food.ratings"
                :key="idx"
                class="rating-item border-1px"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar" />
                </div>
                <div class="time">{{rating.rateTime | formatDate(rating.rateTime)}}</div>
                <p class="text">
                  <span
                    :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"
                  ></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div v-else class="no-rating"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import foodSellInfo from "../food-sell-info/foodSellInfo";
import foodPrice from "../food-price/foodPrice";
import BScroll from "better-scroll";
import cartcontrol from "../../cartcontrol/cartcontrol";
import Vue from "vue";
import split from "../split/split";
import ratingSelect from "../../ratings/ratingSelect/ratingSelect";
import {formatDate} from "common/js/date"
/* eslint-disable no-unused-vars */
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    firstAddGoodToCart(event) {
      if (!event._constructed) return;
      Vue.set(this.food, "count", 1);
      console.log(event.target);
    },
    addFood(target) {
      this.$emit("add", target);
      console.log("click");
    },
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodInfo, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) return false;
      if (this.selectType === ALL) return true;
      return type === this.selectType;
    },
    hide() {
      this.showFlag = false;
      this.onlyContent = true;
      this.selectType = ALL;
    },
    onSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    onToggle() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  filters: {
    formatDate(time) {
      let data = new Date(time); // 将时间戳转为Date对象
      return formatDate(data, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    foodSellInfo,
    foodPrice,
    cartcontrol,
    split,
    ratingSelect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixin.styl';

.move-enter, .move-leave-to {
  transition: all 0.2s linear;
  transform: translate3d(100%, 0, 0);
}

.move-enter-active, .move-enter-active {
  transition: all 0.2s linear;
  transform: translate3d(0, 0, 0);
}

.food-info {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;

  .food-content {
    position: relative;

    .img-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%; // W3C标准：当pt为100%时,高是相对宽度计算的,保证了宽高相等  简直是黑魔法啊

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back {
        position: absolute;
        top: 10px;
        left: 0;

        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }

    .content {
      padding: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      position: relative;

      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }

      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }

      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        // width 74px
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 12px;
        font-size: 10px;
        color: #ffffff;
        background: rgb(0, 160, 220);
      }
    }

    .info {
      padding: 18px;

      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }

    .rating {
      padding-top: 18px;

      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .rating-wrapper {
        padding: 0 18px;

        .rating-item {
          position: relative;
          padding: 16px 0;
          border-1px(rgba(7, 17, 27, 0.1));

          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;

            .name {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }

            .avatar {
              border-radius: 50%;
            }
          }

          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);

            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }

            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }

            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
}
</style>

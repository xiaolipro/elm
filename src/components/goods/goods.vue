<template>
  <!-- flex布局 -->
  <div class="goods">
    <!-- 左侧菜单栏 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          v-for="(item,idx) in goods"
          :key="idx"
          :class="{'current':currentIndex==idx}"
          @click="selectMenu(idx, $event)"
        >
          <span class="text border-1px">
            <v-icon v-if="item.type > 0" :type="item.type"></v-icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧商品栏  -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, idx) in goods" :key="idx">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              @click="selectFood(food, $event)"
              class="food-item border-1px"
              v-for="(food, idx) in item.foods"
              :key="idx"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <foodSellInfo :food="food"></foodSellInfo>
                <foodPrice :food="food"></foodPrice>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" @add="_drop"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部购物车 -->
    <v-shopcart
      ref="shopcart"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectFoods="selectFoods"
    ></v-shopcart>
    <!-- 商品详情 -->
    <foodDetail ref="foodDetail" :food="selectedFood" @add="_drop"></foodDetail>
  </div>
</template>

<script type="text/ecmascript-6">
import icon from "components/icon/icon";
import BScroll from "better-scroll";
import shopcart from "components/shopcart/shopcart";
import cartcontrol from "components/cartcontrol/cartcontrol";
import foodDetail from "components/food/food-detail/foodDetail";
import foodSellInfo from "components/food/food-sell-info/foodSellInfo";
import foodPrice from "components/food/food-price/foodPrice";
const ERR_OK = 0;

export default {
  props: {
    seller: Object
  },
  data() {
    return {
      goods: [],
      heights: [],
      scroll_Y: 0,
      selectedFood: {}
    };
  },
  methods: {
    selectFood(food, event) {
      if (!event._constructed) return;
      this.selectedFood = food;
      this.$refs.foodDetail.show();
    },
    selectMenu(idx, event) {
      if (!event._constructed) return;
      // 有的原生浏览器上是没有这个属性的,所以点击事件不会被阻止掉 当使用bscroll派发的点击时间时 return掉 否则 将执行2次click
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[idx];
      this.foodsScroll.scrollToElement(el, 300);
      // console.log(idx);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true // 派发点击事件
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on("scroll", pos => {
        this.scroll_Y = Math.abs(Math.round(pos.y));
        // console.log(this.scroll_Y);
      });
    },
    _calcHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = -1;
      this.heights.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight; // DOM元素高度接口
        this.heights.push(height);
      }
    },
    _drop(target) {
      // 体验优化
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  },
  created() {
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          this._calcHeight();
        });
      }
    });
  },
  components: {
    "v-icon": icon,
    "v-shopcart": shopcart,
    "v-cartcontrol": cartcontrol,
    foodDetail,
    foodSellInfo,
    foodPrice
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heights.length; i++) {
        let top = this.heights[i];
        let floor = this.heights[i + 1];
        let y = this.scroll_Y;
        if (!floor || (top < y && y < floor)) return i;
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
  // 2.x 已经废弃
  // events: {
  //   "cart.add"(target) {
  //     this._drop(target);
  //   }
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;

  .menu-wrapper {
    flex: 0 0 80px; // 等分 内容不足时的缩放 占位空间
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      line-height: 14px;
      height: 54px;
      width: 80px;

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
        padding: 0 12px;
      }
    }

    .current {
      position: relative;
      z-index: 10;
      margin-top: -1px;
      background: #fff;
      font-weight: 700;
    }
  }

  .foods-wrapper {
    flex: 1;

    .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .desc {
      line-height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      margin-bottom: 8px;
      line-height: 12px;
    }

    .count {
      margin-right: 12px;
    }

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &.last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57;
        width: 57px;
        height: 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

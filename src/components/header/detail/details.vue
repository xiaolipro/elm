<template>
  <transition name="fade">
    <div class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p class="name">{{seller.name}}</p>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <bar text="优惠信息"></bar>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, idx) in seller.supports" :key="idx">
              <v-icon :type='item.type'></v-icon>
              <span class="text">{{seller.supports[idx].description}}</span>
            </li>
          </ul>
          <bar text="商家公告"></bar>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="close">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import star from 'components/star/star';
import bar from '../bar';
import icon from 'components/icon/icon';

export default {
  props: {
    seller: Object,
    classMap: Array
  },
  components: {
    star,
    bar,
    'v-icon': icon
  },
  methods: {
    close() {
      this.$parent.showDetail();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.fade-enter, .fade-leave-to {
  opacity: 0;
  background rgba(7, 17, 27, 0)
  transition: all .5s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(7, 17, 27, 0.8);
  backdrop-filter blur(6px) // 只能在IOS上实现

  .detail-wrapper {
    min-height: 100%; // 最小高度撑满屏幕
    width: 100%;

    .detail-main {
      margin-top: 64px;
      padding-bottom: 64px;

      .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }

      .star-wrapper {
        height: 24px;
        padding: 16px 0 28px 0;
        text-align: center;
      }

      .supports {
        width: 80%;
        margin: 0 auto;

        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;

          &:last-child { // support-item的最后一个孩子
            margin-bottom: 0;
          }

          .text {
            line-height: 16px;
            font-size: 12px;
          }
        }
      }

      .bulletin {
        width: 80%;
        font-size: 12px;
        font-weight: 200px;
        line-height: 24px;
        margin: 0 auto;
      }
    }
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
}
</style>

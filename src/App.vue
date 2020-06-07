<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--flex布局-->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 签的组件实例能够被在它们第一次被创建的时候缓存下来 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "components/header/header";
import goods from "components/goods/goods";
import { urlParse } from "common/js/util";

const ERR_OK = 0;

export default {
  // name: "App",
  data() {
    return {
      seller: {
        id: urlParse().id
      }
    };
  },
  created() {
    this.$http.get("/api/seller?id=" + this.seller.id).then(response => {
      response = response.body; // json()返回的是Promise body返回的才是object
      if (response.errno === ERR_OK) {
        // ES6 给对象扩展属性的方法. 防止新数据直接覆盖源数据
        this.seller = Object.assign({}, this.seller, response.data);
        // console.log(this.seller.id)
      }
    });
  },
  components: {
    "v-header": header, // 不能与htm原生标签名冲突
    "v-goods": goods
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl';

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom : 1px solid rgba(7, 17, 27, .1)
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      & > a { // &:父元素 >:后代
        display: block; // 使a标签可以撑满整个div
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>

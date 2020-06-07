<template>
  <div class="title">
    <!--这里用span在某些Android浏览器上可能会出问题-->
    <div class="line"></div>
    <div class="text">{{info}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    info: String
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;

  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text {
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
    line-height 14px
  }
}
</style>

<template>
  <div class="extra">
      <span>月售:{{food.sellCount}}</span>
      <span>好评率:{{food.rating}}%</span>
    </div>
</template>

<script>
export default {
  props: {
    food: Object
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.extra {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
  margin-right: 12px;
}
</style>

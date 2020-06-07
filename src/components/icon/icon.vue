<template>
  <span class="icon" :class="classMap[type]"></span>
</template>

<script>
export default {
  props: {
    type: Number
  },
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;

  &.decrease {
    bg-img_x('decrease', "3");
  }

  &.discount {
    bg-img_x('discount', "3");
  }

  &.guarantee {
    bg-img_x('guarantee', "3");
  }

  &.invoice {
    bg-img_x('invoice', "3");
  }

  &.special {
    bg-img_x('special', "3");
  }
}
</style>

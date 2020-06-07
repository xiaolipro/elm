<template>
  <div class="star" :class="starType">
    <span v-for="(item, idx) in stars" :class="item" class="star-item" :key="idx"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on'; // 1.0
const CLS_HALF = 'half'; // 0.5
const CLS_OFF = 'off'; // 0.0

export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    stars() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2; // 向下取0.5 再除以2    4.2  score=4.0
      let integer = Math.floor(score); // 4
      let hasDecimal = score % 1 !== 0; // 0
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) result.push(CLS_HALF);
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-img('star48_on');
      }

      &.half {
        bg-img('star48_half');
      }

      &.off {
        bg-img('star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-img('star36_on');
      }

      &.half {
        bg-img('star36_half');
      }

      &.off {
        bg-img('star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-img('star24_on');
      }

      &.half {
        bg-img('star24_half');
      }

      &.off {
        bg-img('star24_off');
      }
    }
  }
}
</style>

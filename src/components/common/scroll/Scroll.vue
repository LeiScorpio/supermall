<template>
  <div class="wrapper" ref="betterScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//导入better-scroll
import BScroll from '@better-scroll/core'
//导入上拉加载插件
import Pullup from '@better-scroll/pull-up'

//注册使用插件
BScroll.use(Pullup)

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    // 初始化better-scroll
    this.initBScroll()
    //实时监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
  },
  methods: {
    initBScroll() {
      this.scroll = new BScroll(this.$refs.betterScroll, {
        useTransition: false,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true,
        click: true,
        probeType: this.probeType,
      })
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
  },
}
</script>

<style scoped>
</style>

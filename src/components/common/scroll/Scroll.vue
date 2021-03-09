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
    this.scroll = new BScroll(this.$refs.betterScroll, {
      click: true,
      useTransition: false,
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType,
      observeDOM: true,
      observeImage: true,
    })
    //实时监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }
    //上拉加载功能
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    //回到顶部
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
  },
}
</script>

<style scoped>
</style>

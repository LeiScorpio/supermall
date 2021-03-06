<template>
  <swiper class="swiper-contain">
    <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
.swiper-contain {
  height: 500px;
  overflow: hidden;
}
.swiper-item img {
  height: 500px;
}
</style>

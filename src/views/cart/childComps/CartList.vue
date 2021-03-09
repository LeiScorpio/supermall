<template>
  <div class="cart-list">
    <scroll class="scroll-heigth" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList']),
  },
  components: {
    CartListItem,
    Scroll,
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 35px);
  overflow: hidden;
}
.scroll-heigth {
  height: 100%;
}
</style>

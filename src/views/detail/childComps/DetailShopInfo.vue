<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.shop-info {
  margin-top: 20px;
}
.shop-top img {
  width: 100%;
}
</style>

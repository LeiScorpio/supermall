<template>
  <div id="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart" :class="{ active: isActive }">
        加入购物车
      </div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    addToCart() {
      this.$emit('addCart')
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
      }, 250)
    },
  },
}
</script>

<style scoped>
#bottom-bar {
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 0px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}
.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}
.bar-right .cart {
  color: #333;
  background-color: #ffe817;
}
.bar-right .cart:hover {
  color: #fff;
  background-color: #ccc;
}
.bar-right .buy {
  background-color: #f69;
}
.bar-right .active {
  background-color: pink;
  color: #fff;
  box-shadow: 0px 0px 5px #888888 inset;
}
</style>

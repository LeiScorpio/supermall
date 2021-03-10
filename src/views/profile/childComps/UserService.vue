<template>
  <div class="user-service">
    <div class="service-item">
      <img src="~assets/img/profile/message.svg" alt="" class="user-icon" />
      <span class="user-text">我的消息</span>
    </div>
    <div class="service-item">
      <img src="~assets/img/profile/pointer.svg" alt="" class="user-icon" />
      <span class="user-text">积分商城</span>
    </div>
    <div class="service-item">
      <img src="~assets/img/profile/vip.svg" alt="" class="user-icon" />
      <span class="user-text">会员卡</span>
    </div>
    <div class="service-item">
      <img src="~assets/img/profile/cart.svg" alt="" class="user-icon" />
      <span class="user-text">我的购物车</span>
    </div>
    <div class="service-item">
      <img src="~assets/img/profile/shopping.svg" alt="" class="user-icon" />
      <span class="user-text">下载购物App</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserService',
}
</script>

<style scoped>
/* .user-service {
  padding-left: 20px;
} */
.service-item {
  border-bottom: 1px solid #f2f2f2;
}
.service-item:nth-child(3) {
  border-bottom: 10px solid #f2f2f2;
}
.service-item img {
  width: 20px;
  height: 20px;
  margin: 12px;
  vertical-align: middle;
}
</style>

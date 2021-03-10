<template>
  <div class="user-info">
    <div class="avatar">
      <img src="~assets/img/profile/avatar.svg" alt="" />
    </div>
    <div class="login-info">
      <div>登录/注册</div>
      <div class="phone">
        <i class="icon-phone">
          <img src="~assets/img/profile/phone.svg" alt="" />
        </i>
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="user-more">
      <img src="~assets/img/common/arrow-left.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--color-tint);
}
.avatar {
  flex: 2;
}
.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.login-info {
  flex: 8;
  color: #fff;
}
.login-info div:nth-child(1) {
  padding-left: 5px;
}
.icon-phone img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.phone {
  margin-top: 5px;
}
.phone span {
  font-size: 12px;
}
.user-more {
  flex: 1;
}
.user-more img {
  width: 20px;
  height: 20px;
}
</style>

<template >
  <div id="profile">
    <!-- 顶部导航栏 -->
    <nav-bar class="profile-nav">
      <template v-slot:center>
        <div>个人中心</div>
      </template>
    </nav-bar>
    <!-- 用户信息 -->
    <user-info></user-info>
    <!-- 用户账户 -->
    <user-account :account="account"></user-account>
    <!-- 用户服务 -->
    <user-service></user-service>
  </div>
</template>
<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'

//导入子组件
import UserInfo from './childComps/UserInfo'
import UserAccount from './childComps/UserAccount'
import UserService from './childComps/UserService'

export default {
  name: 'Profile',
  data() {
    return {
      //登录模块数据
      account: [
        {
          key: '我的余额',
          value: '0.00',
        },
        {
          key: '我的优惠',
          value: '0',
        },
        {
          key: '我的积分',
          value: '0',
        },
      ],
    }
  },
  components: {
    NavBar,
    UserInfo,
    UserAccount,
    UserService,
  },
}
</script>
<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

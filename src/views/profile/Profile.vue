<template >
  <div>
    <nav-bar class="profile-nav">
      <template v-slot:center>
        <div>个人中心</div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Profile',
  data() {
    return {}
  },
  components: {
    NavBar,
  },
}
</script>
<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

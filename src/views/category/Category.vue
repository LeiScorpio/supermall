<template >
  <div>
    <nav-bar class="category-nav">
      <template v-slot:center>
        <div>目录</div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Category',
  data() {
    return {}
  },
  components: {
    NavBar,
  },
}
</script>
<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

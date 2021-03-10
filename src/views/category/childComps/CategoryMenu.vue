<template>
  <div id="category-menu">
    <div
      v-for="(item, index) in categoryInfo"
      :key="index"
      class="menu-item"
      :class="{ active: currentIndex == index }"
      @click="btnClick(index, item.maitKey, item.miniWallkey)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryMenu',
  props: {
    categoryInfo: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    btnClick(index, maitKey, miniWallkey) {
      this.currentIndex = index
      this.$emit('categoryClick', index, maitKey, miniWallkey)
    },
  },
}
</script>

<style scoped>
#category-menu {
  width: 100px;
  background-color: #f6f6f6;
  text-align: center;
}
.menu-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.active {
  background-color: #fff;
  color: #f25f7e;
}
</style>

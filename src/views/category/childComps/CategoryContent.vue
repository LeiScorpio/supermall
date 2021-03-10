<template>
  <div id="category-content">
    <div class="content-detail">
      <div
        v-for="(item, index) in categoryDeatil"
        :key="index"
        class="content-item"
      >
        <div class="content-image">
          <a :href="item.link"><img :src="item.image" alt="" /></a>
        </div>
        <div class="content-text">{{ item.title }}</div>
      </div>
    </div>
    <goods-list :goods="categoryRecommend"></goods-list>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'CategoryContent',
  props: {
    categoryDeatil: {
      type: Array,
      default() {
        return []
      },
    },
    categoryRecommend: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    GoodsList,
  },
}
</script>

<style scoped>
.content-detail {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 4px;
  margin-bottom: 30px;
  text-align: center;
}
.content-item {
  width: 33%;
}
.content-image a img {
  width: 70%;
  height: 70%;
  margin: 12px;
}
/* .content-text {
  margin-top: 10px;
} */
</style>

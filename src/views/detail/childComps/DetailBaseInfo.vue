<template>
  <div v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <!-- <span>
        <img :src="goods.services[goods.services.length - 2].icon" alt="" />
        <span>{{ goods.services[goods.services.length - 2].name }}</span>
      </span>
      <span>
        <img :src="goods.services[goods.services.length - 1].icon" alt="" />
        <span>{{ goods.services[goods.services.length - 1].name }}</span>
      </span> -->
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
</style>

<template>
  <div v-if="Object.keys(goods).length !== 0" id="detail-base-info">
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
      <span v-for="index in goods.services.length - 2" :key="index">
        <img
          :src="goods.services[index].icon"
          class="info-service-icon"
          alt=""
        />
        <span class="info-service-title">{{ goods.services[index].name }}</span>
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
#detail-base-info {
  padding-bottom: 10px;
}
.info-title {
  margin: 12px 8px;
  font-size: 20px;
}
.info-price {
  margin-left: 8px;
}
.new-price {
  font-size: 28px;
  color: var(--color-high-text);
}
.old-price {
  margin-left: 10px;
  text-decoration: line-through;
}
.discount {
  margin-left: 10px;
  padding: 0 5px;
  background-color: var(--color-tint);
  color: #fff;
  border-radius: 10px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  margin: 30px 8px;
  padding-bottom: 10px;
  color: #666;
  border-bottom: 1px solid #ccc;
}
.info-service {
  margin: 0 8px;
  display: flex;
  justify-content: space-between;
}
.info-service-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
.info-service-title {
  font-size: 14px;
  color: #666;
}
</style>

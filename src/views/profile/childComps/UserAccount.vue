<template>
  <div id="UserAccount">
    <div v-for="(item, index) in account" :key="index" class="account-item">
      <div>
        <span class="account-value">{{ item.value }}</span>
        <span v-if="index == 0" class="account-key">元</span>
        <span v-else-if="index == 1" class="account-key">个</span>
        <span v-else class="account-key">分</span>
      </div>
      <div class="account-tab">{{ item.key }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAccount',
  props: {
    account: {
      type: Array,
      default() {
        return []
      },
    },
  },
  filters: {
    showMoney(value) {
      return value.toFixed(2)
    },
  },
}
</script>

<style scoped>
#UserAccount {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border-bottom: 10px solid #f2f2f2;
}
.account-item {
  flex: 1;
  padding: 18px;
}
.account-value {
  color: #ff5f3e;
  font-size: 25px;
  font-weight: 700;
}
.account-key {
  font-size: 13px;
  font-weight: 400;
  color: #666;
}
.account-tab {
  color: #666;
  font-size: 13px;
  margin-top: 8px;
}
.account-item:nth-child(1),
.account-item:nth-child(2) {
  border-right: 1px solid #f2f2f2;
}
</style>

<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:￥{{ totalPrice }}</div>
    <div class="calculate">去结算({{ totalQuantity }})件</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        this.cartList.forEach((item) => (item.checked = true))
      }
    },
  },
  computed: {
    ...mapGetters(['cartList']),
    isSelectAll() {
      if (this.cartList.length == 0) return false
      return !this.cartList.some((item) => item.checked == false)
    },
    totalPrice() {
      let sum = 0
      sum = this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      return sum.toFixed(2)
    },
    totalQuantity() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count
        }, 0)
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  height: 35px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
}
.check-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.check-content span {
  margin-left: 5px;
  line-height: 35px;
}
.total-price {
  flex: 1;
}
.calculate {
  flex: 1;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: #f00;
  color: #fff;
}
</style>

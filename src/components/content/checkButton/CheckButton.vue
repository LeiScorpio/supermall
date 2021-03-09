<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>


<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 50%;
}
.check {
  background-color: #f00;
  border-color: #f00;
}
</style>

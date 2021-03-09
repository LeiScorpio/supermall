<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: '写点儿什么吧...',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show(message = '默认文字', duration = 2000) {
      this.isShow.true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 20px;
}
</style>

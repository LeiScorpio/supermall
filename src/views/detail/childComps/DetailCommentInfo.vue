<template>
  <div id="DetailCommentInfo"></div>
</template>

<script>
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  filters: {
    dateFormat(value) {
      const date = new Date(value * 1000)
      return date
    },
  },
}
</script>

<style>
</style>

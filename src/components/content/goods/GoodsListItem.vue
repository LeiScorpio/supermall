<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="goodsload" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    itemClick() {
      //跳转到详情页,通过动态参数匹配的方式传递iid
      // this.$router.push('/detail/' + this.goodsItem.iid)
      //通过查询字符串的方式传递iid
      this.$router.push({
        path: '/detail',
        query: {
          iid: this.getId,
        },
      })
    },
    goodsload() {
      this.$bus.$emit('goodsload')
    },
  },
  computed: {
    showImage() {
      if (this.goodsItem.show) {
        return this.goodsItem.show.img
      } else if (this.goodsItem.image) {
        return this.goodsItem.image
      } else {
        return this.goodsItem.img
      }
    },

    getId() {
      return this.goodsItem.iid || this.goodsItem.shop_id
    },
  },
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 30px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>

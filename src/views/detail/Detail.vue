<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>
<script>
//导入子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

//导入网络请求模块
import { getDetail, Goods } from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
    }
  },
  async created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求数据
    var res = await getDetail(this.iid)
    const data = res.result
    this.topImages = data.itemInfo.topImages
    //获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
}
</script>
<style scoped>
</style>

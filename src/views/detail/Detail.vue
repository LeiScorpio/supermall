<template>
  <div id="detail">
    <detail-nav-bar
      @titleClick="titleClick"
      class="detail-navbar"
    ></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    <goods-list :goods="recommends"></goods-list>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
//导入子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

//导入公共组件
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

//导入网络请求模块
import { getDetail, getRecommend, Goods, Shop } from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
    }
  },
  async created() {
    //保存传入的iid,动态路由匹配的参数用this.params.iid获取
    this.iid = this.$route.query.iid
    //根据iid请求数据
    const res = await getDetail(this.iid)
    const data = res.result
    this.topImages = data.itemInfo.topImages
    //获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    //获取店铺信息
    this.shop = new Shop(data.shopInfo)
    //获取评论信息
    if (data.rate.cRate != 0) {
      this.commentInfo = data.rate.list[0]
    }
    //请求推荐数据
    const resRecommend = await getRecommend()
    this.recommends = resRecommend.data.list
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },
  methods: {
    titleClick(index) {
      console.log(index)
    },
    addToCart() {
      //将当前物品信息保存下来
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      //将商品添加到vuex中
      this.$store.commit('addCart', product)
    },
  },
}
</script>
<style scoped>
#detail {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: #fff;
  padding-top: 44px;
}
.detail-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 12;
}
</style>

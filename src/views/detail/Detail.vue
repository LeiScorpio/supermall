<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar
      @titleClick="titleClick"
      class="detail-navbar"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="scroll-box"
      :probe-type="3"
      :pull-up-load="true"
      ref="detailscroll"
      @scroll="detailScroll"
    >
      <!-- 顶部轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品细节图 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @goodsImags="goodsImags"
      ></detail-goods-info>
      <!-- 参数信息 -->
      <detail-params-info
        :param-info="itemParams"
        ref="params"
      ></detail-params-info>
      <!-- 商品评论 -->
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 商品推荐 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar
      @addCart="addToCart"
      class="detail-bar"
    ></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="textOfToast" :is-show="isToast"></toast>
  </div>
</template>
<script>
//导入子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

//导入公共组件
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import { debounce } from '@/common/utils'
import { backTopMixin } from '@/common/mixin'
import Toast from 'components/common/toast/Toast'
import { mapActions } from 'vuex'

//导入网络请求模块
import { getDetail, getRecommend, Goods, Shop } from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      //顶部轮播图图片数据
      topImages: [],
      //当前商品基本数据
      goods: {},
      //店铺数据
      shop: {},
      //商品详细图片数据
      detailInfo: {},
      //参数信息
      itemParams: {},
      //评论数据
      commentInfo: {},
      //商品推荐数据
      recommends: [],
      //不同模块区域的Y值
      themeTopYs: [],
      //定义获取不同模块区域Y值的防抖函数
      getThemeTopY: null,
      //当前tabControl选中的index
      currentIndex: 0,
      //toast是否显示
      isToast: false,
      //toast显示的内容
      textOfToast: '',
    }
  },
  mixins: [backTopMixin],
  async created() {
    //保存传入的iid,动态路由匹配的参数用this.params.iid获取
    this.iid = this.$route.query.iid

    //根据iid请求数据
    const res = await getDetail(this.iid)
    const data = res.result

    //顶部商品轮播图图片数据
    this.topImages = data.itemInfo.topImages

    //获取商品基本信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    //获取店铺信息
    this.shop = new Shop(data.shopInfo)

    //商品详情的数据
    this.detailInfo = data.detailInfo

    //获取商品参数信息
    this.itemParams = data.itemParams

    //获取评论信息
    if (data.rate.cRate != 0) {
      this.commentInfo = data.rate.list[0]
    }

    //单独请求推荐数据
    const resRecommend = await getRecommend()
    this.recommends = resRecommend.data.list

    //获取不同模块区域y值的防抖函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      console.log(this.themeTopYs)
    }, 500)
  },
  mounted() {
    //监听图片加载完成就调用refresh()
    const shopImgScroll = debounce(this.$refs.detailscroll.refresh, 500)
    this.$bus.$on('goodsload', () => {
      shopImgScroll()
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailParamsInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    Toast,
  },
  methods: {
    ...mapActions(['addCart']),
    //顶部导航栏点击功能
    titleClick(index) {
      this.$refs.detailscroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    //获取页面滚动位置
    detailScroll(position) {
      //判断backTop是否显示
      this.isShowBackTop = position.y < -1000
      //通过滚动距离判断nav同步切换
      const positionY = -position.y
      if (positionY >= this.themeTopYs[3]) {
        this.currentIndex !== 3 && (this.currentIndex = 3)
      } else if (positionY >= this.themeTopYs[2]) {
        this.currentIndex !== 2 && (this.currentIndex = 2)
      } else if (positionY >= this.themeTopYs[1]) {
        this.currentIndex !== 1 && (this.currentIndex = 1)
      } else {
        this.currentIndex !== 0 && (this.currentIndex = 0)
      }
      this.$refs.nav.currentIndex = this.currentIndex
    },
    //商品详情图片加载调用refresh()
    goodsImags() {
      const refresh = debounce(this.$refs.detailscroll.refresh, 300)
      refresh()
      //图片加载完成后获取不同模块区域的y值
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
    },
    //加入购物车
    addToCart() {
      //将当前物品信息保存下来
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      //将商品添加到vuex中
      //方法1
      /* this.$store.dispatch('addCart', product).then((res) => {
        console.log(res)
      }) */
      //方法2，利用mapActions()
      this.addCart(product).then((res) => {
        this.isToast = true
        this.textOfToast = res
        setTimeout(() => {
          this.isToast = false
          this.textOfToast = ''
        }, 2000)
      })
    },
  },
}
</script>
<style scoped>
#detail {
  height: 100vh;
  background-color: #fff;
}
.detail-navbar {
  background-color: #fff;
}
.scroll-box {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detail-bar {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
}
</style>

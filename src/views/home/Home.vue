<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="scroll-height"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script scoped>
//子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

//导入网络请求模块
import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /* 事件监听相关方法 */
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index]
    },
    //点击回到顶部功能
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //控制回到顶部显示或者隐藏
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000
    },
    //上拉加载功能
    loadMore() {
      console.log('加载更多！')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.finishPullUp()
      //图片加载完毕后重新计算高度
      this.$refs.scroll.scroll.refresh()
    },

    /* 网络请求相关代码 */
    //请求轮播图和商品数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //图片加载完毕后重新计算高度
        this.$refs.scroll.scroll.refresh()
      })
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
}
</script>

<style>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.scroll-height {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.before-trigger {
  width: 100%;
  height: 50px;
  background-clip: red;
}
</style>

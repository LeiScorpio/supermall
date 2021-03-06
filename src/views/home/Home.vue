<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControlOne "
      v-show="isTabControlFixed"
    ></tab-control>
    <scroll
      class="scroll-height"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banner="banner"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlTwo"
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
      tabOffsetTop: 0,
      isTabControlFixed: false,
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
  mounted() {},
  methods: {
    /* 事件监听相关方法 */
    //切换商品类别
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabControlOne.currentIndex = index
      this.$refs.tabControlTwo.currentIndex = index
    },
    //点击回到顶部功能
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //控制回到顶部显示或者隐藏
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000
      //决定tabControl是否吸顶（position: fixed）
      this.isTabControlFixed = -position.y > this.tabOffsetTop
    },
    //上拉加载功能
    loadMore() {
      this.getHomeGoods(this.currentType)
      //完成上拉动作
      this.$refs.scroll.scroll && this.$refs.scroll.finishPullUp()
      //重新计算滚动距离
      this.$refs.scroll.scroll && this.$refs.scroll.refresh()
    },
    //监听轮播图图片加载完毕
    swiperImageLoad() {
      //先拿到组件，再拿到元素，然后获取offset
      this.tabOffsetTop = this.$refs.tabControlTwo.$el.offsetTop
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
      })
    },
  },
  computed: {
    //通过currenttype来确定传入goodslist中的数据种类
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
  background-color: var(--color-tint);
  color: #fff;
}

.scroll-height {
  position: absolute;
  top: 45px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>

<template >
  <div id="category">
    <nav-bar class="category-nav">
      <template v-slot:center>
        <div>商品目录</div>
      </template>
    </nav-bar>
    <div class="center-content">
      <scroll ref="leftscroll" class="left-scroll-height"
        ><category-menu
          :category-info="categoryInfo"
          @categoryClick="categoryClick"
        ></category-menu
      ></scroll>
      <scroll ref="rightscroll" class="right-scroll-height">
        <category-content
          class="right-scroll"
          :category-deatil="categoryDeatil"
          :category-recommend="categoryRecommend"
        ></category-content>
      </scroll>
    </div>
  </div>
</template>
<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

//导入子组件
import CategoryMenu from './childComps/CategoryMenu'
import CategoryContent from './childComps/CategoryContent'

//导入网络模块
import {
  getCategory,
  getSubCategory,
  getCategoryDetail,
} from 'network/category'

export default {
  name: 'Category',
  data() {
    return {
      //存放分类目录信息
      categoryInfo: [],
      //存放详细分类列表
      categoryDeatil: [],
      //存放推荐商品信息
      categoryRecommend: [],
      //存放当前maitKey
      currentMaitKey: '3627',
      //存放当前miniWallkey
      currentMiniWallkey: '10062603',
    }
  },
  components: {
    NavBar,
    CategoryMenu,
    CategoryContent,
    Scroll,
  },
  created() {
    this.getCategoryRe()
    this.getSubCategoryRe(this.currentMaitKey)
    this.getCategoryDetailRe(this.currentMiniWallkey)
  },
  mounted() {},
  methods: {
    categoryClick(index, maitKey, miniWallkey) {
      this.currentMaitKey = maitKey
      this.currentMiniWallkey = miniWallkey
      //重新请求数据
      this.getSubCategoryRe(this.currentMaitKey)
      this.getCategoryDetailRe(this.currentMiniWallkey)

      this.$refs.leftscroll.refresh()
      this.$refs.rightscroll.refresh()
    },
    //请求网络数据的方法
    getCategoryRe() {
      //请求左侧分类栏数据
      getCategory().then((res) => {
        this.categoryInfo = res.data.category.list
      })
    },
    getSubCategoryRe(MaitKey) {
      //请求右侧详细分类数据
      getSubCategory(MaitKey).then((res) => {
        this.categoryDeatil = res.data.list
      })
    },
    getCategoryDetailRe(MiniWallkey) {
      //请求右侧推荐商品数据
      getCategoryDetail(MiniWallkey).then((res) => {
        this.categoryRecommend = res
      })
    },
  },
  activated() {
    this.$refs.leftscroll.refresh()
    this.$refs.rightscroll.refresh()
  },
}
</script>
<style scoped>
#category {
  height: 100vh;
}
.left-scroll-height {
  width: 100px;
  height: 100%;
  overflow: hidden;
}
.right-scroll {
  flex: 1;
}
.right-scroll-height {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.center-content {
  height: calc(100% - 44px - 49px);
  display: flex;
}
</style>

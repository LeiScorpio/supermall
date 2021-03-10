import { request } from './request'

//请求左侧分类栏数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

//请求右侧详细分类数据
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//请求右侧推荐商品数据
export function getCategoryDetail(miniWallkey) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
    }
  })
}



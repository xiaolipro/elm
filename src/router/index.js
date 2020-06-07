import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods' // 默认路由,如果是根路径重定向到goods
    },
    {
      path: '/goods',
      component: goods // 如果是这个路径就使用相应组件
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active' // .router-link-active -> active
})

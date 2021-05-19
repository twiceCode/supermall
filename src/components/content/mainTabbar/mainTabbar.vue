<template>
  <tab-bar>
      <template v-slot>
        <tab-bar-items path="/home">
          <template v-slot:tabbar-icon>
            <img src="~assets/img/tabbar/home.png" alt="">
          </template>
          <template v-slot:tabbar-icon-active>
            <img src="~assets/img/tabbar/home-o.png" alt="">
          </template>
          <template v-slot:tabbar-text>
           <div>首页</div>
          </template>
        </tab-bar-items>
        <tab-bar-items path="/category">
          <template v-slot:tabbar-icon>
            <img src="~assets/img/tabbar/category.png" alt="">
          </template>
          <template v-slot:tabbar-icon-active>
            <img src="~assets/img/tabbar/category-o.png" alt="">
          </template>
          <template v-slot:tabbar-text>
            <div>分类</div>
          </template>
        </tab-bar-items>
        <tab-bar-items path="/cart">
           <template v-slot:tabbar-icon>
             <img src="~assets/img/tabbar/cart_20190818_110336.png" alt="">
           </template>
           <template v-slot:tabbar-icon-active>
             <img src="~assets/img/tabbar/cart-o.png" alt="">
           </template>
           <template v-slot:tabbar-text>
             <div>购物车</div>
           </template>
        </tab-bar-items>
        <tab-bar-items path="/profile">
          <template v-slot:tabbar-icon>
            <img src="~assets/img/tabbar/my.png" alt="">
          </template>
          <template v-slot:tabbar-icon-active>
            <img src="~assets/img/tabbar/my-o.png" alt="">
          </template>
          <template v-slot:tabbar-text>
            <div>我的</div>
          </template>
        </tab-bar-items>
      </template>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItems from 'components/common/tabbar/TabBarItems';
export default {
    name: 'mainTabbar',
    components: {
        TabBar,
        TabBarItems
    }
}
</script>

<style>

</style>
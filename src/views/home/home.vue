<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
      <p>购物街</p>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'
import HomeSwiper from './ChildComponents/HomeSwiper'
import RecommendView from './ChildComponents/RecommendView'
import {getHomeMultidata} from 'network/home'
export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        dKeyWords: [],
        keywords: [],
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
    },
    created() {
      // 当组件被创建时，就发送网络请求
      getHomeMultidata().then(res => {
        // console.log(res.data);
        this.banners = res.data.banner.list;
        // this.dKeyWord = res.data.dKeyWord.list;
        this.keywords = res.data.keywords.list;
        this.recommends = res.data.recommend.list;
      })
    },
}
</script>

<style>
.home-nav{
  background-color: var(--color-tint);
}
</style>
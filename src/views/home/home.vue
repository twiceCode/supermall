<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <better-scroll class="content" ref="scroll" :probe-type="3" @scrollPosition="scrollPosition">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature/>
      <tab-control :titles="titles" class="tab-control" @tabClick="getGoodsType"/>
      <goods-list :goods="showGoodsType"/>
    </better-scroll>
    <back-top @click.native="backtop" v-show="isShow"/>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navigationbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BetterScroll from 'components/content/scroll/BetterScroll'
import BackTop from 'components/common/backtop/BackTop'
// 本页面组件
import HomeSwiper from './ChildComponents/HomeSwiper'
import RecommendView from './ChildComponents/RecommendView'
import Feature from './ChildComponents/Feature'
// 网络请求
import {getHomeMultidata,getGoodsData} from 'network/home'

export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]}
        },
        currentType: 'pop',
        isShow: false,
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      TabControl,
      GoodsList,
      BetterScroll,
      BackTop,
    },
    created() {
      // 请求商品数据
      this.getHomeMultiData();
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
      // 监听事件总线中的信息
      this.$bus.$on('itemImagLoad',() => {
        this.$refs.scroll.refresh();
      })
    },
    computed: {
      // 选择商品数据的type
      showGoodsType(){
        let type = this.currentType;
        return this.goods[type].list;
      }
    },
    methods: {
      // 网络请求包装
      getHomeMultiData(){
        getHomeMultidata().then(res => {
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getGoodsData(type){
        let page = this.goods[type].page+1;
        getGoodsData(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1 ; /* 更新data中的页码 */
        })
      },
      // 事件监听
      getGoodsType(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },
      backtop(){
        this.$refs.scroll.scrollTo(0,0);
      },
      scrollPosition(position){
        this.isShow = Math.abs(position.y) > 1000;
      }
    },
}
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9; */
    /* position: relative; 下面加了overflow，这里就不用设置了 */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content{
 /* 方法一：计算
  height: calc(100% - 98px); 
  overflow:hidden;
  margin-top:44px*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
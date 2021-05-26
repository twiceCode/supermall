<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <tab-control :titles="titles" class="tab-control"
     @tabClick="getGoodsType" 
     v-show="isShowTabControlSticky"
     ref="tabcontrol1"/>
    <better-scroll class="content" ref="scroll" 
    :probe-type="3" @scrollPosition="scrollPosition" 
    @pullingUp="loadMore" :pull-up-load="true">
      <home-swiper :banners="banners" @imgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature/>
      <tab-control :titles="titles" class="tab-control" @tabClick="getGoodsType" ref="tabcontrol2"/>
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

// 工具类
import debounce from 'utils/debounce.js'

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
        tabOffsetTop: 0,
        isShowTabControlSticky: false,
        saveY: 0
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
    },
    mounted() {
      // 不要在created中查询节点和获取data中的数据
      // 监听事件总线中的信息
      const refresh = debounce(this.$refs.scroll.refresh,500);
      this.$bus.$on('itemImagLoad',() => {
        refresh();
      })
      
    },
    activated() {
      // 当该组件为路由组件时，会有activated和deactivated两个钩子函数，当
      // 该组件激活时调用activated函数，当离开该组件时调用deactivated函数

      // 当回到home页面时跳转到上回停留的地方
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      // 刷新better-scroll以防出现异常
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.saveY();
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
        // 避免两个tabcontrol的选中不一样
        this.$refs.tabcontrol1.currentindex = index;
        this.$refs.tabcontrol2.currentindex = index;
      },
      backtop(){
        this.$refs.scroll.scrollTo(0,0);
      },
      scrollPosition(position){
        this.isShow = Math.abs(position.y) > 1000;
        this.isShowTabControlSticky = Math.abs(position.y) > this.tabOffsetTop;
      },
      loadMore(){
        // 当前的currentType保存的就是要请求的页面
        this.getGoodsData(this.currentType);
        // 每次上拉加载完成后要调用finnishPullUp函数，否则下次下拉加载无法生效
        this.$refs.scroll.finishPullUp();
      },
      swiperImgLoad(){
        // 取得tabcontrol2到顶面的距离
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
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
  /* 因为滚动区域已经确定，不涉及导航栏，不需要设置position */
  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
  
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
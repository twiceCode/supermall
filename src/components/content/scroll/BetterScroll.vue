<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
// 导入better-scroll
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            scroll: null,
        }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    // 当组件挂载时
    mounted() {
      // 创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
     //  监测滚动位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) => {
          this.$emit('scrollPosition',position);
        });
      }
      // 上拉加载功能实现
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x,y,time=450){
        // 此处在前面加这样一行代码可避免在scroll对象为空时调用该方法报错
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      saveY(){
        return this.scroll ? this.scroll.y : 0;
      }
    },
}
</script>

<style scoped>
</style>
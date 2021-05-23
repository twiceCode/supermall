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
      }
    },
    // 当组件挂载时
    mounted() {
      // 创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType
      })
     //  监测滚动位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scrollPosition',position);
      });
    },
    methods: {
      scrollTo(x,y,time=450){
        this.scroll.scrollTo(x,y,time);
      },
      refresh(){
        this.scroll.refresh();
      }
    },
}
</script>

<style scoped>
</style>
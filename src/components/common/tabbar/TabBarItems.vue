<template>
  <div class="tabbar-item" @click="itemClick">
    <!-- 我们要显示选中和未选中两种情况 -->
      <div v-if="!isActive"><slot name="tabbar-icon"></slot></div>
      <div v-else><slot name="tabbar-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="tabbar-text"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'TabBarItems',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      // 此处有get和set,只是我们只需要get，省略了set
      isActive(){
        // this.$route.path指的是当前活跃的组件的path
        return this.$route.path.indexOf(this.path) !== -1;
      },
      // 为了更高的可定制性，选中文字的颜色应由调用该组件的人自己决定
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path).catch(err => err)
      }
    },
}
</script>

<style>
.tabbar-item{
  flex: 1;
  /* text-align属性指定元素文本的水平对齐方式 */
  text-align: center;
  /* align-items属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 */
  align-items: center;
  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
  justify-content: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img
{
    width: 24px;
    height: 24px;
}
/* .active{
  color: red;
} */
</style>
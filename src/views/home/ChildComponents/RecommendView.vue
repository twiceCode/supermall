<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props: {
        recommends: {
            type: Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style scoped>
.recommend{
    display: flex;
    /* flex元素的位置 */
    text-align: center;
    font-size: 12px;
    /* 内边距 上，左，右，下 */
    padding: 10px,0,20px;
    /* 设置边框宽度、样式和颜色的速记属性 */
    border-bottom: 8px,solid,#eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 70px;
    height: 70px;
    /* 图片离下面元素的距离 */
    margin-bottom: 10px;
}
</style>
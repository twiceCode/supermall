<template>
  <div class="goods-list" @click="toDetail">
      <img :src="goodsitem.show.img" alt="" @load="itemImagLoad">
      <div class="item-info">
          <p>{{goodsitem.title}}</p>
          <span class="price">{{goodsitem.price}}</span>
          <span class="collection">{{goodsitem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'GoodsItem',
    props: {
        goodsitem: {
            type: Object,
            default(){
                return []
            }
        }
    },
    methods: {
        itemImagLoad(){
            this.$bus.$emit('itemImagLoad');
        },
        toDetail(){
            // 通过路由跳转到详情页,push()方法可以返回，replace()方法不能返回
            this.$router.push('/detail/'+ this.goodsitem.iid);
        }
    },
}
</script>

<style scoped>
.goods-list{
    /* 在图片的下面有文字，因此在此预留空间 */
    padding-bottom: 40px;
    /* 用于图片下面的盒子对父元素的定位 */
    position: relative;
    width: 48%;
}
.goods-list img{
    width: 100%;
    border-radius: 5px;
}
.item-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    /* 文字居中 */
    text-align: center;
    left: 0;
    right: 0;
}
.item-info p {
    overflow: hidden;
    /* 将超出范围的字符变为... */
    text-overflow: ellipsis;
    /* 空白处理 */
    white-space: nowrap;
    margin-bottom: 3px;
}
.item-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.collection{
    position: relative;
}
.item-info .collection::before{
    content: '';
    /* 该选择器位置是绝对定位于collection的，若collection未设置相对定位，则自动相对于goods-list */
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
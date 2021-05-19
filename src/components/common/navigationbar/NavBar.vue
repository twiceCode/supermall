<template>
  <!-- 导航栏的布局分为三块 -->
  <div class="navbar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
.navbar{
    display: flex;
    height: 30%;
    line-height: 44px;
    text-align: center;
    color: #fff;
    box-shadow: 0px,1px,1px,rgba(100, 100, 100, .1);
}
.left,.right{
    width: 20%;
}
.center{
    flex: 1;
}
</style>
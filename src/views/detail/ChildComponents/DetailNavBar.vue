<template>
  <nav-bar>
    <template v-slot:left>
        <div class="back" @click="goBack">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
    </template>
    <template v-slot:center>
        <div class="title">
            <div v-for="(item,index) in titles" :key="index" 
            class="title-item" @click="titleClick(index)" :class="{active: currentIndex===index}">
              {{item}}
            </div>
        </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navigationbar/NavBar'
export default {
    data() {
        return {
            iid: null,
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
        },
        goBack(){
            // this.$router.go(-1);
            this.$router.back();
        }
    },
}
</script>

<style>
.active{
    color: var(--color-high-text);
}
.back{
    margin-top: 5px;
}
.title{
    display: flex;
    font-size: 13px;
    color: black;
}
.title-item{
    flex: 1;
}
</style>
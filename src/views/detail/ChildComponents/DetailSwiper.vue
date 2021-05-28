<template>
  <swiper class="swiper-container">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
    data() {
        return {
            
        }
    },
    props: {
        topImages: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    mounted() {
        
    },
}
</script>

<style>
.swiper-container {
    height: 300px;
    overflow: hidden;
}
</style>
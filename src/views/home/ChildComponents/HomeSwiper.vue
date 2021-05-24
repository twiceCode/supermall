<template>
  <div>
    <swiper>
      <swiper-item v-for="(e,index) in banners" :key="index">
        <a :href="e.link">
          <img :src="e.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
    name: 'HomeSwiper',
    props: {
        banners: {
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
    methods: {
      imgLoad(){
        this.$emit('imgLoad');
      }
    },
}
</script>

<style>

</style>
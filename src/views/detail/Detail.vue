<template>
  <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :topImages="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './ChildComponents/DetailNavBar'
import DetailSwiper from './ChildComponents/DetailSwiper'

import {getDetailData} from 'network/detail'

export default {
    name: 'Detail',
    data() {
        return {
            topImages: []
        }
    },
    components: {
       DetailNavBar,
       DetailSwiper
    },
    created() {
        // 通过路由传递iid
        // 通过路由传参要加冒号
        this.iid = this.$route.params.iid;
        this.getDetailData(this.iid);
    },
    methods: {
        getDetailData(iid){
            getDetailData(iid).then(res => {
                this.topImages = res.result.itemInfo.topImages;
            })
        },
    },
}
</script>

<style scoped>

</style>
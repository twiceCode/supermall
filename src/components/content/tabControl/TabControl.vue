<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key="index" class="tab-control-item"
      :class="getClass(index)" @click="tabClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    data() {
        return {
            currentindex: 0
        }
    },
    methods: {
        getClass(index){
           return {active: this.currentindex===index};
        },
        tabClick(index){
            this.currentindex = index;
            this.$emit('tabClick',index);
        }
    },
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    padding: 8px;
    border-bottom: 2px solid var(--color-high-text);
}
</style>
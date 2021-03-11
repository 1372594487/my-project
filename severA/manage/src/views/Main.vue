<template>
  <div class="main">
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="content" :class="{'content-collapse':wcollapse}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
export default {
    name:'Main',
    components:{
      Header,
      Sidebar
    },
    computed:{
      wcollapse(){
          return this.$store.state.isCollapse;
      }
  },
}
</script>

<style lang="less" scoped>
@import '../assets/less/main.less';
</style>
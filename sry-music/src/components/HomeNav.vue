<template>
  <ul id="home-nav">
    <li><router-link to="/">推荐音乐</router-link></li>
    <li><router-link to="/hot">热歌榜</router-link></li>
    <li><router-link to="/search">搜索</router-link></li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less">
#home-nav {
  border-bottom: 1px solid #eeeeee;
  height: 41px;
  display: flex;
  li {
    flex: 1;
    text-align: center;
    // list-style-type: none;
    a {
      //   background: lightblue;
      text-decoration: none;
      color: black;
      line-height: 40px;
      display: inline-block;
      padding: 0 10px;

      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}



</style>
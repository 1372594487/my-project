<template>
  <div id="app">
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      :playlist="playlist"
      :currentIndex="currentIndex"
      @update:paused="paused = $event"
      @update:music="
        currentMusic = $event.item;
        currentIndex = $event.index;
      "
      @is-show-page="isShowPage = $event"
    />
    <section v-show="isShowPage">
      <HomeNav v-show="$route.meta.isShowNav" />
      <GlobalTitle v-show="!$route.meta.isShowNav">歌单</GlobalTitle>
    </section>

    <!-- <PlayPage/> -->

    <!-- <router-view
      @translate-music="currentMusic = $event"
      v-bind:currentMusic.sync="currentMusic"
    /> -->
    <!-- App data中 currentMusic接收 $event 再通过绑定参数传递给Play-->
    <!-- App data中 paused 通过v-bind:name="value" 传递参数给Recommend组件 最终传递给songItem组件 -->
    
    <transition :name="transition">
      <router-view
        :isShowPage="isShowPage"
        
        @update:music="
          currentMusic = $event.item;
          currentIndex = $event.index;
        "
        @update:playlist="playlist = $event"
        v-bind:currentMusic="currentMusic"
        v-bind:paused="paused"
      />
    </transition>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import GlobalTitle from "@/components/GlobalTitle.vue";
import Play from "@/components/Play.vue";
export default {
  components: {
    HomeNav,
    Play,
    GlobalTitle,
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      playlist: [],
      currentIndex: 0,
      windowHeight: 0,
      isShowPage: true,

      // transition:null,
    };
  },
  //
  // watch:{
  //   "$route.path":function() {
  //     // console.log(this.$route,this.__proto__.__proto__.transition);
  //     this.transition = this.__proto__.__proto__.transition;
  //     console.log(this.transition);
  //   }
  // },
  mounted() {
    // this.windowHeight=window.innerHeight
    // console.log("windowHeight=>",window.innerHeight);
    console.log("mouted()");
  },
  methods: {
    showPage: function (event) {
      console.log(event);
    },
  },
  watch: {
    // "$route.path": function (newV, oldV) {
    //   console.log(newV, oldV);
    //   console.log(this.$route.path);
    //   // if (this.$route.fullPath.indexOf("hot") > -1) {
    //   //   console.log("true");
    //   // }
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.slide-left-enter-active {
  position: fixed;
  top: 41px;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft .3s linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 41px;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight .3s linear forwards;
}

.slide-right-enter-active {
  position: fixed;
  top: 41px;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft .3s linear forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 41px;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight .3s linear forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 41px;
    left: 0;
    opacity: 1;
  }
}
</style>

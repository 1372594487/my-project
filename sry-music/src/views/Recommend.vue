<template>
  <div class="recommend" v-show="isShowPage">
    <RecommendPlayList :currentRecommends="currentRecommends" :isLoad="recommendsReady"
      >推荐歌单</RecommendPlayList
    >
    <!-- 接收的方法同时也是传递出去的方法 现在传给 父组件 App 最终传给play播放组件 -->
    <!-- @update:music="$emit('update:music', $event)" -->
    <!-- App下传的pause经过 子组件 Recommend -->
    <RecommendNewMusic
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :newSongs="newSongs"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      :isLoad="newSongsReady"
      >最新音乐</RecommendNewMusic
    >
  </div>
</template>

<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";

export default {
  props: ["isShowPage"],
  components: {
    RecommendPlayList,
    RecommendNewMusic,
  },
  data: function () {
    return {
      recommends: [],
      newSongs: [],
      recommendsIndex: 0,
      recommendsReady: false,
      newSongsReady: false,
    };
  },
  computed: {
    currentRecommends: function () {
      return this.recommends.slice(
        this.recommendsIndex * 6,
        (this.recommendsIndex + 1) * 6
      );
    },
  },
  watch: {
    isShowPage: function () {
      console.log("isShowPage", this.isShowPage);
    },
    recommendsReady: function () {},
  },
  created() {
    //检查初始状态
    console.log(
      "recommend create",
      this.recommends,
      this.newSongs,
      this.recommendsReady,
      this.newSongsReady,
      this.recommendsIndex
    );
    //是否有缓存
    //
    this.judgeStorageRecommend();
    //
    this.judgeStorageNewSongs();
    //切换

    //创建实例后，axios获取api中数据，赋值给data当前组件data中的newSongs[]
    //再将newSongs[]传给子组件RecommendNewMusic
    //:newSong="newSongs"
    // this.$toast.loading({
    //     message: "加载中...",
    //   });
    // if(this.newSongsReady&&this.recommendsReady) this.$toast.clear();
  },
  // activated(){
  //   console.log("切换");
  //   this.recommendsIndex = this.recommendsIndex>=4?0:this.recommendsIndex+1;
  // },
  mounted() {
    console.log("mounted");
  },
  methods: {
    judgeStorageRecommend: function () {
      const localRecommends = JSON.parse(window.localStorage.getItem("recommends"));
      const sessionRecommends = JSON.parse(window.sessionStorage.getItem("recommends"));
      if (localRecommends && localRecommends.expire > Date.now()) {
        console.log("有缓存");
        //状态
        this.recommendsReady = true;
        //
        this.recommends = JSON.parse(localRecommends.data);
        this.recommendsIndex = sessionRecommends.index;
        console.log(this.recommendsIndex);
        //
        this.recommendsIndex = this.recommendsIndex >= 4 ? 0 : this.recommendsIndex + 1;
        //
        window.sessionStorage.setItem(
          "recommends",
          JSON.stringify({ index: this.recommendsIndex })
        );
        console.log(this.recommendsIndex);
      } else if (localRecommends && localRecommends.expire < Date.now()) {
        console.log("缓存过期");
        //
        localStorage.removeItem("recommends");
        //
        this.getRecommends();
        //
      } else {
        console.log("无缓存");
        this.getRecommends();
      }
    },
    judgeStorageNewSongs: function () {
      const localNewSongs = JSON.parse(window.localStorage.getItem("newSongs"));
      if (localNewSongs && localNewSongs.expire > Date.now()) {
        console.log("有缓存");
        //状态
        this.newSongsReady = true;
        //
        this.newSongs = JSON.parse(localNewSongs.data);
      } else if (localNewSongs && localNewSongs.expire < Date.now()) {
        console.log("无缓存/缓存过期");
        //
        localStorage.removeItem("newSongs");
        //
        this.getnewSongs();
      } else {
        this.getnewSongs();
      }
    },
    getRecommends: function () {
      this.axios.get("/personalized").then((response) => {
        // console.log(response.data.result);
        //
        let obj = JSON.stringify(response.data.result);
        let index = this.recommendsIndex;
        // console.log("obj",obj);
        window.localStorage.setItem(
          "recommends",
          JSON.stringify({ expire: Date.now() + 600 * 1000, data: obj, index: index })
        );
        this.recommends = response.data.result;
        index = this.recommendsIndex;
        //
        window.sessionStorage.setItem("recommends", JSON.stringify({ index: index }));

        // console.log("recommend",this.recommends);
        this.recommendsReady = true;
        if (response) console.log("recommends ready");
      });
    },
    getnewSongs: function () {
      this.axios.get("/personalized/newsong").then((response) => {
        console.log(response.data.result);
        let obj = JSON.stringify(response.data.result);
        window.localStorage.setItem(
          "newSongs",
          JSON.stringify({ expire: Date.now() + 600 * 1000, data: obj })
        );
        this.newSongs = response.data.result;
        this.newSongsReady = true;
        if (response) console.log("newSongs ready");
      });
    },
  },
};
</script>

<style scoped lang="less">
.recommend {
}
</style>

<template>
  <div class="hot" v-show="isShowPage">
    <div class="bg">
      <div class="bg-content">
        <div class="img"></div>
        <p>更新日期：12月31日</p>
      </div>
    </div>
      <PlayListMusic
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', $event)"
        :songs="Songs"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        :select="2"
        :isReady="HotSongsReady"
      ></PlayListMusic>
  </div>
</template>

<script>
import PlayListMusic from "@/components/PlayListMusic.vue";
export default {
  props: ["isShowPage"],
  components: { PlayListMusic },
  data: function () {
    return {
      id: null,
      songIDs: null,
      Songs:[],
      tempSongs: null,
      songImg: null,
      tempSlice: 9,
      //
      HotSongsReady: false,
    };
  },
  created() {
    console.log("Hot created", this.HotSongsReady);
    this.judgeStorageHotSongs();
  },
  watch: {
    // songIDs: function (val) {
    //   if (val) this.getSongs(this.songIDs);
    // },
    // HotSongsReady: function (state) {
    //   if (state) {
    //     this.$toast.clear();
    //   }
    // },
  },

  methods: {
    judgeStorageHotSongs: function () {
      const localHotSongs = JSON.parse(window.localStorage.getItem("HotSongs"));
      if (localHotSongs && localHotSongs.expire > Date.now()) {
        console.log("有缓存");
        //状态
        this.HotSongsReady = true;
        //
        this.tempSongs = JSON.parse(localHotSongs.data);
        this.Songs = this.tempSongs.slice(0, 11);
      } else {
        // this.$toast.loading({
        //   message: "加载中...",
        // });
        this.getHotList();
      }
    },
    getHotList: function () {
      this.axios.get("/top/list?idx=1").then((response) => {
        // console.log(response.data.playlist.trackIds);
        if (response) {
          this.getSongID(response.data.playlist.trackIds, 45);
        }
      });
    },
    getSongID: function (songs, limit) {
      if (songs && songs.length >= limit) {
        let arrTemp = songs.slice(0, limit);
        //
        this.songIDs = arrTemp
          .map((song) => {
            return song.id;
          })
          .join(",");
        this.getSongs(this.songIDs);
        // console.log(this.songIDs);
      } else {
        console.log("不够10首");
      }
    },
    getSongs: function (ids) {
      console.log("getSongs()");
      //歌曲详情接口
      this.axios.get(`/song/detail?ids=${ids}`).then((response) => {
        if (response.data && response.data.code == 200) {
          this.tempSongs = response.data.songs;
          this.Songs = this.tempSongs.slice(0, 11);
          let obj = JSON.stringify(this.tempSongs);
          window.localStorage.setItem(
            "HotSongs",
            JSON.stringify({ expire: Date.now() + 120 * 1000, data: obj })
          );
          this.HotSongsReady = true;
          console.log("this.HotSongsReady",this.HotSongsReady);
          // console.log(this.Songs);
        }
      });
      // /song/detail?ids="这个id是音乐id"
    },
    scroll() {
      let isLoading = false;
      window.onscroll = () => {
        // 距离底部50px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          50;
        if (bottomOfWindow && isLoading == false) {
          isLoading = true;
          //   axios.get(`https://randomuser.me/api/`).then(response => {
          //     person.push(response.data.results[0])
          //     isLoading = false
          //   })
          if (this.tempSlice <= 22) {
            //
            this.$toast({
              message: "加载中",
              duration: "500",
              position: "bottom",
            });
            //
            // console.log(this.tempSongs.slice(this.tempSlice, this.tempSlice + 9));
            for (let item of this.tempSongs.slice(
              this.tempSlice,
              this.tempSlice + 11
            )) {
              this.Songs.push(item);
            }
            this.tempSlice = this.tempSlice + 11;
            console.log(this.tempSlice);
            isLoading = false;
          } else if (this.tempSlice == 33) {
            this.tempSlice = 99;
            this.$toast({
              message: "没有更多了...",
              duration: "2000",
              position: "bottom",
            });
          }
          console.log(bottomOfWindow, this.Songs);
        }
      };
    },
  },
  mounted(){
    this.scroll();
  }
};
</script>

<style lang="less" scoped>
.hot {
  .bg {
    background: cornflowerblue;
    .bg-content {
      padding: 1em;
      display: flex;
      flex-direction: column;
      .img {
        width: 142px;
        height: 67px;
        background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
          no-repeat;
        background-size: 166px 97px;
        background-position: -22px -30px;
      }
      p {
        margin-top: 0.5em;
      }
    }
  }
  p {
    font-size: 12px;
    color: white;
  }
}
</style>
>

<template>
  <div class="playlist" v-show="isShowPage">
    <div class="solid">
    <div class="header">
      <div
        class="header-bg"
        :style="{ backgroundImage: 'url(' + listDetail.coverImgUrl + ') ' }"
      ></div>
      <template v-if="isReady_ListDetail">
        <div class="header-content">
          <div class="content-l">
            <img :src="listDetail.coverImgUrl" alt="" class="listImg" />
          </div>
          <div class="content-r">
            <span class="name">
              {{ listDetail.name }}
            </span>
            <div class="r-content">
              <div class="headIcon">
                <img :src="listCreator.avatarUrl" alt="" />
              </div>
              <span class="creator">
                <p>{{ listCreator.nickname }}</p>
              </span>
            </div>
            <h5 class="desc">
              {{ listDetail.description }}
            </h5>
          </div>
        </div>
      </template>
      <template v-else>
        <PlayListSkeleton />
      </template>
      <!-- <div>
        <img :src="listCreator.backgroundUrl" alt="" />
      </div> -->
    </div>
    </div>

    <PlayListMusic
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :songs="Songs"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      :isReady="isReady_Song"
      >音乐歌单</PlayListMusic
    >
  </div>
</template>

<script>
import PlayListMusic from "@/components/PlayListMusic.vue";
import PlayListSkeleton from "@/components/PlayListSkeleton.vue";
export default {
  props: ["isShowPage"],
  components: { PlayListMusic, PlayListSkeleton },
  data: function () {
    return {
      id: null,
      listDetail: {
        type: Object,
      },
      listCreator: {
        type: Object,
      },
      songIDs: null,
      Songs: [],
      tempSongs: null,
      tempSlice: 9,
      songImg: null,
      //
      isReady_ListDetail: false,
      isReady_Song: false,
    };
  },
  created() {
    // this.isReady_ListDetail = false;
    // this.isReady_Song = false;
    this.id = this.$route.query.id;
    console.log("created() this.id", this.id);
  },
  watch: {
    "$route.query.id": function () {
      // console.log("watch $route.query.id", this.$route.query.id);
      this.id = this.$route.query.id;
    },
    id: function () {
      // console.log("watch id", this.id, this.id != undefined);
      this.isReady_ListDetail = false;
      //
      if (this.id && this.id != undefined) {
        this.getListDetail(this.id);
      }
    },
    isReady_ListDetail: function (val) {
      if (val == true) {
        this.getSongs(this.songIDs);
      } else {
        console.log(this.isReady_ListDetail);
      }
    },
    isReady_Song: function (val) {
      if (val) {
        this.$toast.clear();
      }
    },
  },
  //   beforeRouteUpdate(to, from, next) {
  //       console.log("beforeRouteUpdate to",to.query.id);
  //       console.log("beforeRouteUpdate from",from.query.id);
  //       console.log("beforeRouteUpdate next",next.query.id);
  //       this.id = to.query.id;
  //       next();
  //   }

  methods: {
    getListDetail: function (id) {
      console.log("getListDetail()");
      //
      // this.$toast.loading({
      //   message: "加载中...",
      // });
      this.axios.get(`/playlist/detail?id=${id}`).then((response) => {
        if (
          response.data &&
          response.data.code == 200 &&
          response.data.playlist
        ) {
          this.listDetail = response.data.playlist;
          this.listCreator = response.data.playlist.creator;
          // console.log("歌单歌曲id",response.data.playlist.trackIds);
          this.getSongID(response.data.playlist.trackIds);
          this.isReady_ListDetail = true;
          console.log("getListDetail isReady_ListDetail ");
        } else {
          console.log("getListDetail response ");
        }
      });
      // /song/detail?ids="这个id是音乐id"
    },

    getSongID: function (songs) {
      if (songs && songs.length >= 10) {
        let arrTemp = songs.slice(0, 45);
        //
        this.songIDs = arrTemp
          .map((song) => {
            return song.id;
          })
          .join(",");
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
          //
          this.Songs = this.tempSongs.slice(0, 9);
          this.isReady_Song = true;
          console.log("this.isReady_Song");
          // console.log(this.tempSongs);
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
          if (this.tempSlice <= 18) {
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
              this.tempSlice + 9
            )) {
              this.Songs.push(item);
            }
            this.tempSlice = this.tempSlice + 9;
            console.log(this.tempSlice);
            isLoading = false;
          } else if (this.tempSlice == 27) {
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
  mounted() {
    console.log(" playlist mounted", this.tempSlice);
    this.scroll();
  },
};
</script>

<style scoped lang="less">
.playlist {
  .header {
    width: 100%;
    padding: 0.8em;
    padding-bottom: 1em;
    padding-top: 41px;
    position: relative;
    z-index: 9;

    .header-bg {
      max-width: 80%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 50% 50%;
      filter: blur(25px);
      -webkit-transform: scale(1.5);
      -ms-transform: scale(1.5);
      transform: scale(1.5);
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        content: " ";
        background-color: rgba(0, 0, 0, 0.3);
        display: block;
      }
    }

    .header-content {
      z-index: 2;
      position: relative;
      color: white;
      display: flex;
      .content-l {
        flex: 4;
        position: relative;
        .listImg {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: auto;
          border-radius: 2px;
        }
      }
      .content-r {
        flex: 7;
        flex-direction: column;
        display: inline-flex;
        justify-content: space-around;

        .name {
          font-size: 1em;
          padding-left: 1rem;
          overflow: hidden;
          justify-content: left;
          text-overflow: ellipsis; //超出部分以省略号显示
          white-space: wrap;
          text-align: left;
        }
        .r-content {
          position: relative;
          // margin-top: 1em;
          // margin-bottom: 0.5em;
          display: inline-flex;
          justify-content: left;
          padding-left: 1rem;
          width: 70%;
          // margin: 1em auto 0.5em;
          .headIcon {
            border-radius: 50%;
            overflow: hidden;
            height: 2em;
            img {
              width: 2em;
              height: 2em;
            }
          }
          .creator {
            flex: 3;
            font-size: 14px;
            padding-left: 0.5em;
            color: rgb(192, 188, 182);
            width: 4em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
            text-align: left;
            p {
              color: red; //用px单位亦可行
            }
          }
        }
        .desc {
          padding-left: 1rem;
          font-size: 12px;
          justify-content: left;
          color: rgba(255, 255, 255, 0.9);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>

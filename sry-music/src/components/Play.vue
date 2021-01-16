<template>
  <div class="play" :class="{ paused: paused }">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      controls
      autoplay
      style="width: 100%; height: 40px"
      ref="audio"
      hidden
    ></audio>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-bar" v-show="isShowPlayBar">
        <img
          :src="[
            currentMusic.picUrl ? currentMusic.picUrl : currentMusic.al.picUrl,
          ]"
          @click="
            isShowPlayBar = false;
            $emit('is-show-page', isShowPlayBar);
          "
          alt=""
        />

        <h5>
          {{ currentMusic.name }}
        </h5>
        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <!-- 暂停 -->
          <span class="icon">
            <span v-if="!paused"
              ><svg
                t="1609963355731"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3799"
                width="16"
                height="16"
              >
                <path
                  d="M870.4 0c-81.613 0-153.6 50.995-153.6 109.466v804.966c0 58.573 71.987 109.568 153.6 109.568S1024 973.005 1024 914.534V109.568C1023.078 50.995 952.013 0 870.4 0zM153.6 0C71.987 0 0 50.995 0 109.466v804.966C0 973.005 71.987 1024 153.6 1024s153.6-50.995 153.6-109.466V109.568C307.2 50.995 235.213 0 153.6 0z"
                  p-id="3800"
                  fill="#bfbfbf"
                ></path></svg
            ></span>
            <!-- 播放 -->
            <span v-else style="margin-left: 2px">
              <svg
                t="1609963430670"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1733"
                width="20"
                height="20"
              >
                <path
                  d="M918.49697 437.527273c-9.309091-15.515152-21.721212-27.927273-40.339394-40.339394L285.478788 24.824242C229.624242-12.412121 152.048485 6.206061 114.812121 62.060606 102.4 83.781818 96.193939 105.50303 96.193939 130.327273v744.727272c0 68.266667 55.854545 124.121212 124.121213 124.121213 24.824242 0 46.545455-6.206061 65.163636-18.618182l592.678788-372.363637c58.957576-37.236364 74.472727-114.812121 40.339394-170.666666z"
                  p-id="1734"
                  fill="#8a8a8a"
                ></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </transition>

    <!-- PlayPage -->
    <!-- :style = ' { backgroundImage : " url ( " + item.img + " ) " } '  :background-url="currentMusic.picUrl ? currentMusic.picUrl : currentMusic.al.picUrl" -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-if="!isShowPlayBar">
        <div
          class="bg"
          :style="{
            backgroundImage:
              'url(' +
              (currentMusic.picUrl
                ? currentMusic.picUrl
                : currentMusic.al.picUrl) +
              ')',
          }"
        ></div>
        <PlayFullHeader
          :currentMusic="currentMusic"
          @show-play-bar="
            isShowPlayBar = true;
            $emit('is-show-page', isShowPlayBar);
          "
        />
        <template>
          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
          <keep-alive>
            <PlayFullyric
              v-if="isShowLyric"
              @toggle-show-lyric="isShowLyric = !isShowLyric"
              @updataTime="syncTime($event)"
              :currentMusicID="currentMusic.id"
              :currentTime="currentTime"
              :totalTime="duration"
            />
          </keep-alive>
            
          </transition>

          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <PlayFullChart
              :paused="paused"
              :imgSrc="
                currentMusic.picUrl
                  ? currentMusic.picUrl
                  : currentMusic.al.picUrl
              "
              v-if="!isShowLyric"
              @toggle-show-lyric="isShowLyric = !isShowLyric"
            />
          </transition>
        </template>
        <PlayFullFooter
          :paused="paused"
          :currentTime="this.currentTime"
          :duration="this.duration"
          :currentIndex="currentIndex"
          :playlist="playlist"
          @update:currentTime="updataCurrentTime($event)"
          @updata:paused="pauseStateChange($event)"
          @update:music="$emit('update:music',$event)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHeader from "@/components/PlayFullHeader.vue";
import PlayFullyric from "@/components/PlayFullyric.vue";
import PlayFullChart from "@/components/PlayFullChart.vue";
import PlayFullFooter from "@/components/PlayFullFooter.vue";
export default {
  props: ["currentMusic", "currentIndex", "playlist"],
  components: {
    PlayFullHeader,
    PlayFullyric,
    PlayFullChart,
    PlayFullFooter,
  },
  data: function () {
    return {
      paused: null,
      isShowLyric: false,
      duration: 0,
      currentTime: 0,
      isShowPlayBar: true,
    };
  },
  //页面挂载完成
  mounted() {
    //
    // console.log("mounted", this.$refs.audio);
    let audio = this.$refs.audio;
    //
    audio.addEventListener("pause", () => {
      this.paused = true;
    });
    //
    audio.addEventListener("play", () => {
      this.paused = false;
    });
    //
    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
    });
    //
    audio.addEventListener("timeupdate", () => {
      //
      this.currentTime = audio.currentTime;
      //canvas
      this.drawCircle(this.currentTime, this.duration);
    });
    //
    audio.addEventListener("ended", () => {
      // 播放完成下一曲
      this.playNext();
    });
  },

  methods: {
    drawCircle: function (currentTime, totalTime) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      ctx.arc(
        25,
        25,
        19,
        Math.PI * -0.5,
        Math.PI * ((currentTime / totalTime) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    //play next song
    playNext: function () {
      console.log("下一曲");
      let index = this.calculateNext();
      // console.log(this.currentIndex,index);
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    calculateNext: function () {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      //顺序循环
      let nextIndex;
      if (this.currentIndex < this.playlist.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      return nextIndex;
    },
    //

    updataCurrentTime: function (event) {
      let audio = this.$refs.audio;
      audio.currentTime = event;
      // console.log("event =>", event);
    },
    pauseStateChange: function (event) {
      let audio = this.$refs.audio;
      this.paused = event;
      if (event == true) {
        audio.pause();
      } else {
        audio.play();
      }
    },
    syncTime: function (time) {
      let audio = this.$refs.audio;
      audio.currentTime = time;
      // console.log(time);
    },
  },

  watch: {
    paused: function (n) {
      this.$emit("update:paused", n);
    },
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
        // box-shadow: 0 0 4px 0 grey;
      }
      .control {
        span.icon {
          span {
          }
          // &::before {
          //   content: "Play";
          // }
        }
      }
    }
  }
}
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  background: white;
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  img {
    width: 36px;
    height: 36px;
    margin: 7px;
    border-radius: 50%;
    animation: playing 6s linear infinite;
    box-shadow: 0 0 5px 0 grey;
  }
  h5 {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis; //超出部分以省略号显示
    white-space: nowrap;
    width: 20em; //用px单位亦可行
  }
  .control {
    position: relative;
    span.icon {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      // display: block;
      // background: rgba(240, 128, 128, 0.507);
      // &::before {
      //   content: "Pause";
      // }
    }
  }
}
.play-full {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  color: white;
  .bg{
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transform: scale(1.2);
      filter: blur(14px);
  }
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    content: " ";
    background-color: rgba(0, 0, 0, 0.7);
    display: block;
  }
}

@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

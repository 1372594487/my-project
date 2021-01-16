<template>
  <div class="play-full-footer">
    <!-- <input
      type="range"
      min="0"
      :max="duration"
      step="1"
      @input="getValue"
      :value="currentTime"
      @touchstart="down"
      @touchend="up"
    /> -->
    <div class="inputcontent">
      <div class="input">
        <span class="left">{{
          `${
            parseInt(currentTime / 60) > 9
              ? parseInt(currentTime / 60)
              : parseInt(currentTime / 60) >= 1
              ? "0" + parseInt(currentTime / 60)
              : "00"
          }:${
            parseInt(currentTime % 60) > 9
              ? parseInt(currentTime % 60)
              : "0" + parseInt(currentTime % 60)
          }
         `
        }}</span>
        <span class="right">{{
          `${
            parseInt(duration / 60) > 9
              ? parseInt(duration / 60)
              : parseInt(duration / 60) >= 1
              ? "0" + parseInt(duration / 60)
              : "00"
          }:${
            parseInt(duration % 60) > 9
              ? parseInt(duration % 60)
              : "0" + parseInt(duration % 60)
          }
         `
        }}</span>

        <van-slider
          bar-height="4px"
          button-size="16px"
          min="0"
          :max="duration"
          step="1"
          v-model="valuel"
          @input="getVal"
          @drag-start="down"
          @drag-end="up"
          active-color="#ee0a24"
        >
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
      </div>
    </div>

    <div class="control">
      <!-- 播放模式 -->
      <span @click.stop="changeMode()"
        ><svg v-show="playMode == 0"
          t="1609917044643"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10273"
          width="26"
          height="26"
        >
          <path
            d="M842 513.7s0 0.1 0 0c0 106.1-86 192.1-192 192.1H393.9c-106 0-192-86-192-192s86-192 192-192h309.8v77.1L890.5 291 703.8 183.2v74H393c-141.4 0-256.1 114.6-256.1 256.1 0 141.4 114.6 256.1 256.1 256.1h256c141.3 0 255.9-114.4 256.1-255.7H842z"
            p-id="10274"
            fill="#8a8a8a"
          ></path></svg
      >
      <svg v-show="playMode==1" t="1609916393480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2688" width="24" height="24"><path d="M747.093333 596.48a21.333333 21.333333 0 0 1 12.586667 4.096l133.888 97.792a21.333333 21.333333 0 0 1-0.106667 34.56l-133.909333 96.405333a21.333333 21.333333 0 0 1-33.813333-17.322666v-53.482667c-82.858667-0.789333-133.397333-24.896-178.709334-81.088 16.810667-24.192 32.597333-51.029333 47.808-80.554667 36.032 56.213333 68.885333 75.690667 130.901334 76.288V617.813333a21.333333 21.333333 0 0 1 21.333333-21.333333zM746.88 169.472a21.333333 21.333333 0 0 1 12.458667 4.010667l134.058666 96.298666a21.333333 21.333333 0 0 1 0.149334 34.56l-134.08 98.026667a21.333333 21.333333 0 0 1-33.92-17.237333v-55.296c-86.592 0.789333-118.784 37.824-175.381334 161.365333-6.357333 13.930667-9.749333 21.333333-12.906666 28.16-75.946667 164.16-153.642667 236.608-323.541334 239.232H128v-85.76h85.077333c129.152-1.984 182.784-51.989333 246.4-189.482667 3.072-6.656 6.357333-13.866667 12.757334-27.861333 69.141333-150.912 122.88-210.197333 253.333333-211.413333V190.805333a21.333333 21.333333 0 0 1 21.333333-21.333333zM213.76 244.074667c102.442667 1.578667 171.370667 28.544 226.602667 85.717333a981.12 981.12 0 0 0-42.432 82.133333c-44.693333-57.450667-97.493333-80.746667-184.832-82.112H128v-85.76h85.738667z" p-id="2689" fill="#8a8a8a"></path></svg>

      <svg v-show="playMode==2" t="1609916438784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3670" width="24" height="24"><path d="M925.1 600.7c-26.3-8.7-54.7 5.8-63.4 32.6-35.2 109-134.3 182.3-246.6 182.3H423.5C280.4 815.5 164 697 164 551.2s116.4-264.3 259.4-264.3h264.3c1.3 17.6 3.4 35.1 6.1 52.7 2.7 17.3 19.7 28.1 36.1 22.9 72.6-23.4 135.7-58.4 189.3-104.9 13.2-11.5 13-32.4-0.4-43.6-54.9-46-117.8-81-188.6-104.9-16.4-5.6-33.7 5.3-36.4 22.8-2.7 17.6-4.7 35.2-6.1 52.7H423.5c-198.4 0-359.9 164.5-359.9 366.6 0 202.2 161.4 366.6 359.9 366.6h191.7c155.7 0 293.1-101.5 342-252.6 8.6-26.8-5.8-55.7-32.1-64.5zM549.9 725.2V390h-30c-11.3 12.7-24.4 23.9-40.4 34.3-16 9.4-31.9 16-46.9 20.2V483c31.4-9.4 57.7-24.4 78.9-46v288.2h38.4z" p-id="3671" fill="#8a8a8a"></path></svg>
      </span>

        
      <!-- 上一首 -->
      <span @click.stop="playPrev()">
        <svg
          t="1609916694433"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7220"
          width="24"
          height="24"
        >
          <path
            d="M845.887 87.098c49.695 0 90.862 41.162 90.862 90.862l0 699.902c0 49.695-41.162 90.862-90.862 90.862-15.61299999 0-31.236-4.263-45.427-12.77900001l-606.203-349.24999999c-28.393-17.029-45.427-45.427-45.427-79.503 0-32.649 17.029-62.474 45.427-79.503l606.20300001-349.25c12.779-7.097 28.393-11.346 45.42699999-11.34599999zM845.887 911.92500001c17.029 0 34.08-12.779 34.08-34.08000001l0-699.902c0-21.299-18.448-34.08-34.08-34.08000001-5.67400001 0-11.346 1.433-17.029 4.26300001l-606.203 349.25c-15.613 8.518-17.029 24.142-17.029 29.809s1.433 21.299 17.029 29.809l606.203 349.25c4.263 4.263 9.938 5.67400001 17.029 5.674zM119.00599999 87.098c15.61299999 0 28.393 12.779 28.39300001 28.393l0 824.839c0 15.61299999-12.779 28.393-28.393 28.393s-28.393-12.779-28.393-28.393l0-824.839c0-15.61299999 12.779-28.393 28.39299999-28.393z"
            p-id="7221"
            fill="#8a8a8a"
          ></path>
        </svg>
      </span>
      <!-- 播放|暂停 -->
      <span @click.stop="togglePlayState">
        <svg
          v-if="paused"
          t="1609917480702"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11120"
          width="32"
          height="32"
        >
          <path
            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333c-258.133 0-469.333-211.2-469.333-469.333S253.867 42.667 512 42.667 981.333 253.867 981.333 512 770.133 981.333 512 981.333z"
            p-id="11121"
            fill="#8a8a8a"
          ></path>
          <path
            d="M672 441.6L501.333 328.533c-57.6-38.4-106.666-12.8-106.666 57.6v256c0 70.4 46.933 96 106.666 57.6L672 586.667C729.6 544 729.6 480 672 441.6z"
            p-id="11122"
            fill="#8a8a8a"
          ></path>
        </svg>
        <svg
          v-else
          t="1609958472956"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2870"
          width="32"
          height="32"
        >
          <path
            d="M512 8.8576C234.496 8.8576 8.8576 234.496 8.8576 512c0 277.504 225.6896 503.1424 503.1424 503.1424 277.504 0 503.1424-225.6896 503.1424-503.1424C1015.1424 234.496 789.504 8.8576 512 8.8576z m0 937.984A434.7904 434.7904 0 0 1 77.1584 512 434.7904 434.7904 0 0 1 512 77.1584 434.7904 434.7904 0 0 1 946.8416 512 434.7904 434.7904 0 0 1 512 946.8416zM408.4736 304.9472a45.9776 45.9776 0 0 0-45.568 45.568v320.9216c0 24.832 20.736 45.568 45.568 45.568s45.568-20.736 45.568-45.568V350.5152a45.9776 45.9776 0 0 0-45.568-45.568z m207.0528 0a45.9776 45.9776 0 0 0-45.568 45.568v320.9216c0 24.832 20.736 45.568 45.568 45.568s45.568-20.736 45.568-45.568V350.5152a45.9776 45.9776 0 0 0-45.568-45.568z"
            fill="#bfbfbf"
            p-id="2871"
          ></path>
        </svg>
      </span>
      <!-- 下一首 -->
      <span @click.stop="playNext()">
        <svg
          t="1609916668348"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6989"
          width="24"
          height="24"
        >
          <path
            d="M178.113 936.902c-49.695 0-90.862-41.162-90.862-90.862v-699.902c0-49.695 41.162-90.862 90.862-90.862 15.613 0 31.236 4.263 45.427 12.779l606.203 349.25c28.393 17.029 45.427 45.427 45.427 79.503 0 32.649-17.029 62.474-45.427 79.503l-606.203 349.25c-12.779 7.097-28.393 11.346-45.427 11.346zM178.113 112.075c-17.029 0-34.080 12.779-34.080 34.080v699.902c0 21.299 18.448 34.080 34.080 34.080 5.674 0 11.346-1.433 17.029-4.263l606.203-349.25c15.613-8.518 17.029-24.142 17.029-29.809s-1.433-21.299-17.029-29.809l-606.203-349.25c-4.263-4.263-9.938-5.674-17.029-5.674zM904.994 936.902c-15.613 0-28.393-12.779-28.393-28.393v-824.839c0-15.613 12.779-28.393 28.393-28.393s28.393 12.779 28.393 28.393v824.839c0 15.613-12.779 28.393-28.393 28.393z"
            p-id="6990"
            fill="#8a8a8a"
          ></path></svg
      ></span>
      <!-- 播放列表 -->
      <span>
        <svg
          t="1609916879045"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9206"
          width="24"
          height="24"
        >
          <path
            d="M964.608 234.496c-46.08-52.565333-104.789333-93.696-169.642667-118.784a34.030933 34.030933 0 0 0-46.421333 31.744v420.352a178.005333 178.005333 0 0 0-110.933333-38.741333c-98.816 0-179.2 80.384-179.2 179.2S538.794667 887.466667 637.610667 887.466667s179.2-80.384 179.2-179.2c0-1.877333-0.170667-3.754667-0.341334-5.632 0-1.024 0.341333-1.877333 0.341334-2.901334V201.216c36.181333 20.309333 69.12 46.933333 96.597333 78.165333 12.458667 14.165333 34.133333 15.530667 48.128 3.072 14.165333-12.288 15.530667-33.792 3.072-47.957333zM637.610667 819.2c-61.098667 0-110.933333-49.834667-110.933334-110.933333s49.834667-110.933333 110.933334-110.933334 110.933333 49.834667 110.933333 110.933334-49.834667 110.933333-110.933333 110.933333zM185.344 307.2h392.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133334h-392.533333a34.133333 34.133333 0 1 0 0 68.266667zM424.277333 460.8h-238.933333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h238.933333c18.773333 0 34.133333-15.36 34.133334-34.133334s-15.36-34.133333-34.133334-34.133333zM321.877333 682.666667h-136.533333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133333z"
            p-id="9207"
            fill="#8a8a8a"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentTime", "duration", "paused", "currentIndex", "playlist"],
  data: function () {
    return {
      valuel: 0,
      playMode:0,
    };
  },
  watch: {
    currentTime: function (v) {
      this.valuel = parseInt(v);
    },
    paused: function (n) {
      this.$emit("update:paused", n);
    },
  },
  methods: {
    getValue: function (e) {
      // console.log(e.target.value);
      this.$emit("update:currentTime", e.target.value);
    },
    getVal: function (v) {
      this.$emit("update:currentTime", v);
      return this.valuel;
    },
    down: function () {
      this.$emit("updata:paused", true);
      // console.log('updata:paused,down');
    },
    up: function () {
      this.$emit("updata:paused", false);
      // console.log('updata:paused,up');
    },
    togglePlayState: function () {
      console.log(this.paused, this.$refs);
      if (this.paused) {
        this.$emit("updata:paused", false);
        console.log("updata:paused t");
      } else {
        this.$emit("updata:paused", true);
        console.log("updata:paused f");
      }
    },
    //播放模式
    playNext: function () {
      console.log("下一曲");
      let index = this.calculateNext("next");
      // console.log(this.currentIndex,index);
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    playPrev: function () {
      console.log("上一曲");
      let index = this.calculateNext("prev");
      // console.log(this.currentIndex,index);
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    calculateNext: function (judge) {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      //顺序循环
      let nextIndex;
      switch (judge){
        case "next":
            if (this.currentIndex < this.playlist.length - 1) {
          nextIndex = this.currentIndex + 1;
        } else {
          nextIndex = 0;
        }
        return nextIndex;
        case "prev":
          return this.currentIndex==0 ? this.playlist.length - 1 : this.currentIndex - 1;
        
      }
    },
    changeMode:function(){
        this.playMode == 2 ? this.playMode=0: this.playMode=this.playMode+1;
        console.log("this.playMode",this.playMode);
      }
  },
};
</script>

<style lang="less">
.play-full-footer {
  background-color: white;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  .inputcontent {
    position: relative;
    padding: 0.5em 2.7em 1em;
    .input {
      position: relative;
      .left {
        position: absolute;
        top: -4px;
        left: -36px;
        color: red;
        font-size: 10px;
      }
      .right {
        position: absolute;
        top: -4px;
        right: -34px;
        color: red;
        font-size: 10px;
      }
      .van-slider {
        height: 6px;
      }
      .custom-button {
        width: 8px;
        height: 8px;
        color: #ee0a24;
        background-color: #ee0a24;
        border-radius: 100%;
      }
    }
  }

  .control {
    display: flex;
    span {
      text-align: center;
      flex: 1;
      align-self: center;
    }
  }
}
</style>
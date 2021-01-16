<template>
  <div class="lyric" @click="$emit('toggle-show-lyric')">
    <div
      v-if="hasLyric"
      class="wrapper"
      @touchmove="move"
    >
      <ul class="lyrics" ref="lyricUl" v-if="isReady">
        <li
          v-for="(singleTextParm, index) in lyric"
          :key="index"
          data-lyric-id="singleTextParm.lyric_id"
          height=""
          :class="{ active: singleTextParm.isActive }"
        >
          {{ singleTextParm.text }}
        </li>
      </ul>
    </div>
    <div class="noLyric" v-else>本歌曲暂无歌词</div>
  </div>
</template>

<script>
export default {
  // props:{
  //   lyric:{
  //     type:Object,
  //   },
  //   audio:{
  //     type:Object
  //   }

  // }
  props: ["currentMusicID", "currentTime", "totalTime"],
  data: function () {
    return {
      lyric: {
        type: Array,
      },
      lineNo: 0,
      currentLineNo: {
        type: Number,
        default: 0,
      },
      Cpos: 5,
      offset: -42,
      textHeight: 0,
      isActive: false,
      isReady: false,
      moveDis: 0,
      startY: 0,
      endY: 0,
      hasLyric: true,
      moving: 0,
      translateY: 0,
    };
  },
  //created
  created() {
    //
    this.isReady = false;
    console.log("create()", "isReady", this.isReady, this.lyric);
    this.getLyric();
  },
  //mounted
  mounted() {
    // console.log("lineNo", this.lineNo);
    // console.log("当前lineNo", this.lineNo);
  },
  watch: {
    currentTime: function (newTime, oldTime) {
      //newTime, oldTime
      // console.log(this.lyric);
      // console.log("currentTime watch");
      let curIntTime = parseInt(this.currentTime);
      let disTime = newTime - oldTime;
      // console.log("ttttttime",disTime);
      // console.log(this.lineNo, curIntTime);
      // console.log(`${disTime},${curIntTime},${parseInt(this.totalTime)}`);
      //资源加载完毕
      if (this.isReady && this.hasLyric) {
        //播放完毕 歌词回滚
        if (curIntTime == parseInt(this.totalTime)) {
          console.log("回滚", this.isReady);
          this.$refs.lyricUl.style.transform = "translateY(0)";
          this.$refs.lyricUl.style.transition = "transform 1s ease";
          this.lineNo = 0; //lineNo清零，重新播放
          this.isReady = false;
          console.log("loading", this.isReady);
        }
        //正常播放
        if (disTime >= 0 && disTime <= 1) {
          // console.log("正常播放");
          //lineNo不超过歌词数组长度的情况下
          if (this.lineNo < this.lyric.length) {
            let i = this.findlineNo();
            // console.log(
            //   "正确索引i",
            //   i,
            //   "当前索引this.lineNo",
            //   this.lineNo,
            //   "差值",
            //   Math.abs(i - this.lineNo)
            // );
            //
            if (curIntTime == 0 && curIntTime == 0) {
              console.log("lineNo 0000");
              //重置高亮
              this.initHeightLight();
              this.$refs.lyricUl.style.transform = "translateY(0)";
              this.$refs.lyricUl.style.transition = "transform 1s ease";
              this.lineNo = 0;
            } else if (Math.abs(i - this.lineNo) > 4) {
              console.log("人为拖动/切換組件");
              //重置高亮
              this.initHeightLight();
              //瞬间滑动到对应位置
              //高亮
              this.lyric[i].isActive = true;
              //滚动
              this.$refs.lyricUl.style.transform =
                "translateY(" + (i - this.Cpos) * this.offset + "px)";
              //移动完之后将正确索引赋值给当前索引
              this.lineNo = i;
            } else {
              // 常规播放
              // console.log("常规播放");
              this.play(newTime, oldTime, curIntTime);
            }
          }
        }
      }
    },
    currentMusicID: function (newVal) {
      // console.log(newVal, oldVal);
      this.currentMusicID = newVal;
      this.getLyric();
    },

    // isReady:function(v){
    //   if(v) {
    //     window.localStorage.setItem('lyric',JSON.stringify(this.lyric))
    //   }
    // }

    // lineNo: function (newVal) {
    //   this.textHeight = 0 - this.lyric[newVal].textHeight;
    // },
  },
  methods: {
    getLyric: function () {
      console.log("getLyric()");
      if (this.isReady == false) {
        this.$toast.loading({
          message: "歌词加载中...",
          duration:5000,
        });
      }

      // console.log(this.currentMusicID);
      this.axios.get(`/lyric?id=${this.currentMusicID}`).then((response) => {
        // console.log(!!response.data.lrc==true);
        //
        if (!!response.data.lrc == true) {
          this.lyric = this.handleLyric(response.data.lrc.lyric);
          // console.log(this.lyric);
          //tempLyric
          
          this.$toast.clear();
        } else {
          this.hasLyric = false;
        }
        this.isReady = true;
        console.log("getLyric()done,new isReady", this.isReady);
        // for (let i = 0; i < this.lyric.length; i++) {
        //   // console.log(this.lyric[i].text, this.lyric[i].text.length);
        // }
      });
    },

    handleLyric: function (lyric) {
      //忽略大小写
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      var isDoubleRow = false;
      //fliter()过滤结尾空数组
      var temp_arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var lyric_id = time;
          lyric_id = lyric_id.replace(":", "");
          lyric_id = lyric_id.replace(".", "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          if (text.length == 0) {
            text = text.replace("", "...");
          }
          if (text.length > 10) {
            isDoubleRow = true;
          }
          let isActive = false;
          return { time, text, lyric_id, isActive, isDoubleRow };
        });
      return temp_arr;
    },
    //findlineNo
    findlineNo: function () {
      // console.log("fundlineNo()");
      if (!!this.lyric == true) {
        let curIntTime = parseInt(this.currentTime);
        for (let i = 0; i < this.lyric.length; i++) {
          if (curIntTime <= parseInt(this.lyric[i].time)) {
            // console.log("找到的时间", this.lyric[i].time, "当前的lineNo应该变为", i - 1);
            return i - 1 >= 0 ? i - 1 : i;
          }
        }
      }
    },
    //play
    play: function (newTime, oldTime, curIntTime) {
      //高亮逻辑
      console.log("play");
      // console.log(this.lyric[this.lineNo].time,curIntTime + 1)
      if (newTime - oldTime <= 1 && this.lyric[this.lineNo].time <= curIntTime + 1) {
        // 去上一个高亮
        if (this.lineNo > 0) {
          this.lyric[this.lineNo - 1].isActive = false;
        }
        //高亮
        this.lyric[this.lineNo].isActive = true;
        // console.dir(this.lyric[this.lineNo]);
        // console.log(this.lineNo,this.textHeight);
        //整体向上滚动一行高度
        if (this.lineNo > this.Cpos && this.lineNo <= this.lyric.length - this.Cpos) {
          this.$refs.lyricUl.style.transform =
            "translateY(" +
            (this.translateY + (this.lineNo - this.Cpos) * this.offset) +
            "px)";
        }
        //
        this.lineNo++;
      }
    },
    //initHeightLight
    initHeightLight: function () {
      console.log("initHeightLight()");
      for (let item of this.lyric) {
        if (item.isActive == true) item.isActive = false;
      }
    },

    //
    move: function (e) {
      let ele = e.targetTouches[0];
      console.log("move",ele);

    },
    // down: function (e) {
      
    //   // console.log("down e", e.targetTouches[0].clientY);
    //   console.log("this.startY ", this.startY);

    //   //
    //   // this.$refs.lyricUl.style.transform =
    //   //   "translateY(" + (this.lineNo - this.Cpos) * this.offset + "px)";
    // },
    // up: function (e) {
    //   // console.log("up e", e.changedTouches[0].clientY);
    //   //
      
    // },
    // handlePos: function (moveDis) {
    //   //拉动歌词
    //   moveDis = parseInt(moveDis / 100);
    //   let time = moveDis + this.currentTime;
    //   console.log(time, this.totalTime);

    //   if (time >= 0 && time <= this.totalTime) {
    //     this.$emit("updataTime", time);
    //   }
    // },
  },
};
</script>

<style lang="less">
.lyric {
  height: 700px;
  position: relative;
  z-index: 10;
  .noLyric {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .wrapper {
    height: 500px;
    margin-top: 42px;
    position: absolute;
    overflow: hidden;
    top: 36%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      content: " ";
      background-color: rgba(0, 0, 0, 0.6);
      display: block;
    }

    .lyrics {
      transition: transform 0.4s linear;
      -webkit-transition: -webkit-transform transform 0.4s linear;
      li {
        text-align: center;
        width: 21em;
        height: 42px;
        color: honeydew;

        &.active {
          color: red;
        }
      }
    }
  }
}
</style>

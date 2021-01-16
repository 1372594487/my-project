<template>
  <div
    class="fullchart"
    :class="{ paused: paused }"
    @click="$emit('toggle-show-lyric')"
  >
    <div class="top">
      <img
        ref="aim"
        :class="[paused ? 'pause-aim' : 'playing-aim']"
        src="https://s3.music.126.net/mobile-new/img/needle-plus.png?994aa910ce3e4d242eb7076620b0e502="
        alt=""
      />
    </div>
    <div class="mid">
      <div class="box">
        <div class="around">
          <img
            src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200"
            alt=""
          />
          <div class="img"><img :src="imgSrc" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgSrc", "paused"],
  watch: {
    paused: function () {
      console.log("paused", this.paused);
      // if(this.paused){
      //   this.$refs.aim.style.animationPlayState=`paused`
      //   console.log("set");
      // }else{
      //   this.$refs.aim.style.animationPlayState=`running`
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.fullchart {
  animation-play-state: paused;
  position: relative;
  z-index: 10;
  height: 500px;
  overflow: hidden;
  &.paused {
    .top {
      img {
        animation-play-state: paused;
      }
    }
    .mid {
      .around {
        img {
          animation-play-state: paused;
        }
      }
      .img {
        animation-play-state: paused;
      }
    }
  }
}

.pause-aim {
  transform: rotateZ(-25deg);
}

.playing-aim {
  transform: rotateZ(0deg);
}
.top {
  position: absolute;
  z-index: 10;
  top: -2px;
  left: 50%;
  transform: translateX(-15%);
  img {
    width: 110px;
    height: 157px;
    transform-origin: 10% 0%;
    transition: transform 0.8s;
  }
}
.mid {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, 0);
  .around {
    width: 340px;
    height: 340px;
    img {
      width: 100%;
      animation: playing 8s linear infinite;
      animation-delay: 0.5s;
      -moz-animation-delay: 0.5s; /* Firefox 4 */
      -webkit-animation-delay: 0.5s; /* Safari 和 Chrome */
      -o-animation-delay: 0.5s; /* Opera */
    }
  }
  .img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 13em;
    height: 13em;
    border-radius: 50%;
    overflow: hidden;
    // animation: playing 6s linear infinite;
  }
  &::after {
    background-image: url(https://s3.music.126.net/mobile-new/img/needle-plus.png?994aa910ce3e4d242eb7076620b0e502=);
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
// @keyframes aimplaying {
//   0% {
//     transform: rotate(-25deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// }
// @keyframes aimstop {
//   100% {
//     transform: (-25deg);
//   }
// }
</style>

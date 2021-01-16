<template>
  <div class="header">
    <div class="content">
      <div class="left" @click="$emit('show-play-bar')">
        <svg
          t="1609145675059"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1712"
          width="24"
          height="24"
        >
          <path
            d="M721.768049 957.138196c-7.789407 0-15.579837-2.935865-21.571295-8.867972l-419.492096-414.459476c-5.812379-5.752004-9.106402-13.601786-9.106402-21.810748 0-8.207939 3.295046-16.057721 9.106402-21.809725l419.492096-414.459476c11.983939-11.983939 31.457456-11.744485 43.382043 0.239454 11.864212 12.103666 11.744485 31.517831-0.239454 43.382043L345.955778 512l397.382543 392.648728c11.983939 11.864212 12.103666 31.277354 0.239454 43.382043C737.586316 954.082604 729.678206 957.138196 721.768049 957.138196z"
            p-id="1713"
            fill="#dbdbdb"
          ></path>
        </svg>
      </div>
      <div class="mid">
        <p class="singer">
          {{ currentMusic.name ? currentMusic.name : currentMusic.ar[0].name }}
        </p>
        
        <template v-if="currentMusic.song">
          <span class="song" v-for="(item, index) in currentMusic.song.artists" :key="index">
            <template v-if="index"> / </template>{{ item.name }}
          </span>
        </template>
        <template v-else>
          <span class="song" v-for="(item, index) in currentMusic.ar" :key="index">
            <template v-if="index"> / </template>{{ item.name }}
          </span>
        </template>
      </div>
      <div class="right">
        <svg
          t="1609902709743"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2582"
          width="24"
          height="24"
        >
          <path
            d="M511.998 64c21 0 38.1 17 38.1 38.1s-17 38.1-38.1 38.1c-205.4 0-371.9 166.5-371.9 371.9s166.5 371.8 371.9 371.8 371.9-166.5 371.9-371.9c0-21 17-38.1 38.1-38.1s38 17.1 38 38.1c0 247.4-200.6 448-448 448s-448-200.6-448-448 200.6-448 448-448z m230.6 190.5c-14.2-14.7-14-38 0.5-52.4 14.5-14.5 37.8-14.6 52.7-0.2l65.6 65.6c19.8 19.8 19.8 51.8 0 71.6l-65.6 65.6c-14.6 14.6-38.3 14.6-52.9 0-14.6-14.6-14.6-38.3 0-52.9l11.1-11.1h-48.3c-131.3 0-175.9 55.9-175.9 225 0 20.7-16.7 37.4-37.4 37.4s-37.4-16.7-37.4-37.4c0-209.1 76.3-299.8 250.7-299.8h48.3l-11.4-11.4z"
            p-id="2583"
            fill="#bfbfbf"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic"],
  created() {
    console.log(this.currentMusic);
  },
};
</script>

<style scoped lang="less">
.header {
  position: relative;
  z-index: 99;
  .content {
    display: flex;
    text-align: center;
    .left {
      flex: 1;

      svg {
        position: relative;
        top: 50%;
        left: -10%;
        transform: translateY(-50%);
      }
    }
    .mid {
      flex: 4;
      .singer {
        font-size: 1em;
      }
      .song {
        font-size: 0.5em;
      }
    }
    .right {
      flex: 1;
      svg {
        position: relative;
        top: 50%;
        right: -10%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

<template>
  <!-- 这里简写点击songItem组件时往外传递当前组件的item，（item：层层传递下来的数据），
    现在传给 父组件 RecommendNewMusic 最终传给play播放组件 -->
  <li
    class="song-item"
    @click="
      $emit('update:music', { item, index });
      $emit('update:playlist');
    "
  >
    <div class="info">
      <h5>{{ item.name }}</h5>
      <i class="hot icon-sq"></i>
      <p>
        <span v-for="(artist, index) in item.song.artists" :key="index">
          <template v-if="index"> / </template>{{ artist.name }}
        </span>{{ ` -- ${item.name}` }}
      </p>
    </div>
    <!-- SongItem 接收App中层层传递下来的 pause -->
    <div class="icon">
      <span class="playing">
        <span
          class="play-active"
          :class="{ paused: paused }"
          v-if="currentMusic && currentMusic.id === item.id"
        >
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="play-static" v-else></span>
      </span>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "currentMusic", "paused", "index"],
  // created() {
  //   console.log('$root',this.$root);
  //   console.log('$parent',this.$parent);
  // },
};
</script>

<style lang="less">
li.song-item {
  display: flex;
  padding: .5em;
  padding-top: 4px;
  padding-bottom: 3px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  &.song-item::after {
    content: "";
    border-bottom-width: 0.5px;
  }
  .info {
    flex: 1;
    h5 {
      overflow: hidden;
      text-overflow: ellipsis; //超出部分以省略号显示
      white-space: nowrap;
      width: 18em; //用px单位亦可行
    }
    p {
      display: inline-block;
      font-size: 12px;
      color: #888;

      //
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 17em;
    }
    .hot {
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
    }
    .icon-sq {
      display: inline-block;
      width: 12px;
      height: 8px;
      margin-right: 4px;
      margin-bottom: 3px;
    }
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;

    .playing {
      display: flex;
      justify-content: center;
      align-items: center;

      .play-active {
        display: flex;
        justify-content: space-between;
        padding-right: 6px;
        align-items: flex-end;

        i {
          width: 2px;
          height: 13px;
          background: rgba(51, 203, 255);
          margin-right: 2px;
          // display: inline-block;
          transform-origin: center bottom;

          animation: playing 0.6s linear -0.2s infinite alternate-reverse;

          &:first-of-type {
            margin-left: 3px;
            animation-delay: 0s;
          }
          &:last-of-type {
            animation-delay: -0.4s;
          }
        }
        &.paused {
          i {
            animation-play-state: paused;
          }
        }
      }
      .play-static {
        width: 27px;
        height: 27px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat;
        background-size: 173px 97px;
        background-position: -24px 0px;
      }
    }
  }
}

@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>

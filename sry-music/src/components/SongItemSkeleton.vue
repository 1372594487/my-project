<template>
  <!-- 这里简写点击songItem组件时往外传递当前组件的item，（item：层层传递下来的数据），
    现在传给 父组件 RecommendNewMusic 最终传给play播放组件 -->
  <li
    class="song-item-skeleton"
    
  >
    <div class="info">
      <div class="singer"></div>
      <i class="hot icon-sq"></i>
      <div class="p">
        
      </div>
    </div>
    <!-- SongItem 接收App中层层传递下来的 pause -->
    <div class="icon">
      <span class="playing">
        <span
          class="play-active"
        >
        </span>
        <span class="play-static"></span>
      </span>
    </div>
  </li>
</template>

<style scaped lang="less">
li.song-item-skeleton {
  display: flex;
  padding: .5em;
  padding-top: 4px;
  padding-bottom: 3px;
  border-bottom: 4px solid rgb(243, 241, 241);
  &.song-item::after {
    content: "";
    border-bottom-width: 0.5px;
  }
  .info {
    flex: 1;
    .singer {
      width:15em; //用px单位亦可行
      height:25px;
      border-radius: 20px;
      background-color:rgb(243, 241, 241);
    }
    .p {
      display: inline-block;
      background-color:rgb(243, 241, 241);
      margin-top: 2px;
      border-radius: 20px;
      width: 8em;
      height:16px;
    }
    .hot {
      
      background-color:rgb(243, 241, 241);
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
        width: 34px;
        height: 34px;
        background-color:rgb(243, 241, 241);
        border-radius: 50%;
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

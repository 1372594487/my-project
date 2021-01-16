<template>
  <div class="playlist-keleton">
    <div class="header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="content-l">
          <div class="listImg"></div>
        </div>
        <div class="content-r">
          <div class="name"></div>
          <div class="r-content">
            <div class="headIcon"></div>
            <div class="creator"></div>
          </div>
          <div class="desc"></div>
        </div>
      </div>

      <!-- <div>
        <img :src="listCreator.backgroundUrl" alt="" />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.playlist-keleton {
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
      filter: blur(10px);
      -webkit-transform: scale(1.5);
      -ms-transform: scale(1.5);
      transform: scale(1.2);
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
        width: 127px;
        height: 127px;
        flex: 4;
        position: relative;
        .listImg {
          position: relative;
           background-color: rgb(213,213,213);
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
      .content-r {
        width: 222px;
        flex: 7;
        flex-direction: column;
        display: inline-flex;
        justify-content: space-around;

        .name {
          margin-left: 1rem;
          width:12em;
          height:35px;
          background-color: rgb(213,213,213);
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
            width:2em;
            background-color: rgb(213,213,213);
            img {
              width: 2em;
              height: 2em;
            }
          }
          .creator {
            flex: 3;
            margin-left: 0.5em;
            background-color: rgb(213,213,213);
            width: 3em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
              color: red; //用px单位亦可行
            }
          }
        }
        .desc {
            width: 12em;
            height:20px;
          margin-left: 1rem;
          justify-content: left;
          background-color: rgb(213,213,213);
        }
      }
    }
  }
}
</style>

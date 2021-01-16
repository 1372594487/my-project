<template>
  <section class="newmusic">
    <!-- <h3><slot></slot></h3> -->
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul>
      <!-- 接收的方法同时也是传递出去的方法 现在传给 父组件 RecommendNewMusic 最终传给play播放组件 -->
      <!-- 父组件中，$event方式只能拿到子组件传递的第1个参数；arguments则可以拿到全部。 -->
      <!-- @update:music="$emit('update:music', $event)" -->
      <!-- App下传的pause经过 子组件 RecommendNewMusic -->
      <template v-if="isLoad">
        <SongItem
        @update:music="recAndSend($event)"
        @update:playlist="$emit('update:playlist', newSongs)"
        v-for="(song, index) in newSongs"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
      </template>
      <template v-else>
        <SongItemSkeleton/>
        <SongItemSkeleton/>
        <SongItemSkeleton/>
        <SongItemSkeleton/>
        
      </template>
      
      <!-- props newSongs接收数据，再将定义的song（实参）传递（赋值）给SongItem中的item（形参） -->
    </ul>
  </section>
</template>

<script>

import SongItemSkeleton from './SongItemSkeleton.vue'
import BorderedTitle from "@/components/BorderedTitle.vue";
import SongItem from "@/components/SongItem.vue";

export default {
  props: {
    newSongs: {
      type: Array,
    },
    isLoad:null,
  },
  components: {
    SongItemSkeleton,
    BorderedTitle,
    SongItem,
  },

  methods: {
    recAndSend: function (event) {
      //rec
      // console.log("RecommendNewMusic event =>",event);
      //send
      // console.log("this =>",this);
      this.$emit("update:music", event);
    },
  },
};
</script>

<style scoped lang="less">
.newmusic {
  position: relative;
    padding-bottom: 51px;
    &::after{
      content: "";
      display:block;
      position: fixed;
      bottom: 0;
      width:100%;
      height:51px;
      background-color: rgba(230, 227, 227,.5);
    }
}
</style>

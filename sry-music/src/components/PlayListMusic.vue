<template>
  <section class="newmusic">
    <!-- <h3><slot></slot></h3> -->
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul>
      <!-- 接收的方法同时也是传递出去的方法 现在传给 父组件 RecommendNewMusic 最终传给play播放组件 -->
      <!-- 父组件中，$event方式只能拿到子组件传递的第1个参数；arguments则可以拿到全部。 -->
      <!-- @update:music="$emit('update:music', $event)" -->
      <!-- App下传的pause经过 子组件 RecommendNewMusic -->
      <section v-if="select == 2">
        <template v-if="isReady">
          <SongItemII
            @update:music="recAndSend($event)"
            @update:playlist="$emit('update:playlist', songs)"
            v-for="(item, index) in songs"
            :key="item.id"
            :item="item"
            :index="index"
            :currentMusic="$attrs.currentMusic"
            :paused="$attrs.paused"
          />
        </template>
        <template v-else>
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
          <SongItemSkeleton />
        </template>
      </section>
      <section v-else>
        <SongItemIII
          @update:music="recAndSend($event)"
          @update:playlist="$emit('update:playlist', songs)"
          v-for="(song, index) in songs"
          :key="song.id"
          :item="song"
          :index="index"
          :currentMusic="$attrs.currentMusic"
          :paused="$attrs.paused"
        />
      </section>

      <!-- props songs接收数据，再将定义的song（实参）传递（赋值）给SongItemII中的item（形参） -->
    </ul>
  </section>
</template>

<script>
import BorderedTitle from "@/components/BorderedTitle.vue";
import SongItemIII from "@/components/SongItemIII.vue";
import SongItemII from "@/components/SongItemII.vue";
import SongItemSkeleton from "@/components/SongItemSkeleton.vue";

export default {
  props: {
    songs: {
      type: Array,
    },
    select: {
      type: Number,
    },
    isReady:{
      type:Boolean,
    }
  },
  components: {
    SongItemSkeleton,
    BorderedTitle,
    SongItemIII,
    SongItemII,
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
  width: 100%;
  padding-bottom: 51px;

  .first {
    color: red;
  }
}
</style>

<template>
  <section>
    <!-- <h3><slot></slot></h3> -->
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul class="playlist">
      <template v-if="isLoad">
        <PlayListItem
          v-for="(item, index) in currentRecommends"
          :key="index"
          :item="item"
        />
      </template>
      <template v-else>
        <PlayListItemSkeleton/>
        <PlayListItemSkeleton/>
        <PlayListItemSkeleton/>
        <PlayListItemSkeleton/>
        <PlayListItemSkeleton/>
        <PlayListItemSkeleton/>
      </template>
    </ul>
  </section>
</template>

<script>
import BorderedTitle from "@/components/BorderedTitle.vue";
import PlayListItem from "@/components/PlayListItem.vue";
import PlayListItemSkeleton from "@/components/PlayListItemSkeleton.vue";
export default {
  components: {
    BorderedTitle,
    PlayListItem,
    PlayListItemSkeleton,
  },
  props: {
    currentRecommends: {
      type: Array,
    },
    isLoad: null,
  },
  data: function () {
    return {
    };
  },
};
</script>

<style>
.playlist {
  display: flex;
  flex-wrap: wrap;
  
}
</style>

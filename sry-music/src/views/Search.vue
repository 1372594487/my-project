<template>
  <div class="search" v-show="isShowPage">
    <div class="header">
      <div class="search-box">
        <span class="sea"
          ><svg
            t="1609752440349"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3359"
            width="20"
            height="20"
          >
            <path
              d="M530.624 723.68c-78.816 27.232-163.552 22.144-238.624-14.272-74.944-36.448-131.264-99.968-158.56-178.816-11.424-33.056-17.248-67.36-17.248-102.08 0-132.96 84.448-251.552 210.24-295.136 78.816-27.296 163.552-22.144 238.56 14.272 75.072 36.448 131.328 99.968 158.624 178.752 11.424 33.184 17.312 67.488 17.312 102.08C740.928 561.536 656.448 680.064 530.624 723.68zM1000.992 917.536l-230.688-230.688c55.552-73.664 86.752-164.416 86.752-258.336 0-46.368-7.68-93.696-23.744-140.064C756 64.832 512.064-53.632 288.448 23.68 111.328 84.96 0 250.976 0 428.512c0 46.496 7.68 93.632 23.744 140.128 77.376 223.648 321.312 342.112 544.864 264.736 43.616-15.104 83.264-36.64 118.24-63.008l230.688 230.624c18.688 18.752 47.872 19.904 65.184 2.624l20.864-20.864C1020.928 965.44 1019.744 936.256 1000.992 917.536z"
              p-id="3360"
              fill="#bfbfbf"
            ></path></svg
        ></span>
        <input
          @input="inputing = true"
          type="text"
          v-model="inputValue"
          placeholder="歌曲/歌手"
        />
        <span
          v-if="(suggests.length && inputing) || inputValue"
          class="del"
          @click="inputValue = ''"
          ><svg
            t="1609752662788"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4492"
            width="20"
            height="20"
          >
            <path
              d="M512 51.734c-254.789 0-461.334 206.545-461.334 461.334S257.211 974.402 512 974.402s461.334-206.546 461.334-461.334S766.789 51.734 512 51.734z m184.214 612.055l-33.493 33.492L512 546.56 361.28 697.28l-33.495-33.492 150.722-150.721-150.721-150.72 33.495-33.493L512 479.575l150.72-150.72 33.494 33.492-150.722 150.721 150.721 150.72z"
              p-id="4493"
              fill="#8a8a8a"
            ></path></svg
        ></span>
      </div>
    </div>


    <div class="default" v-if="!inputValue">
      <section>
        <p>热门搜索</p>
        <ul>
          <li
            @click="inputValue = item"
            v-for="(item, index) in defaultSuggests"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </div>

    <div class="searching" v-if="inputing && suggests.length">
      <section>
        <p>{{ `搜索 "${inputValue}"` }}</p>
      </section>
      <ul>
        <li
          @click="
            inputValue = item.keyword;
            inputing = false;
          "
          v-for="(item, index) in suggests"
          :key="index"
        >
          <span
            ><svg
              t="1609762269200"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7403"
              width="16"
              height="16"
            >
              <path
                d="M530.624 723.68c-78.816 27.232-163.552 22.144-238.624-14.272-74.944-36.448-131.264-99.968-158.56-178.816-11.424-33.056-17.248-67.36-17.248-102.08 0-132.96 84.448-251.552 210.24-295.136 78.816-27.296 163.552-22.144 238.56 14.272 75.072 36.448 131.328 99.968 158.624 178.752 11.424 33.184 17.312 67.488 17.312 102.08C740.928 561.536 656.448 680.064 530.624 723.68zM1000.992 917.536l-230.688-230.688c55.552-73.664 86.752-164.416 86.752-258.336 0-46.368-7.68-93.696-23.744-140.064C756 64.832 512.064-53.632 288.448 23.68 111.328 84.96 0 250.976 0 428.512c0 46.496 7.68 93.632 23.744 140.128 77.376 223.648 321.312 342.112 544.864 264.736 43.616-15.104 83.264-36.64 118.24-63.008l230.688 230.624c18.688 18.752 47.872 19.904 65.184 2.624l20.864-20.864C1020.928 965.44 1019.744 936.256 1000.992 917.536z"
                p-id="7404"
                fill="#8a8a8a"
              ></path></svg
          ></span>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <div class="searched" v-if="!inputing && inputValue">
      <ul>
        <PlayListMusic
          @update:music="$emit('update:music', $event)"
          @update:playlist="$emit('update:playlist', $event)"
          :songs="Songs"
          :currentMusic="$attrs.currentMusic"
          :paused="$attrs.paused"
          :select="1"
        ></PlayListMusic>
      </ul>
    </div>
  </div>
</template>

<script>
import PlayListMusic from "@/components/PlayListMusic.vue";
export default {
  props:["isShowPage"],
  components:{
    PlayListMusic
  },
  data: function () {
    return {
      inputValue: "",
      suggests: [],
      inputing: false,
      defaultSuggests: [],
      isReady_Suggest: false,
      listIds: [],
      Songs:null,
      isReady_Song:false,
    };
  },
  watch: {
    inputValue: function (v) {
      if (v) {
        if (this.inputing) {
          this.axios.get("/search/suggest?keywords=" + v + "&type=mobile").then((res) => {
            console.log(res.data.result.allMatch);
            this.suggests = res.data.result.allMatch;
          });
        } else {
          // console.log(v);
          this.getSuggestLists(v);
        }
      } else {
        this.inputing = false;
        this.suggests = [];
      }
    },
    listIds:function(v){
      if(v){
        this.getSongs(v)
        this.$toast.loading({
        message: "加载中...",
      });
      }
    },
    isReady_Song:function(v){
      if(v){
        this.$toast.success({
        message: "加载完成",
      });
      }
    }
  },
  created() {
    console.log("Search created");
    this.isReady_Suggest = false;
    this.getDefaultSuggests();
  },
  methods: {
    getDefaultSuggests: function () {
      this.axios.get("/search/hot").then((res) => {
        if (res) {
          this.handleSuggests(res.data.result.hots);
        }
      });
    },
    handleSuggests: function (arrs) {
      this.defaultSuggests = arrs.map((v) => {
        return v.first;
      });
      // console.log(this.defaultSuggests);
    },
    getSuggestLists: function (words) {
      this.axios.get(`/search?keywords= ${words}`).then((res) => {
        if (res) {
          // console.log("getSuggests",res.data.result.songs);
          this.handleSuggestListIds(res.data.result.songs.slice(0, 9));
          // console.log(this.listIds);
        }
      });
    },
    handleSuggestListIds: function (lists) {
      if (lists.length >= 8) {
        this.listIds = lists.map((item) => {
          let id = item.id;
          return id;
        }).join(",");
      } else {
        console.log("不足9首");
      }
    },
    getSongs: function (ids) {
      console.log("getSongs()");
      //init
      this.Songs=null;
      //歌曲详情接口
      this.axios.get(`/song/detail?ids=${ids}`).then((response) => {
        if (response.data && response.data.code == 200) {
          this.Songs = response.data.songs;
          this.isReady_Song = true;
          console.log(this.Songs);
        }
      });
      // /song/detail?ids="这个id是音乐id"
    },
  },
};
</script>

<style scoped lang="less">
.search {
  .header {
    padding: 1em 2em;
    border-bottom: 1px gainsboro solid;
    .search-box {
      border-radius: 20px;
      padding: 0 1.5em;
      position: relative;
      height: 2em;
      background-color: rgb(235, 236, 236);

      .sea {
        position: absolute;
        top: 60%;
        left: 0.3em;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      input {
        width: 100%;
        background-color: rgb(235, 236, 236);
        text-indent: 0.5em;
        height: 100%;
        font-size: 1em;
        border: none;
      }
      .del {
        position: absolute;
        top: 60%;
        right: 0.3em;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
  }
  .default {
    padding: 1em;
    ul {
      margin-top: 0.5em;
      li {
        display: inline-block;
        padding: 0.3em 0.5em;
        text-align: center;
        border: gainsboro 1px solid;
        border-radius: 30px;
        margin: 0 0.5em 0.5em 0;
      }
    }
  }
  .searching {
    padding-top: 1em;
    p {
      color: skyblue;
      padding-left: 1em;
      padding-bottom: 0.5em;
      border-bottom: 0.5px solid gainsboro;
    }
    ul {
      li {
        position: relative;
        padding: 0.5em;
        padding-left: 2.4em;
        border-bottom: 0.5px solid gainsboro;
        span {
          position: absolute;
          top: 60%;
          left: 4%;
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>

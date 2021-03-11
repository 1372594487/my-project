<template>
  <div class="uploader-file">
    <label class="label-box">
      <input type="file" @change="upload" multiple ref="file" />
      <i class="el-icon-plus"></i>
      <img :src="imgSrc? imgSrc:src" alt="" class="auto-img pro-img" />
    </label>
  </div>
</template>

<script>
import bus from  './bus.js'
export default {
  name: "UploaderFile",
  props: {
    size: {
      type: [Number, String],
      //单位kb
      default: 300,
    },
    type: {
      type: Array,
      default() {
        return ["jpg", "jpeg", "png", "gif"];
      },
    },
    imgSrc:{
      type:String,
      default:'',
    }
  },
  data() {
    return {
      src: "",
    };
  },
  created() {
    //
    // this.src = this.$store.state.imgSrc;
    console.log(this.imgSrc);
    // // 通过 Event Bus 进行组件间通信
    bus.$on("imgClear", () => {
      this.src = "";
      // bus.$emit("collapse-content", msg);
    });
  },
  
  // watch: {
  //   imgSrc:(newval,oldval)=>{
  //     console.log("bbbbbbbbb");
  //     if(newval)
  //     console.log(oldval);
  //   },
  // },
  methods: {
    upload(e) {
      let self = this;
      let file = e.target.files[0];
      if (file === undefined) {
        e.target.value = "";
        return this.$message.error(`你取消了上传`);
      }
      // console.log("file ==>",file);
      //判断是否为图片类型
      let type = file.type.split("/")[1];
      if (this.type.indexOf(type) === -1) {
        e.target.value = "";
        return this.$message.error(`文件格式只支持${this.type.join(",")}`);
      }
      // 判断图片大小是否合法
      if (file.size / 1024 > this.size) {
        e.target.value = "";
        return this.$message.error(`文件大小不能超过${this.size}KB`);
      }

      let fileReader = new FileReader();
      fileReader.onload = function () {
        //
        self.src = this.result;

        //触发自定义事件，并且携带base64传
        self.$emit("upload", { base64: this.result, type: type });
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    },
    //
    // getRouteData() {
    //   console.log("params ==>", this.$route.params);
    // },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/components/uploaderfile.less";
</style>

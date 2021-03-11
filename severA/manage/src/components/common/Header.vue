<template>
  <div class="header">
    <div class="collapse-btn">
      <i
        :class="!wcollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="collapseChage"
      ></i>
      <!-- <i v-else class="el-icon-s-unfold"></i> -->
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="userInfo.avater" alt="" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.nickName }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="www.baidu.com" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreen: false,
      name: "linxin",
      message: 3,
      userInfo: {
        avater: "",
        nickName: "",
      },
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    wcollapse() {
      return this.$store.state.isCollapse;
    },
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        // localStorage.removeItem("ms_username");
        let cookies = this.$cookies.keys();
        for (let key of cookies) {
          console.log(key);
          this.$cookies.remove(key);
        }
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      // this.collapse = !this.collapse;
      // bus.$emit('collapse', this.collapse);
      this.$store.commit("chisCollapse");
      // console.log(this.$store.state.isCollapse, this.wcollapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      console.dir(document);
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    //获取用户信息
    getUserInfo() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/getUserInfo",
      })
        .then(res => {
          // console.log("res ==>", res);
          if (res.data.status == 1040) {
            this.userInfo.avater =
              res.data.data.url + res.data.data.result[0].avater;
            this.userInfo.nickName = res.data.data.result[0].nickName;
            // console.log(
            //   "avater=>",
            //   this.userInfo.avater,
            //   "nickName==>",
            //   this.userInfo.nickName
            // );
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("err ==>", err);
        });
    },
  },
  created() {
    // console.log("Header created");
    this.getUserInfo();
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
};
</script>


<style lang="less" scoped>
@import "../../assets/less/clear.less";
@import "../../assets/less/components/header.less";
</style>
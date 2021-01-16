<template>
  <div class="home">
    <van-nav-bar>
      <template #left>
        <div class="home-nav">
          <div class="t1">{{ currentTime }}</div>
          <div class="t2">{{ userMsg.nickName }}</div>
        </div>
      </template>
      <template #right>
        <div class="home-search">
          <van-search placeholder="输入商品名称" />
        </div>
      </template>
    </van-nav-bar>

    <div class="home-content">
      <!-- 轮播图 -->
      <div class="banner-box">
        <van-swipe @change="changeCurrentIndex" :autoplay="5000" loop>
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <img
              class="auto-img"
              :src="item.bannerImg"
              alt=""
              @click="goDetail(item.pid)"
            />
          </van-swipe-item>
          <template #indicator>
            <div class="index-box">
              <div
                :class="{ active: index == currentIndex }"
                v-for="(item, index) in bannerData"
                :key="index"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>

      <!-- 商品 -->
      <div class="product-box">
        <div>
          <div class="clearfix pro-title-box">
            <span class="pro-title">热卖推荐</span>
          </div>
          <div class="products clearfix">
            <div
              class="pro-item fl"
              v-for="(item, index) in hotProduct"
              :key="index"
              @click="goDetail(item.pid)"
            >
              <div class="img-box">
                <img class="auto-img" :src="item.smallImg" />
                <!-- hot标签 -->
                <div class="hot">hot</div>
              </div>
              <div class="pro-info">
                <div class="pro-name one-text">{{ item.name }}</div>
                <div class="pro-enname one-text">{{ item.enname }}</div>
                <div class="pro-price">￥{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
export default {
  name: "Home",
  data() {
    return {
      //当前轮播图片索引
      currentIndex: 0,

      //轮播数据
      bannerData: [],

      //热卖商品数据
      hotProduct: [],

      //个人资料数据
      userMsg: {},
      //当前时间,天气的渲染
      currentTime:"",
    };
  },

  created() {
    //获取轮播图数据
    this.getBannerData();

    //获取热卖推荐商品
    this.getHotProduct();

    //获取用户信息
    this.getUsermsg();
    //获取当前的时间，天气
    this.getTDMsg();
  },

  methods: {
    //修改轮播图片索引
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },

    //获取轮播图数据
    getBannerData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      //发起注册请求
      this.axios({
        //请求类型
        method: "GET",
        //请求路径
        url: "/banner",

        //GET请求参数, object
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();

          console.log("result ==> ", result);

          if (result.data.code == 300) {
            this.bannerData = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();

          console.log("err ==> ", err);
        });
    },

    //获取热卖推荐商品
    getHotProduct() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      //发起注册请求
      this.axios({
        //请求类型
        method: "GET",
        //请求路径
        url: "/typeProducts",

        //GET请求参数, object
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((result) => {
          this.$toast.clear();

          console.log("result ==> ", result);

          if (result.data.code == 500) {
            this.hotProduct = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();

          console.log("err ==> ", err);
        });
    },

    //查看商品详情页面
    goDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
    //获取用户信息
    getUsermsg() {
      let tokenString = localStorage.getItem("__tk");
      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      }).then((result) => {
        console.log("result =>", result);
        if (result.data.code == 700) {
          //token检验无效,则跳到登录页面
          this.$router.push({ name: "Login" });
        } else if (result.data.code == "B001") {
          // console.log("result.data.code =>", result.data.code);
          console.log(result.data.result[0]);
          this.userMsg = result.data.result[0];
        }
      });
    },
    // 获取当前时间，天气 天气收钱的，下次一定

    // toString() ：将Date转换为一个'年月日 时分秒'字符串
    // toLocaleString() ：将Date转换为一个'年月日 时分秒'的本地格式字符串
    // toDateString() ：将Date转换为一个'年月日'字符串
    // toLocaleDateString() ：将Date转换为一个'年月日'的本地格式字符串
    // toTimeString() ：将Date转换为一个'时分秒'字符串
    // toLocaleTimeString() ：将Date转换为一个'时分秒'的本地格式字符串
    // valueOf() ：与getTime()一样， 返回Date对象与'1970/01/01 00:00:00'之间
    // 的毫秒值(北京时间的时区为东8区，起点时间实际为：'1970/01/01 08:00:00')

    getTDMsg() {
      let currentTime = new Date().getHours();
      console.log(currentTime);
      switch (true) {
        case currentTime < 11:
          this.currentTime = "早上好，";
          break;
        case currentTime < 18:
          this.currentTime = "下午好，";
          break;
        case currentTime < 24:
          this.currentTime = "晚上好，";
          break;
        // default:
        //   this.currentTime = "晚上好，";
        //   break;
      }
    },
  },
};
</script>

<template>
    <div class="products">
        <!-- 商品 -->
      <div class="product-box">
        <div>
          <div class="clearfix pro-title-box">
            <span class="pro-title">热卖推荐</span>
          </div>
          <div class="products clearfix">
            <div class="pro-item fl" v-for="(item,index) in hotProduct" :key="index" @click="goDetail(item,pid)"
            >
              <div>
                <img
                  class="auto-img"
                  :src="item.smallImg"
                />
              </div>
              <div class="pro-info">
                <div class="pro-name one-text">{{item.name}}</div>
                <div class="pro-enname one-text">{{item.enname}}</div>
                <div class="pro-price">￥{{item.price}}</div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
        
</template>

<script>
export default {
  name: "Products",
  data() {
    return {

      //热卖商品数据
      hotProduct: [],
    };
  },
  created() {

    //获取热卖推荐商品
    this.getHotProduct();
  },

  methods: {
    getHotProduct(){
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      //发起注册请求
      this.axios({
        //请求类型
        mehod: "GET",
        //请求路径
        url: "/typeProducts",

        //GET请求参数,objects
        params: {
          appkey: this.appkey,
          key: 'isHot',
          value: 1
        },
      })
        .then((result) => {
          this.$toast.clear();

          console.log("result => ", result);

          if (result.data.code == 500) {
            this.hotProduct = result.data.result;
          }
        })
        .catch((err) => {
          this.$tuast.clear();

          console.log("err=> ", err);
        });
    },

    //查看商品详情
    getDetail(pid){
      this.$router.push({name:'Detail',params:{pid}})
    }
    
  },
};
</script>

<style lang="less">
    .products {
  .auto-img {
    width: 100%;
    height: auto; /* 保持图片的宽高例 */
    /* 转成块元素 */
    display: block;
  }

  .van-nav-bar {
    background-color: black;
  }
  background-color: black;
  .home-nav {
    display: flex;
    line-height: 46px;
  }
  .t1 {
    font-weight: bold;
  }

  .t2 {
    color: aquamarine;
    font-weight: bold;
    margin-left: 10px;
  }

  .home-search .van-search {
    padding: 0;
    border-radius: 17px;
    overflow: hidden;
  }

  .home-search .van-icon {
    color: aquamarine;
  }

  .home-content {
    padding: 10px 10px 0 10px;
  }

  .banner-box {
    background-color: #fff;
    border-radius: 15px;
    height: 200px;
    overflow: hidden;
  }

  .index-box {
    position: absolute;
    right: 8px;
    bottom: 10px;
    display: flex;
    > div {
      width: 12px;
      height: 2px;
      background-color: #fff;
      margin-right: 5px;
      border-radius: 1px;
      &.active {
        background-color: aquamarine;
      }
    }
  }

  .product-box {
    margin-top: 10px;
  }

  .pro-title-box {
    background-color: #fff;
    background-color: black;
    padding: 10px 0;
  }

  .pro-title {
    float: left;
    padding: 0 15px;
    height: 32px;
    background-color: rgba(0, 255, 255, 0.7);
    color: white;
    line-height: 32px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  .products {
    margin-top: 10px;
  }

  .pro-item {
    // 两个div一行，=> 有3个margin-right
    // 最后一个margin-right不要，补到剩两个
    width: calc(~"50% - 25px");
    margin-right: 10px;
    padding: 10px;
    background-color: #fff;
    background-color: black;
    margin-bottom: 10px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  .pro-info {
    margin-top: 10px;
  }

  .pro-name {
    margin-bottom: 10px;
  }

  .pro-price {
    color: aquamarine;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
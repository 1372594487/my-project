<template>
  <div class="product-list">
    <div class="title def-hov">商品列表</div>
    <div class="content def-static">
      <div class="search">
        <el-form :inline="true" v-model="searchCondition">
          <el-form-item label="名称">
            <el-input
              v-model="searchCondition.name"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchCondition.type" placeholder="选择类型">
              <el-option
                v-for="(item, index) in typeData"
                :key="index"
                :label="item.type"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchCondition.status" placeholder="选择状态">
              <el-option label="上架" value="上架"></el-option>
              <el-option label="下架" value="下架"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchCondition.updated_at"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="序号">
                  <span>{{ props.row.num }}</span>
                </el-form-item>
                <el-form-item label="创建日期">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.pname }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="价格单位">
                  <span>{{ props.row.priType }}</span>
                </el-form-item>
                <el-form-item label="商品类型">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.pid }}</span>
                </el-form-item>
                <el-form-item label="商品状态">
                  <span>{{ props.row.state }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.pdesc }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <img :src="props.row.img" alt="" class="auto-img" />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            width="80"
            align="center"
            label="序号"
            prop="num"
          >
          </el-table-column>
          <el-table-column
            sortable
            width="150"
            align="center"
            label="创建日期"
            prop="date"
          >
          </el-table-column>
          <el-table-column align="center" label="商品 ID" prop="pid">
          </el-table-column>
          <el-table-column align="center" label="商品名称" prop="pname">
          </el-table-column>
          <el-table-column align="center" label="商品类型" prop="type">
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            label="商品价格"
            prop="price"
          >
          </el-table-column>

          <el-table-column
            width="400"
            fixed="right"
            align="center"
            label="操作"
          >
            <template slot-scope="props">
              <el-button
                type="primary"
                @click="goSpPage('PostProduct', props.$index, props.row)"
                >修改</el-button
              >
              <el-button
                v-if="props.row.state == '下架' ? true : false"
                type="success"
                @click="changeState(props.$index, props.row)"
                >上架</el-button
              >
              <el-button
                v-else
                type="info"
                @click="changeState(props.$index, props.row)"
                >下架</el-button
              >
              <el-button type="danger" @click="remove(props.$index,props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="pagination.page"
          :page-size="pagination.pageCount"
          :total="pagination.total"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ProductList",
  data() {
    return {
      tableData: [
        {
          num: 1,
          date: "2016-05-02 12:12:12",
          pid: "12987122",
          name: "好滋好味鸡蛋仔",
          price: "11",
          priType: "元",
          type: "美食",
          state: "上架",
          pdesc: "荷兰优质淡奶，奶香浓而不腻",
          img:
            "http://127.0.0.1:10001/static/file/upload-img/98568083663719991614361298147.jpeg",
        },
        {
          num: 2,
          date: "2016-05-04 12:12:12",
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          price: "11",
          priceType: "元",
          type: "美食",
          state: "下架",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          img: "",
        },
        {
          num: 3,
          date: "2016-05-01 12:12:12",
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          price: "11",
          priceType: "元",
          type: "美食",
          state: "上架",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          img: "",
        },
        {
          num: 4,
          date: "2016-05-03 12:12:12",
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          price: "11",
          priceType: "元",
          type: "美食",
          state: "下架",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          img: "",
        },
      ],
      //搜索
      searchCondition: {
        name: "",
        status: "",
        updated_at: "",
        type: "",
      },
      typeData: [],
      //分页
      pagination: {
        // 总数目
        total: 0,
        //每页显示的数目
        pageCount: 4,
        //最多显示页码数量
        page: 5,
        //偏移量
        offset: 0,
      },
    };
  },
  created() {
    this.getTypeData();
    //
    this.initSearch();
  },
  methods: {
    //获取商品类型
    getTypeData() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/type",
      })
        .then((res) => {
          if (res.data.status == 1050) {
            this.typeData = res.data.result;
            console.log("typeData ==> ", this.typeData);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //商品搜索
    search() {
      let c_searchCondition = Object.assign(
        {
          //偏移量
          offset: this.pagination.offset,
          //每次查询数目
          count: this.pagination.pageCount,
        },
        this.searchCondition
      );
      if (c_searchCondition.updated_at) {
        let year = c_searchCondition.updated_at.getFullYear();
        let month = c_searchCondition.updated_at.getMonth() + 1;
        let date = c_searchCondition.updated_at.getDate();
        c_searchCondition.updated_at = `${year}-${month}-${date}`;
      }

      this.axios({
        method: "GET",
        params: c_searchCondition,
        url: this.baseUrl + "/search",
      })
        .then((res) => {
          console.log("res ==>", res);
          //render
          this.tableData = res.data.result;
          //处理图片,时间,添加序号
          this.tableData.map((v, i) => {
            let img = this.baseUrl + `/static/file/upload-img/` + v.img;
            v.img = img;
            v.date = this.renderTime(v.date);
            v.num = i + 1;
          });
          //处理
          console.log("this.tableData ==>", this.tableData);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //查询商品数目
    getProductCount() {
      let c_searchCondition = Object.assign({}, this.searchCondition);
      if (c_searchCondition.updated_at) {
        let year = c_searchCondition.updated_at.getFullYear();
        let month = c_searchCondition.updated_at.getMonth() + 1;
        let date = c_searchCondition.updated_at.getDate();
        c_searchCondition.updated_at = `${year}-${month}-${date}`;
      }
      console.log("c_searchCondition ==>", c_searchCondition);
      this.axios({
        method: "GET",
        url: this.baseUrl + "/count",
        params: c_searchCondition,
      })
        .then((res) => {
          console.log("商品数目res ==>", res);
          //
          this.pagination.total = res.data.result[0].count;
          // let num1 = this.pagination.Count - 0;
          // let num2 = this.pagination.pageSize - 0;
          // let rest = num1 % num2;
          // if (rest > 0) {
          //   this.pagination.total = Math.floor(
          //     num1 / num2
          //   ) + rest;
          // }
          // if(rest == 0){
          //   this.pagination.total = num1 / num2;
          // }
          if (res.data.status == 1080) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //
    initSearch() {
      this.pagination.offset = 0;
      this.search();
      this.getProductCount();
    },

    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    //改变商品状态 上/下架
    changeState(index, row) {
      row.state = row.state == "上架" ? "下架" : "上架";
      console.log("index ==> ", index, "row ==> ", row);
      console.log("row.state==>", row.state);
      let pid = row.pid;
      let status = row.state;
      //请求接口
      this.axios({
        method: "POST",
        url: this.baseUrl + "/switchState",
        data: {
          pid,
          status,
        },
      })
        .then((res) => {
          console.log("res ==>", res);
          //登入验证
          if (res.data.status == 1034) {
            this.goPage("Login");
            this.$message.error(res.data.msg);
          }
          if (res.data.status == 1090 && res.data.result[0] == 1) {
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //切换分页
    currentChange(e) {
      //累加偏移量
      this.pagination.offset = (e - 1) * this.pagination.pageCount;
      this.search();
      console.log(e, this.pagination.total);
    },
    //
    goSpPage(to, index, row) {
      //处理图片类型
      let imgType = row.img.split(".")[row.img.split(".").length - 1];
      //路由传参
      this.$router.push({
        name: to,
        params: {
          row,
          imgType,
          title: "修改商品",
          clickName:'提交商品'
        },
      });
      //vuex
      // this.$store.commit("sendImg", row.img);
    },
    //删除
    remove(index,row){
      console.log('pid ==>',row.pid);
      this.axios({
        method:'POST',
        url:this.baseUrl + '/removeProduct',
        data:{
          pid:row.pid
        }
      }).then((res)=>{
        console.log("删除商品 res ==>",res);
        //是否登录
        if(res.data.status == 1034){
          this.$message({
          message: res.data.msg,
          type: 'error'
        });
        let that = this;
        setTimeout(()=> {
          that.goPage('Login')
        })
        }
        //删除成功
        if(res.data.status == 1110){
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        //刷新
          this.initSearch();
        } else if(res.data.status == 1111){
          this.$message({
          message: res.data.msg,
          type: 'error',

        });
        }
      })

    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/components/product_list.less";
@import "../../assets/less/variable.less";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table__expanded-cell {
  transition: all 0.2s linear;
}
</style>
<template>
  <div class="postproduct">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择商品类型">
            <el-option
              v-for="(item, index) in typeData"
              :key="index"
              :label="item.type"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model.number="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="价格单位" prop="priceType">
          <el-radio-group v-model="ruleForm.priceType">
            <el-radio label="CNY"></el-radio>
            <el-radio label="USD"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品图片" prop="img">
          <UploaderFile
            :imgSrc="ruleForm.img"
            @upload="upload($event, 'img')"
          ></UploaderFile>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="商品状态" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio label="上架"></el-radio>
            <el-radio label="下架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="judgeToRun()">{{
            this.clickName
          }}</el-button>
          <el-button v-if="!$route.params.row" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from "../bus.js";
import UploaderFile from "../UploderFile";
export default {
  name: "PostProduct",
  components: {
    UploaderFile,
  },
  data() {
    return {
      title: "发布商品",
      clickName: "发布",
      ruleForm: {
        name: "",
        type: "",
        price: "",
        priceType: "",
        img: "",
        delivery: false,
        state: "",
        desc: "",
      },
      typeData: [],
      copyData: {},
      types: {
        imgType: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        price: [
          { required: true, message: "商品价格不能为空", trigger: "change" },
          { type: "number", message: "价格必须为数字值" },
        ],
        priceType: [
          { required: true, message: "选择价格单位", trigger: "change" },
        ],
        img: [{ required: true, message: "请放入商品图片", trigger: "change" }],
        state: [{ required: true, message: "选择商品状态", trigger: "change" }],
        desc: [{ required: true, message: "请填写商品描述", trigger: "blur" }],
      },
    };
  },
  created() {
    //
    this.getTypeData();
    //
    if (this.$route.params.row) {
      console.log("have row");
      this.getRouterData();
    }
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       console.log("submit!",this.ruleForm);
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      bus.$emit("imgClear");
    },
    //发布商品
    postProduct(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //商品信息
          console.log("this,ruleForm==>", this.ruleForm);

          let product = Object.assign({}, this.ruleForm, this.types);
          product.img = product.img.replace(/^data:image\/[a-z]+;base64,/, "");
          console.log("product ==> ", product);
          //发起发布商品请求
          console.log("发起发布商品请求");
          this.axios({
            method: "POST",
            url: this.baseUrl + "/postProduct",
            data: product,
          })
            .then((res) => {
              //登入验证
              if (res.data.status == 1034) {
                this.goPage("Login");
                this.$message.error(res.data.msg);
              }

              console.log("res ==> ", res);
              if (res.data.status == 1060) {
                //
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                //
                this.resetForm('ruleForm');
              } else if (res.data.status == 1061) {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log("err ==> ", err);
              this.$message.error(err);
            });
        } else {
          console.log("err submit");
          return false;
        }
      });
    },

    //获取商品类型
    getTypeData() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/type",
      })
        .then((res) => {
          if (res.data.status == 1050) {
            this.typeData = res.data.result;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    upload(e, key) {
      this.ruleForm[key] = e.base64;
      this.types[key + "Type"] = e.type;
      console.log(this.types);
    },
    //接收路由参数
    getRouterData() {
      //将参数赋值给ruleForm
      this.title = this.$route.params.title;
      this.clickName = this.$route.params.clickName;
      console.log(this.ruleForm, this.$route.params.row);
      let row = this.$route.params.row;
      this.ruleForm.desc = row.pdesc;
      this.ruleForm.img = row.img;
      this.ruleForm.imgType = this.$route.params.imgType;
      this.ruleForm.name = row.pname;
      this.ruleForm.price = row.price;
      this.ruleForm.priceType = row.priType;
      this.ruleForm.state = row.state;
      this.ruleForm.type = row.type;
      //备份刚传过来的商品数据
      this.copyData = { ...this.ruleForm };
      console.log("copyData ==>", this.copyData);
    },
    //
    judgeToRun() {
      if (this.$route.params.row) {
        console.log("this.ruleForm==> ", this.ruleForm);
        console.log("this.copyData==> ", this.copyData);
        //发起修改商品请求
        let data = {};
        for (let key in this.ruleForm) {
          if (this.ruleForm[key] != this.copyData[key]) {
            data[key] = this.ruleForm[key];
          }
        }
        if (data == "{}") {
          this.$message({
            message: "未修改数据，1s后返回商品列表页面",
          });
          setTimeout(() => {
            that.goPage("ProductList");
          }, 1500);
        }
        if (data.img) {
          data.img = data.img.replace(/^data:image\/[a-z]+;base64,/, "");
          data.imgType = this.types.imgType;
        }
        data.pid = this.$route.params.row.pid;
        console.log(data.pid);
        console.log(data);
        this.axios({
          method: "POST",
          url: this.baseUrl + "/UpdateProduct",
          data,
        })
          .then((res) => {
            //登入验证
            if (res.data.status == 1034) {
              this.goPage("Login");
              this.$message.error(res.data.msg);
            }
            console.log("res ==> ", res);
            if (res.data.status == 2010) {
              //
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            } else if (res.data.status == 2011) {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log("err ==> ", err);
            this.$message.error(err);
          });
      } else {
        //发布商品
        console.log("发布商品方法()");
        this.postProduct('ruleForm')
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/components/post-product.less";
</style>
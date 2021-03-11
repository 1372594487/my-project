<template>
  <div class="login">
    <div class="reg-bg"></div>
    <div class="login-box">
      <div class="title">后台管理系统</div>
      <el-form :model="userInfo" status-icon ref="userInfo" :rules="rules">
        <el-form-item prop="email">
          <el-input
            v-model="userInfo.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-tooltip
            class="item"
            effect="dark"
            content="密码6-12位，以字母开头，支持大小写字母数字以及下划线"
            placement="right-start"
          >
            <el-input
              type="password"
              v-model="userInfo.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <div class="form-group">
          <el-button
            class="login-btn"
            type="danger"
            @click="submitForm('userInfo')"
            >登录</el-button
          >
        </div>
        <div class="clearfix form-group">
          <span class="register fl" @click="goPage('Register')">没有账号,注册</span>
          <span class="register fr">忘记密码</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import "../assets/less/login.less";
// import "../assets/less/clear.less";
export default {
  name: "Login",
  data() {
    // return {
    //   input: ''
    // }
    return {
      userInfo: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: this.validEmail, trigger: "blur" }],
        password: [{ validator: this.validPassword, trigger: "blur" }],
        
      },
    };
  },
  methods: {
    validEmail: (rule, value, callback) => {
      // console.log("rule=>", rule);
      // console.log("value=>", value);
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }, 1000);
    },
    validPassword: (rule, value, callback) => {
      // console.log("rule=>", rule);
      // console.log("value=>", value);
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        let reg = /^[a-zA-Z][0-9a-zA-Z_]{6,12}$/;
        if (!reg.test(value)) {
          callback(new Error("密码格式不正确"));
        } else {
          callback();
        }
      }, 1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        //如果通过，发起登录请求
        console.log("发起登录请求");
        this.axios({
          method: "POST",
          url: this.baseUrl + '/Login',
          data: {
            email:this.userInfo.email,
            password:this.userInfo.password,
          },
        })
          .then((res) => {
            console.log("res==>", res);
            if(res.data.status == 1030){
              this.$message({
                message:res.data.msg,
                type:'success'
              });
              //token保存在cookie中
              for(let key in res.data.data){
                  this.$cookies.set(key,res.data.data[key],'1d')
              }
            //   setTimeout(function(){
            //     this.$router.push({name:'Home'},1000)
            //   })
            setTimeout(this.goPage('Main',1000))
            }else{
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log("err =>", err);
            
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/login.less";
@import "../assets/less/clear.less";
</style>
<template>
  <div class="register">
    <div class="reg-bg"></div>
    <div class="register-box">
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
        <el-form-item prop="repassword">
          <el-input
            type="password"
            v-model="userInfo.repassword"
            autocomplete="off"
            placeholder="请重新输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="validcode">
          <el-row :gutter="15">
            <el-col :span="14">
              <el-input
                v-model="userInfo.validcode"
                auto-complete="off"
                placeholder="输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-button class="fr" :disabled="isSend" @click="sendCode(60)">{{
                text
              }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="form-group">
          <el-button
            class="register-btn"
            type="danger"
            @click="submitForm('userInfo')"
            >注册</el-button
          >
        </div>
        <div class="clearfix form-group">
          <span class="login fr" @click="goPage('Login')">已有账号,登录</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import "../assets/less/register.less";
// import "../assets/less/clear.less";
export default {
  name: "Register",
  data() {
    // return {
    //   input: ''
    // }
    return {
      userInfo: {
        email: "",
        password: "",
        repassword: "",
        validcode: "",
        
      },
      text: "发送验证码",
      isSend: false,
      //验证码的id
      codeId:'',

      rules: {
        email: [{ validator: this.validEmail, trigger: "blur" }],
        password: [{ validator: this.validPassword, trigger: "blur" }],
        repassword: [{ validator: this.validRepassword, trigger: "blur" }],
        validcode: [{ validator: this.validCode, trigger: "blur" }],
        //   checkPass: [
        //     { validator: validatePass2, trigger: 'blur' }
        //   ],
        //   age: [
        //     { validator: checkAge, trigger: 'blur' }
        //   ]
      },
    };
  },
  methods: {
    sendCode(seconds) {
      //验证邮箱格式是否正确
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if(!reg.test(this.userInfo.email)) {
        return;
      }
      let time = seconds;
      this.text = `${time}s后重新发送`;
      this.isSend = true;
      let timer = setInterval(() => {
        if (time == 1) {
          clearInterval(timer);
          timer = null;
          this.text = `发送验证码`;
          this.isSend = false;
        } else {
          time--;
          this.text = `${time}s后重新发送`;
        }
      }, 1000);
      //发送验证码请求
      this.axios({
        method:'POST',
        url: this.baseUrl + '/email',
        data:{
          email:this.userInfo.email
        }
      }).then(res=>{
        console.log("res==> ",res);
        if(res.data.status == 1010){
          this.codeId = res.data.cid;
          this.$message({
            message:res.data.msg,
            type:'success'
          })
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(err=>{
        this.$message.error(res.data.msg);
        console.log('err==>',err);
      })
    },
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
    validRepassword: function (rule, value, callback) {
      // console.log("rule=>", rule);
      // console.log("value=>", value);
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        let reg = this.userInfo.password;
        if (reg != value) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      }, 1000);
    },
    validCode: (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        let reg = /^[0-9]{4,6}$/;
        if (!reg.test(value)) {
          callback(new Error("验证码不正确"));
        } else {
          callback();
        }
      }, 1000);
    },

    submitForm(formName) {
      //判断是否获取验证码
      if(!this.codeId){
        this.$message.error('请先发送验证码');
        return
      }
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        //如果通过，发起注册请求
        console.log("发起注册请求");
        this.axios({
          method: "POST",
          url: this.baseUrl + "/register",
          data: {
            email:this.userInfo.email,
            password:this.userInfo.password,
            validcode:this.userInfo.validcode,
            //验证码id
            codeId:this.codeId
          },
          // data:{
          //   id:9
          // }
        })
          .then((res) => {
            console.log("res==>", res);
            if(res.data.status == 1000){
              this.$message({
                message:res.data.msg,
                type:'success'
              });
              //跳转
              setTimeout(this.goPage('Login'),1000)
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
@import "../assets/less/register.less";
@import "../assets/less/clear.less";
</style>
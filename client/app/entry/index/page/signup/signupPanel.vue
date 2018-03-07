<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>分销商注册</span>
   <el-button style="float: right; padding: 3px 0" type="text" @click="redictSignIn">登录>></el-button>
  </div>
  <el-form ref="form" :rules="rules" :model="formRequest" label-width="80px">
  <el-form-item label="账号" required prop="userName">
    <el-input v-model="formRequest.userName"></el-input>
  </el-form-item>
  <el-form-item label="密码" required  prop="userPassword">
    <el-input v-model="formRequest.userPassword"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" required  prop="confirmPassword">
    <el-input v-model="formRequest.confirmPassword"></el-input>
  </el-form-item>
  <el-form-item label="公司名称">
    <el-input v-model="formRequest.userPassword"></el-input>
  </el-form-item>
  <el-form-item label="联系人" required  prop="contactName">
    <el-input v-model="formRequest.contactName"></el-input>
  </el-form-item>
  <el-form-item label="联系方式" required  prop="contactNumber">
    <el-input v-model="formRequest.contactNumber"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" >
    <el-input v-model="formRequest.email"></el-input>
  </el-form-item>
   <el-form-item label="验证码" required>
    <el-col :span="14">
       <el-form-item prop="validateCode">
         <el-input v-model="formRequest.validateCode"></el-input>
       </el-form-item>      
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="8">
     <img src="https://easternmiles.ceair.com/mpf/register/getNumberCaptcha?1508834769528&1508834769566&1508834772395&1508834773267" class="validateCode"/>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">注册</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>
</template>

<script>
export default {
  data(){
    return {
      formRequest:{
        userName:undefined,
        userPassword:undefined,
        confirmPassword:undefined,
        companyName:undefined,
        contactName:undefined,
        contactNumber:undefined,
        email:undefined,
        validateCode:undefined
      },
       rules: {
        userName: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        userPassword: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        confirmPassword: [{ required: true, message: "确认密码不能为空", trigger: "blur" }],
        contactName: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
        contactNumber: [{ required: true, message: "联系方式不能为空", trigger: "blur" }],
        validateCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit() {
      var _self = this;
      _self.$refs["form"].validate(valid => {
  
        if (valid) {
          _self.$emit("onSubmit", _self.formRequest);
        } else {
          console.log("注册框验证不通过");
          return false;
        }
      });
    },
    redictSignIn(){
       window.location.href='signin'
    }
  }
}
</script>

<style scoped>
.validateCode {
  height: 38px;
  width: 100px;
}
</style>

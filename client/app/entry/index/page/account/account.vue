<template>
  <div id="account">
          <div class="container">
   
        <el-row>
            <el-card class="box-card">
              <header>
                       子账户管理
              </header>
             <el-row style="padding:8px 0">
                 <el-col :span="10">
                    <el-button type="primary" @click="addOReditDialogVisible=true">新增</el-button>
       
           
                    <el-button type="primary" @click="HangDialogVisible=true">挂起</el-button>
              
        
                    <el-button type="primary">授权</el-button>
  
 
                    <el-button type="danger" @click="cancelDialogVisible=true">删除</el-button>
                </el-col>     
             </el-row>    

          <div class="passenger_info">
              <el-table :data="accountInfo" 
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              style="width:100%">
                        <el-table-column type="selection"  width="55"></el-table-column>
                        <el-table-column label="用户名" prop="username"></el-table-column>
                        <el-table-column label="登录账号" prop="loginname" width="120"></el-table-column>
                        <el-table-column label="联系方式" prop="phone" width="130"></el-table-column>
                        <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
                        <el-table-column label="用户状态" prop="userstatus" width="130"></el-table-column>
                        <el-table-column label="最后登录时间" prop="lastlogintime" width="150"></el-table-column>
                        <el-table-column label="授权角色" prop="role" width="130"></el-table-column>
                        <el-table-column prop="zt" label="操作" >
                                              <template scope="scope">
                                                    <el-button type="primary" size="small" >编辑</el-button>
                                              </template>
                        </el-table-column>
              </el-table>
  </div>
        </el-card>
          </el-row>
           <el-row>
            <el-card class="box-card">    
              <header>子公司管理</header>    
                 <div class="passenger_info">
                        <el-table :data="companyInfo" 
                        ref="multipleTable"
                        @selection-change="companySelectionChange"
                        style="width:100%">
                                  <el-table-column type="selection"  width="55"></el-table-column>
                                  <el-table-column label="用户名" prop="username"></el-table-column>
                                  <el-table-column label="登录账号" prop="loginname" width="120"></el-table-column>
                                  <el-table-column label="联系方式" prop="phone" width="130"></el-table-column>
                                  <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
                                  <el-table-column label="用户状态" prop="userstatus" width="130"></el-table-column>
                                  <el-table-column label="最后登录时间" prop="lastlogintime" width="150"></el-table-column>
                                  <el-table-column label="授权角色" prop="role" width="130"></el-table-column>
                                  <el-table-column prop="zt" label="操作" >
                                                        <template scope="scope">
                                                              <el-button type="primary" size="small" >编辑</el-button>
                                                        </template>
                                  </el-table-column>
                        </el-table>
                 </div>
        </el-card>
          </el-row>
          <br>

      <!--确认挂起用户-->
        <el-dialog title="提示" v-model="HangDialogVisible" size="tiny">
            <span>确认要挂起选中的账户？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="HangDialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="dohang();HangDialogVisible = false;">确 定</el-button>
            </span>
        </el-dialog>

        
      <!--确认删除用户-->
        <el-dialog title="提示" v-model="cancelDialogVisible" size="tiny">
            <span>确认要删除选中的账户？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="docancel();cancelDialogVisible = false;">确 定</el-button>
            </span>
        </el-dialog>

        <!--新增/编辑 账户-->
        <el-dialog title="新增子账户" v-model="addOReditDialogVisible" size="tiny">
          <el-form :model="accountORcompanydetails" status-icon :rules="rules" ref="accountORcompanydetails">
            <el-form-item label="登录账号" :label-width="formLabelWidth" prop="usernamedetails">
            <el-input v-model="accountORcompanydetails.usernamedetails" auto-complete="off"></el-input>
            <el-tag type="info">限2-20个字符</el-tag>
           </el-form-item>
           <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginnamedetails">
            <el-input v-model="accountORcompanydetails.loginnamedetails" auto-complete="off"></el-input>
             <el-tag type="info">用户名可以是英文字母、数字组成</el-tag>
        </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="accountORcompanydetails.password" auto-complete="off"></el-input>
             <el-tag type="info">密码需6-20位</el-tag>
        </el-form-item>
              <el-form-item label="确认密码" :label-width="formLabelWidth" prop="passwordconfirm">
            <el-input v-model="accountORcompanydetails.passwordconfirm" auto-complete="off"></el-input>
        </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phonedetails">
            <el-input v-model="accountORcompanydetails.phonedetails" auto-complete="off"></el-input>
        </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="emaildetails">
            <el-input v-model="accountORcompanydetails.emaildetails" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addOReditDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit();">确 定</el-button>
  </div>
          </el-dialog>
      </div>
  </div>


</template>


<script>
export default {
  data() {
    //验证用户名
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("登录账号不能为空"));
      }
      if (
        value.toString().trim().length > 20 ||
        value.toString().trim().length < 2
      ) {
        callback(new Error("登录账号字符长度不符合要求"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (
        value.toString().trim().length > 20 ||
        value.toString().trim().length < 6
      ) {
        callback(new Error("密码长度不符合要求"));
      } else {
        if (this.accountORcompanydetails.passwordconfirm !== "") {
          this.$refs.accountORcompanydetails.validateField("passwordconfirm");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountORcompanydetails.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      accountInfo: [
        {
          username: "张三",
          loginname: "zhangsan",
          phone: "13478437914",
          email: "4616497@qq.com",
          userstatus: "待审核",
          lastlogintime: "2017-12-29 01:30",
          role: "财务权限"
        },
        {
          username: "李四",
          loginname: "lisi",
          phone: "13798476147",
          email: "35497167@qq.com",
          userstatus: "挂起",
          lastlogintime: "2017-12-29 01:30",
          role: "退改权限"
        }
      ],
      accountSelection: [],
      companyInfo: [
        {
          username: "甲公司",
          loginname: "甲方",
          phone: "13478437914",
          email: "4616497@qq.com",
          userstatus: "待审核",
          lastlogintime: "2017-12-29 01:30",
          role: "财务权限"
        },
        {
          username: "乙公司",
          loginname: "乙方",
          phone: "13798476147",
          email: "35497167@qq.com",
          userstatus: "挂起",
          lastlogintime: "2017-12-29 01:30",
          role: "退改权限"
        }
      ],
      companySelection: [],
      HangDialogVisible: false,
      cancelDialogVisible: false,
      addOReditDialogVisible: false,
      addoreidt: undefined,
      accountORcompanydetails: {
        usernamedetails: undefined,
        loginnamedetails: undefined,
        password: undefined,
        passwordconfirm: undefined,
        phonedetails: undefined,
        emaildetails: undefined
      },
      rules: {
        usernamedetails: [
          { required: true, validator: checkusername, trigger: "blur" }
        ],
        loginnamedetails: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        passwordconfirm: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        phonedetails: [{ required: true, message: "联系方式不能为空", trigger: "blur" }]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.accountSelection = val;
    },
    companySelectionChange(val) {
      this.companySelection = val;
    },
    dohang() {},
    docancel() {},
    onSubmit() {
      var _self = this;
      _self.$refs["accountORcompanydetails"].validate(valid => {
        if (valid) {
          _self.$emit("onSubmit", _self.accountORcompanydetails);
        } else {
          console.log("提交失败！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#account{
  min-height:674px;
  height:100%;
}
.tablewidth {
  width: 130px;
}

.spanbystar {
  display: inline-block;
  position: absolute;
  left: 42px;
  color: red;
}
.el-form-item__content {
  margin-left: 0px !important;
}
</style>

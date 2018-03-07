<template>

    <el-card class="box-card" id="siginBoxCard">
        <div slot="header" class="clearfix">
            <span><b>账户登录</b></span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="redictSignUp">分销商注册>></el-button> -->
        </div>
        <el-form ref="form" :rules="rules" :model="formRequest" label-width="80px">
            <el-form-item label="账号" required prop="userName">
                <el-input v-model="formRequest.userName" :maxlength="16" onkeydown="if(event.keyCode == 13){
                    document.getElementById('isloading_btn').click();
                    }"></el-input>
            </el-form-item>
            <el-form-item label="密码" required prop="userPassword">
                <el-input v-model="formRequest.userPassword" type="password"  :maxlength="16"
                onkeydown="if(event.keyCode ==13){document.getElementById('isloading_btn').click()}"
                ></el-input>
            </el-form-item>
            <el-form-item label="验证码" required>
                <el-col :span="14">
                    <el-form-item prop="validateCode">
                        <el-input v-model="formRequest.validateCode" :maxlength="4" onkeydown='if (event.keyCode == 13) {document.getElementById("isloading_btn").click()  }'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="8">
                    <a href="javascript:void(0)">
                        <img :src="imgSrc" ref="validateCode" @click.stop="refreshValidateCode"
                             class="validateCode"/>
                    </a>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="isloding" id="isloading_btn">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        props: ["refreshCode"],
        data() {
            return {
                imgSrc: '/author/getSecurityCode.do?q=' + Math.random(),
                formRequest: {
                    userName: undefined,
                    userPassword: undefined,
                    validateCode: undefined,

                },
                rules: {
                    userName: [{required: true, message: "账号不能为空!"}],
                    userPassword: [{required: true, message: "密码不能为空!"}],
                    validateCode: [{required: true, message: "验证码不能为空!"}]
                },
                isloding: false
            };
        },
        methods: {
            onSubmit() {
                var _self = this;
                _self.$refs["form"].validate(valid => {
                    if (valid) {
                        _self.isloding = true;
                        _self.$emit("onSubmit", _self.formRequest);
                    } else {
                        console.log("登录框验证不通过");
                        return false;
                    }
                });
            },
            redictSignUp() {
                this.$router.push("/signup")
            },
            refreshValidateCode() {
                this.isloding = false;
                this.$refs["validateCode"].src = "/author/getSecurityCode.do?a=" + Math.random();
            },
            
        },
        watch: {
            refreshCode() {
                this.$nextTick(() => this.refreshValidateCode());
            }
        }
    };
</script>

<style>
    .el-form-item.is-required .el-form-item__label:before {
        display: none;
    }

    .validateCode {
        height: 38px;
        width: 100px;
    }

    #siginBoxCard {
        border: 1px solid #e6ebf5;
        background-color: #fff;
        box-shadow: -7px 8px 12px 0 #999 !important;
        color: #333;
        margin-bottom: 0 !important;
    }
</style>
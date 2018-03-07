<template>
    <div class="login">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="14">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <i class="ion-log-in"></i>
                            <span>用户登录</span>
                        </div>
                        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                            <el-form-item label="账号">
                                <el-input v-model="sizeForm.name">
                                    <i slot="prefix" class="ion-ios-person"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="sizeForm.name" type="password">
                                    <i slot="prefix" class="ion-locked"></i>
                                </el-input>
                            </el-form-item>

                            <el-form-item size="large">
                                <el-button type="primary" size="mini" class="btn-login" @click="onSubmit">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        methods: {
            onSubmit() {
                this.$router.push('/manager');
                console.log('submit!');
            }
        }
    };
</script>
<style scoped>
    .login {
        width: 100%;
        height: 100%;
        background-image: url('./../../../../img/verdor/login_bg.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .btn-login {
        width: 100%;
    }
</style>
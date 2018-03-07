:disabled=selectionUsers.length<1
<template>
    <div>


        <div>
            <div>
                <el-button icon="el-icon-search" size="mini" :disabled="selectionUsers.length<1" @click="stopUser">
                    关闭选中账号
                </el-button>
                <el-button icon="el-icon-search" size="mini" :disabled="selectionUsers.length<1" @click="startUser">
                    开启选中账号
                </el-button>
                <el-button icon="el-icon-search" size="mini" @click="operaType=1;addUserDialogVisible=true">新增
                </el-button>
            </div>
            <el-table
                    :data="tableData2"
                    style="width: 100%"
                    @selection-change="selectionUserChange"
                    :row-class-name="tableRowClassName">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="姓名">
                </el-table-column>

                <el-table-column
                        prop="address"
                        label="账号权限">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="账号状态">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="注册日期">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template scope="scope">

                        <el-button type="text" size="mini" @click="operaType=2;addUserDialogVisible=true;">编 辑
                        </el-button>
                        |
                        <el-button type="text" size="mini" @click="stopUser">关 闭</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right"
                           background
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div>
        <div>


            <el-dialog
                    :title="(operaType===1?'新增':'修改')+'员工信息'"
                    @close="resetForm('ruleForm2')"
                    :visible.sync="addUserDialogVisible">
                <div>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名" prop="age">
                            <el-input v-model="ruleForm2.pass"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="age">
                            <el-input v-model="ruleForm2.pass"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="账户角色" prop="age">
                            <el-checkbox-group v-model="ruleForm2.pass">
                                <el-checkbox label="复选框 A"></el-checkbox>
                                <el-checkbox label="复选框 B"></el-checkbox>
                                <el-checkbox label="复选框 C"></el-checkbox>
                                <el-checkbox label="禁用" disabled></el-checkbox>
                                <el-checkbox label="选中且禁用" disabled></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="账户状态" prop="age">
                            <el-switch
                                    v-model="ruleForm2.pass"
                                    active-value="100"
                                    inactive-value="0"
                                    active-text="按月付费"
                                    inactive-text="按年付费">
                            </el-switch>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            userType: {
                type: Number,
                require: true
            }
        },
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                total: 50,
                visible2: false,
                addUserDialogVisible: false,
                tableData2: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                },
                selectionUsers: [],
                operaType: 1
            }
        },
        methods: {
            selectionUserChange(selection, row){
                this.selectionUsers = selection;
            },
            /**
             * 开启账号
             * @param uids
             */
            startUser(uids){
                this.$confirm('是否启动选中账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 停用用户
             * @param uid
             */
            stopUser(uid){
                this.$confirm('是否关闭选中账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

        created(){
            console.log('userType' + this.userType);
        }
    }
</script>

<style scoped="">
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
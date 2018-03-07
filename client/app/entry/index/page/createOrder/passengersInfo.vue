<template>
    <div>
        <ul>
            <li>
                <div class="addPassengerInfo-panel">
                    <el-form :model="formInline" label-position="right" :inline="true" label-width="120px">
                        <el-form-item label="乘客类型:">
                            <el-col :span="8">
                                <el-select v-model="formInline.region" placeholder="请选择">
                                    <el-option label="成人" value="shanghai"></el-option>
                                    <el-option label="儿童" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <el-col :span="8">
                                <el-date-picker
                                        v-model="formInline.region"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="证件签发地:">
                            <el-col :span="8">
                                <el-select v-model="formInline.region" placeholder="请选择">
                                    <el-option label="CN" value="shanghai"></el-option>
                                    <el-option label="US" value="beijing"></el-option>
                                    <el-option label="UK" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="乘机人:">
                            <el-col :span="8">
                                <el-input v-model="formInline.user"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="国籍:">
                            <el-col :span="8">
                                <el-select v-model="formInline.region" placeholder="请选择">
                                    <el-option label="中国" value="shanghai"></el-option>
                                    <el-option label="美国" value="beijing"></el-option>
                                    <el-option label="英国" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="证件号:">
                            <el-col :span="8">
                                <el-input v-model="formInline.user"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="性别:">
                            <el-col :span="8">
                                <el-select v-model="formInline.region" placeholder="请选择">
                                    <el-option label="男" value="shanghai"></el-option>
                                    <el-option label="女" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="证件类型:">
                            <el-col :span="8">
                                <el-select v-model="formInline.region" placeholder="请选择">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="证件有效期:">
                            <el-col :span="8">
                                <el-date-picker
                                        v-model="formInline.region"
                                        type="date"
                                        placeholder="选择日期"
                                >
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
            </li>
        </ul>
        <el-button type="warning" style="float: right;margin-bottom: 20px">+ 添加乘客</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                }
            }

        }
    }
</script>

<style scoped>
    .addPassengerInfo-panel  .el-form--inline .el-form-item__label {
        width: 82px;
    }
    .addPassengerInfo-panel .el-select>.el-input {
        display: block;
        width: 200px;
    }
    .addPassengerInfo-panel .el-input{
        width: 200px;
    }
</style>

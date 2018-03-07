<template>
    <div>
        <el-row>
            <el-col :span="2">
                <span>&nbsp;</span>
            </el-col>
            <el-col :span="22">
                <el-radio v-model="radio" label="1">自愿</el-radio>
                <el-radio v-model="radio" label="2">非自愿</el-radio>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <span>备注</span>
            </el-col>
            <el-col :span="22">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="Please input"
                        v-model="textarea">
                </el-input>
            </el-col>
        </el-row>
        <!-- <el-row style="margin-top:10px;">
            <el-col :span="2">
                <span>证明</span>
            </el-col>
            <el-col :span="22">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
            </el-col>
        </el-row> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                radio: 2,
                textarea: undefined,
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            }
        }
    }
</script>
<style>

</style>
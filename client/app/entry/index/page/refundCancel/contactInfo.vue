<template>
<div>

   
               <el-row class="contactInformation_row">
                            <el-col :span="6"> 
                                    <span>联系人姓名：</span>
                                    <el-input size="small"></el-input>
                            </el-col>

                            <el-col :span="6"> 
                                    <span>联系方式：</span>
                                    <el-input size="small"></el-input>
                            </el-col>

                            <el-col :span="6"> 
                                    <span>邮箱：</span>
                                    <el-input size="small"></el-input>
                            </el-col>
                  </el-row> 
    </div>
</template>


<script>
export default {
    data() {
      return {
        contactInfo:{
            contactName :"CCC",
            telPhone :"13000000000",
            email :"aaa@qqq.com"
        }
      }
    }
  }
</script>

<style>
div{
    font-size:14px;
}
</style>
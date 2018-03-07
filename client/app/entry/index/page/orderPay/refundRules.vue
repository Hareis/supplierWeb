<template>
  <div class="refundRules">
    <el-row :gutter="20">
       <el-col :span="3">退票规定：</el-col>
       <el-col :span="21"><div class="grid-content bg-purple-light"> <label v-text="refundRulesData.tpgd"></label></div></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="3">改期规定：</el-col>
       <el-col :span="21"><div class="grid-content bg-purple-light"><label v-text="refundRulesData.gqgd"></label></div></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="3">行李额规定：</el-col>
       <el-col :span="21"><div class="grid-content bg-purple-light"><label v-text="refundRulesData.xlegd"></label></div></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="3">票本说明：</el-col>
       <el-col :span="21"><div class="grid-content bg-purple-light"><label v-text="refundRulesData.pbsm"></label></div></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="3">其他说明：</el-col>
       <el-col :span="21"><div class="grid-content bg-purple-light"><label v-text="refundRulesData.qtsm"></label></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  prop:["rules"],
  data(){
    return{
      refundRulesData:{
        tpgd:"按航司规定执行",
        gqgd:"按航司规定执行",
        xlegd:"无",
        pbsm:"境外电子行程单",
        qtsm:"无"
      }      
    }
  }
}
</script>

<style>

</style>

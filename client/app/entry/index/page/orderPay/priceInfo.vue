<template>
  <div class="priceInfo">
     <el-table
      :data="priceInfoData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="乘客类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="人数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="票面价">
      </el-table-column>
       <el-table-column
        prop="date"
        label="税费"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="返佣"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="单人结算价">
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="20"> &nbsp;</el-col>
      <el-col :span="4">应付总金额:
        <span style="color:rgb(255,164,5);font-size:25px">￥6078</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
data(){
  return {
    priceInfoData:[
      {
        date:"1",
        name:"2",
        address:"3"
      },
      {
        date:"4",
        name:"5",
        address:"6"
      }
    ]
  }
}
}
</script>

<style>

</style>

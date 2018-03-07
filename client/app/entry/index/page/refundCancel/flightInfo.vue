<template>
  <div>

    <el-table :data="orderItinerary" 
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    style="width:100%">
      <el-table-column type="selection"  width="40"></el-table-column>
      <el-table-column label="出发机场" prop="depAirport"></el-table-column>
      <el-table-column label="到达机场" prop="arrAirport"></el-table-column>
      <el-table-column label="航空公司" prop="carrier"></el-table-column>
      <el-table-column label="航班号" prop="cabin"></el-table-column>
      <el-table-column label="舱位" prop="depAirport"></el-table-column>
      <el-table-column label="起飞时间" prop="depDatetime"></el-table-column>
      <el-table-column label="到达时间" prop="arrDatetime"></el-table-column>
      <el-table-column label="飞行时长" prop="flightTime"></el-table-column>
      <el-table-column label="机型" prop="flightType"></el-table-column>
      <el-table-column label="去程/回程" prop="fromReturn"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data() {
      return {
        orderItinerary:[
            {
              depAirport:"北京首都",
              arrAirport:"吉隆坡",
              carrier:"马来西亚",
              flightNo:"MH361",
              depDatetime:"N",
              cabin:"MH361",
              depDatetime:"2017-12-29 01:30",
              arrDatetime:"2017-12-29 06:30",
              flightTime:"6h30m",
              flightType:"A330",
              fromReturn:"去程"
            }
        ],
        multipleSelection: []
      }
    },
     methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style>

.cell .el-input,.cell .el-input__inner
{  
  width:80px;
}
</style>
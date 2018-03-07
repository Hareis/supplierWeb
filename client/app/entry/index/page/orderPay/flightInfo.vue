<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="word1"
        label="出发机场"
        width="160">
      </el-table-column>
      <el-table-column
        prop="word2"
        label="到达机场"
        width="160">
      </el-table-column>
      <el-table-column
        prop="word3"
        label="航空公司"
        width="120">
      </el-table-column>
      <el-table-column
        prop="word4"
        label="航班号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="word5"
        label="舱位"
        width="70">
      </el-table-column>
      <el-table-column
        prop="word6"
        label="起飞时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="word7"
        label="到达时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="word8"
        label="飞行时长"
        width="100">
      </el-table-column>
      <el-table-column
        prop="word9"
        label="机型">
      </el-table-column>
    </el-table>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      tableData: [
        {
          word1: "北京首都国际机场",
          word2: "吉隆坡国际机场",
          word3: "马来西亚航空",
          word4: "MH361",
          word5: "N舱",
          word6: "12月29日01:30",
          word7: "12月29日08:00",
          word8: "6h30m",
          word9: "A330"
        },
        {
          word1: "吉隆坡国际机场",
          word2: "新加坡樟宜机场",
          word3: "马来西亚航空",
          word4: "MH623",
          word5: "L舱",
          word6: "12月29日01:30",
          word7: "12月29日08:00",
          word8: "6h30m",
          word9: "737"
        },
        {
          word1: "北京首都国际机场",
          word2: "吉隆坡国际机场",
          word3: "马来西亚航空",
          word4: "MH624",
          word5: "L舱",
          word6: "01月07日 15:25",
          word7: "01月07日 16:25",
          word8: "1h",
          word9: "738"
        },
        {
          word1: "吉隆坡国际机场",
          word2: "北京首都国际机场",
          word3: "马来西亚航空",
          word4: "MH623",
          word5: "N舱",
          word6: "01月07日 18:20",
          word7: "01月08日 00:20",
          word8: "6h",
          word9: "A330"
        }
      ]
    };
  }
};
</script>

<style>

</style>


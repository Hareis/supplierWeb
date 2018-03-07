<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="word1"
        label="姓名"
       >
      </el-table-column>
      <el-table-column
        prop="word2"
        label="乘客类型"
        width="100"
       >
      </el-table-column>
      <el-table-column
        prop="word3"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="word4"
        label="出生日期"
       >
      </el-table-column>
      <el-table-column
        prop="word5"
        label="国籍"
        width="80"
       >
      </el-table-column>
      <el-table-column
        prop="word6"
        label="证件类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="word7"
        label="证件号"
        width="120"
       >
      </el-table-column>
      <el-table-column
        prop="word8"
        label="证件签发地"
        width="120"
       >
      </el-table-column>
      <el-table-column
        prop="word9"
        label="证件有效期">
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
          word1: "LIN/QINGXUAN",
          word2: "成人",
          word3: "女",
          word4: "1989年01月01日",
          word5: "中国",
          word6: "护照",
          word7: "GB123456",
          word8: "中国",
          word9: "2023年05月01日"
        },
         {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        },
        {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        },
        {
          word1: "",
          word2: "",
          word3: "",
          word4: "",
          word5: "",
          word6: "",
          word7: "",
          word8: "",
          word9: ""
        }
      ]
    };
  }
};
</script>

<style>

</style>


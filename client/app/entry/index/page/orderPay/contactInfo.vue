<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="word1"
        label="联系人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="word2"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="word3"
        label="邮箱">
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
          word1: "xxx",
          word2: "138-8888-8888",
          word3: "1398841@qq.com"
        }
      ]
    };
  }
};
</script>

<style>

</style>


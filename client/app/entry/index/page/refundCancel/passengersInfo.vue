<template>
        <div>


        <el-table :data="orderPassenger"  
        ref="multipleTable"
        @selection-change="handleSelectionChange" 
        style="width:100%">
             <el-table-column type="selection"  width="40"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="乘客类型" prop="ageType"></el-table-column>
            <el-table-column label="性别" prop="gender"></el-table-column>
            <el-table-column label="出生日期" prop="birthday"></el-table-column>
            <el-table-column label="国籍" prop="nationality"></el-table-column>
            <el-table-column label="证件类型" prop="cardType"></el-table-column>
            <el-table-column label="证件号" prop="cardNum"></el-table-column>
            <el-table-column label="票号" prop="ticketNos"></el-table-column>
        </el-table>

        </div>
</template>

<script>
export default {
    data() {
      return {
        orderPassenger:[
            {
                name:"YANG/YUN",
                ageType:"成人",
                gender:"男",
                birthday:"1987-12-29",
                nationality:"CN",
                cardType:"身份证",
                cardNum:"32152525522"
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
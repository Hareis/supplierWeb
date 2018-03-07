<template>
  <div >
      <el-row :gutter="10">
        <el-col :span="24">
          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>订单号:</span>
              <el-input size="small" v-model="orderInfo.orderID" class="el-input"></el-input>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>预定时间:</span>
              <el-input size="small" v-model="orderInfo.bookingDatetime" class="el-input"></el-input>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>支付方式:</span>
              <el-input size="small" v-model="orderInfo.payMethod" class="el-input"></el-input>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>PNR:</span>
              <el-input size="small" v-model="orderInfo.PNR" class="el-input"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>支付时间:</span>
              <el-input size="small" v-model="orderInfo.payDatetime" class="el-input"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>支付金额:</span>
              <el-input size="small" v-model="orderInfo.payAmount" class="el-input"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>订单状态:</span>
              <el-input size="small" v-model="orderInfo.orderStatus" class="el-input"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple request">
              <span>出票时间:</span>
              <el-input size="small" v-model="orderInfo.drawTicketDatetime" class="el-input"></el-input>
            </div>
          </el-col>

        </el-col>
      </el-row>
  </div>
</template>


<script>
export default {
    data() {
      return {
        orderInfo:{
          orderID :"",
          bookingDatetime :"",
          payMethod :"",
          PNR:"",
          payDatetime:"",
          payAmount:"",
          orderStatus:"",
          drawTicketDatetime:""
        }
      }
    }
  }
</script>


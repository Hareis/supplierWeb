<template>
  <div >

      <el-row :gutter="10">
        <el-col :span="12">

          <el-col>
            <div class="grid-content bg-purple request">
              <span style="width: 200px;">退票收取单价（成人）:</span>
              <el-input size="small" v-model="refundScheme.refundCollectAdultPrice"  class="el-input"></el-input> 元
            </div>
          </el-col>
          <el-col>
            <div class="grid-content bg-purple request">
              <span style="width: 200px;">退票收取单价（儿童）:</span>
              <el-input size="small" v-model="refundScheme.refundCollectChildPrice" class="el-input"></el-input> 元
            </div>
          </el-col>
          <el-col >
            <div class="grid-content bg-purple request">
              <span style="width: 200px;">退票收取总价:</span>
              <el-input size="small" v-model="refundScheme.refundCollectTotalPrice" class="el-input"></el-input> 元
            </div>
          </el-col>
          <el-col >
            <div class="grid-content bg-purple request">
              <span style="width: 200px;">可退金额总价:</span>
              <el-input size="small" v-model="refundScheme.refundTotalAmount" class="el-input"></el-input> 元
            </div>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col >
            <div class="grid-content bg-purple request">
              <span style="vertical-align:top;">退票价格时效:</span>
              <el-input size="small" v-model="refundScheme.refundPriceEffec" type="textarea" class="el-textarea" ></el-input>
            </div>
          </el-col>
          <el-col >
            <div class="grid-content bg-purple request">
              <span>退票方案:</span>
              <el-input
                type="textarea"
                autosize
                v-model="refundScheme.refundScheme">
              </el-input>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="danger" style="float: right;margin-right:20px;width:120px;" @click="cancelRefund">退票已取消</el-button>
        </el-col>
      </el-row>
  </div>
</template>


<script>
export default {
    data() {
      return {
        refundScheme:{
          refundCollectAdultPrice :0,
          refundPriceEffec :"请在【2017-10-10 18:30:00】前确认是否进行退票，否则改期自动取消",
          refundCollectChildPrice :0,
          refundScheme :"XXX",
          refundCollectTotalPrice :0,
          refundTotalAmount :0
        }
      }
    },
    methods:{
      agreeRefund:function(){
        console.log(this.refundScheme)
      },
      cancelRefund:function(){
        console.log(this.refundScheme)
      }
    }
  }
</script>


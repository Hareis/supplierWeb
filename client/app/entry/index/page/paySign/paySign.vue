<template>
    <div id="balance" class="orderListHtml">
      <leftMenu></leftMenu>
      <div class="container" style="min-height:725px;">
          <el-card>
              <header>支付签约</header>
          </el-card>
          <el-card>
              <el-row>
                  <el-col :span="5">
                        <span class="zfbLogo">
                            <img src="../../../../img/zfb.jpg" alt="支付宝图标" width="100%">
                        </span>
                        
                  </el-col>
                  <el-col :span="5">
                        <el-button @click="SignBtn">签约</el-button> 
                  </el-col>    

                  <el-col :span="8" v-if="hasSign">
                        <span>支付宝账号:</span>
                  </el-col>    
              </el-row>
              <el-row style="padding:20px 0">
                  <el-col>
                      温馨提示
                  </el-col>
                  <el-col>
                      点击签约后,页面讲跳转至第三方支付平台
                  </el-col>
                  <el-col>
                      签约后，第三方支付平台将按授权平台的指令完成退款操作
                  </el-col>
                  <el-col>
                      账号签约后，若要更改，解除账号，请联系平台负责人
                  </el-col>    
              </el-row>
          </el-card>


  
    </div>
    </div>
</template>
<script>
     
    import APIService from 'js/api'

    export default {
        data() {
            return {
                hasSign: false

            }
        },
        methods: {

             async SignBtn(){
                 
                try {
                var res = await  APIService('/payment/GetPaySign.do', {paymentMode:1});

                if(res.success){
                    var signUrl = res.signUrl;
                    window.open(signUrl);
                }else{
                    this.$message.error(errorMsg)
                }

               

                }catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

                }
            
        },
  
    
    };
</script>
<style scoped>
    .zfbLogo{
        display: inline-block;
        width:150px;
        height:60px;
    }
</style>




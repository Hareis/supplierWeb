<template>
  <div id="refundCancel">
          <div class="container">
              <section >
                <article>
                  <aside>
                      <!-- 退票方案 -->
                    <el-row>
                      <header>退票方案</header>
                      <el-card class="box-card1">
                        <refundScheme/>
                      </el-card>
                    </el-row>   
                    
                      <!-- 订单信息 -->
                    <el-row>
                      <el-card class="box-card2">
                        <orderInfo/>
                      </el-card>
                    </el-row>
                    
                      <!-- 退票航班 -->
                    <el-row>
                      <header>退票航班</header>
                      <el-card class="box-card">
                        <flightInfo></flightInfo>
                      </el-card>
                    </el-row>
                      <!-- 退票乘客 -->
                    <el-row>
                      <header>退票乘客</header>
                      <el-card class="box-card">
                        <passengersInfo></passengersInfo>
                      </el-card>
                    </el-row>
                    
                      <!-- 联系人信息 -->
                    <el-row>
                      <header>联系人信息</header>
                      <el-card class="box-card">
                        <contactInfo :value="new Object()"></contactInfo>
                      </el-card>
                    </el-row>
                    
                      <!-- 退票信息 -->
                    <el-row>
                      <header>退票信息</header>
                      <el-card class="box-card">
                        <refundTicketInfo/>
                      </el-card>
                    </el-row>

                    
                  </aside>       
                </article>
              </section>
            </div>
  </div>
 
</template>
   
<script>
import refundScheme from "./refundScheme";
import contactInfo from "./contactInfo";
import flightInfo from "./flightInfo";
import passengersInfo from "./passengersInfo";
import orderInfo from "./orderInfo";
import refundTicketInfo from "./refundTicketInfo";

export default {
    data(){
        return{
            orderTotalPrice:"6000",
            orderID:331308690054
        }
    },
    components: {
        refundScheme,
        contactInfo,
        flightInfo,
        passengersInfo,
        orderInfo,
        refundTicketInfo
    },
    methods:{
      submitInfo:function(){
        console.log(this)
      }
    }
};
</script>

<style>
[v-cloak] {
    display: none;
}
#refundCancel{

    padding:1px 0 1px 0;
    background: url(../../../../img/ml.jpg) repeat center; 

}


ul li {
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
}
input:disabled {
    color: #000000 !important;
    font-weight: lighter;

}
.color3 .el-step__head.is-wait ,.color3 .el-step__title.is-wait{
    color: #FF8247;
    border-color: #FF8247;
}
.green{
    color:#67c23a
}
.red{
    color:red;
}
.orange{
    color:#FF8247;
}
.font-24{
    font-size: 24px;
}
.request>span{
    display: inline-block;
    width: 120px;
    text-align: right;
    padding-right:10px;
}
.el-input,.el-input__inner {
    width: 120px !important;
    display: inline-block;
  }
  
.cell .el-input,.cell .el-input__inner
{  
    width: 80px !important;
    display: inline-block;
}
.el-textarea{
    width: 300px !important;
    display: inline-block;
}
.el-col{
    margin-top:10px;
}
#refundCancel header {
    width: 50%;
    height: 10px;
    color:#888;
    line-height: 10px;
    padding-left:8px;
    font-size:18px;
    margin:0 0 10px;
    color:#fff;
}
.el-row {
    margin:10px 0;
}
.demo-table-expand {
    margin-left:20px;
  }
  .demo-table-expand label {
    width: 90px;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .bgColor{
      background: #eee;
  }
  .el-card__body{
    padding: 0 20px 20px 20px;
  }
</style>

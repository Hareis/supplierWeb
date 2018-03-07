<template>
    <div class="container">
        <!--订单基本信息-->
        <el-card class="box-card">
            <el-row class="searchRow">
                <el-col :span="2">
                    <span>订单号:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>预定时间:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>支付方式:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
            </el-row>
            <el-row class="searchRow">
                <el-col :span="2">
                    <span>PNR:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>支付时间:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>支付金额:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
            </el-row>
            <el-row class="searchRow">
                <el-col :span="2">
                    <span>订单状态:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                <el-col :span="2">
                    <span>出票时间:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
                   <el-col :span="2">
                    <span>支付流水号:</span>
                </el-col>
                <el-col :span="6"  class="searchInput">
                    <el-input size="small"  v-model="orderInfo.word"></el-input>
                </el-col>
            </el-row>
        </el-card>
        <!--航程信息-->
        <header>航程信息</header>
        <el-card class="box-card">
            <flightInfo></flightInfo>
        </el-card>
        <!--乘客信息-->
        <header>乘客信息</header>
        <el-card class="box-card">
            <passengersInfo></passengersInfo>
        </el-card>
        <!--联系人信息-->
        <header>联系人信息</header>
        <el-card class="box-card" style="padding:20px 20px 0 20px;">
            <contactInfo></contactInfo>
        </el-card>
        <!--改期信息-->
        <header>改期信息</header>
        <el-card class="box-card" >
            <changeRemark></changeRemark>
        </el-card>
        <!--提交按钮-->
        <el-row style="padding:20px;">
               <el-button type="primary" style="float:right;">提交</el-button>
          </el-row>  
         
 

    </div>
</template>

<script>
    import flightInfo from "./flightInfo.vue";
    import passengersInfo from "./passengersInfo.vue";
    import contactInfo from "./contactInfo.vue";
    import changeRemark from "./changeRemark.vue";

    export default {
        data() {
            return {
                orderInfo: {
                    word: undefined
                }
            }
        },
        components: {
            flightInfo,
            passengersInfo,
            contactInfo,
            changeRemark
        }
    };
</script>

<style>
.searchRow{
    font-size:15px;
    color:#5a5e66;
}
.box-card{
    margin-top: 20px;
}
body{
    background: url(../../../../img/ml.jpg)
}
.searchRow{
    margin-top:6px;
}
.searchInput .el-input{
     width:160px !important;
}
header{
    height: 16px;
    line-height: 16px;
    color:#fff;
    font-size:15px;
}
.el-card__body{
    padding:0 20px 20px 20px;
}
.box-card{
    margin:12px 0 12px 0 ;
}
</style>

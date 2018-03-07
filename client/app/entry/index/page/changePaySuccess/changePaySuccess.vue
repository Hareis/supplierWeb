<template>
    <div class="container">
        <div id="changePay">

            <div class="paySuccessDiv">
                            <div class="things">
                                    
                            </div>
                             <div class="payInfo">
                                    <div class="payInfo_body">
                                        <span class="payName">订单编号:</span>
                                        <span class="paySuccessText">12311343</span>
                                        <span class="payName">支付方式:</span>
                                        <span class="paySuccessText"></span>
                                        <span class="payName">支付金额:</span>
                                        <span class="paySuccessText">58888.88</span>
                                        <span class="payName">支付时间:</span>
                                        <span class="paySuccessText">2017年11月1日</span>
                                        <span class="payName">账户余额:</span>
                                        <span class="paySuccessText">15144.10</span>
                                        <span class="payName">支付流水号:</span>
                                        <span class="paySuccessText">34847454</span>
                                   </div>
                                   <div class="paySuccessInfo_btn">
                                        <el-button  type="primary" @click="backOrderList()">返回订单列表</el-button>
                              
                                   </div>
                             </div>
            </div>

        </div>
    </div>

</template>

<script>

export default{
    data(){
        return{

        }
    },
    methods:{
        backOrderList(){
           this.$router.push({path:'/orderList'})

        }
    }
}
</script>

<style>
    #changePay{
    width:1140px;
    margin:0 auto;
    min-height:800px;
}

.paySuccessDiv{
    width:700px;
    height:500px;
    position: absolute;
    left:50%;
    margin-left:-300px;
    top:200px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);

}

.things{
    width:340px;
    height:500px;
    float: left;
    background:url(../../../../img/feiji.png);
    background-size:147%; 

}
.payInfo{
    padding-left:60px;
    width:300px;
    height:500px;
    float:right;
    background:#252434;
}
.payInfo_header{
    height:60px;
    line-height: 60px;
    color:#4BB7E8;
    letter-spacing: 5px;
}
.payInfo_body span{
    display: inline-block;
}
.payName{
    color:#fff;
    letter-spacing: 10px;
    font-size: 13px;
}
.paySuccessText{
    width:200px;
    height:24px;
    line-height: 35px;
    margin-bottom: 10px;
    padding:2px 0 10px 0;
    color:#fff;
    text-align: center;
    border-bottom: 1px solid #fff;
}
.paySuccessInfo_btn{
   margin-top:8px;
    height:60px;
    padding:12px 0; 
    margin-right:20px;
}
.paySuccessInfo_btn button{
    float: right;
}

</style>

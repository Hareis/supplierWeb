<template>
    <div id="recharging">
            <div class="container">
                    <div class="rechargingDiv">
                            <div class="rechargingDiv_div">
                                 <span>预付款流水号：</span>   
                                 <el-input :readonly="true" size="small" v-model="billingId"></el-input>
                            </div>
                            <div class="rechargingDiv_div">
                                 <span>公司名称：</span>
                                 <el-input :readonly="true" size="small" v-model="price"></el-input>
                            </div>
                            <div class="rechargingDiv_div">
                                 <span>付款账号：</span>
                                 <el-input size="small" :readonly="true" v-model="price" ></el-input>
                            </div>
                             <div class="rechargingDiv_div">
                                 <span>充值金额：</span>
                                 <el-input size="small" v-model="price" ></el-input>
                            </div>
                             <div class="rechargingDiv_div">
                                 <span>上传凭证：</span>
                                 <input type="file">
                            </div>

                            <div class="rechargingDiv_btn">
                                <el-button type="primary" @click="rechargingBtn">确认还款</el-button>
                            </div>

                    </div>
                
            </div> 
            <dialog :visible.sync="rechargeReview" size="small">

                    <h2>添加预付款成功，请等待确认</h2>


                
            </dialog>  
    </div>
</template>

<script>
     export default{
         data(){
             return{
                 rechargeReview: false,
                 billingId: undefined,
                 price: undefined,
                 
             }
         },
         methods:{
             rechargingBtn(){
                 this.rechargeReview = true;
             }
         }
     }

</script>


<style>

    #recharging{
       height: 710px;
    }
    .rechargingDiv{
        width: 473px;
        height: 320px;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        top: 200px;
        background: #72CCE0;
    }
    .rechargingDiv_div{
        margin-top:20px;
    }
    .rechargingDiv_div span{
        display:inline-block;
        width:160px;
        text-align: right;
    }
    .rechargingDiv_div .el-input{
        width:220px;
    }
    .rechargingDiv_btn{
        text-align:center;
        padding:20px;
    }


</style>


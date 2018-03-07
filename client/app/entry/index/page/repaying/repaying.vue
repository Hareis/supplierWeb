<template>
    <div id="repaying">
            <div class="container">
                    <div class="repayingDiv">
                            <div class="repayingDiv_div">
                                 <span>授信结算流水号：</span>   
                                 <el-input :readonly="true" size="small" v-model="price.paymentVoucher"></el-input>
                            </div>
                            <div class="repayingDiv_div">
                                 <span>应还金额：</span>
                                 <el-input :readonly="true" size="small" v-model="price.creditPrice"></el-input>
                            </div>
                            <div class="repayingDiv_div">
                                 <span>实还金额：</span>
                                 <el-input size="small" v-model="price.depositPrice"></el-input>
                            </div>
                             <div class="repayingDiv_div">
                                 <span>付款凭证：</span>
                                 <input type="file">
                            </div>

                            <div class="repayingDiv_btn">
                                <el-button type="primary" @click="rechagingTrue">确认还款</el-button>
                            </div>

                    </div>
                
            </div> 
    </div>
</template>

<script>
import requestAPIServiceAsync from "js/api";
import APIService from "js/api";


     export default{
         data(){
             return{
                price:[],
             }
         },
         methods:{
            async rechagingTrue() {
                        this.creditSettingTable = true;
                
                    try{
                        const  res = await requestAPIServiceAsync("accounting/creditChangeOfGetAlert.do",{payType: this.payType});
                        console.log(res);
                    }catch(error){

                    }


                },
         }
     }



</script>


<style>

    #repaying{
       height: 710px;
    }
    .repayingDiv{
        width: 473px;
        height: 280px;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        top: 200px;
        background: #72CCE0;
    }
    .repayingDiv_div{
        margin-top:20px;
    }
    .repayingDiv_div span{
        display:inline-block;
        width:160px;
        text-align: right;
    }
    .repayingDiv_div .el-input{
        width:220px;
    }
    .repayingDiv_btn{
        text-align:center;
        padding:20px;
    }


</style>


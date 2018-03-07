<template>
    <div id="withdrawing">
            <div class="container">
                    <div class="withdrawingDiv">
                            <div class="withdrawingDiv_div">
                                 <span>预付款流水号：</span>   
                                 <el-input :readonly="true" size="small" v-model="billingId"></el-input>
                            </div>
                            <div class="withdrawingDiv_div">
                                 <span>公司名称：</span>
                                 <el-input :readonly="true" size="small" v-model="price"></el-input>
                            </div>
                            <div class="withdrawingDiv_div">
                                 <span>付款账号：</span>
                                 <el-input size="small" :readonly="true" v-model="price" ></el-input>
                            </div>
                             <div class="withdrawingDiv_div">
                                 <span>可提现金额：</span>
                                 <el-input size="small" :readonly="true" v-model="price" ></el-input>
                            </div>
                              <div class="withdrawingDiv_div">
                                 <span>申请提现金额：</span>
                                 <el-input size="small"  v-model="price" ></el-input>
                                 <label>优先提现预存款</label>
                            </div>
                            <div class="withdrawingDiv_btn">
                                <el-button type="primary">确认提现</el-button>
                            </div>

                    </div>
                
            </div> 
    </div>
</template>

<script>
     export default{
         data(){
             return{
                 billingId:'xxx',
                 price: 800
             }
         }
     }

</script>


<style>

    #withdrawing{
       height: 710px;
    }
    .withdrawingDiv{
        width: 473px;
        height: 380px;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        top: 200px;
        background: #72CCE0;
    }
    .withdrawingDiv_div{
        margin-top:20px;
    }
    .withdrawingDiv_div span{
        display:inline-block;
        width:160px;
        text-align: right;
    }
    .withdrawingDiv_div .el-input{
        width:160px;
    }
    .withdrawingDiv_btn{
        text-align:center;
        padding:20px;
    }


</style>


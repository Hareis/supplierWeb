<template>
    <div id="changePay">
        <div class="container">


            <div class="changePayDiv">

                <div class="payinfo">
                    <div class="payinfo_header">
                        订单支付
                    </div>
                    <div class="payinfo_body">
                        <span class="payName">订单编号:</span>
                        <span class="payText" v-if="changeOrderId != null" style="font-size:0.7rem;height:35px;">{{changeOrderId}}</span>
                        <span class="payText" v-if="changeOrderId == null">无</span>
                        <span class="payName">公司名称:</span>
                        <source>
                        <span class="payText" v-if="company != ''">{{company}}</span>
                        <span class="payText" v-if="company == ''">无</span>
                        <span class="payName">支付金额:</span>
                        <span class="payText" v-if="price != null">{{price}}</span>
                        <span class="payText" v-if="price == null">无</span>
                        <span class="payType">选择支付方式:</span>

                        <el-select v-model="payTypeChose" placeholder="请选择支付方式" size="small" class="payTypeChose"
                                   @change="payTypeChose1" id="payTypeChose">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                                       v-if="payTypes.contain(item.value)">
                            </el-option>
                        </el-select>

                    </div>
                    <div class="payinfo_btn">
                        <el-button type="primary" @click="laterPay">稍后支付</el-button>
                        <el-button type="primary" @click="confirmPay" :disabled="balanceStatus"
                                   v-show="remainingTimeStr != ''">确认支付
                        </el-button>
                    </div>
                    <!-- <div class="payTimehints1" v-show="haveRemainingTime">
                            <span>生单时间：{{bookingDatetime}}</span>
                            <span style="color:#ff5452;">剩余支付时间：<label>{{remainingTimeStr}}</label></span>
                    </div> -->
                    <div class="payTimehints1" v-if="remainingTimeStr != '' ">
                        <span style="color:#ff5452;">剩余支付时间：<label>{{remainingTimeStr}}</label></span>
                    </div>
                    <div class="payTimehints1" v-else>
                        <span style="color:#ff5452;">此订单支付时间超时</span>
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    import APIService from 'js/api'


    function getQueryStringByName(name) {

        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

        if (result == null || result.length < 1) {

            return null;

        }

        return result[1];

    }

    var currentOrderId = getQueryStringByName("changeOrderId")

    export default {
        data() {
            return {
                intervalid1: undefined,
                changeOrderId: this.$route.query.changeOrderId,
                company: '',
                price: '',
                balanceStatus: true,
                haveRemainingTime: true,
                bookingDatetime: '',
                remainingTimeStr: "",
                hasRemain: false,
                payTypeChose: [],
                payTypes: [],
                options: [
                    {
                        value: '1',
                        label: '预付款'
                    },
                    {
                        value: '2',
                        label: '授信'
                    },
                    {
                        value: '3',
                        label: '支付宝扫码'
                    },
                    {
                        value: '4',
                        label: '支付宝代扣'
                    }

                ]
            };
        },
        methods: {

            async payTypeChose1() {
                this.balanceStatus = false;

                // if(this.payTypeChose ==3){
                //         //支付宝扫码
                //         this.balanceStatus = false;
                // }else{
                //     try {
                //     console.log(this.$route.params)
                //     var res = await APIService('/accounting/limit.do', {
                //         payType: this.payTypeChose,
                //         orderId: this.$route.query.changeOrderId,
                //         accountType: 5,
                //         price: this.price
                //     });

                //     if (res.success == true) {
                //         this.balanceStatus = false;
                //     } else {
                //         this.balanceStatus = true;
                //         this.$message.error(res.errorMsg)
                //     }
                // } catch (error) {

                //     this.$message.error(error.message || error.errorMsg || error.statusText);
                // }
                // }   
            },
            async confirmPay() {
                //debugger
                try {
                    switch (Number(this.payTypeChose)) {
                        case 3:
                            await this.aliPay();
                            break;
                        case 1:
                            await this.otherPay(this.payTypeChose);
                            break;
                        case 2:
                            await this.otherPay(this.payTypeChose);
                            break;
                        default:
                            break
                    }

                } catch (error) {

                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }
            },
            /**
             * 其他方式支付
             */
            async otherPay(payType) {
                try {
                    var res = await APIService('/accounting/limit.do', {

                        orderId: this.$route.query.changeOrderId,
                        payType: payType,
                        accountType: 5,
                        price: this.price,
                        tradeNo: undefined
                    });
                    this.$message({
                        message: '订单支付成功',
                        type: 'success'
                    });

                    if (res.success) {
                        this.$router.push({path: '/changeResult', query: {orderId: this.$route.query.changeOrderId}});
                    }
                    else {
                        this.$message.error(res.message);
                    }

                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }
            },
            /**
             * 支付宝支付
             */
            async aliPay() {
                try {
                    var res = await APIService('/payment/paymentChanged.do', {
                        orderNo: this.$route.query.changeOrderId,
                        paymentAmount: this.price,
                        paymentMode: 1,
                        bookingDatetime: this.bookingDatetime
                    });

                    //  debugger;
                    if (res.success) {
                        //  debugger
                        window.location.href = res.payUrl;
                    }


                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);

                }
            }
            ,
            //稍后支付
            laterPay() {
                this.$router.push({path: "/changeOrderList"});
            },
        },
        async created() {
            try {
                var res = await APIService('/accounting/prerequire.do', {orderId: this.$route.query.changeOrderId});

                this.changeOrderId = this.$route.query.changeOrderId;
                this.company = res.company;
                this.price = res.price.toFixed(2)

                this.company = "";
                // this.price = 0.01
                // this.bookingDatetime = new Date();
                this.bookingDatetime = res.bookingDatetime;
                this.hasRemain = true;
                this.payTypes = res.payTypes;

            } catch (error) {
                this.$message.error(error.message || error.errorMsg || error.statusText);
            }

            this.intervalid1 = setInterval(() => {

                if (this.bookingDatetime != null && this.hasRemain) {
                    this.remainingTimeStr = getTimeStr(this.bookingDatetime, new Date());
                    if (this.remainingTimeStr == "") {
                        this.balanceStatus = true;
                        this.haveRemainingTime = false;
                        clearInterval(this.intervalid1);
                    }
                }
            }, 1000);
        },

        beforeDestroy() {
            clearInterval(this.intervalid1);
        }


    };

    function getTimeStr(date1Temp, date2) {
        var date1 = new Date(Date.parse(date1Temp))
        date1.setMinutes(date1.getMinutes() + 30);
        var result = "";
        var seconds = parseInt((date1 - date2) / 1000);
        if (seconds <= 0) {
            return "";
        }
        var minute = parseInt(seconds / 60);
        var second = seconds - minute * 60;
        return (result = minute + "分" + second + "秒");
    }


</script>

<style>
    #changePay {
        height: 700px;
        /* background: url(../../../../img/huwai.jpg) */
    }

    .changePayDiv {
        width: 473px;
        height: 440;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        top: 200px;
        background: #72CCE0;
        /* box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7); */
    }

    #payTypeChose {
        width: 204px;

    }

    .payTypeChose > .el-input > .el-input__suffix > .el-input__suffix-inner {
        margin-top: 6px;
    }

    /* .things{
    width:340px;
    height:440px;
    float: left;
    background:url(../../../../img/feiji.png);
    background-size:147%; 

} */

    .payinfo {
        padding-left: 60px;
        width: 413px;
        height: 440px;
        float: right;
        /* background: #252434; */
    }

    .payinfo_header {
        height: 60px;
        line-height: 60px;
        letter-spacing: 5px;
    }

    .payinfo_body {
        margin-top: 20px;
    }

    .payinfo_body span {
        display: inline-block;
    }

    .payName {

        letter-spacing: 10px;
        font-size: 14px;
    }

    .payType {

        letter-spacing: 2px;
        font-size: 14px;
    }

    .payText {
        width: 200px;
        height: 18px;
        margin-bottom: 20px;
        padding: 10px 0;

        text-align: center;
        border-bottom: 1px solid #fff;
    }

    .payinfo_btn {
        width: 227px;
        margin-left: 70px;
        margin-top: 20px;
        height: 60px;
        padding: 12px 0;
    }

    .payinfo_btn button {
        float: left;
    }

    .payinfo_btn button:nth-child(2) {
        width: 91px;
        margin-left: 34px;
    }

    .payTypeChose {
        margin-left: 5px;
    }

    .payTimehints1 {
        width: 100%;
        height: 50px;
    }

    .payTimehints1 span {
        display: inline-block;
        width: 240px;
        font-size: 14px;
        margin-left: 104px;
        text-align: left;
    }

</style>
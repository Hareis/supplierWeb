<template>
    <div class="bgColor">
        <div class="container ">
            <!-- 废票方案 -->
            <el-card class="box-card" v-if="tabledata.mainStatus==5">
                <el-row>
                    <el-col :span="12" style="font-size:2.2rem;color:green">
                        <i class="el-icon-success"></i> 废票操作完成状态(待退款)
                    </el-col>

                    <el-col :span="12" style="font-size:1.3rem;margin-top:10px;">
                        订单号: {{tabledata.sourceOrderId}}
                    </el-col> 
                </el-row>
            </el-card>
             <el-card class="box-card" v-if="tabledata.mainStatus==61">
                <el-row>
                    <el-col :span="12" style="font-size:2.2rem;color:green">
                        <i class="el-icon-success"></i> 废票操作完成状态(退款中)
                    </el-col>

                    <el-col :span="12" style="font-size:1.3rem;margin-top:10px;">
                        订单号: {{tabledata.sourceOrderId}}
                    </el-col> 
                </el-row>
            </el-card>
             <el-card class="box-card" v-if="tabledata.mainStatus==6">
                <el-row>
                    <el-col :span="12" style="font-size:2.2rem;color:green">
                        <i class="el-icon-success"></i> 废票成功
                    </el-col>

                    <el-col :span="12" style="font-size:1.3rem;margin-top:10px;">
                        订单号: {{tabledata.sourceOrderId}}
                    </el-col> 
                </el-row>
            </el-card>
            <el-card class="box-card" v-if="answer.time != null">
                <header>废票方案</header>
                <div class="memo_plan">
                    <el-row :gutter="10">
                        <el-col :span="24">

                            <el-form ref="form" label-width="180px">
                                <el-form-item label="成人单价：">
                                    <el-col :span="7">
                                        <span>废票手续费:</span>
                                        <el-input size="small" v-model="answer.adultServicePrice" class="newPriceInput"
                                                  :readonly="true"></el-input>
                                        元

                                    </el-col>
                                    <el-col :span="7">
                                        <span>供应商服务费:</span>
                                        <el-input size="small" v-model="answer.adultPlatformPrice" class="newPriceInput"
                                                  :readonly="true"></el-input>
                                        元

                                    </el-col>
                                    <el-col :span="3">废票:({{tabledata.adultNumber}})人</el-col>
                                </el-form-item>
                                <el-form-item label="儿童单价：">
                                    <el-col :span="7">
                                        <span>废票手续费:</span>
                                        <el-input size="small" v-model="answer.childServicePrice" class="newPriceInput"
                                                  :readonly="true"></el-input>
                                        元

                                    </el-col>
                                    <el-col :span="7">
                                        <span>供应商服务费:</span>
                                        <el-input size="small" v-model="answer.childPlatformPrice" class="newPriceInput"
                                                  :readonly="true"></el-input>
                                        元

                                    </el-col>
                                    <el-col :span="3">废票:({{tabledata.childNumber}})人</el-col>
                                </el-form-item>
                                <el-form-item label="废票收取总价：">
                                    <el-col :span="9">
                                        <el-input size="small" v-model="answer.chargeAmount" :readonly="true"
                                                  class="newPriceTotil"></el-input>元
                                    </el-col>
                                    

                                </el-form-item>
                                <el-form-item label="可退金额总价：">
                                    <el-col :span="9">
                                        <el-input size="small" v-model="answer.returnAmount" :readonly="true"
                                                  class="newPriceTotil"></el-input>元
                                    </el-col>
                                    

                                </el-form-item>
                                <el-form-item label="废票价格时效：">
                                    <span v-if="remainingTimeStr != '' && tabledata.mainStatus==2">剩余确认时间：{{remainingTimeStr}}</span>
                                    请在【{{answer.expiryTime}}】前确认是否进行废票，否则废票自动取消
                                </el-form-item>
                                <el-form-item label="废票方案：">
                                    <el-input size="small" v-model="answer.remark" :readonly="true" type="textarea"
                                              class="el-input" id="answer-remark"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-show="tabledata.mainStatus==2 && remainingTimeStr != ''">

                            <el-button type="warning" style="float: right;margin-right:20px;width:90px;"
                                       @click="agreeRefund">同意废票
                            </el-button>
                            <el-button type="warning" style="float: right;margin-right:20px;width:90px;"
                                       @click="cancelRefund">取消废票
                            </el-button>
                        </el-col>
                        <el-col v-show="tabledata.mainStatus==3">
                            <el-button type="warning" style="float: right;margin-right:20px;">废票成功提交，请等待处理结果</el-button>
                        </el-col>

                        <el-col v-show="tabledata.mainStatus==4||(tabledata.mainStatus==2&&remainingTimeStr == '')">
                            <el-button type="danger" style="float: right;margin-right:20px;width:120px;">废票已取消
                            </el-button>
                        </el-col>


                    </el-row>
                </div>
            </el-card>
            <el-card class="box-card" v-else>
                <header style="text-align:center">等待废票方案中</header>
            </el-card>
            <!--订单基本信息-->
            <el-card class="box-card">
                <header>订单信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>订单号:</span>
                            <el-input size="small" class="noneBorder noneBorder_orderID" v-model="tabledata.orderId" 
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>预定时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata.bookingTime"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付方式:</span>
                            <el-input size="small" class="noneBorder" :value="paymentTypeCn"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>PNR:</span>
                            <el-input size="small" class="noneBorder" v-model="passengers.pnr"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata.paymentTime"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付金额:</span>
                            <el-input size="small" class="noneBorder" :value="payAmount" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>订单状态:</span>
                            <el-input size="small" class="noneBorder" :value="mainStatusCn" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>出票时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata.ticketTime"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付流水号:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata.paymentVoucher"
                                      :readonly="true"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!--航程信息-->
            <el-card class="box-card">
                <header>废票航班</header>
                <div class="range_info">
                    <el-table :data="segments" ref="multipleTable1" style="width: 100%">

                        <el-table-column prop="flightNumber" label="航班号" width="70">
                        </el-table-column>
                        <el-table-column prop="depAirport" label="出发机场">
                            <template scope="scope">
                                    <span>{{scope.row.depAirport}}{{scope.row.depAirportCN}}</span>
                            </template>    

                        </el-table-column>
                        <el-table-column prop="arrAirport" label="到达机场">
                             <template scope="scope">
                                    <span>{{scope.row.arrAirport}}{{scope.row.arrAirportCN}}</span>
                            </template>       
                        </el-table-column>
                        <el-table-column prop="depDatetime" label="起飞时间">
                        </el-table-column>
                        <el-table-column prop="arrDatetime" label="到达时间">
                        </el-table-column>
                        <el-table-column prop="duration" label="飞行时长">
                        </el-table-column>
                        <el-table-column prop="word9" label="去程/回程">
                            <template scope="scope">
                                <label v-if="scope.row.itineraryIndex==1">去程</label>
                                <label v-if="scope.row.itineraryIndex==2">回程</label>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="新起飞时间" prop="newDepDatetime" width="180px">

                        </el-table-column>
                        <el-table-column label="新航班号" prop="newFlightNumber">

                        </el-table-column> -->
                    </el-table>
                </div>
            </el-card>
            <!--乘客信息-->
            <el-card class="box-card">
                <header>废票乘客</header>
                <div class="passenger_info">
                    <el-table :data="passengers" ref="multipleTable2" style="width: 100%">

                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="ageType" label="乘客类型" width="80">
                            <template scope="scope">
                                <label v-if="scope.row.ageType==0">成人</label>
                                <label v-if="scope.row.ageType==1">儿童</label>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gender" label="性别" width="50">
                            <template scope="scope">
                                <label v-if="scope.row.gender=='M'">男</label>
                                <label v-if="scope.row.gender=='F'">女</label>
                            </template>
                        </el-table-column>
                        <el-table-column prop="birthday" label="出生日期">
                        </el-table-column>
                        <el-table-column prop="nationality" label="国籍" width="80">
                                <template scope="scope">
                                 <span class="upper">{{getCountryNameByCode(scope.row.nationality)}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column prop="cardType" label="证件类型" width="80">
                            <template scope="scope">
                                <label v-if="scope.row.cardType=='PP'">护照</label>
                                <label v-if="scope.row.cardType=='GA'">港澳通行证</label>
                                <label v-if="scope.row.cardType=='TW'">台湾通行证</label>
                                <label v-if="scope.row.cardType=='TB'">台胞证</label>
                                <label v-if="scope.row.cardType=='TB'">台胞证</label>
                                <label v-if="scope.row.cardType=='HX'">回乡证</label>
                                <label v-if="scope.row.cardType=='HY'">国际海员证</label>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cardNum" label="证件号" width="100">
                        </el-table-column>
                        <el-table-column prop="cardIssuePlace" label="证件签发地" width="120">
                                    <template scope="scope">
                                    <span class="upper">{{getCountryNameByCode(scope.row.cardIssuePlace)}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="cardExpired" label="证件有效期">
                        </el-table-column>
                        <el-table-column prop="ticketNo" label="票号">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <!--联系人信息-->
            <el-card class="box-card">
                <header>联系人信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>联系人:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.name"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>联系方式:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.mobile"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮箱:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.email"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮编:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.postcode"
                                      :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>地址:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.address"
                                      :readonly="true"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!--废票信息-->
            <el-card class="box-card">
                <header>废票信息</header>
                <div class="memo_info">
                    <el-row>
                        <el-col :span="4">
                            <span>&nbsp;</span>
                        </el-col>
                        <el-col :span="20">
                            <el-radio-group v-model="reason.type">
                                <el-radio :label="1" disabled>自愿</el-radio>
                                <el-radio :label="2" disabled>非自愿</el-radio>
                            </el-radio-group>
                        </el-col>

                        <el-col :span="24" v-show="isShow">
                            <br/>
                            <br/>
                            <div>
                                <el-col :span="4">
                                    <span>非自愿类型</span>
                                </el-col>
                                <el-col :span="20">
                                    <el-select size="small" v-model="reason.subType" disabled>
                                        <el-option label="航变" value="1"></el-option>
                                        <el-option label="孕退" value="2"></el-option>
                                        <el-option label="病退" value="3"></el-option>
                                        <el-option label="拒签" value="4"></el-option>
                                        <el-option label="死亡" value="5"></el-option>
                                        <el-option label="其他" value="6"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <span>非自愿证明</span>
                                </el-col>
                                <el-col :span="20">
                                    <div>
                                        <div v-if="reason.attachments==undefined||reason.attachments.length == 0">
                                            未上传证明
                                        </div>
                                        <div v-else>
                                            <ul>
                                                <li v-for="(item,index) in reason.attachments" :key="index">
                                                    <div>
                                                        <span>{{item.name}}</span> &nbsp;&nbsp;&nbsp;
                                                        <span class="lookAttachments"><a href="javascript:void(0)"
                                                                 @click="getAttachmentBase64Data(item.id)">查看</a></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-col>


                            </div>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <span>备注</span>
                        </el-col>
                        <el-col :span="20">
                            <el-input type="textarea" v-model="reason.remark" :readonly="true"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <el-row style="padding:20px;">
                <el-button type="warning" style="float:right;" @click="gotoRefundOrderList">返回订单列表</el-button>
            </el-row>

        </div>
    </div>
</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import countryJson from 'json/country.json';
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }
function subTypeCN(type) {
        var str = '';
        switch (type) {
            case 1:
                str = '航变';
                break;
            case 2:
                str = '孕退';
                break;
            case 3:
                str = '病退';
                break;
            case 4:
                str = '拒签';
                break;
            case 5:
                str = '死亡';
                break;
            case 6:
                str = '其他';
                break;
            default:
                str = '其他';
                break;
        }
        return str;
    }
    export default {
        data() {
            return {
                passengers: [],
                segments: [],
                remainingTimeStr: '',
                hasRemain: false,
                contact: {},
                reason: {},
                tabledata: {},
                answer: {},

                orderInfo: {
                    word: undefined
                },
                radio: "1",
                textarea: undefined,
                form: {
                    contactName: undefined,
                    contactNumber: undefined,
                    contactEmail: undefined
                },
                rules: {
                    contactName: [{required: true, message: "请输入联系人", trigger: "blur"}],
                    contactNumber: [{required: true, message: "请输入联系方式", trigger: "blur"}]
                },
                itineraryList: [],
                passengerList: [],

                multipleSelection1: [],
                multipleSelection2: [],


                refundTicket: {
                    isVoluntarily: 0,
                    Involuntary: "XXX",
                    remarks: "XXX",
                    involuntaryProof: "XXX"
                },
                isShow: false,
                mainStatusCn: undefined,
                paymentTypeCn: undefined,
                payAmount: undefined,


            };
        },

        mounted() {
            this.checked(); //每次更新了数据，触发这个函数即可。
        },
        methods: {
            async getAttachmentBase64Data(fileId) {
                try {
                    const res = await requestAPIServiceAsync("/refund/getAttachmentDetail.do?" + $.param({
                        orderId: this.$route.query.orderId,
                        attachmentId: fileId
                    }), {}, undefined, 'get');
                    const dataBase64 = 'data:image/jpeg;base64,' + res.attachment.base64;
                    const blobObj = dataURLtoBlob(dataBase64);
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(blobObj);
                    a.href = url;
                    a.target='_blank';
                    a.click();

                } catch (error) {
                    this.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                }
            },
            checked() {
                //首先el-table添加ref="table"引用标识

                //默认列表某行选中
                this.$refs.multipleTable1.toggleRowSelection(this.itineraryList[0], true);
                this.$refs.multipleTable1.toggleRowSelection(this.itineraryList[1], true);
                this.$refs.multipleTable2.toggleRowSelection(this.passengerList[0], true);
                this.$refs.multipleTable2.toggleRowSelection(this.passengerList[1], true);
            },
            submitAppliction() {
                window.location.href = "refundResult";
            },
            agreePay() {
                window.location.href = "refundPay";
            },

            //确定废票
            async agreeRefund() {

                try {
                    var res = await APIService("refund/refundVilidate.do", {
                        orderId: this.$route.query.orderId,
                        status: 1
                    });
                    this.$message.success("废票成功提交")
                    this.bindData()


                } catch (error) {
                    this.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                }
            },
            //取消
            async cancelRefund() {

                try {
                    var res = await APIService("refund/refundCancel.do", {
                        orderId: this.$route.query.orderId,
                        status: 1
                    });
                    this.$message.success("取消废票成功")
                    this.bindData()
                } catch (error) {
                    this.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                }

            },
            async bindData() {
                try {
                    var res = await APIService("refund/getOrderGet.do", {
                        orderId: this.$route.query.orderId
                    });
                    console.log(res)
                    this.answer = res.order.answer;
                    this.orderId = res.orderId;
                    this.tabledata = res.order;
                    this.segments = res.order.segments;
                    this.passengers = res.order.passengers;
                    this.contact = res.order.contact;
                    this.reason = res.order.reason;
                    this.expiryTime = this.answer.expiryTime;

                    if (res.order.mainStatus == 5) this.expiryTime = null;

                    this.hasRemain = true;

                    this.intervalid1 = setInterval(() => {
                        if (this.expiryTime != null) {
                            this.remainingTimeStr = getTimeStr(this.expiryTime, new Date());
                            if (this.remainingTimeStr == "") {
                                clearInterval(this.intervalid1);
                            }
                        }
                    }, 1000);

                    //支付状态
                    if (this.tabledata.paymentType == 1) {
                        this.paymentTypeCn = "预付款";
                    } else if (this.tabledata.paymentType == 2) {
                        this.paymentTypeCn = "授信";
                    } else if (this.tabledata.paymentType == 3) {
                        this.paymentTypeCn = "支付宝";
                    } else if (this.tabledata.paymentType == 4) {
                        this.paymentTypeCn = "代扣";
                    }

                    //订单状态
                    if (this.tabledata.mainStatus == 0) {
                        this.mainStatusCn = "无效"
                    }
                    else if (this.tabledata.mainStatus == 1) {
                        this.mainStatusCn = "废票申请中";
                    }
                    else if (this.tabledata.mainStatus == 2) {
                        this.mainStatusCn = "废票待确认";
                    } else if (this.tabledata.mainStatus == 3) {
                        this.mainStatusCn = "废票已确认";
                    } else if (this.tabledata.mainStatus == 4) {
                        this.mainStatusCn = "废票已取消";
                    } else if (this.tabledata.mainStatus == 5) {
                        this.mainStatusCn = "待退款";
                    } else if (this.tabledata.mainStatus == 61) {
                        this.mainStatusCn = "退票中状态(待退款)"
                    } else if (this.tabledata.mainStatus == 6) {
                        this.mainStatusCn = "废票已完成";
                    }

                    //支付金额
                    var payAmount = ((this.tabledata.sourceAdultPrice + this.tabledata.sourceAdultTax) * this.tabledata.adultNumber) + ((this.tabledata.sourceChildPrice + this.tabledata.sourceChildTax) * this.tabledata.childNumber)
                    this.payAmount = (payAmount).toFixed(2);

                    //  非自愿类型
                     //  非自愿类型
                this.reason.subType=subTypeCN(Number(this.reason.subType));


                    //是否自愿
                    if (this.reason.type == 1) {
                        this.isShow = false;
                    }
                    else {
                        this.isShow = true;
                    }


                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

            },
            //返回废废订单列表
               getAllCountryList(){
                return  countryJson.CountryInfoList;
            },
               getCountryNameByCode(queryString){

               let res= this.getAllCountryList().filter(e=>e.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
               if(res.length>0){
                   return res[0].ChName;
               }else{
                   return '未知'
               }
            },
            gotoRefundOrderList() {
                this.$router.push({
                    path: '/disillusionedOrderList',
                    replace: true
                });
            },
            handleSelectionRefund1(val) {
                this.multipleSelection1 = val;
            },
            handleSelectionRefund2(val) {
                this.multipleSelection2 = val;
            },
            selectable: function (row, index) {
                return 0; //不可勾选
            },
            backOrderList() {
                window.location.href = "orderList";
            }
        },
        async created() {

            this.bindData();
        }
    };

    function getTimeStr(date1Str, date2) {
        var date1 = new Date(Date.parse(date1Str.replace(/-/g, '/')));
        var result = "";
        var seconds = parseInt((date1 - date2) / 1000);
        if (seconds <= 0) {
            return "";
        }
        var remainTime = seconds
        var hour = parseInt(remainTime / 3600);
        remainTime = remainTime - hour * 3600
        var minute = parseInt(remainTime / 60);
        remainTime = remainTime - minute * 60
        var second = remainTime;
        return (result = hour + ":" + minute + ":" + second);
    }
</script>
<style>
    #answer-remark {
        width: 313px;
    }
    .noneBorder_orderID input{
        width:220px;
    }
</style>

<template>
    <div class="bgColor">
        <div class="container ">
            <!-- 改期方案 -->
            <el-card class="box-card" v-show="tabledata.mainStatus==6">

                <el-col :span="12" style="font-size:2.2rem;color:green">
                    <i class="el-icon-success"></i> 改期成功
                </el-col>
                
                <el-col :span="12" style="font-size:1.3rem;margin-top:10px;">
                    订单号: {{tabledata.orderId}}
                </el-col>

            </el-card>
            <el-card class="box-card" v-if="answer.expiryTime != null">
                <header>改期方案</header>
                <div class="memo_plan">
                    <el-row :gutter="10">

                        <el-form ref="form" label-width="180px">
                            <el-form-item label="成人单价:">
                                <el-col :span="6">
                                    <span>舱位差价:</span>
                                    <el-input size="small" v-model="answer.adultCabinPrice" class="newPriceInput" :readonly="true"></el-input>
                                    元

                                </el-col>
                                <el-col :span="6">
                                    <span>改期费:</span>
                                    <el-input size="small" v-model="answer.adultServicePrice" class="newPriceInput" :readonly="true"></el-input>
                                    元


                                </el-col>
                                <el-col :span="6">
                                    <span>改期服务费:</span>
                                    <el-input size="small" v-model="answer.adultPlatformPrice" class="newPriceInput" :readonly="true"></el-input>
                                    元


                                </el-col>
                                <el-col :span="6">改期:({{tabledata.adultNumber}})人</el-col>
                            </el-form-item>
                            <el-form-item label="儿童单价:">
                                <el-col :span="6">
                                    <span>舱位差价:</span>
                                    <el-input size="small" v-model="answer.childCabinPrice" class="newPriceInput" :readonly="true"></el-input>
                                    元


                                </el-col>
                                <el-col :span="6">
                                    <span>改期费:</span>
                                    <el-input size="small" v-model="answer.childServicePrice" class="newPriceInput" :readonly="true"></el-input>
                                    元


                                </el-col>

                                <el-col :span="6">
                                    <span>改期服务费:</span>
                                    <el-input size="small" v-model="answer.childPlatformPrice" class="newPriceInput" :readonly="true"></el-input>
                                    元

                                </el-col>
                                <el-col :span="6">改期:({{tabledata.childNumber}})人</el-col>
                            </el-form-item>

                            <el-form-item label="改期方案证明:">
                                <el-col :span="9">
                                    <div>
                                        <div v-if="answer.attachments==undefined||answer.attachments.length == 0">未上传证明</div>
                                        <div v-else>
                                            <ul>
                                                <li v-for="item in answer.attachments" :key="item.name">
                                                    <div>
                                                        <span>{{item.name}}</span> &nbsp;&nbsp;&nbsp;
                                                        <span class="lookAttachments">
                                                            <a href="javascript:void(0)" @click="getAttachmentBase64Data(item.id)">查看</a>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-col>

                            </el-form-item>
                            <el-form-item label="改期价格时效:">
                                <span v-if="remainingTimeStr != '' && tabledata.mainStatus==2">剩余确认时间：
                                    <span style="color:red;font-size:16px;">{{remainingTimeStr}}</span>
                                </span>
                                请在【{{answer.expiryTime}}】前确认是否进行改期，否则改期自动取消
                            </el-form-item>
                            <el-form-item label="改期方案:">
                                <el-input size="small" v-model="answer.remark" :readonly="true" type="textarea" class="el-input" id="answer-remark"></el-input>
                            </el-form-item>
                        </el-form>


                    </el-row>
                    <el-row style="margin-top:6px;">
                        <el-col v-show="tabledata.mainStatus==2 && remainingTimeStr != ''">

                            <el-button type="warning"  v-if="answer.chargeAmount!=0" style="float: right;margin-right:20px;width:90px;" @click="agreePay">同意支付
                            </el-button>
                             <el-button type="warning" v-if="answer.chargeAmount==0" style="float: right;margin-right:20px;width:90px;" @click="agreeChange">确认改期
                            </el-button>

                            <el-button type="warning" style="float: right;margin-right:20px;width:90px;" @click="cancelRefund">取消改期
                            </el-button>
                        </el-col>
                        <!-- <el-col v-show="tabledata.mainStatus==2 && remainingTimeStr != ''">

                            <el-button type="warning" style="float: right;margin-right:20px;width:90px;" @click="agreeChange">确认改期</el-button>
                            <el-button type="warning" style="float: right;margin-right:20px;width:90px;" @click="cancelRefund">取消改期</el-button>

                        </el-col> -->

                        <el-col v-show="tabledata.mainStatus==3">
                            <el-button type="warning" style="float: right;margin-right:20px;">改期已成功提交，请等待处理结果
                            </el-button>
                        </el-col>

                        <el-col v-show="tabledata.mainStatus==4 ||(tabledata.mainStatus==2 &&remainingTimeStr == '')">
                            <el-button type="danger" style="float: right;margin-right:20px;width:120px;">改期已取消
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

             <el-card class="box-card" v-else>

                <header style="text-align:center">改期方案等待中,请稍后刷新页面</header>

            </el-card>

              <!--航程信息-->

            <el-card class="box-card">
                <header>改期航班</header>
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
                            <template scope="scope">
                                <div>
                                    <label>{{moment(scope.row.depDatetime).format("YYYY-MM-DD")}}</label>
                                    <br/>
                                    <label>{{moment(scope.row.depDatetime).format("HH:mm")}}</label>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="arrDatetime" label="到达时间">
                            <template scope="scope">
                                <div>
                                    <label>{{moment(scope.row.arrDatetime).format("YYYY-MM-DD")}}</label>
                                    <br/>
                                    <label>{{moment(scope.row.arrDatetime).format("HH:mm")}}</label>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="duration" label="飞行时长">
                        </el-table-column>
                        <el-table-column prop="itineraryIndex" label="去程/回程">
                            <template scope="scope">
                                <span v-if="scope.row.itineraryIndex == 1">去程</span>
                                <span v-if="scope.row.itineraryIndex == 2">返程</span>
                            </template>

                        </el-table-column>
                        <el-table-column label="新起飞时间" prop="newDepDatetime" width="180px">


                        </el-table-column>
                        <el-table-column label="新航班号" prop="newFlightNumber">

                        </el-table-column>
                        <el-table-column label="新舱位" prop="newCabin">

                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

                 <!--乘客信息-->
            <el-card class="box-card">
                <header>改期乘客</header>
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
                        <el-table-column prop="newTicketNo" label="新票号">
                        </el-table-column>
                        <el-table-column prop="newPNR" label="新PNR">
               
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

                 <!--改期信息-->
            <el-card class="box-card">
                <header>改期信息</header>
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
                                        <div v-if="reason.attachments==undefined||reason.attachments.length == 0">未上传证明</div>
                                        <div v-else>
                                            <ul>
                                                <li v-for="item in reason.attachments">
                                                    <div>
                                                        <span>{{item.name}}</span> &nbsp;&nbsp;&nbsp;
                                                        <span class="lookAttachments">
                                                            <a href="javascript:void(0)" @click="getAttachmentBase64Data(item.id)">查看</a>
                                                        </span>
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
                            <el-input type="textarea" :readonly="true" v-model="reason.remark"></el-input>
                        </el-col>
                    </el-row>
                 
                </div>
            </el-card>

            <!--联系人信息-->
            <el-card class="box-card">
                <header>联系人信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>联系人:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.name" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>联系方式:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.mobile" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮箱:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.email" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮编:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.postcode" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>地址:</span>
                            <el-input size="small" class="noneBorder" v-model="contact.address" :readonly="true"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

             <el-card class="box-card">
                <header>改期订单信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>改期订单号:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="tabledata.orderId"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期申请时间:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="reason.time"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期支付方式:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="paymentTypeCn"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期新PNR:</span>
                            <!-- <el-input size="small" class="noneBorder" :readonly="true" v-model="tabledata.tickets[0].passengers[0].pnr" ></el-input> -->
                            <el-input size="small" class="noneBorder" :readonly="true" ></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期支付时间:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="tabledata.paymentTime"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期支付金额:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="chargeAmount"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期订单状态:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" :value="mainStatusCn"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>改期出票时间:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="tabledata.ticketTime"></el-input>
                        </el-col>
                          <el-col :span="8">
                            <span style="width:90px;text-align:left">改期支付流水号:</span>
                            <el-input size="small" class="noneBorder" :readonly="true" v-model="tabledata.paymentVoucher"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>  


                <!--订单基本信息-->
            <el-card class="box-card">
                <header>订单信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>订单号:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.orderId" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>预定时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.bookingTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付方式:</span>
                            <el-input size="small" class="noneBorder" :value="paymentTypeCn1" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>PNR:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.pnr" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.paymentTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付金额:</span>
                            <el-input size="small" class="noneBorder" :value="payAmount" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>订单状态:</span>
                            <el-input size="small" class="noneBorder" :value="mainStatusCn1" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>出票时间:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.ticketTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付流水号:</span>
                            <el-input size="small" class="noneBorder" v-model="tabledata1.paymentVoucher" :readonly="true"></el-input>
                        </el-col>
                    </el-row>
                       <el-row style="padding:20px;">
                        <el-button type="warning" style="float:right;" @click="gotoChangeOrderList">返回订单列表</el-button>
                    </el-row>
                </div>
            </el-card>
        </div>


    </div>
</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import countryJson from 'json/country.json';
    var paymentMode = 0;

    function getQueryStringByName(name) {
        var result = location.search.match(
            new RegExp("[?&]" + name + "=([^&]+)", "i")
        );

        if (result == null || result.length < 1) {
            return null;
        }

        return result[1];
    }

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    var currentOrderId = getQueryStringByName("out_trade_no");
    var currentPaymentMode = getQueryStringByName("paymentMode");
    var is_success = getQueryStringByName("is_success");
    
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
                passengers1: [],
                segments: [],
                contact: {},
                reason: {
                    attachments: []
                },
                remainingTimeStr: '',
                tabledata: {},
                tabledata1: {},
                segments1: [],
                answer: {},
                mainStatusCn: '',
                chargeAmount: '',
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
                    contactName: [{ required: true, message: "请输入联系人", trigger: "blur" }],
                    contactNumber: [{ required: true, message: "请输入联系方式", trigger: "blur" }]
                },
                itineraryList: [],
                passengerList: [],
                passengerList1: [],

                tempstatus: 0,
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
                mainStatusCn1: undefined,
                paymentTypeCn1: undefined,
                payAmount: undefined,
                payAmount1: undefined,
                tradeNo: undefined,
                ticketPassengers:[],
                orderId: currentOrderId,
                paymentMode: currentPaymentMode
            };
        },
        // mounted() {
        //     this.checked(); //每次更新了数据，触发这个函数即可。
        // },
        methods: {
                  
            async getAttachmentBase64Data(fileId) {
                // debugger;
                try {
                    
                    const res = await requestAPIServiceAsync("/refund/getAttachmentDetail.do?" + $.param({
                        orderId: this.$route.query.orderId,
                        attachmentId: fileId
                    }), null, undefined, 'get');
                    console.log(res)
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
            /**
             * 上传文件移除
             */
            uploadRemove(file, fileList) {

            },
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
            /**
             * 文件选择
             */
            uploadChange(file, fileList) {
                //debugger
                const tempFileObj = file.raw;
                const isJPG = ['image/jpeg', 'image/png'].indexOf(tempFileObj.type) > -1;
                const isLt500KB = tempFileObj.size / 1024 / 1024 < 0.5;

                if (!isJPG) {
                    this.$message.error('上传凭证只能是 JPG、PNG、JPEG 格式!');
                }
                if (!isLt500KB) {
                    this.$message.error('上传凭证大小不能超过 500KB!');
                }

                if (isJPG && isLt500KB) {
                    return true;
                }
                fileList.splice(fileList.indexOf(file), 1);
            },

            // checked() {
            //     //首先el-table添加ref="table"引用标识

            //     //默认列表某行选中
            //     this.$refs.multipleTable1.toggleRowSelection(this.itineraryList[0], true);
            //     this.$refs.multipleTable1.toggleRowSelection(this.itineraryList[1], true);
            //     this.$refs.multipleTable2.toggleRowSelection(this.passengerList[0], true);
            //     this.$refs.multipleTable2.toggleRowSelection(this.passengerList[1], true);
            // },
            submitAppliction() {
                window.location.href = "refundResult";
            },

            //返回订单列表
            gotoChangeOrderList() {
                this.$router.push({ path: '/changeOrderList' })
            },
            //确定改期
            agreePay() {
                //   debugger;
                var changeOrderId = this.$route.query.orderId
                this.$router.push({
                    path: '/changedPay',
                    replace: true,
                    query: { changeOrderId: changeOrderId }
                });


            },
            async agreeChange() {

                try {
                    var res = await APIService("refund/refundVilidate.do", {
                        orderId: this.$route.query.orderId,
                        status: 1,

                    });
                    this.$message.success("改期已确认")
                    this.bindData()


                } catch (error) {
                    this.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                }
            },

            async bindData() {
              
                try {

                    var res = await requestAPIServiceAsync("/refund/getOrderGet.do", {
                        orderId: this.$route.query.orderId
                    });
                    

                    if(res.order.tickets!=null&&res.order.tickets.length>0&&res.order.tickets[0].passengers!=null&&res.order.tickets[0].passengers.length>0)
                {
                    let ticketPassengers = res.order.tickets[0].passengers;
                    for (let psg of res.order.passengers) {
                        for (let tpsg of ticketPassengers) {
                            if (psg.name === tpsg.name) {
                                psg.newTicketNo = tpsg.ticketNo;
                                psg.newPNR = tpsg.pnr;
                          
                                break;
                            }
                            
                        }
                        
                    }                
                }
                else
                {
                    res.order.passengers.forEach(function (item) {
                        item.newTicketNo = undefined;
                        item.newPNR = undefined;
                    });

                }
           
          
                    this.answer = res.order.answer;
                    this.orderId = res.orderId;
                    this.tabledata = res.order;
                    this.segments = res.order.segments;
                    this.passengers = res.order.passengers;
                    this.contact = res.order.contact;
                    this.reason = res.order.reason;
                    this.expiryTime = this.answer.expiryTime;
                    this.chargeAmount = this.answer.chargeAmount;
                   
                    // debugger
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
                        this.mainStatusCn = "改期申请中";
                    }
                    else if (this.tabledata.mainStatus == 2) {
                        this.mainStatusCn = "改期待确认";
                    } else if (this.tabledata.mainStatus == 3) {
                        this.mainStatusCn = "改期已确认";
                    } else if (this.tabledata.mainStatus == 4) {
                        this.mainStatusCn = "改期已取消";
                    } else if (this.tabledata.mainStatus == 6) {
                        this.mainStatusCn = "改期已完成";
                    }

                    //支付金额
                    var payAmount = ((this.tabledata.sourceAdultPrice + this.tabledata.sourceAdultTax) * this.tabledata.adultNumber) + ((this.tabledata.sourceChildPrice + this.tabledata.sourceChildTax) * this.tabledata.childNumber)
                    this.payAmount = (payAmount);

                    //  非自愿类型
                    if (this.reason != null) {
                        this.reason.subType = subTypeCN(Number(this.reason.subType))

                        //是否自愿
                        if (this.reason.type == 1) {
                            this.isShow = false;
                        }
                        else {
                            this.isShow = true;
                        }
                    }

                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

            },
            // 取消
            cancelRefund() {

                try {
                    var res = APIService("refund/refundCancel.do", {
                        orderId: this.$route.query.orderId,
                        status: 1
                    });

                    this.$message.success("取消改期成功")
                    this.sureChange();
                    this.bindData()

                } catch (error) {
                    this.$message.error(
                        error.message || error.errorMsg || error.statusText
                    );
                }

            },

            async sureChange() {
                try {
                    var res = await APIService("refund/getOrderGet.do", {
                        orderId: this.$route.query.orderId
                    });
                newPnrTicket    
             if(res.order.tickets!=null&&res.order.tickets.length>0&&res.order.tickets[0].passengers!=null&&res.order.tickets[0].passengers.length>0)
                {
                    let ticketPassengers = res.order.tickets[0].passengers;
                    for (let psg of res.order.passengers) {
                        for (let tpsg of ticketPassengers) {
                            if (psg.name === tpsg.name) {
                                psg.newTicketNo = tpsg.ticketNo;
                                psg.newPNR = tpsg.pnr;
                                break;
                            }
                        }
                        
                    }                
                }
                else
                {
                    res.order.passengers.forEach(function (item) {
                        item.newTicketNo = undefined;
                        item.newPNR = undefined;
                    });

                }

                    this.answer = res.order.answer;
                    this.orderId = res.orderId;
                    this.tabledata = res.order;
                    this.segments = res.order.segments;
                    this.passengers = res.order.passengers;
                    this.contact = res.order.contact;
                    this.reason = res.order.reason;
                    this.expiryTime = this.answer.expiryTime;

                    //this.expiryTime="2018-01-06 12:00:00"

                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

                this.intervalid1 = setInterval(() => {
                    if (this.expiryTime != null) {
                        this.remainingTimeStr = getTimeStr(this.expiryTime, new Date());
                        if (this.remainingTimeStr == "") {
                            clearInterval(this.intervalid1);
                        }
                    }
                }, 1000);
            },
            handleSelectionRefund1(val) {
                this.multipleSelection1 = val;
                // console.log(this.multipleSelection1);
            },
            handleSelectionRefund2(val) {
                this.multipleSelection2 = val;
                // console.log(this.multipleSelection2);
            },

            selectable: function (row, index) {
                return 0; //不可勾选
            },

            backOrderList() {
                this.$router.push({
                    path: '/changeOrderList',
                    replace: true
                });
            },
            async paymentSerivce() {
                try {
                    // debugger;
                    const paramStr = $.param({
                        orderId: this.$route.query.orderId,
                        paymentMode: this.paymentMode
                    });
                    var res = await requestAPIServiceAsync(
                        "/payment/getChangePayStatus.do?" + paramStr,
                        null,
                        null,
                        "get"
                    ).then(
                        res => {
                            //   debugger
                            this.payStatusNow = res.status;
                            console.log(this.payStatusNow);
                            if (res.status == 0) {
                                console.log(res);
                                this.tradeNo = res.tradeNo;
                                clearInterval(this.intervalid2);
                                this.bindData();
                            } else {
                                if (res.status != 1) {
                                    throw new Error(res.message);
                                }
                            }
                        },
                        err => {
                            //   debugger
                            clearInterval(this.intervalid2);
                        }
                    );
                } catch (error) {
                }
            }
        },
        async created() {

            this.moment = window.moment;

            this.bindData();

            try {
                var res = await APIService("refund/getOrderGet.do", {
                    orderId: this.$route.query.orderId
                });

                if(res.order.tickets!=null&&res.order.tickets.length>0&&res.order.tickets[0].passengers!=null&&res.order.tickets[0].passengers.length>0)
                
                {
                    
                    let ticketPassengers = res.order.tickets[0].passengers;
                    for (let psg of res.order.passengers) {
                        for (let tpsg of ticketPassengers) {
                            if (psg.name === tpsg.name) {
                                psg.newTicketNo = tpsg.ticketNo;
                                psg.newPNR = tpsg.pnr;
                                break;
                            }
                  
                        }
         
                    }                
                }
                else
                {
                    res.order.passengers.forEach(function (item) {
                        item.newTicketNo = undefined;
                        item.newPNR = undefined;
                    });

                }



                // debugger
                this.answer = res.order.answer;
                this.orderId = res.orderId;
                this.tabledata = res.order;
                this.segments = res.order.segments;
                this.passengers = res.order.passengers;
                this.contact = res.order.contact;
                this.reason = res.order.reason;
                this.expiryTime = this.answer.expiryTime;





                //this.expiryTime="2018-01-06 12:00:00"
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
                    this.mainStatusCn = "改期申请中";
                }
                else if (this.tabledata.mainStatus == 2) {
                    this.mainStatusCn = "改期待确认";
                } else if (this.tabledata.mainStatus == 3) {
                    this.mainStatusCn = "改期已确认";
                } else if (this.tabledata.mainStatus == 4) {
                    this.mainStatusCn = "改期已取消";
                } else if (this.tabledata.mainStatus == 6) {
                    this.mainStatusCn = "改期已完成";
                }

                //支付金额
                var payAmount = ((this.tabledata.sourceAdultPrice + this.tabledata.sourceAdultTax) * this.tabledata.adultNumber) + ((this.tabledata.sourceChildPrice + this.tabledata.sourceChildTax) * this.tabledata.childNumber)
                this.payAmount = (payAmount).toFixed(2);

                if (this.reason != null) {
                    this.reason.subType = subTypeCN(Number(this.reason.subType))
                }


                 this.moment1 = window.moment;

 /*--------------------   原始订单---------------------              */

                var res = await APIService('/user/getOrderDetails.do', {orderId: this.tabledata.sourceOrderId});

                if (res.order.saleType == 1) {
                    this.isShopingOrder = true;
                }
                if (res.order.saleType == 2) {
                    this.isRTPNROrder = true;
                }

                this.tabledata1 = res.order;
                this.segments1 = res.order.segments.map(e=>Object.assign({
                    newDepDatetime: '',
                    newFlightNumber: '',
                    newCabin: ''
                },e));

                this.passengers1 = res.order.passengers;

                //支付状态
                if (this.tabledata1.paymentType == 1) {
                    this.paymentTypeCn1 = "预付款";
                } else if (this.tabledata1.paymentType == 2) {
                    this.paymentTypeCn1 = "授信";
                } else if (this.tabledata1.paymentType == 3) {
                    this.paymentTypeCn1 = "支付宝";
                } else if (this.tabledata1.paymentType == 4) {
                    this.paymentTypeCn1 = "代扣";
                }

                //订单状态

                switch (this.tabledata1.mainStatus) {
                    case 0:
                        this.mainStatusCn1 = "无效";
                        break;
                    case 1:
                        this.mainStatusCn1 = "生单失败";
                        break;
                    case 2:
                        this.mainStatusCn1 = "待支付";
                        break;
                    case 3:
                        this.mainStatusCn1 = "待出票";
                        break;
                    case 4:
                        this.mainStatusCn1 = "已出票";
                        break;
                    case 5:
                        this.mainStatusCn1 = "已取消";
                        break;
                }
                //支付金额
                var payAmount1 = ((this.tabledata1.adultPrice + this.tabledata1.adultTax) * this.tabledata1.adultNumber) + ((this.tabledata1.childPrice + this.tabledata1.childTax) * this.tabledata1.childNumber)
                this.payAmount1 = (payAmount1).toFixed(2);

                //  非自愿类型
                     if(this.reason!=null){
                    this.reason.subType=subTypeCN(Number(this.reason.subType))
                }
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


            this.intervalid1 = setInterval(() => {
                if (this.expiryTime != null) {
                    this.remainingTimeStr = getTimeStr(this.expiryTime, new Date());
                    if (this.remainingTimeStr == "") {
                        clearInterval(this.intervalid1);
                    }
                }
            }, 1000);

            if (is_success == "T") {

                this.intervalid2 = setInterval(() => {
                    this.paymentSerivce();
                }, 5 * 1000);

            } else if (is_success != null) {
                this.$message.error("支付失败");
            }

        },
        beforeDestroy() {
            clearInterval(this.intervalid1);
            clearInterval(this.intervalid2);
        }
    }


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

<style >
    #answer-remark {
        width: 313px;
    }

    .order_search>.el-row>.el-col>.el-input {
        width: 220px !important ;
        vertical-align: middle;
     
    }
    .order_search>.el-row>.el-col>.el-input>input{
        padding-right:0 !important;
    }
    /* .lookAttachments:hover .lookAttachments>a{
        color:red;
    } */
    .lookAttachments>a:hover{
       color: #67c23a !important;
    }
    .newPriceTotil1  input{
        width:163px;
    }
</style>
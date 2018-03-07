<template>
    <div class="bgColor">
        <div class="container">
            <!-- 订单信息 -->
            <el-card class="box-card">
                <header>订单信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>订单号：</span>
                            <el-input size="small" v-model="tabledata.orderId" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>预订时间：</span>
                            <el-input size="small" v-model="tabledata.bookingTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付方式：</span>
                            <el-input size="small" :value="paymentTypeCn" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>PNR：</span>
                            <el-input size="small" v-model="tabledata.pnr" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付时间：</span>
                            <el-input size="small" v-model="tabledata.paymentTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付金额：</span>
                            <el-input size="small" :value="payAmount" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>订单状态：</span>
                            <el-input size="small" :value="mainStatusCn" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>出票时间：</span>
                            <el-input size="small" v-model="tabledata.ticketTime" :readonly="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>支付流水号：</span>
                            <el-input size="small" v-model="tabledata.paymentVoucher" :readonly="true"></el-input>
                        </el-col>

                    </el-row>

                </div>
            </el-card>
            <!-- 选择废票航班 -->
            <el-card class="box-card">
                <header>选择废票航班</header>
                <div class="range_info">

                    <el-table ref="multipleTable" :data="segments" tooltip-effect="dark" style="width: 100%"
                              @selection-change="handleSelectionChange"
                              @select="selectSegments">

                        <el-table-column type="selection" width="40"></el-table-column>

                        <el-table-column label="航班号" prop="flightNumber">
                        </el-table-column>

                        <el-table-column label="出发机场" prop="depAirport">
                               <template scope="scope">
                                 <span>{{scope.row.depAirport}}{{scope.row.depAirportCN}}</span> 
                              </template> 
                             
                        </el-table-column>

                        <el-table-column label="到达机场" prop="arrAirport">
                               <template scope="scope">
                                 <span>{{scope.row.arrAirport}}{{scope.row.arrAirportCN}}</span> 
                              </template>  
                        </el-table-column>

                        <el-table-column label="起飞时间" prop="depDatetime">
                            <template scope="scope">
                                <div>
                                    <label>{{moment(scope.row.depDatetime).format("YYYY-MM-DD")}}</label>
                                    <br/>
                                    <label>{{moment(scope.row.depDatetime).format("HH:mm")}}</label>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="到达时间" prop="arrDatetime">
                            <template scope="scope">
                                <div>
                                    <label>{{moment(scope.row.arrDatetime).format("YYYY-MM-DD")}}</label>
                                    <br/>
                                    <label>{{moment(scope.row.arrDatetime).format("HH:mm")}}</label>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="飞行时长" prop="duration">
                        </el-table-column>

                        <el-table-column label="去程/回程" prop="itineraryIndex">
                            <template scope="scope">
                                <label v-if="scope.row.itineraryIndex==1">去程</label>
                                <label v-if="scope.row.itineraryIndex==2">回程</label>
                            </template>
                        </el-table-column>

                    </el-table>

                </div>
            </el-card>
            <!-- 选择废票乘客 -->
            <el-card class="box-card">
                <header>选择废票乘客</header>
                <div class="passenger_info">

                    <el-table ref="multipleTable" :data="passengers" tooltip-effect="dark" style="width: 100%"
                              @selection-change="handleSelectionChange1"
                              @select="selectPassengers">
                        <el-table-column type="selection" width="55"></el-table-column>

                        <el-table-column label="姓名" prop="name">
                        </el-table-column>
                        <el-table-column label="乘客类型" prop="ageType" width="80">
                            <template scope="scope">
                                <label v-if="scope.row.ageType==0">成人</label>
                                <label v-if="scope.row.ageType==1">儿童</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" prop="gender" width="50">
                            <template scope="scope">
                                <label v-if="scope.row.gender=='M'">男</label>
                                <label v-if="scope.row.gender=='F'">女</label>
                            </template>
                        </el-table-column>

                        <el-table-column label="出生日期" prop="birthday">
                        </el-table-column>
                        <el-table-column label="国籍" prop="nationality" width="80">
                              <template scope="scope">
                                 <span class="upper">{{getCountryNameByCode(scope.row.nationality)}}</span>
                              </template> 
                        </el-table-column>
                        <el-table-column label="证件类型" prop="cardType" width="80">
                            <template scope="scope">
                                <label v-if="scope.row.cardType=='PP'">护照</label>
                                <label v-if="scope.row.cardType=='GA'">港澳通行证</label>
                                <label v-if="scope.row.cardType=='TW'">台湾通行证</label>
                                <label v-if="scope.row.cardType=='TB'">台胞证</label>
                                <label v-if="scope.row.cardType=='HX'">回乡证</label>
                                <label v-if="scope.row.cardType=='HY'">国际海员证</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="证件号" prop="cardNum" width="100">
                        </el-table-column>
                        <el-table-column label="证件签发地" prop="cardIssuePlace" width="120">
                              <template scope="scope">
                                 <span class="upper">{{getCountryNameByCode(scope.row.cardIssuePlace)}}</span>
                              </template> 
                        </el-table-column>
                        <el-table-column label="证件有效期" prop="cardExpired">
                        </el-table-column>
                        <el-table-column label="票号" prop="ticketNo">
                            <template scope="scope">
                                <div v-for="ticket in scope.row.tickets" :key="ticket.ticketNo">
                                    <span>{{ticket.ticketNo}}</span>
                                </div>
                            </template>
                        </el-table-column>

                    </el-table>

                </div>
            </el-card>
            <!-- 联系人信息 -->
            <el-card class="box-card">
                <header>联系人信息</header>
                <div class="order_search">
                    <el-row>
                        <el-col :span="8">
                            <span>联系人:</span>
                            <el-input size="small" v-model="tabledata.contactName"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>联系方式:</span>
                            <el-input size="small" v-model="tabledata.contactMobile"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮箱:</span>
                            <el-input size="small" v-model="tabledata.contactEmail"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>邮编:</span>
                            <el-input size="small" v-model="tabledata.contactPostcode"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span>地址:</span>
                            <el-input size="small" v-model="tabledata.contactAddress"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!-- 废票信息 -->
            <el-card class="box-card">
                <header>废票信息</header>
                <div class="memo_info">
                    <el-row>
                        <el-col :span="4">
                            <span>&nbsp;</span>
                        </el-col>
                        <el-col :span="20">
                            <el-radio-group v-model="reason.type" @change="isVoluntarilyCheck">
                                <el-radio :label="1">自愿</el-radio>
                                <el-radio :label="2">非自愿</el-radio>
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
                                    <el-select size="small" v-model="reason.subType">
                                        <el-option label="航变" :value="1"></el-option>
                                        <el-option label="孕退" :value="2"></el-option>
                                        <el-option label="病退" :value="3"></el-option>
                                        <el-option label="拒签" :value="4"></el-option>
                                        <el-option label="死亡" :value="5"></el-option>
                                        <el-option label="其他" :value="6"></el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="4">
                                    <span>非自愿证明</span>
                                </el-col>
                                <el-col :span="20">
                                    <el-upload class="upload-demo"
                                               ref="upload" action="#" :on-remove="uploadRemove"
                                               :on-change="uploadChange"
                                               :file-list="fileList1"
                                               :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="text">选取文件</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且单个文件大小不超过500kb</div>
                                    </el-upload>

                                </el-col>

                            </div>
                        </el-col>


                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <span>备注</span>
                        </el-col>
                        <el-col :span="20">
                            <el-input type="textarea" v-model="reason.remark"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <!-- 提交 -->
            <el-card class="box-card">
                <div>
                    <el-row>
                        <el-col :span="8" :offset="14">
                            <el-button type="warning" style="float:right;" @click="closePage">关闭
                            </el-button>
                            <el-button type="warning" style="float:right; margin-right:15px;"
                                       @click="submitApplication">提交
                            </el-button>

                        </el-col>
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
                tabledata: {},
                paymentTypeCn: '',
                mainStatusCn: '',
                passengers: [],
                passengersList: [],
                contact: {},
                reason: {attachments: [], type: 1, subType: undefined, remark: undefined},
                segments: [],
                segmentsList: [],
                radio: '1',
                textarea: '',
                fileList: [],
                fileList1: [],
                chooseRefund_flight_Table: [],
                chooseRefund_passenger_Table: [],
                form: {
                    contactName: undefined,
                    contactNumber: undefined,
                    contactEmail: undefined
                },
                rules: {
                    contactName: [
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    contactNumber: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'}
                    ]
                },
                refundTicket: {
                    isVoluntarily: 0,
                    Involuntary: "XXX",
                    remarks: "XXX",
                    involuntaryProof: "XXX"
                },
                isShow: false,
                payAmount: undefined
            }

        },
        methods: {

            /**
             * 上传文件移除
             */
            uploadRemove(file,fileList){

            },
            /**
             * 文件选择
             */
            uploadChange(file,fileList) {
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

                if( isJPG && isLt500KB){
                    return true;
                }
                fileList.splice(fileList.indexOf(file),1);
            },

            handleSelectionChange(val) {

                this.segmentsList = this.segments;
                this.multipleSelection = val;
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
            handleSelectionChange1(val) {

                this.passengersList = this.passengers;
                this.multipleSelection = val;

            },
            async submitApplication() {
                try {

                    const _self = this;

                    if (_self.segmentsList.length == 0) {
                        _self.$message({
                            message: "请选择废票航班",
                            type: 'error'
                        });
                        return false;
                    }
                    if (_self.passengersList.length == 0) {
                        _self.$message({
                            message: "请选择废票乘客",
                            type: 'error'
                        });
                        return false;
                    }

                    if (this.tabledata.contactName == undefined || this.tabledata.contactName == "" || this.tabledata.contactMobile == undefined || this.tabledata.contactMobile == "") {
                        _self.$message({
                            message: "联系人姓名和联系方式必填",
                            type: 'error'
                        });
                        return false;
                    }
                    if (this.reason.type == 2 && (this.reason.subType == undefined || this.reason.remark == undefined || this.reason.remark == "")) {
                        _self.$message({
                            message: "非自愿类型和备注必填",
                            type: 'error'
                        });
                        return false;
                    }


                    let formData = new FormData();
                    this.contact = {
                        "address": this.tabledata.contactAddress,
                        "email": this.tabledata.contactEmail,
                        "mobile": this.tabledata.contactMobile,
                        "name": this.tabledata.contactName,
                        "postcode": this.tabledata.contactPostcode

                    }
                    // debugger
                    this.$refs.upload.uploadFiles.forEach(item => {
                        // debugger
                        formData.append(item.name, item.raw);
                    });
                    let requestObject = {
                        sourceOrderId: this.$route.query.orderId,
                        passengers: this.passengersList,
                        segments: this.segmentsList,
                        contact: this.contact,
                        reason: this.reason,
                        refundType: 3

                    };
                    formData.append("data", JSON.stringify(requestObject));

                    $.ajax({
                        type: 'POST',
                        url: '/refund/refundApply.do',
                        data: formData,
                        processData: false,
                        contentType: false
                    }).then(function (data) {
                        if (data.success) {
                            _self.$message({
                                message: '废票申请成功',
                                type: 'success'
                            });
                            var refundOrderId = data.orderId
                            _self.$router.push({
                                path: '/disillusionedResult',
                                replace: true,
                                query: {orderId: refundOrderId}
                            });
                        }
                        else {
                            _self.$message({
                                message: data.errorMsg,
                                type: 'error'
                            });
                        }

                    }).catch(function (err) {
                        throw new Error("错误")
                    });

                } catch (error) {

                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

            },
            isVoluntarilyChange() {

                if (this.refundTicket.isVoluntarily == 1) {
                    this.isShow = true;
                }
                else {
                    this.isShow = false;
                }

            },
            closePage() {
                this.$router.push({path: '/orderList'})

            },
            isVoluntarilyCheck() {

                if (this.reason.type == 1) {
                    this.isShow = false;
                }

                else {
                    this.isShow = true;
                }

            },
            selectSegments(selection, row) {
                this.segmentsList = selection;
            },
            selectPassengers(selection, row) {
                this.passengersList = selection;
            }
        },

        async created() {
            try {

                this.moment = window.moment;

                var res = await APIService('user/getOrderDetails.do', {orderId: this.$route.query.orderId});

                this.tabledata = res.order;
                this.segments = res.order.segments;
                this.passengers = res.order.passengers;

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

                switch (this.tabledata.mainStatus){
                    case 0:
                        this.mainStatusCn = "无效";
                        break;
                    case 1:
                        this.mainStatusCn = "生单失败";
                        break;
                    case 2:
                        this.mainStatusCn = "待支付";
                        break;
                    case 3:
                        this.mainStatusCn = "待出票";
                        break;
                    case 4:
                        this.mainStatusCn = "已出票";
                        break;
                    case 5:
                        this.mainStatusCn = "已取消";
                        break;
                }

                //支付金额
                var payAmount = ((this.tabledata.adultPrice + this.tabledata.adultTax) * this.tabledata.adultNumber) + ((this.tabledata.childPrice + this.tabledata.childTax) * this.tabledata.childNumber)
                this.payAmount = (payAmount).toFixed(2);

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

        }

    }

</script>

<style>
    .order_search > .el-row > .el-col > .el-input {
        width: 200px !important;
        vertical-align: middle;
    }
</style>

<template>
    <div id="prepayRecord" class="orderListHtml">
        <leftMenu></leftMenu>
        <div class="container">
            <el-card>
                <header>预付款管理</header>
            </el-card>
            <el-card>
                <el-row :gutter="20" class="refund_search_row" v-if="pageReadyData.hasOwnProperty('alert')">
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span style="width:60px;">公司名称:</span>
                            <label v-if="pageReadyData.companyName != null">-</label>
                            <label v-else>{{pageReadyData.companyName}}</label>
                           
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span style="width:60px;">可用余额:</span>
                            {{pageReadyData.deportBalance}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span style="width:60px;">充值总额:</span>
                            {{pageReadyData.deportRechargeAmount}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>余额提醒阈值:</span>
                            {{pageReadyData.alert.balanceThreshold}}
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple request">
                            <span>余额提醒手机号:</span>
                            <span class="longWord">{{pageReadyData.alert.alertPhone}}</span>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple request">
                            <span>余额提醒邮箱:</span>
                            <span class="longWord">{{pageReadyData.alert.alertEmail}}</span>
                         
                        </div>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <label>未设置预付款信息！</label>
                </el-row>
            </el-card>
            <el-card>
                <el-row :gutter="20" class="refund_search_row">

                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>充值/提现时间段:</span>
                            <el-date-picker v-model="orderquest.datetime" type="daterange"
                                            class="timeChoose"
                                            placeholder="选择日期" size="small">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>充值/提现状态:</span>
                            <el-select v-model="orderquest.status" filterable clearable placeholder="请选择" size="small">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="待确认" value="1"></el-option>
                                <el-option label="已确认" value="2"></el-option>
                                <el-option label="驳回" value="3"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>预计款流水号:</span>
                            <el-input size="small" v-model="orderquest.billingId"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="12" style="margin-top:20px">
                        <el-button style="float: left;margin-right:35px;" @click="Withdrawals" type="warning"
                                   size="small">提现
                        </el-button>
                        <el-button style="float: left;margin-right:35px;" @click="gotorecharging" type="warning"
                                   size="small">充值
                        </el-button>

                        <el-button style="float: left;margin-right:20px;" size="small" type="info"
                                   @click="prepayRecordbtn()">预付款设置
                        </el-button>
                    </el-col>
                    <el-col :span="12" style="margin-top:20px;">
                        <div>
                            <el-button style="float: right;margin-right:35px;" @click="getBtnQuery(true)" type="primary"
                                       size="small">查询
                            </el-button>

                        </div>

                    </el-col>
                </el-row>

            </el-card>
            <el-card>
                <div class="passenger_info">

                    <el-table :data="tabledata1" type="expand" border style="width: 100%">
                        <el-table-column type="index" width="50" label="序号">

                        </el-table-column>
                        <el-table-column label="预付款流水号" property="billingId">
                        </el-table-column>

                        <el-table-column label="预付款变动类型" property="accountType">
                            <template scope="scope">
                                <label v-if="scope.row.accountType==1">充值</label>
                                <label v-else-if="scope.row.accountType==2">提现</label>
                                <label v-else-if="scope.row.accountType==3">授信还款</label>
                                <label v-else>未知</label>
                            </template>
                        </el-table-column>

                        <el-table-column label="充值/提现时间" property="applyTime">
                        </el-table-column>

                        <el-table-column label="充值/提现金额">
                            <template scope="scope">
                                <label><i v-if="[2].indexOf(scope.row.accountType)>-1">- </i>{{scope.row.price}}</label>
                            </template>
                        </el-table-column>

                        <el-table-column label="充值凭证数量" property="attachmentCount">
                        </el-table-column>

                        <el-table-column label="充值/提现反馈时间" property="confirmTime">
                        </el-table-column>

                        <el-table-column label="拒回原因" property="message" width="90px">

                            <template scope="scope">
                                <el-popover
                                        placement="top"
                                        title="拒回原因"
                                        width="150px"
                                        trigger="hover"
                                        :content="scope.row.message||'无内容'">
                                    <el-button type="text" slot="reference">查看详细</el-button>
                                </el-popover>
                            </template>

                        </el-table-column>

                        <el-table-column label="充值状态" property="" width="120px">

                            <template scope="scope">


                                <div class="order_status_btn">
                                    <label v-if="scope.row.status==1">待确认</label>
                                    <label v-if="scope.row.status==2">已确认</label>
                                    <label v-if="scope.row.status==3">驳回</label>
                                </div>
                            </template>

                        </el-table-column>

                    </el-table>

                    <div class="block" style="float: right;margin: 15px 0;">

                        <el-pagination @current-change="handleCurrentChange"
                                       @size-change="handleSizeChange"
                                       :current-page="pageIndex"
                                       :page-size="pageSize"
                                       :page-sizes="[10, 20, 50, 100]"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="totalRows">
                        </el-pagination>
                    </div>

                </div>
            </el-card>

        </div>

        <!--预付款设置-->    
        <el-dialog title="预付款设置" :visible.sync="prepayRecordTable" size="small" id="prepayRecordTable">
            <el-card>
                <header>授信设置</header>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content request creditSetting">
                            <span>额度不足预警阈值</span>
                            <el-input size="small" type="number" v-model.trim.number="alert.balanceThreshold"></el-input>
                            <span style="width: 280px;font-size: 12px;">不填或填非正数将会设置提醒额度为:<b>1000</b></span>
                        </div>

                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content  request creditSetting">
                            <span>额度不足预警邮箱</span>
                            <el-input size="small" v-model="alert.alertEmail"></el-input>
                            <span style="width: 280px;font-size: 12px;">多个用英文逗号分开</span>
                        </div>

                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content request creditSetting">
                            <span>额度不足预警手机号</span>
                            <el-input size="small" v-model="alert.alertPhone"></el-input>
                            <span style="width: 280px;font-size: 12px;">多个用英文逗号分开</span>
                        </div>

                    </el-col>
                </el-row>

            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="prepayRecordTable = false">取 消</el-button>
                <el-button type="primary" @click="savePrepayRecord()">确 定</el-button>
            </span>
        </el-dialog>

        <!--充值-->
        <el-dialog title="充值" :visible.sync="rechargingTable" size="small">
            <div class="rechargingDiv">
                <div class="rechargingDiv_div">
                    <span>公司名称：</span>
                    <el-input :readonly="true" size="small" v-model="userName"></el-input>
                </div>
                <div class="rechargingDiv_div">
                    <span>付款账号：</span>
                    <el-input size="small" :readonly="true" v-model="userName"></el-input>
                </div>
                <div class="rechargingDiv_div">
                    <span>充值金额：</span>
                    <el-input size="small" type="number" v-model.trim.number="chargingRequest.depositPrice"></el-input>
                </div>
                <div class="rechargingDiv_div">
                    <span>上传凭证：</span>

                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            multiple
                            action="/"
                            accept="image/jpeg"
                            :file-list="fileList"
                            :on-remove="uploadRemove"
                            :on-change="uploadChange"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rechargingTable = false">取 消</el-button>
                <el-button type="primary" :disabled="(Number(chargingRequest.depositPrice)||0)==0" @click="rechargingTable = false;rechargingBtn()">确认充值</el-button>
            </span>
        </el-dialog>

        <!-- 还款成功 -->
        <el-dialog title="提示" :visible.sync="rechargeReview" size="small">
            <h2>添加预付款成功，请等待确认</h2>
            <el-button type="primary">返回充值记录</el-button>

        </el-dialog>

        <!--提现-->
        <el-dialog title="提现" :visible.sync="withdrawingTable" size="small">
            <div class="withdrawingDiv">
                <div class="withdrawingDiv_div">
                    <span>公司名称：</span>
                    <el-input :readonly="true" size="small" v-model="userName"></el-input>
                </div>
                <div class="withdrawingDiv_div">
                    <span>付款账号：</span>
                    <el-input size="small" :readonly="true" v-model="userName"></el-input>
                </div>
                <div class="withdrawingDiv_div">
                    <span>预存款：</span>
                    <el-input size="small" :readonly="true" v-model="pageReadyData.deportBalance"></el-input>
                </div>
                <div class="withdrawingDiv_div">
                    <span>溢缴款：</span>
                    <el-input size="small" :readonly="true" v-model="pageReadyData.creditDeportBalance"></el-input>
                </div>
                <div class="withdrawingDiv_div">
                    <span>可提现金额：</span>
                    <el-input size="small" :readonly="true" v-model="pageReadyData.drawithTotalPrice "></el-input>
                </div>
                <div class="withdrawingDiv_div">
                    <span>申请提现金额：</span>
                    <el-input size="small" type="number" v-model.trim.number="withdrawingRequest.depositPrice"></el-input>
                    <label>优先提现预存款</label>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="withdrawingTable = false">取 消</el-button>
                <el-button type="primary" :disabled="(Number(withdrawingRequest.depositPrice)||0)==0" @click="withdrawingTable = false;WithdrawalsConfirm()">确认提现</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";

    export default {
        data() {
            return {
                userName: undefined,

                chargingRequest: {
                    accountType: 1,
                    companyName: undefined,
                    paymentAccount: undefined,
                    billingId: undefined,
                    depositPrice: 0,
                },

                pageReadyData: {},
                rechargingRequest: {},
                prepayRecordTable: false,
                rechargingTable: false,
                rechargeReview: false,
                withdrawingTable: false,

                orderquest: {
                    datetime: [],
                    status: undefined,
                    billingId: undefined

                },
                fileList: [],
                fileList1: [],
                tabledata1: [],
                alert: {
                    payType: 1,
                    alertPhone: undefined,
                    alertEmail: undefined,
                    balanceThreshold: undefined
                },
                withdrawingRequest: {
                    accountType: 2,
                    companyName: undefined,
                    paymentAccount: undefined,
                    creditPrice: undefined,
                    depositPrice: 0,
                },
                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10
            };
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
            /**
             *  预付款设置窗口
             */
            async prepayRecordbtn(isBtn) {

                this.prepayRecordTable = true;
                try {
                    let res = await requestAPIServiceAsync("/accounting/creditChangeOfGetAlert.do", {payType: 1});
                    this.alert = res.alert;

                } catch (error) {

                }
            },
            /**
             * 提现
             */
            Withdrawals() {
                try {

                    this.withdrawingTable = true;
                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }

            },
            /**
             * 预付款设置确认
             */
            async savePrepayRecord() {
                // debugger;
                try {
                    const requestObj = Object.assign({}, this.alert);
                    if (requestObj.balanceThreshold == undefined ||
                        requestObj.balanceThreshold.length < 1 ||
                        isNaN(Number(requestObj.balanceThreshold)) ||
                        parseFloat(requestObj.balanceThreshold) < 0) {
                        requestObj.balanceThreshold = 1000;
                    }
                    if(requestObj.alertPhone!=undefined && requestObj.alertPhone.length>0){
                        let phones=requestObj.alertPhone.split(',');
                        for(let item of phones){
                            if(!(/^((13[0-9]{1})|159|153|185|170|186)+\d{8}$/.test(item))){
                                throw  new  Error("存在手机号码格式不正确");
                            }
                        }
                    }
                    if(requestObj.alertEmail!=undefined && requestObj.alertEmail.length>0){
                        let emails=requestObj.alertEmail.split(',');
                        const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        for(let item of emails){
                            if(!myreg.test(item)){
                                throw new  Error("存在邮箱信息不正确");
                            }
                        }
                    }

                    await requestAPIServiceAsync("/accounting/creditChangeOfSetAlert.do", {alert: requestObj});
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.prepayRecordTable = false;
                    this.getPageReadyData();

                } catch (error) {
                    //debugger
                    this.$message.error(error.message||error.errorMsg || error.statusText);
                    return false;
                }
            },
            /**
             * 提现确认
             */
            async WithdrawalsConfirm() {
                try {
                    let requestObj = Object.assign({}, this.withdrawingRequest);
                    if (isNaN(Number(requestObj.depositPrice))) {
                        requestObj.depositPrice = 0;
                    }
                    requestObj.depositPrice = Number(requestObj.depositPrice);

                    if (requestObj.depositPrice == 0) {
                        throw  new Error("提现金额不能为零!")
                    }

                    await requestAPIServiceAsync("/accounting/creditSettlementOfRechage.do", requestObj);
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });

                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }
            },
            /**
             * 去充值
             */
            async gotorecharging() {
                this.rechargingTable = true;
            },
            /**
             * 确认充值
             */
            async rechargingBtn() {
                try {
                    //debugger;
                    let _self = this;
                    let requestObj = Object.assign({}, this.chargingRequest);
                    if (isNaN(Number(requestObj.depositPrice))) {
                        requestObj.depositPrice = 0;
                    }
                    requestObj.depositPrice = Number(requestObj.depositPrice);

                    if (requestObj.depositPrice == 0) {
                        throw  new Error("充值金额不能为零!")
                    }

                    let formData = new FormData();
                    this.$refs.upload.uploadFiles.forEach(item => {
                        formData.append(item.name, item.raw);
                    });
                    for (let item in requestObj) {
                        formData.append(item, requestObj[item]);
                    }

                    let oReq = new XMLHttpRequest();
                    oReq.open("POST", "/accounting/creditSettlementOfRechage.do", true);
                    oReq.onload = function (oEvent) {

                        if (oReq.status === 200) {

                            const res = JSON.parse(oReq.response);
                            if (!res.success) {
                                _self.$message.error(res.errorMsg);
                            }
                            _self.$message({
                                message: '保存成功',
                                type: 'success'
                            });

                            _self.getBtnQuery();

                        } else {
                            throw  new Error("错误")
                        }
                    };
                    oReq.send(formData);

                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }
            },
            /**
             * 查询事件
             */
            async getBtnQuery(isBtn) {
                // debugger;

                try {

                    let requestObj = Object.assign({}, this.orderquest);

                    requestObj.startDate = "";
                    requestObj.endDate = "";

                    if (requestObj.datetime instanceof Array && requestObj.datetime.length > 1) {
                        requestObj.startDate = moment(requestObj.datetime[0]).format("YYYY-MM-DD 00:00:00");
                        requestObj.endDate = moment(requestObj.datetime[1]).format("YYYY-MM-DD 23:59:59");
                    }
                    requestObj.pageIndex = this.pageIndex;
                    requestObj.pageSize = this.pageSize;
                    delete  requestObj.datetime;

                    let res = await requestAPIServiceAsync("/accounting/rechargingList.do", requestObj);

                    this.tabledata1 = res.recharges;
                    this.totalRows = res.totalRow;
                    this.totalPages = res.totalPage;

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },
            /**
             *分页事件
             */
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getBtnQuery();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getBtnQuery();
            },
            /**
             * 获取页面初始化数据
             */
            async getPageReadyData() {

                try {
                    let res = await requestAPIServiceAsync("/accounting/depositGetAlert.do", {});
                    this.pageReadyData = res.deposit;
                    this.pageReadyData.drawithTotalPrice = (Number(res.deposit.creditDepositBalance) || 0) + (Number(res.deposit.depositBalance) || 0);
                    this.userName = res.userName;
                } catch (error) {
                    //取消初始页面公司信息弹出错误
                    //this.$message.error(error.message||error.errorMsg || error.statusText);
                }
            }
        },
        async mounted() {
            this.getBtnQuery();
            this.getPageReadyData();
        }
    };
</script>

<style scoped>
    #prepayRecord {
        min-height: 750px;
    }

    .prepayRecord_header > .el-card__body {
        padding: 5px 20px;
    }

    #orderDetailsShow .el-dialog {
        width: 1140px;
    }

    .refund_search_row .el-input {
        width: 200px;
    }

    .el-card__body {
        font-size: 10px;
    }

    .request > span {
        display: inline-block;
        width: 115px;
        text-align: right;
    }

    #prepayRecordTable > .el-dialog {
        width: 640px !important;
    }

    #prepayRecordTable > .el-dialog .el-card__body {
        padding-left: 65px;
    }

    .grid-content,
    .bg-purple {
        margin-top: 10px !important;
    }

    .refundStatus_btn {
        margin: 0 auto;
        width: 100px;
        text-align: center;
        background: #ffc145;
        color: #fff;
        border-radius: 8px;
    }

    #orderDetailsPrice .el-col-4 {
        text-align: center;
    }

    .timeChoose {
        width: 230px !important;
    }

    .passenger_info > .el-table th {
        text-align: left;
        background: #ff9933;
        color: #fff;
    }

    .creditSetting .el-input {
        width: 220px;
    }

    .creditSetting span {
        width: 140px;
    }

    .rechargingDiv_div {
        margin-top: 20px;
    }

    .rechargingDiv_div span {
        display: inline-block;
        width: 160px;
        text-align: right;
    }

    .rechargingDiv_div .el-input {
        width: 220px;
    }

    .rechargingDiv_btn {
        text-align: center;
        padding: 20px;
    }

    .withdrawingDiv_div {
        margin-top: 20px;
    }

    .withdrawingDiv_div span {
        display: inline-block;
        width: 160px;
        text-align: right;
    }

    .withdrawingDiv_div .el-input {
        width: 160px;
    }

    .withdrawingDiv_btn {
        text-align: center;
        padding: 20px;
    }

    .upload-demo {
        width: 300px;
        margin-left: 165px;
    }

</style>

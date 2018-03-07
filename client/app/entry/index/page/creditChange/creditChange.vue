<template>
    <div id="orderList" class="orderListHtml">
        <leftMenu></leftMenu>
        <div class="container">
            <el-card>
                <header>授信变动管理</header>
            </el-card>

            <el-card>
                <el-row :gutter="20" class="refund_search_row">
                    <el-col :span="12">
                        <div class="grid-content bg-purple request">
                            <span>授信变动时间段:</span>
                            <el-date-picker v-model="orderquest.creditStartAndEndDate" type="daterange"
                                            class="timeChoose"
                                            placeholder="选择日期" size="small">

                            </el-date-picker>
                        </div>
                    </el-col>


                    <el-col :span="12">
                        <div class="grid-content bg-purple request">
                            <span>收支类型：</span>
                            <el-select v-model="orderquest.accountType" filterable placeholder="请选择" size="small">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="充值" value="1"></el-option>
                                <el-option label="提现" value="2"></el-option>
                                <el-option label="结算收款" value="3"></el-option>
                                <el-option label="购票支付" value="4"></el-option>
                                <el-option label="改期支付" value="5"></el-option>
                                <el-option label="辅营项目支付" value="6"></el-option>
                                <el-option label="退废收款" value="7"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple request">
                            <span>平台订单号:</span>
                            <el-input size="small" v-model="orderquest.orderId"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content bg-purple request">
                            <span>PNR:</span>
                            <el-input size="small" v-model="orderquest.pnr" style="width:196px"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="8" v-if="false">
                        <div class="grid-content bg-purple request">
                            <span>代理商订单号</span>
                            <el-input size="small" v-model="orderquest.agentOrderId"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="16" :offset="8" style="margin-top:20px;">
                        <div>

                            <el-button style="float: right;margin-right:35px;" size="small" @click="exportExcel()">导出
                            </el-button>

                            <el-button style="float: right;margin-right:20px;" size="small" type="primary"
                                       @click="creditChangeBtn(true)">

                                查询
                            </el-button>
                            <el-button type="primary" style="float: right;margin-right:20px;" size="small"
                                       @click="creditSetting">
                                授信设置
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
                        <el-table-column label="平台订单号" prop="orderId">

                        </el-table-column>

                        <el-table-column label="代理商订单号" prop="buyerOrderId">
                        </el-table-column>

                        <el-table-column label="PNR" prop="pnr">
                        </el-table-column>

                        <el-table-column label="支付类型" prop="payType">
                            <template scope="scope">
                                <label v-if="scope.row.payType==1">预付款</label>
                                <label v-else-if="scope.row.payType==2">授信</label>
                                <label v-else-if="scope.row.payType==3">支付宝扫码</label>
                                <label v-else>未知状态</label>
                            </template>
                        </el-table-column>

                        <el-table-column label="收支类型" prop="accountType">
                            <template scope="tabledata1">
                                <label v-if="tabledata1.row.accountType ==1">充值</label>
                                <label v-if="tabledata1.row.accountType ==2">提现</label>
                                <label v-if="tabledata1.row.accountType ==3">结算收款</label>
                                <label v-if="tabledata1.row.accountType ==4">购票支付</label>
                                <label v-if="tabledata1.row.accountType ==5">改期支付</label>
                                <label v-if="tabledata1.row.accountType ==6">辅营项目支付</label>
                                <label v-if="tabledata1.row.accountType ==7">退废收款</label>

                            </template>

                        </el-table-column>

                        <el-table-column label="授信总额" prop="sxze">

                        </el-table-column>

                        <el-table-column label="支付消耗额度" prop="zfje">
                        </el-table-column>

                        <el-table-column label="收款恢复额度" prop="skje">
                        </el-table-column>

                        <el-table-column label="授信变动时间" prop="createtime" width="96">
                        </el-table-column>

                        <el-table-column label="剩余授信额度" prop="sysxed">
                        </el-table-column>

                        <el-table-column label="溢缴款"  prop="yjk">
                        </el-table-column>

                        <el-table-column label="可用总额度" prop="sxkyed">
                        </el-table-column>

                        <el-table-column label="借贷余额" prop="jdye">
                        </el-table-column>

                        <el-table-column label="最后还款时间" prop="zhhksj" width="96">
                        </el-table-column>

                        <el-table-column label="操作" prop="accountType" width="120px">
                            <template scope="scope">
                                <el-button
                                        v-if="[4,5,6,7].indexOf(scope.row.accountType)>-1 && scope.row.orderId!=undefined && scope.row.orderId.length>0"
                                        type="text" size="small"
                                        @click="currentCheckedOrder=scope.row.orderId;orderDetailsShow=true;"
                                        class="operation_btn">订单详情
                                </el-button>
                                <el-button
                                        v-if="[3].indexOf(scope.row.accountType)>-1"
                                        type="text" size="small"
                                        @click="getOrderAttachments(scope.row)" class="operation_btn">查看凭证
                                </el-button>
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

        <el-dialog title="预付款设置" :visible.sync="creditSettingTable" size="small" id="prepayRecordTable">
            <el-card>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content request creditSetting">
                            <span>额度不足预警阈值</span>
                            <el-input size="small" type="number" v-model="alert.balanceThreshold"></el-input>
                            <span style="width: 280px;font-size: 12px;">不填或填非正数将会设置提醒额度为:<b>1000</b></span>
                        </div>

                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content  request creditSetting">
                            <span>额度不足预警邮箱</span>
                            <el-input size="small" v-model.trim="alert.alertEmail"></el-input>
                            <span style="width: 280px;font-size: 12px;">多个用英文逗号分开</span>
                        </div>

                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content request creditSetting">
                            <span>额度不足预警手机号</span>
                            <el-input size="small" v-model.trim="alert.alertPhone"></el-input>
                            <span style="width: 280px;font-size: 12px;">多个用英文逗号分开</span>
                        </div>

                    </el-col>
                </el-row>

            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="creditSettingTrue">确定</el-button>
                <el-button @click="creditSettingTable=false">关闭</el-button>

            </div>

        </el-dialog>

        <el-dialog title="订单详情" :visible.sync="orderDetailsShow" size="large" id="orderDetailsShow">
            <orderDetail :orderId="currentCheckedOrder"></orderDetail>
            <div slot="footer" class="dialog-footer">
                <el-button @click="orderDetailsShow = false" style="margin-right:5px;">关闭</el-button>

            </div>
        </el-dialog>

        <el-dialog title="查看凭证" :visible.sync="attachmentShow" size="large" id="orderDetailsShow">
            <div>
                <ul>
                    <li v-for="item in attachments">
                        {{item.name}}<a href="javascript:void(0)"  @click="getAttachmentBase64Data(item.base64)">查看</a>
                    </li>
                </ul>
                <div v-if="attachments==''">没有凭证</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="attachmentShow = false" style="margin-right:5px;">关闭</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import orderDetail from 'component/orderDetail'
    import exportExcel from "js/api/exportExcel"

function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    export default {
        components: {
            orderDetail
        },
        data() {
            return {
                attachments: [],
                attachmentShow: false,
                orderDetailsShow: false,
                currentCheckedOrder: 0,
                creditSettingTable: false,
                orderquest: {

                    creditStartAndEndDate: undefined,
                    payTypes: 2,
                    operatorId: ""
                    , operatorName: ""
                    , status: ""
                    , accountType: ""
                    , orderId: ""
                    , agentName: ""
                    , billingId: ""
                    , needExport: false
                    , searchType: ""
                    , pnr: ""
                    , agentOrderId: ""


                },
                alert: {
                    payType: 2,
                    alertPhone: undefined,
                    alertEmail: undefined,
                    balanceThreshold: undefined
                },
                tabledata1: [],
                username: '',
                userId: '',
                token: '',
                payType: 2,

                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10
            };
        },
        methods: {
            exportExcel() {
                try {
                    let searchObj = Object.assign({}, this.orderquest);

                    if (searchObj.creditStartAndEndDate != null && searchObj.creditStartAndEndDate.length > 1 && searchObj.creditStartAndEndDate[0] != null) {
                        var depDateStart1 = searchObj.creditStartAndEndDate[0];
                        var depDateEnd1 = searchObj.creditStartAndEndDate[1];

                        searchObj.startDate = moment(depDateStart1).format("YYYY-MM-DD 00:00:00");
                        searchObj.endDate = moment(depDateEnd1).format("YYYY-MM-DD 23:59:59")

                    }
                    delete  searchObj.dataRange;

                    searchObj.pageIndex = 1;
                    searchObj.pageSize = 999999;
                    searchObj.userType = 'UserTypeBuyer';
                    searchObj.needExport = true;
                    searchObj.searchType = "creditChange";

                    exportExcel("/accounting/creditChangeOfDetailListForWebAndManager.do", searchObj)

                } catch (error) {
                    app.$message.error(error.errorMsg || error.statusText);
                }
            },

           async getAttachmentBase64Data(base64) {
                try {
                    const dataBase64 = 'data:image/jpeg;base64,' + base64;
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

            async creditChangeBtn(isBtn) {
                // debugger;
                try {

                    var _self = this;
                    var searchObj = Object.assign({}, _self.orderquest);

                    if (isBtn) {
                        this.pageIndex = 1;
                    }
                    searchObj.pageIndex = this.pageIndex;
                    searchObj.pageSize = this.pageSize;

                    searchObj.startDate = "";
                    searchObj.endDate = "";

                    if (searchObj.creditStartAndEndDate != null && searchObj.creditStartAndEndDate.length > 1 && searchObj.creditStartAndEndDate[0] != null) {
                        var depDateStart1 = searchObj.creditStartAndEndDate[0];
                        var depDateEnd1 = searchObj.creditStartAndEndDate[1];

                        searchObj.startDate = moment(depDateStart1).format("YYYY-MM-DD 00:00:00");
                        searchObj.endDate = moment(depDateEnd1).format("YYYY-MM-DD 23:59:59")

                    }
                    delete searchObj.creditStartAndEndDate;
                    console.log(searchObj)
                    const res = await requestAPIServiceAsync("accounting/creditChangeOfDetailListForWebAndManager.do", searchObj);

                    console.log(res)

                    var datalist = [];
                    res.details.forEach(item => {
                        var itemObj = {};
                        if (item.payType == 2) {
                            itemObj.accountType = item.accountType;
                            itemObj.billingId = item.billingId;
                            itemObj.buyerId = item.buyerId;
                            itemObj.buyerName = item.buyerName;
                            itemObj.createtime = item.createtime;
                            itemObj.creditAmount = item.creditAmount;
                            itemObj.creditLine = item.creditLine;
                            itemObj.creditPrice = item.creditPrice;
                            itemObj.depositBalance = item.depositBalance;
                            itemObj.depositPrice = item.depositPrice;
                            itemObj.id = item.id;
                            itemObj.orderId = item.orderId;
                            itemObj.payType = item.payType;
                            itemObj.pnr = item.pnr;

                            datalist.push(itemObj);
                        }
                    });
                    console.log(datalist)
                    this.tabledata1 = res.details;


                    this.totalPages = res.totalPage;
                    this.totalRows = res.totalRow;

                }
                catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }

            },

            async creditSetting() {
                this.creditSettingTable = true;

                try {
                    const res = await requestAPIServiceAsync("accounting/creditChangeOfGetAlert.do", {payType: this.payType});
                    this.alert = res.alert || this.alert;
                } catch (error) {

                }


            },

            async creditSettingTrue() {

                this.creditSettingTable = true;
                //debugger
                try {
                    var requestObj = Object.assign({}, this.alert);

                    if (requestObj.balanceThreshold == undefined ||
                        requestObj.balanceThreshold.length < 1 ||
                        isNaN(Number(requestObj.balanceThreshold)) ||
                        parseFloat(requestObj.balanceThreshold) < 0) {
                        requestObj.balanceThreshold = 1000;
                    }
                    if(requestObj.alertPhone!=undefined && requestObj.alertPhone.length>0){
                        let phones=requestObj.alertPhone.split(',');
                        for(let item of phones){
                            if(!(/^((13[0-9]{1})|159|153|185|170)+\d{8}$/.test(item))){
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

                    await requestAPIServiceAsync("accounting/creditChangeOfSetAlert.do", {alert: requestObj});
                    this.creditSettingTable = false;
                    this.$message.success('设置成功');

                } catch (error) {
                    this.$message.error(error.message||error.errorMsg || error.statusText);
                }
            },

            async getOrderAttachments(item) {
                try {
                    if (item.billingId == undefined || item.billingId.length < 1) {
                        throw  new Error("订单号不能为空");
                    }
                    const res = await requestAPIServiceAsync("/accounting/getOrderAttachment.do", {billingId: item.billingId});
      
                    this.attachments = res.attachments;
                    this.attachmentShow = true;

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },

            /**
             *分页事件
             */
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.creditChangeBtn();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.creditChangeBtn();
            },

        },
        mounted() {
            this.creditChangeBtn();

        }

    };
</script>

<style scoped>
    #orderList {
        min-height: 750px;
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

    #creditSettingTable > .el-dialog {
        width: 640px !important;
    }

    #creditSettingTable > .el-dialog .el-card__body {
        padding-left: 65px;
    }

    .timeChoose {
        width: 260px !important;
    }

    .el-date-editor .el-range-input {
        width: 35%;
    }

    .refund_search_row .el-input {
        width: 260px;
    }

    .passenger_info > .el-table th {
        text-align: left;
        background: #ff9933;
        color: #fff;
    }

    .creditSetting .el-input {
        width: 220px;
    }
    .el-dialog__body a{
        color:#66b1ff;
    }
    .el-dialog__body a:hover{
        color:#66b1ff;
     }
</style>

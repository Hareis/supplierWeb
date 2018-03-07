<template>
    <div id="orderList" class="orderListHtml">
        <leftMenu></leftMenu>
        <div class="container">
            <el-card>
                <header>授信结算管理</header>
            </el-card>

            <el-card>
                <el-row :gutter="20" class="refund_search_row">
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>授信结算时间段:</span>
                            <el-date-picker v-model="orderquest.datetime" type="daterange"
                                            class="timeChoose"
                                            placeholder="选择日期" size="small">

                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>结算类型：</span>
                            <el-select v-model="orderquest.status" size="small" filterable placeholder="请选择">
                                 <el-option label="全部" value=""></el-option>
                                 <el-option label="初始账单" value="0"></el-option>
                                <el-option label="待结算" value="1"></el-option>
                                <el-option label="已结算" value="2"></el-option>
                                <el-option label="驳回" value="3"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>授信结算账期号:</span>
                            <el-input size="small" v-model="orderquest.paymentVoucher"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="8" :offset="16" style="margin-top:15px;">
                        <div>
                            <el-button style="float: right;margin-right:35px;" size="small" @click="exportExcel()">导出</el-button>

                            <el-button style="float: right;margin-right:20px;" size="small" type="primary"
                                       @click="creditSettingBtn(true)">
                                查询
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
                        <el-table-column label="授信结算账期号" prop="paymentVoucher">
                        </el-table-column>
                        <el-table-column label="授信结算流水号" prop="billingId">
                        </el-table-column>

                        <el-table-column label="结算方式" prop="payType" width="60">
                            <template scope="scope">
                                {{'T+' + scope.row.accountPeriod}}
                            </template>
                        </el-table-column>

                        <el-table-column label="账单日" prop="repaymentTime">
                            <template scope="scope">
                                {{getBillDayStr(scope.row)}}
                            </template>
                        </el-table-column>

                        <el-table-column label="最后还款时间" prop="repaymentTime" width="120px;">
                        </el-table-column>

                        <el-table-column label="本期结算金额" prop="repaymentAmount">
                        </el-table-column>

                        <el-table-column label="结算状态">
                            <template scope="scope">
                                <label v-if="scope.row.status==1">未结算</label>
                                <label v-else-if="scope.row.status==2">已结算</label>
                                <label v-else-if="scope.row.status==3">驳回</label>
                                <label v-else-if="scope.row.status==0">初始账单</label>
                            </template>
                        </el-table-column>

                        <el-table-column label="账单详情" prop="message">
                        </el-table-column>

                        <el-table-column label="提交还款时间" prop="applyTime">
                        </el-table-column>

                        <el-table-column label="确认结算时间" prop="confirmTime">
                        </el-table-column>

                        <el-table-column label="还款人" prop="buyerName">
                        </el-table-column>

                        <el-table-column label="操作" width="60px">
                            <template scope="scope">
                                <el-button type="text" v-if="scope.row.status==0 || scope.row.status==3"
                                           @click="getRepayingReadyData(scope.row)">去还款
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

        <el-dialog
                title="授信还款"
                :visible.sync="dialogVisible">
            <div class="repayingDiv">
                <div class="repayingDiv_div">
                    <span>授信结算流水号：</span>
                    <el-input :readonly="true" size="small" v-model="rechargingRequest.billingId"></el-input>
                </div>
                <div class="repayingDiv_div">
                    <span>应还金额：</span>
                    <el-input :readonly="true" size="small" v-model="rechargingRequest.creditPrice"></el-input>
                </div>
                <div class="repayingDiv_div">
                    <span>实还金额：</span>
                    <el-input size="small" v-model="rechargingRequest.depositPrice"></el-input>
                </div>
                <div class="repayingDiv_div">
                    <span>付款凭证：</span>
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            multiple
                            action="/" :on-remove="uploadRemove"
                            :on-change="uploadChange"
                            :file-list="fileList"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;recharging()">确认还款</el-button>
              </span>
        </el-dialog>

    </div>
</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import exportExcel from "js/api/exportExcel"


    export default {
        data() {
            return {
                fileList: [],
                dialogVisible: false,
                orderquest: {
                    name: undefined,
                    type: 2,
                    status: undefined,
                    datetime: undefined,
                    paymentVoucher: undefined
                },
                tabledata1: [],
                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10,
                rechargingRequest: {
                    paymentVoucher: undefined,
                    creditPrice: 0,
                    depositPrice: 0
                }
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

            exportExcel() {
                try {

                    let requestObj = Object.assign({}, this.orderquest);

                    if (requestObj.datetime instanceof Array && requestObj.datetime.length > 1) {
                        requestObj.startDate = moment(requestObj.datetime[0]).format("YYYY-MM-DD HH:mm:ss");
                        requestObj.endDate = moment(requestObj.datetime[1]).format("YYYY-MM-DD 23:59:59");
                    }
                    delete  requestObj.dataRange;

                    requestObj.pageIndex = 1;
                    requestObj.pageSize = 999999;
                    requestObj.needExport = true;
                    exportExcel("/accounting/creditSettlementOfList.do", requestObj)

                } catch (error) {
                    app.$message.error(error.errorMsg || error.statusText);
                }
            },
            /**
             * 获取账单日
             */
            getBillDayStr(item) {
                try {
                    const lastDay = new Date(item.repaymentTime).getTime();
                    const diffrenceDay = parseInt(item.accountPeriod) * 24 * 60 * 60 * 1000;
                    if (isNaN(lastDay) || isNaN(diffrenceDay)) {
                        throw  new Error("格式错误");
                    }
                    return window.moment(lastDay - diffrenceDay).format("YYYY-MM-DD");
                } catch (e) {
                    return '';
                }

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            refundReset: function () {

                this.orderquest = {
                    name: undefined,
                    type: 2,
                    status: undefined,
                    datetime: undefined,
                    serialNumber: undefined
                };
            },
            /**
             *  获取还款初始数据
             */
            async getRepayingReadyData(item) {
                this.fileList = [];
                this.rechargingRequest = {
                    paymentVoucher: item.paymentVoucher,
                    billingId: item.billingId,
                    creditPrice: item.repaymentAmount,
                    depositPrice: item.repaymentAmount,
                    attachments: this.fileList
                };
                this.dialogVisible = true;
            },
            async recharging() {

                try {
                    //debugger;
                    let _self = this;
                    let requestObj = Object.assign({}, this.rechargingRequest);
                    requestObj.accountType = 3;

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
                                throw  new Error(res.errorMsg);
                            }
                            _self.$message({
                                message: '保存成功',
                                type: 'success'
                            });

                        } else {
                            throw  new Error("错误")
                        }
                    };
                    oReq.send(formData);

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },
            async creditSettingBtn(isBtn) {
                try {
                    let requestObj = Object.assign({}, this.orderquest);
                    if (isBtn) {
                        this.pageIndex = 1;
                    }
                    if (requestObj.datetime instanceof Array && requestObj.datetime.length > 1) {
                        requestObj.startDate = moment(requestObj.datetime[0]).format("YYYY-MM-DD HH:mm:ss");
                        requestObj.endDate = moment(requestObj.datetime[1]).format("YYYY-MM-DD 23:59:59");
                    }

                    requestObj.pageIndex = this.pageIndex;
                    requestObj.pageSize = this.pageSize;
                    delete  requestObj.datetime;

                    let res = await requestAPIServiceAsync("accounting/creditSettlementOfList.do", requestObj);

                    this.tabledata1 = res.repayments;
                    this.totalPages = res.totalPage;
                    this.totalRows = res.totalRow

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },


            /**
             *分页事件
             */
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.creditSettingBtn();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.creditSettingBtn();
            },

        },
        async mounted() {
            this.creditSettingBtn();
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

    .timeChoose {
        width: 200px !important;
    }

    .passenger_info > .el-table th {
        text-align: left;
        background: #ff9933;
        color: #fff;
    }
    .timeChoose {
        width: 260px !important;
    }
    .creditSetting .el-input {
        width: 260px;
    }
    
    .refund_search_row .el-input {
        width: 260px;
    }
    .el-table td, .el-table th{
        padding:4px 0 !important;
    }
   .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding:0 2px !important;
    }
    .el-table td, .el-table th{
        padding: 5px 0;
    }
</style>

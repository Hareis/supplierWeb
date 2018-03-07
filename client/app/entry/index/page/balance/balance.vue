<template>
    <div id="balance" class="orderListHtml">
      <leftMenu></leftMenu>
      <div class="container" style="min-height:725px;">
          <el-card>
              <header>资金变动管理</header>
          </el-card>
        <el-card class="box-card">
            <div class="contact_info">
                <el-row >
                    <el-col :span="23">
                        <el-form :inline="true" :model="formInline">
                            <el-form-item label="资金变动时间:">
                                <el-date-picker size="small"
                                        v-model="formInline.dataRange"
                                        type="daterange"
                                        class="balance__dataRange"
                                        range-separator="-"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="支付方式:">
                                <el-select v-model="formInline.payTypes" filterable clearable placeholder="请选择" size="small">
                                    <el-option label="预付款" value="1"> </el-option>
                                    <el-option label="授信" value="2"> </el-option>
                                    <el-option label="支付宝扫码" value="3"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收支类型:">
                                <el-select v-model="formInline.accountType" filterable clearable placeholder="请选择" size="small">
                                    <el-option label="充值" value="1"> </el-option>
                                    <el-option label="提现" value="2"> </el-option>
                                    <el-option label="结算收款" value="3"> </el-option>
                                    <el-option label="购票支付" value="4"> </el-option>
                                    <el-option label="改期支付" value="5"> </el-option>
                                    <el-option label="辅营项目支付" value="6"> </el-option>
                                    <el-option label="退废收款" value="7"> </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="23" style="text-align:right;">
                        <el-button type="primary" @click="getBtnQuery(true)" size="small">查询</el-button>
                        <el-button size="small"  @click="exportExcel()">导出</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <el-card class="box-card">
            <div class="passenger_info">
                <el-row>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            label="支付方式"
                            width="180"
                            prop="payType">
                        <template scope="scope">
                            <label v-if="scope.row.payType==1">预付款</label>
                            <label v-else-if="scope.row.payType==2">授信</label>
                            <label v-else-if="scope.row.payType==3">支付宝扫码</label>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="accountType"
                            label="收支类型"
                            width="180">
                        <template scope="scope">
                            <label v-if="scope.row.accountType==1">充值</label>
                            <label v-else-if="scope.row.accountType==2">提现</label>
                            <label v-else-if="scope.row.accountType==3">结算收款</label>
                            <label v-else-if="scope.row.accountType==4">购票支付</label>
                            <label v-else-if="scope.row.accountType==5">改期支付</label>
                            <label v-else-if="scope.row.accountType==6">辅营项目支付</label>
                            <label v-else-if="scope.row.accountType==7">退废收款</label>
                            <label v-else>未知状态</label>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createtime"
                            label="变动时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="skje"
                            label="入账金额">
                    </el-table-column>
                    <el-table-column
                            prop="zfje"
                            label="支出金额">
                    </el-table-column>
                    <el-table-column v-if="false"
                            label="操作">
                        <template scope="scope">

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

            </el-row>
            </div>
        </el-card>
    </div>
    </div>
</template>
<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import exportExcel from "js/api/exportExcel"
    export default {
        data() {
            return {
                formInline:{
                    dataRange:[],
                    payTypes:undefined,

                     operatorId:""
                    ,operatorName:""
                    ,status:""
                    ,accountType:""
                    ,orderId:""
                    ,agentName:""
                    ,billingId:""
                    ,needExport:false
                    ,searchType:""
                    ,pnr:""
                    ,agentOrderId:""
                },
                tableData: [],
                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10,
            }
        },
        methods: {
            exportExcel() {
                try {
                    let requestObj=Object.assign({},this.formInline);
                    if(requestObj.dataRange instanceof  Array && requestObj.dataRange.length>1){
                        requestObj.startDate=moment(requestObj.dataRange[0]).format("YYYY-MM-DD 00:00:00");
                        requestObj.endDate=moment(requestObj.dataRange[1]).format("YYYY-MM-DD 23:59:59");
                    }
                    delete  requestObj.dataRange;

                    requestObj.pageIndex = 1;
                    requestObj.pageSize = 999999;
                    requestObj.userType='UserTypeBuyer';
                    requestObj.needExport=true;
                    requestObj.searchType="balance";

                    exportExcel("/accounting/creditChangeOfDetailListForWebAndManager.do", requestObj)

                } catch (error) {
                    app.$message.error(error.errorMsg || error.statusText);
                }
            },
            /**
             *
             * @param 是否是查询按钮
             */
            async getBtnQuery(isbtn){
                try {

                    let requestObj=Object.assign({},this.formInline);
                    if(this.formInline.payTypes==""){requestObj.payTypes=undefined}
                    requestObj.startDate="";
                    requestObj.endDate="";
                    if(requestObj.dataRange instanceof  Array && requestObj.dataRange.length>1){
                        requestObj.startDate=moment(requestObj.dataRange[0]).format("YYYY-MM-DD 00:00:00");
                        requestObj.endDate=moment(requestObj.dataRange[1]).format("YYYY-MM-DD 23:59:59");
                    }
                    if(isbtn){
                        this.pageIndex=1;
                    }
                    requestObj.userType='UserTypeBuyer';
                    requestObj.pageIndex=this.pageIndex;
                    requestObj.pageSize=this.pageSize;
                    delete  requestObj.dataRange;
                    let res = await requestAPIServiceAsync("accounting/creditChangeOfDetailListForWebAndManager.do", requestObj);

                    this.totalPages=res.totalPage;
                    this.totalRows=res.totalRow;
                    this.tableData=res.details;

                }catch (error) {
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
            
        },
            async mounted() {
            this.getBtnQuery()
        }
    };
</script>
<style>
    /*#balance{*/
        /*height: 100%;*/
        /*min-height:664px;*/
        /*padding-top:48px;*/
    /*}*/
    .el-form-item__label{
        display: inline-block;
        width:120px;
        text-align: right;
    }
    .balance__dataRange{
        width:270px;
    }
</style>

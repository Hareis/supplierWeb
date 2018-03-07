<template>
    <div id="orderList" class="orderListHtml">
        <leftMenu></leftMenu>
        <div class="container">
            <el-card>
                <header>改期订单查询</header>
            </el-card>
            <el-card>
                <el-row :gutter="20" class="refund_search_row">
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>起飞时间起止：</span>
                            <el-date-picker v-model="orderquest.flightStartAndEndDate" type="daterange" class="timeChoose" placeholder="选择日期" size="small">

                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>PNR：</span>
                            <el-input size="small" v-model="orderquest.pnr"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>出发城市代码：</span>
                            <el-input size="small" v-model="orderquest.depCity "></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>预订时间起止：</span>
                            <el-date-picker v-model="orderquest.bookingStartAndEndDate" type="daterange" class="timeChoose" placeholder="选择日期" size="small">

                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>乘客姓名：</span>
                            <el-input size="small" v-model="orderquest.passengerName"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>到达城市代码：</span>
                            <el-input size="small" v-model="orderquest.arrCity "></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>订单号：</span>
                            <el-input size="small" v-model="orderquest.orderId "></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>票号：</span>
                            <el-input size="small" v-model="orderquest.ticketno "></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>订单状态：</span>
                            <el-select v-model="orderquest.mainStatus" filterable clearable placeholder="请选择" size="small">
                                <el-option v-for="item in refundStatusOptions" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8" :offset="16">
                        <div class="grid-content bg-purple request">

                            <el-button style="float: right;margin-right:35px;" @click="refundReset">清空</el-button>

                            <el-button style="float: right;margin-right:20px;" type="primary" @click="getQueryRefundBtn(true)">
                                查询
                            </el-button>
                        </div>

                    </el-col>
                </el-row>

            </el-card>
            <el-card>
                <div class="passenger_info">

                    <div>
                        <div style="margin-bottom: 10px">
                            <el-radio-group v-model="orderquest.mainStatus" size="small" @change="getQueryRefundBtn(true)">
                                <el-radio-button v-for="item in refundStatusOptions" :label="item.value.toString()" v-bind:key="item.refundStatusOptions">
                                    {{item.name}}{{item.key==''?'':'( '+(orderStatus[item.key]||0)+' )'}}
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <el-table :data="tabledata1" type="expand" border style="width: 100%">

                        <el-table-column label="订单号 预订时间" width="170">
                            <template scope="tabledata1">
                                <div :key="orderId.orderID" v-for="orderId in tabledata1">
                                    <div v-html="orderId.orderId"></div>
                                    <div v-html="orderId.bookingTime"></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="航程类型" width="60px">
                            <template scope="tabledata1">
                                <div v-html="tabledata1.row.tripType=='1'?'单程':'往返'"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="PNR" width="50px">

                            <template scope="tabledata1">
                                <div :key="passengers.pnr" v-for="passengers in tabledata1.row.passengers">
                                    <span>{{passengers.pnr}}</span>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column label="乘机人姓名">
                            <template scope="tabledata1">
                                <div :key="passengers.name" v-for="passengers in tabledata1.row.passengers">
                                    <span>{{passengers.name}}</span>
                                </div>

                            </template>
                        </el-table-column>

                        <el-table-column prop="tickernum" label="票号">
                            <template scope="tabledata1">
                                <div :key="passengers.ticketNo" v-for="passengers in tabledata1.row.passengers">
                                    <span>{{passengers.ticketNo}}</span>
                                </div>

                            </template>

                        </el-table-column>
                        <el-table-column label="航程信息" width="170px">
                            <template scope="tabledata1">
                                <div :key="itinerary.$index" v-for="itinerary in tabledata1.row.segments">

                                    <el-tooltip class="item" effect="dark" :content="itinerary.depDatetime" placement="bottom">
                                        <span v-html="itinerary.depAirport"></span>
                                    </el-tooltip>
                                    ->
                                    <el-tooltip class="item" effect="dark" :content="itinerary. arrDatetime" placement="bottom">
                                        <span v-html="itinerary.arrAirport"></span>
                                    </el-tooltip>&nbsp;
                                    <span v-html="itinerary.flightNumber"></span>&nbsp;
                                    <span v-html="itinerary.cabin"></span>&nbsp;
                                    <br/>
                                    <span v-html="itinerary.depDatetime"></span>

                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单总金额" width="60px">

                            <template scope="tabledata1">
                                <div>
                                    <label>

                                        {{(tabledata1.row.sourceAdultPrice+tabledata1.row.sourceAdultTax )*tabledata1.row.adultNumber+(tabledata1.row.sourceChildPrice+tabledata1.row.sourceChildTax
                                        )*tabledata1.row.childNumber}}
                                        <!-- {{(answer.adultPrice*tabledata1.row.adultNumber + answer.childPrice*tabledata1.row.childNumber)+answer.returnAmount}}  -->
                                        <!-- {{(answer.adultPrice) }} -->
                                    </label>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="改期收取总金额" width="60px">
                                <template scope="scope">
                                        <div v-if="scope.row.statusCn=='申请'">
                                             暂无
                                        </div>
                                        <div v-else>
                                              {{(scope.row.answer.adultCabinPrice + scope.row.answer.adultServicePrice + scope.row.answer.adultPlatformPrice)*+scope.row.adultNumber+(scope.row.answer.childCabinPrice + scope.row.answer.childServicePrice + scope.row.answer.childPlatformPrice)*scope.row.childNumber}}                                        
                                        </div>

                                </template>    
                        </el-table-column>    
                        <el-table-column prop="status" label="状态/操作" width="120">
                            <template scope="scope">
                                <div class="order_status_btn">
                                    <span v-if="scope.row.statusCn=='待确认'">改期待确认</span>
                                    <span v-else-if="scope.row.statusCn=='申请'">改期申请中</span>
                                    <span v-else-if="scope.row.statusCn=='已确认'">改期已确认</span>
                                    <span v-else-if="scope.row.statusCn=='取消'">改期已取消</span>
                                    <span v-else-if="scope.row.statusCn=='完成'">改期已完成</span>
                                    <span v-else>状态未知</span>
                                </div>

                                <div>
                                    <el-button type="text" size="small" @click="getChangeDetails(scope.row)" class="operation_btn">改期详情
                                    </el-button>
                                </div>
                                <div>
                                    <el-button type="text" size="small" @click="getOrderDetails(scope.row)" class="operation_btn">订单详情
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="block" style="float: right;margin: 15px 0;">

                        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageIndex" :page-size="pageSize"
                            :page-sizes="[10, 20, 50, 200]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                        </el-pagination>
                    </div>

                </div>
            </el-card>

        </div>


        <el-dialog title="订单详情" :visible.sync="orderDetails" size="large" id="orderDetailsShow">

            <el-form ref="form" :model="detalisData1" label-width="80px">

                <el-card class="box-card">
                    <header>订单信息</header>
                    <!-- <span>{{detalisData1.PNR}}</span> -->
                    <div class="order_search">
                        <el-row>
                            <el-col :span="8">
                                <span>订单号:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.orderId" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>预订时间:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.bookingTime" :readonly="true"></el-input>

                            </el-col>
                            <el-col :span="8">
                                <span>支付方式:</span>
                                <el-input size="small" class="noneBorder" :value="paymentTypeCn" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>PNR:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.pnr" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>支付时间:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.paymentTime" :readonly="true"></el-input>
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
                                <el-input size="small" class="noneBorder" v-model="detalisData1.ticketTime" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>支付流水号:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.paymentVoucher" :readonly="true"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card">
                    <header>航班信息</header>
                    <div class="range_info">

                        <el-table ref="multipleTable" :data="detalisData1.segments" tooltip-effect="dark" style="width: 100%">
                            <el-table-column label="航班号">
                                <template scope="scope">
                                    <span>{{ scope.row.flightNumber }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="舱等/舱位">
                                <template scope="scope">

                                    <span>{{ scope.row.cabinGrade}}/{{scope.row.cabin}}</span>
                                </template>
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

                            <el-table-column label="起飞时间">
                                <template scope="scope">
                                    <span>{{ (scope.row.depDatetime).replace('T', ' ').substr(0,16) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达时间">
                                <template scope="scope">
                                    <span>{{ (scope.row.arrDatetime).replace('T', ' ').substr(0,16) }}</span>
                                </template>
                            </el-table-column>
                            
                              <el-table-column label="去程/回程">
                                  <template scope="scope">
                                      <span v-if="scope.row.itineraryIndex ==1">去程</span>
                                      <span v-if="scope.row.itineraryIndex ==1">回程</span>
                                  </template>
                              </el-table-column>

                        </el-table>

                    </div>
                </el-card>

                <!-- 乘客信息 -->
                <el-card class="box-card">
                    <header>乘客信息</header>

                    <div class="passenger_info">

                        <el-table ref="multipleTable" :data="detalisData1.passengers" tooltip-effect="dark" style="width: 100%">

                            <el-table-column label="姓名">
                                <template scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="乘客类型">
                                <template scope="scope">
                                    <span>{{ scope.row.ageType==0?'成人':'儿童' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="性别" width="50">
                                <template scope="scope">
                                    <span>{{ scope.row.gender=='M'?'男':'女' }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出生日期">
                                <template scope="scope">
                                    <span>{{ (scope.row.birthday).replace('T', ' ').substr(0,10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型" width="80">
                                <template scope="scope">
                                    <!-- <span>{{ scope.row.cardType }}</span> -->

                                    <span v-if="scope.row.cardType=='PP'"> 护照 </span>
                                    <span v-if="scope.row.cardType=='GA'"> 港澳通行证</span>
                                    <span v-if="scope.row.cardType=='TW'"> 台湾通行证</span>
                                    <span v-if="scope.row.cardType=='TB'"> 台胞证</span>
                                    <span v-if="scope.row.cardType=='HX'"> 回乡证</span>
                                    <span v-if="scope.row.cardType=='HY'"> 国际海员证</span>
                                    <!-- <span v-else> {{ scope.row.cardType }}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column label="证件号">
                                <template scope="scope">
                                    <span>{{ scope.row.cardNum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件签发地">
                                <template scope="scope">
                                    <span class="upper">{{getCountryNameByCode(scope.row.cardIssuePlace)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="国籍">
                                  <template scope="scope">
                                 <span class="upper">{{getCountryNameByCode(scope.row.nationality)}}</span>
                                   </template> 
                            </el-table-column>
                            <el-table-column label="证件有效期">
                                <template scope="scope">
                                    <span>{{ (scope.row.cardExpired).replace('T', ' ').substr(0,10) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="票号">
                                <template scope="scope">
                                   <div v-for="ticket in scope.row.tickets" :key="ticket.ticketNo">
                                    <span>{{ ticket.ticketNo  }}</span>
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
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactName" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>联系方式:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactMobile" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮箱:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactEmail" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮编:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactPostcode" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>地址:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactAddress" :readonly="true"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card" id="orderDetailsPrice">
                    <header>价格信息</header>
                    <el-row>
                        <el-col :span="4">
                            <span>乘客类型</span>
                        </el-col>
                        <el-col :span="4">
                            <span>人数(人)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>票面价(&yen;)</span>

                        </el-col>
                        <el-col :span="4">
                            <span>税费(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>返佣(&yen;)</span>
                        </el-col>
                        <el-col :span="4">
                            <span>单人结算价(&yen;)</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <b>
                                <span>成人</span>
                            </b>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.adultNumber}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.adultPrice}}</span>

                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.adultTax}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>0</span>
                        </el-col>
                        <el-col :span="4">

                            <span>{{(detalisData1.adultPrice + detalisData1.adultTax)}}</span>

                        </el-col>
                    </el-row>

                    <el-row v-if="detalisData1.childNumber > '0'">
                        <el-col :span="4">
                            <span>儿童</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.childNumber}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.childPrice}}</span>

                        </el-col>
                        <el-col :span="4">
                            <span>{{detalisData1.childTax}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>0</span>
                        </el-col>
                        <el-col :span="4">

                            <span>{{(detalisData1.childPrice + detalisData1.childTax)}}</span>

                        </el-col>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col>
                            <div style="float:right;margin-right:50px;">
                                机票价格：
                                <label style="font-size:30px;color:#ff8247">&yen;{{(detalisData1.childPrice + detalisData1.childTax) * (detalisData1.childNumber)+(detalisData1.adultPrice
                                    + detalisData1.adultTax) * (detalisData1.adultNumber)}}</label>
                            </div>
                        </el-col>
                    </el-row>

                </el-card>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="orderDetails = false" style="margin-right:5px;">关闭</el-button>

            </div>
        </el-dialog>

        <!-- refundApplication -->



    </div>
</template>
<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import countryJson from 'json/country.json';

    export default {
        data() {
            return {
                currentCheckedOrder: 0,
                orderDetails: false,
                orderquest: {
                    flightStartAndEndDate: undefined,
                    pnr: undefined,
                    arrCity: undefined,
                    bookingStartAndEndDate: undefined,
                    passengerName: undefined,
                    orderId: undefined,
                    ticketno: undefined,
                    mainStatus: '',
                    depCity: undefined,
                    refundType: 2
                },
                activeName: '1',
                refundStatusOptions: [
                    {name: "全部", key: "", value: ""},
                    {name: "改期申请中", key: "apply", value: "1"},
                    {name: "改期待确认", key: "answer", value: "2"},
                    {name: "改期已确认", key: "confirmed", value: "3"},
                    {name: "改期已取消", key: "cancel", value: "4"},
                    {name: "改期已完成", key: "finish", value: "6"},
                ],
                orderStatus: {},
                refundStatus: 0,
                detalisData1: {},
                payAmount: '',
                mainStatusCn: '',
                paymentTypeCn: '',
                contact: {},
                tabledata1: [],
                answer: {},
                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10
            };
        },
        methods: {
            tabsHandleClick(item) {
                // debugger
                this.refundStatus = item.name;
                this.getQueryRefundBtn(true);
            },
            refundReset() {
                this.orderquest = {
                    flightStartAndEndDate: undefined,
                    pnr: undefined,
                    bookingStartAndEndDate: undefined,
                    passengerName: undefined,
                    orderId: undefined,
                    ticketno: undefined,
                    mainStatus: '',
                    depCity: undefined,
                    arrCity: undefined,
                    refundType: 2
                };
            },
            async getQueryRefundById(orderId) {
                this.orderquest.orderId = orderId

            },
            async getQueryRefundBtn(isBtn) {
                try {

                    var _self = this;
                    var searchObj = Object.assign({}, _self.orderquest);

                    searchObj.pageIndex = this.pageIndex;
                    searchObj.pageSize = this.pageSize;

                    if (searchObj.mainStatus != undefined && searchObj.mainStatus.length > 0) {
                        var tempArray = searchObj.mainStatus.split(',');
                        if (tempArray.length > 1) {
                            searchObj.mainStatusList = tempArray;
                            searchObj.mainStatus = undefined;
                        }
                    }


                    if (isBtn) {
                        _self.pageIndex = 1;

                    }


                    if (searchObj.flightStartAndEndDate != null && searchObj.flightStartAndEndDate.length > 1 && searchObj.flightStartAndEndDate[0] != null) {
                        var depDateStart1 = searchObj.flightStartAndEndDate[0];
                        var depDateEnd1 = searchObj.flightStartAndEndDate[1];

                        searchObj.depDateStart = moment(depDateStart1).format("YYYY-MM-DD 00:00:00");
                        searchObj.depDateEnd = moment(depDateEnd1).format("YYYY-MM-DD 23:59:59")

                    }
                    delete searchObj.flightStartAndEndDate;

                    if (searchObj.bookingStartAndEndDate != null && searchObj.bookingStartAndEndDate.length > 1 && searchObj.bookingStartAndEndDate[0] != null) {
                        var bookDateStart1 = searchObj.bookingStartAndEndDate[0];
                        var bookDateEnd1 = searchObj.bookingStartAndEndDate[1];
                        
                        searchObj.bookDateStart = moment(bookDateStart1).format("YYYY-MM-DD 00:00:00");
                        searchObj.bookDateEnd = moment(bookDateEnd1).format("YYYY-MM-DD 23:59:59")

                    }
                    delete searchObj.bookingStartAndEndDate;

                    const res = await requestAPIServiceAsync("refund/getOrderList.do", searchObj);
                    // console.log(res)
                    var tabledata = res.orders;
                    this.tabledata1 = tabledata;
                    // this.answer = tabledata1.answer
                    this.totalPages = res.totalPage;
                    this.totalRows = res.totalRow;

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },

           async getOrderDetails (row) {
                // debugger;
                   try {
                       this.sourceOrderId  = row.sourceOrderId

                    var res = await APIService('user/getOrderDetails.do', { orderId: this.sourceOrderId });

                    console.log(res.order)


                    this.detalisData1 = res.order;

                    this.segments = res.order.segments;
                    this.passengers = res.order.passengers;


                    if (this.detalisData1.paymentType == 1) {
                        this.paymentTypeCn = "预付款";
                    } else if (this.detalisData1.paymentType == 2) {
                        this.paymentTypeCn = "授信";
                    } else if (this.detalisData1.paymentType == 3) {
                        this.paymentTypeCn = "支付宝";
                    } else if (this.detalisData1.paymentType == 4) {
                        this.paymentTypeCn = "代扣";
                    }

                    //订单状态
                    if (this.detalisData1.mainStatus == 0) {
                        this.mainStatusCn = "无效"
                    }
                    else if (this.detalisData1.mainStatus == 1) {
                        this.mainStatusCn = "申请";
                    }
                    else if (this.detalisData1.mainStatus == 2) {
                        this.mainStatusCn = "待确认";
                    } else if (this.detalisData1.mainStatus == 3) {
                        this.mainStatusCn = "已确认";
                    } else if (this.detalisData1.mainStatus == 4) {
                        this.mainStatusCn = "取消";
                    } else if (this.detalisData1.mainStatus == 6) {
                        this.mainStatusCn = "完成";
                    }

                    //支付金额
                    var payAmount = ((this.detalisData1.adultPrice + this.detalisData1.adultTax) * this.detalisData1.adultNumber) + ((this.detalisData1.childPrice + this.detalisData1.childTax) * this.detalisData1.childNumber)
                    this.payAmount = (payAmount).toFixed(2);



                    this.orderDetails = true;
                } catch (error) {
                    this.$message.error(error.message || error.errorMsg || error.statusText);
                }

            },

            //改期列表详情
            getChangeDetails(row) {
                this.$router.push({
                    path: '/changeResult',
                    replace: true,
                    query: { orderId: row.orderId }
                });

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
             *分页事件
             */
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getQueryRefundBtn();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getQueryRefundBtn();
            },
            getRefundApplication(row) {


                var changepayUrl = '/refundApplication?orderId=' + row.orderId;

                this.$router.push({ path: changepayUrl });

                //   this.$router.push({ path: "/refundApplication" });

            },
            getChangeApplication() {
                this.$router.push({ path: "/ChangeApplication" });
            },
            /**
             *  获取退票状态数
             */
            async getRefundOrderStatus() {
                try {
                    const res = await requestAPIServiceAsync("/refund/getRefundOrderStatus.do", { refundType: 2 });
                    this.orderStatus = res.orderStatus;
                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            }
        },
        async created() {
            this.getQueryRefundBtn();
            this.getRefundOrderStatus();
        }
    };
  
</script>
<style>
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

    .request>span {
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
        width: 230px !important;
    }

    .el-date-editor .el-range-input {
        width: 33%;
    }


    .el-tabs__nav {}

    .el-tabs__nav-scroll {
        border-bottom: 3px solid rgb(185, 0, 64);
        margin-bottom: 2px;
    }

    .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #2d2f33;
        position: relative;
        background-color: #f0f3ef;
        margin-right: 5px;
    }

    .el-tabs__item.is-active {
        color: #fff;
        background-color: rgb(185, 0, 64);
        text-align: center;
    }

    .el-tabs__item:hover {
        color: rgb(185, 0, 64);
        cursor: pointer;
    }

    .el-tabs__active-bar {
        background-color: rgb(185, 0, 64);
        height: 0px;
    }

    .el-tabs--bottom .el-tabs__item:nth-child(2),
    .el-tabs--top .el-tabs__item:nth-child(2) {
        padding: 0 10px;
    }

    .order_search>.el-row>.el-col>.el-input {
        width: 240px !important;
        vertical-align: middle;
    }

    .contact_info>.el-row>.el-col>.el-input {

        width: 180px !important;
        vertical-align: middle;
    }

    .refund_search_row .el-input {
        width: 230px;
    }
</style>
<template>
    <div id="orderList" class="orderListHtml">
        <leftMenu></leftMenu>
        <div class="container">
            <el-card>
                <header>全部订单查询</header>
            </el-card>

            <el-card>
                <el-row :gutter="20" class="refund_search_row">
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>起飞时间起止：</span>
                            <el-date-picker v-model="orderquest.flightStartAndEndDate" type="daterange"
                                            class="timeChoose" placeholder="选择日期" size="small">
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
                            <el-date-picker v-model="orderquest.bookingStartAndEndDate" type="daterange"
                                            class="timeChoose" placeholder="选择日期" size="small">

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
                            <el-input size="small" v-model="orderquest.ticketNo "></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple request">
                            <span>订单状态：</span>
                            <el-select v-model="orderquest.mainStatus" filterable clearable placeholder="请选择"
                                       size="small">
                                <el-option v-for="item in options" :key="item.value" :label="item.name"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8" :offset="16">
                        <div class="grid-content bg-purple request">

                            <el-button style="float: right;margin-right:35px;" @click="refundReset">清空</el-button>

                            <el-button style="float: right;margin-right:20px;" type="primary"
                                       @click="getQueryRefundBtn(true)">
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
                            <el-radio-group v-model="orderquest.mainStatus" size="small"
                                            @change="getQueryRefundBtn(true)">
                                <el-radio-button v-for="item in options" :label="item.value.toString()"
                                                 v-bind:key="item.key">
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
                        <el-table-column label="航程类型">
                            <template scope="tabledata1">
                                <div v-html="tabledata1.row.tripType=='1'?'单程':'往返'"></div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PNR" label="PNR">

                            <template scope="tabledata1">
                                <div :key="orderId.pnr" v-for="orderId in tabledata1">
                                    <div v-html="orderId.pnr"></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="乘机人姓名">
                            <template scope="tabledata1">
                                <div :key="passengers.name" v-for="passengers in tabledata1.row.passengers">
                                    <span>{{passengers.name}}</span><br/>
                                </div>

                            </template>
                        </el-table-column>

                        <el-table-column prop="tickernum" label="票号">
                        </el-table-column>
                        <el-table-column label="航程信息" width="175px">
                            <template scope="tabledata1">
                                <div :key="itinerary.$index" v-for="itinerary in tabledata1.row.segments">

                                    <el-tooltip class="item" effect="dark" :content="itinerary.depDatetime"
                                                placement="bottom">
                                        <span v-html="itinerary.depAirport"></span>
                                    </el-tooltip>
                                    ->
                                    <el-tooltip class="item" effect="dark" :content="itinerary. arrDatetime"
                                                placement="bottom">
                                        <span v-html="itinerary.arrAirport"></span>
                                    </el-tooltip>&nbsp;
                                    <span v-html="itinerary.flightNumber"></span>&nbsp;
                                    <span v-html="itinerary.cabin"></span>&nbsp;
                                    <br/>
                                    <span v-html="itinerary.depDatetime"></span>

                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="otaOrderPrice" label="订单总金额">

                            <template scope="tabledata1">
                                <div>
                                    <label>

                                        {{(tabledata1.row.adultPrice + tabledata1.row.adultTax ) * tabledata1.row.adultNumber + (tabledata1.row.childPrice + tabledata1.row.childTax
                                    ) * tabledata1.row.childNumber}}

                                    </label>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态/操作" width="150">
                            <template scope="scope">
                                <!-- <div class="order_status_btn_cancel" v-if="scope.row.statusCn=='已取消'">{{scope.row.statusCn}}</div> -->
                                <div class="order_status_btn">{{scope.row.statusCn}}</div>
                                <el-button type="text" size="small" @click="getOrderDetails(scope.row)"
                                           class="operation_btn">订单详情
                                </el-button>
                                <el-button type="text" size="small" @click="payment(scope.row)" class="operation_btn"
                                           style="margin-left:0;"
                                           v-if="scope.row.mainStatus== 2 && new Date(scope.row.bookingTime.replace(/-/g,'/')).setMinutes(new Date(scope.row.bookingTime.replace(/-/g,'/')).getMinutes() +30)>=(new Date()).getTime()">
                                    立即支付
                                </el-button>

                                <!-- <el-button type="text" size="small" @click="getOrderDetails(2)" class="operation_btn">已出票页面</el-button> -->

                                <el-button type="text" size="small" @click="getChangeApplication(scope.row)" class="operation_btn" v-if="scope.row.mainStatus== 4">改期
                                </el-button>
                                <el-button type="text" size="small" @click="getRefundApplication(scope.row)" class="operation_btn" v-if="scope.row.mainStatus== 4">退票
                                </el-button>
                                <el-button type="text" size="small" @click="getDisillusionedApplication(scope.row)" class="operation_btn" v-if="scope.row.mainStatus== 4">废票
                                </el-button>
                                <!-- <el-button type="text" size="small" @click="getChangeApplication(scope.row)"
                                           class="operation_btn">改期
                                </el-button>
                                <el-button type="text" size="small" @click="getRefundApplication(scope.row)"
                                           class="operation_btn"> 退票
                                </el-button>
                                <el-button type="text" size="small" @click="getDisillusionedApplication(scope.row)"
                                           class="operation_btn">废票
                                </el-button> -->

                                
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="block" style="float: right;margin: 15px 0;">

                        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
                                       :current-page="pageIndex" :page-size="pageSize"
                                       :page-sizes="[10, 20, 50, 200]" layout="total, sizes, prev, pager, next, jumper"
                                       :total="totalRows">
                        </el-pagination>
                    </div>

                </div>
            </el-card>

        </div>

        <el-dialog :visible.sync="orderDetails" size="large" id="orderDetailsShow">

            <el-dialog
                    width="60%"
                    title="航班信息"
                    :visible.sync="textShow"
                    center
                    append-to-body>
                <div id="orderListContent">

                    <h5>尊敬的旅客,您的航班信息如下</h5>
                    <el-row v-for="segment in detalisData1.segments">

                        <el-col :span="3">
                            {{segment.arrAirport}} {{segment.flightNumber}}
                        </el-col>
                        <el-col :span="5">
                            {{segment.depDatetime}}
                        </el-col>

                        <el-col :span="8">
                            {{segment.depAirportCN}}-{{segment.arrAirportCN}}
                        </el-col>

                        <el-col :span="3">
                            起飞{{segment.depTimeSmall}}
                        </el-col>

                        <el-col :span="3">
                            到达{{segment.arrTimeSmall}}
                        </el-col>
                    </el-row>

                    <el-row style="margin-top:10px;">
                        <h5>请仔细核对!</h5>
                        (注：起飞到达均为当地时间,税金以出票当天为准，客票需按顺序使用)
                    </el-row>

                    <el-row style="margin-top:10px;">

                        <el-col :span="8">折扣票面价格：{{detalisData1.adultPrice}}元</el-col>

                        <el-col :span="8">税金:{{detalisData1.adultTax}}元</el-col>

                        <el-col :span="8">总计:{{detalisData1.adultPrice + detalisData1.adultTax}}元</el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="24">境外服务手续费: 元</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">平台服务费: 元</el-col>
                    </el-row>

                </div>

                <span slot="footer" class="dialog-footer">

                                    <el-button type="primary" @click="copyBtn">复 制</el-button>

                                </span>


            </el-dialog>
            <el-form ref="form" :model="detalisData1" label-width="80px">
                <!-- 用假的状态暂时关闭报价功能 -->
                <header>订单详情
                    <span @click="textShow = true"
                          v-if="detalisData1.mainStatus ==20 || detalisData1.mainStatus ==30 || detalisData1.mainStatus ==50"
                          class="iconfont icon-bianji" style="cursor:pointer"></span>
                          <router-link :to="{path:'/travelItinerary',query:{orderId:currentCheckedOrder}}" id="travelItineraryA">行程单下载</router-link>
                </header>

                <el-card class="box-card">
                    <header>订单信息</header>


                    <!-- <span>{{detalisData1.PNR}}</span> -->
                    <div class="order_search">
                        <el-row>
                            <el-col :span="8">
                                <span>订单号:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.orderId"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>预定时间:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.bookingTime"
                                          :readonly="true"></el-input>

                            </el-col>
                            <el-col :span="8">
                                <span>支付方式:</span>
                                <el-input size="small" class="noneBorder" v-model="paymentTypeCn"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>PNR:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.pnr"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>支付时间:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.paymentTime"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>支付金额:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.totalPrice"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>订单状态:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.statusCn"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>出票时间:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.ticketDatetime"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>支付流水号:</span>
                                <el-input size="small" class="noneBorder" v-text="detalisData1.paymentVoucher"
                                          :readonly="true"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card">
                    <header>航班信息</header>
                    <div class="range_info">

                        <el-table ref="multipleTable"
                                  :data="detalisData1.segments"
                                  tooltip-effect="dark"
                                  style="width: 100%">
                            <el-table-column label="航班号">
                                <template scope="scope">
                                    <span>{{ scope.row.flightNumber }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="舱等/舱位">
                                <template scope="scope">

                                    <span>{{ scope.row.cabinGradeCN}}/{{scope.row.cabin}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出发机场">
                                <template scope="scope">
                                    <span>{{scope.row.depAirport}}{{ scope.row.depAirportCN }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达机场">
                                <template scope="scope">
                                    <span>{{scope.row.arrAirport }}{{scope.row.arrAirportCN }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="起飞时间">
                                <template scope="scope">
                                    <span>{{ (scope.row.depDatetime).replace('T', ' ').substr(0, 16) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达时间">
                                <template scope="scope">
                                    <span>{{ (scope.row.arrDatetime).replace('T', ' ').substr(0, 16) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="去程/回程">
                                <template scope="scope">
                                    <span v-if=" scope.row.itineraryIndex ==1">去程</span>
                                    <span v-if=" scope.row.itineraryIndex ==2">回程</span>
                                </template>
                            </el-table-column>


                        </el-table>

                    </div>
                </el-card>

                <!-- 乘客信息 -->
                <el-card class="box-card">
                    <header>乘客信息</header>

                    <div class="passenger_info">

                        <el-table ref="multipleTable"
                                  :data="detalisData1.passengers"
                                  tooltip-effect="dark"
                                  style="width: 100%">

                            <el-table-column label="姓名">
                                <template scope="scope">
                                    <span>{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="乘客类型">
                                <template scope="scope">
                                    <span>{{ scope.row.ageType == 0 ? '成人' : '儿童' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="性别" width="50">
                                <template scope="scope">
                                    <span>{{ scope.row.gender == 'M' ? '男' : '女' }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出生日期">
                                <template scope="scope">
                                    <span>{{ (scope.row.birthday).replace('T', ' ').substr(0, 10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型" width="80">
                                <template scope="scope">
                                    <!-- <span>{{ scope.row.cardType }}</span> -->

                                    <span v-if="scope.row.cardType=='PP'"> 护照 </span>
                                    <span v-else-if="scope.row.cardType=='GA'"> 港澳通行证</span>
                                    <span v-else-if="scope.row.cardType=='TW'"> 台湾通行证</span>
                                    <span v-else-if="scope.row.cardType=='TB'"> 台胞证</span>
                                    <span v-else-if="scope.row.cardType=='HX'"> 回乡证</span>
                                    <span v-else-if="scope.row.cardType=='HY'"> 国际海员证</span>
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
                                    <span>{{ (scope.row.cardExpired).replace('T', ' ').substr(0, 10) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="票号" v-if="detalisData1.mainStatus==4">

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
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactName"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>联系方式:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactMobile"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮箱:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactEmail"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>地址:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactAddress"
                                          :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮编:</span>
                                <el-input size="small" class="noneBorder" v-model="detalisData1.contactPostcode"
                                          :readonly="true"></el-input>
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
                            <b><span>成人</span></b>
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
                                订单总价： <label
                                    style="font-size:30px;color:#ff8247">&yen;{{detalisData1.totalPrice}}</label>
                            </div>
                        </el-col>
                    </el-row>

                </el-card>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="orderDetails = false">关闭</el-button>
            </div>
        </el-dialog>


    </div>


</template>

<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import orderDetail from 'component/orderDetail'
    import countryJson from 'json/country.json';

    // function newsort(b,a){
    //     return( new Date(a.bookingTime).getTime() - new Date(b.bookingTime).getTime());
    // }

    export default {
        components: {
            orderDetail
        },
        data() {
            return {
                currentCheckedOrder: 0,
                orderDetails: false,
                ticketNo: '',
                orderquest: {
                    flightStartAndEndDate: undefined,
                    pnr: undefined,
                    arrCity: undefined,
                    bookingStartAndEndDate: undefined,
                    passengerName: undefined,
                    orderId: this.$route.query.orderId,
                    ticketNo: undefined,
                    mainStatus: '',
                    depCity: undefined,


                },
                paymentTypeCn: '',
                /*订单状态
                 0 无效状态
                 1 生单失败
                 2 待付款
                 3 待出票
                 4 已出票
                 5 已取消 */
                options: [
                    {name: "全部", key:'',  value:''},
                    {name: "待支付",key:'waitPay', value: "2"},
                    {name: "待出票",key:'waitTicket', value: "3"},
                    {name: "已出票",key:'issueTicket', value: "4"},
                    {name: "已取消",key:'cancel', value: "5"}
                ],
                orderStatus:{},
                detalisData1: {},
                tabledata1: [],
                pageIndex: 1,
                totalPages: 0,
                totalRows: 0,
                pageSize: 10,
                textShow: false,
            };
        },
        methods: {
            refundReset: function () {
                this.orderquest = {
                    flightStartAndEndDate: undefined,
                    pnr: undefined,
                    bookingStartAndEndDate: undefined,
                    passengerName: undefined,
                    orderId: undefined,
                    ticketNo: undefined,
                    mainStatus: '',
                    depCity: undefined,
                    arrCity: undefined,

                };
            },
            getRefundApplication: function (row) {
                orderId: row.orderId
                var RefundApplicationURL = '/refundApplication?orderId=' + row.orderId;
                this.$router.push({path: RefundApplicationURL});
            },
            getDisillusionedApplication: function (row) {
                orderId: row.orderId
                var RefundApplicationURL = '/disillusionedApplication?orderId=' + row.orderId;
                this.$router.push({path: RefundApplicationURL});
            },
            getChangeApplication: function (row) {
                orderId: row.orderId
                var ChangeApplicationURL = '/changeApplication?orderId=' + row.orderId;
                this.$router.push({path: ChangeApplicationURL});
            },
            async getQueryRefundBtn(isBtn) {
                try {

                    var _self = this;
                    var searchObj = Object.assign({}, _self.orderquest);

                    searchObj.pageIndex = this.pageIndex;
                    searchObj.pageSize = this.pageSize;

                    if (isBtn) {
                        _self.pageIndex = 1;

                    }

                    if (searchObj.flightStartAndEndDate != null && searchObj.flightStartAndEndDate.length > 1 && searchObj.flightStartAndEndDate[0] != null) {
                        var depDateStart1 = searchObj.flightStartAndEndDate[0];
                        var depDateEnd1 = searchObj.flightStartAndEndDate[1];

                        searchObj.depDateStart = moment(depDateStart1).format("YYYY-MM-DD");
                        searchObj.depDateEnd = moment(depDateEnd1).format("YYYY-MM-DD")

                    }
                    delete searchObj.flightStartAndEndDate;

                    if (searchObj.bookingStartAndEndDate != null && searchObj.bookingStartAndEndDate.length > 1 && searchObj.bookingStartAndEndDate[0] != null) {
                        var bookDateStart1 = searchObj.bookingStartAndEndDate[0];
                        var bookDateEnd1 = searchObj.bookingStartAndEndDate[1];

                        searchObj.bookDateStart = moment(bookDateStart1).format("YYYY-MM-DD 00:00:00");
                        searchObj.bookDateEnd = moment(bookDateEnd1).format("YYYY-MM-DD 23:59:59");

                    }
                    delete searchObj.bookingStartAndEndDate;


                    //  console.log(bookDateStart1)
                    //  console.log(searchObj.bookDateStart)

                    if (isBtn) {
                        this.pageIndex = 1;
                    }
                    const res = await requestAPIServiceAsync("user/getOrderList.do", searchObj);

                    var tabledata = res.orders;
                    this.tabledata1 = tabledata;

                    this.totalPages = res.totalPage;
                    this.totalRows = res.totalRow;
                    this.getOrderStatusCount();
                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },
            getAllCountryList(){
                return countryJson.CountryInfoList;
            },
            /**
             * 通过指定代码获取中文名
             * @param queryString
             * @returns {*}
             */
            getCountryNameByCode(queryString){

                let res = this.getAllCountryList().filter(e => e.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                if (res.length > 0) {
                    return res[0].ChName;
                } else {
                    return '未知'
                }
            },


            //复制
            copyBtn(){

                const textarea = document.createElement("textarea")
                textarea.style.position = 'fixed'
                textarea.style.top = 0
                textarea.style.left = 0
                textarea.style.border = 'none'
                textarea.style.outline = 'none'
                textarea.style.resize = 'none'
                textarea.style.background = 'transparent'
                textarea.style.color = 'transparent'
                textarea.value = document.getElementById("orderListContent").innerText
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand("copy");
                $(textarea).remove();

                this.textShow = false;


            },
            getOrderDetails: function (row) {

                this.currentCheckedOrder = row.orderId;
                this.detalisData1 = row;

                // if(row.mainStatus==4){
                //  this.ticketNo1 = row.tickets[0].passengers[0].ticketNo;
                //  console.log(this.ticketNo1)
                // }


                if (this.detalisData1.paymentType == 1) {
                    this.paymentTypeCn = "预付款";
                } else if (this.detalisData1.paymentType == 2) {
                    this.paymentTypeCn = "授信";
                } else if (this.detalisData1.paymentType == 3) {
                    this.paymentTypeCn = "支付宝";
                } else if (this.detalisData1.paymentType == 4) {
                    this.paymentTypeCn = "代扣";
                }

                console.log(this.tickets);
                this.orderDetails = true;
            },

            /**立即支付 */
            async payment(row) {
                const loading = this.$loading({
                    lock: true,
                    text: "支付价格校验中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                try {
                    var request = {

                        orderId: row.orderId
                    };
                    const res1 = await APIService("/booking/paycheck.do", request);
                    if (!res1.success) {
                        loading.close();
                        this.$message.error(res1.errorMsg);
                        return;
                    }
                    this.getQueryRefundBtn();
                    loading.close();
                    console.log(row.orderId)
                    var changepayUrl = '/changePay?orderId=' + row.orderId;
                    console.log(changepayUrl)
                    this.$router.push({path: changepayUrl});
                } catch (e) {
                    loading.close();
                    this.$message.error(e.errorMsg || e.statusText);
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
            /**
             * 获取各订单状态数量
             */
         async   getOrderStatusCount(){
                try {
                    const res1 = await APIService("/user/getOrderStatus.do", {});
                    this.orderStatus=res1.orderStatus;
                }catch (error){
                    this.$message.error(error.errorMsg || error.statusText);
                }
            }

        },
        mounted() {
            this.getQueryRefundBtn();
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
        width: 230px;
    }

    .el-card__body {
        font-size: 10px;
    }

    .request > span {
        display: inline-block;
        width: 95px;
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

    .order_status_btn_cancel {
        color: #bbb;
        background: none;
    }
    #travelItineraryA{
        color:#5daf34;
    }
</style>
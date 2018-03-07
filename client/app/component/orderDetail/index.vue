<template>
    <el-form ref="form" :model="detalisData1" label-width="80px">
        <header>订单详情 <span @click="textShow = true" v-if="detalisData1.mainStatus ==2 || detalisData1.mainStatus ==3 || detalisData1.mainStatus ==5" class="iconfont icon-bianji" style="cursor:pointer"></span></header>

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
                        <span>预定时间:</span>
                        <el-input size="small" class="noneBorder" v-model="detalisData1.bookingTime"
                                  :readonly="true"></el-input>

                    </el-col>
                    <el-col :span="8">
                        <span>支付方式:</span>
                     <el-input size="small" class="noneBorder" v-model="paymentTypeCn" :readonly="true"></el-input>
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
                        <el-input size="small" class="noneBorder" v-model="detalisData1.totalPrice" :readonly="true"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span>订单状态:</span>
                        <el-input size="small" class="noneBorder" v-model="detalisData1.statusCn" :readonly="true"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span>出票时间:</span>
                        <el-input size="small" class="noneBorder" v-model="detalisData1.ticketDatetime" :readonly="true"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span>支付流水号:</span>
                        <el-input size="small" class="noneBorder" v-text="detalisData1.paymentVoucher" :readonly="true"></el-input>
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
                            <span>{{ scope.row.gender=='M'?'男':'女' }}</span>
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
                    <!-- <el-table-column label="票号">
                        <template scope="scope">
                            <span>{{ scope.row.ticketno  }}</span>
                        </template>

                    </el-table-column> -->

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
                        <span>地址:</span>
                        <el-input size="small" class="noneBorder" v-model="detalisData1.contactAddress" :readonly="true"></el-input>
                    </el-col>
                     <el-col :span="8">
                        <span>邮编:</span>
                        <el-input size="small" class="noneBorder" v-model="detalisData1.contactPostcode" :readonly="true"></el-input>
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
    


</template>
<script>
    import requestAPIServiceAsync from "js/api";
    import APIService from "js/api";
    import countryJson from 'json/country.json';

    export default {
        name: "orderDetail",
        props: {
            orderId: {
                require: true
            }
        },
        data() {
            return {
                detalisData1: {},
                paymentTypeCn: '',
                textShow: false,
            };
        },
        methods: {
            async getOrderDetailInfo() {
                try {
                    const searchObj = Object.assign({}, {
                        orderId: this.orderId,
                        pageIndex: 1,
                        pageSize: 1
                    });

                    const res = await requestAPIServiceAsync("user/getOrderList.do", searchObj);
                    if (res.hasOwnProperty('orders') && res.orders != undefined && res.orders instanceof Array) {
                        this.detalisData1 = res.orders[0];
                    } else {
                        throw  new Error("找不到对应的订单信息")
                    }
                    if (this.detalisData1.paymentType == 1) {
                        this.paymentTypeCn = "预付款";
                    } else if (this.detalisData1.paymentType == 2) {
                        this.paymentTypeCn = "授信";
                    } else if (this.detalisData1.paymentType == 3) {
                        this.paymentTypeCn = "支付宝";
                    } else if (this.detalisData1.paymentType == 4) {
                        this.paymentTypeCn = "代扣";
                    }

                } catch (error) {
                    this.$message.error(error.errorMsg || error.statusText);
                }
            },
            flightInfoText(){
                    console.log("1111111111")
                    this.textShow = true
            },

            /**
             * 获取所有国家数据
             * @returns {*}
             */
            getAllCountryList(){
                return  countryJson.CountryInfoList;
            },
            /**
             * 通过指定代码获取中文名
             * @param queryString
             * @returns {*}
             */
            getCountryNameByCode(queryString){

               let res= this.getAllCountryList().filter(e=>e.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
               if(res.length>0){
                   return res[0].ChName;
               }else{
                   return '未知'
               }
            }

        },
        async created() {
            await  this.getOrderDetailInfo();
        },
        watch: {
            orderId() {
                if (this.orderId == 0 || this.orderId == undefined) return;
                this.getOrderDetailInfo();
            }
        }
    };
</script>
<style></style>
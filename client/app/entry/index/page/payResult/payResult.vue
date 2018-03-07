<template>

<div class="bgColor" style="min-height:720px;">

     <div class="container">
              
            <el-row>
                        <br>
                        <el-card>
                            <div class="paysuccess" style="color:#eb9e05" v-if="payStatusNow==5">
                                <i class="el-icon-loading"></i>
                                正在获取支付状态...
                            </div>
                            <div class="paysuccess" style="color:#67c23a" v-if="payStatusNow==0">
                                <i class="el-icon-success"></i>
                                支付成功，等待出票
                            </div>
                    
                            <div class="paysuccess" style="color:#66b1ff" v-if="payStatusNow==1">
                                <i class="el-icon-warning"></i>
                                 正在支付，请稍等
                            </div>
                             <div class="paysuccess" style="color:#fa5555" v-if="payStatusNow==2">
                                <i class="el-icon-error"></i>
                                支付失败
                            </div>
                            <br>
                            <el-row>
                                <el-col :span="8">
                                    订单总额：<label v-text="detalisData1.totalPrice" class="money"></label>
                                </el-col>
                                <el-col :span="8">
                                    订单号: <label v-text="detalisData1.orderId" style="margin-top:6px"></label>
                                </el-col>
                                 <el-col :span="8" v-if="payStatusNow==0 ">
                                    支付流水号: <label v-text="tradeNo" style="margin-top:6px"></label>
                                </el-col>
                            </el-row>
                 
                        </el-card>
            </el-row>
                    <br>
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
                                    <span>{{ scope.row.depAirportCN }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="到达机场">
                                <template scope="scope">
                                    <span>{{scope.row.arrAirportCN }}</span>
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
                                    <span v-if="scope.row.itineraryIndex==1" >去程</span>
                                    <span v-if="scope.row.itineraryIndex == 2">回程</span> 
                                </template>
                            </el-table-column>

                        </el-table>

                    </div>
                </el-card>
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
                                    <span>{{ scope.row.ageType==0?'成人':'儿童' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="性别" width="50">
                                <template scope="scope">
                                    <span>{{ scope.row.gender }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="出生日期">
                                <template scope="scope">
                                    <span>{{ (scope.row.birthday).replace('T', ' ').substr(0,10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型" width="80">
                                <template scope="scope">
                                    <span>{{ scope.row.cardType }}</span>
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
      

                        </el-table>

                       </div>
                  </el-card>
                  <el-card class="box-card">
                    <header>订单信息</header>


                    <div class="order_search">
                        <el-row>
                            <el-col :span="8">
                                <span>联系人:</span>
                                <el-input size="small" v-model="detalisData1.contactName" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>联系方式:</span>
                                <el-input size="small" v-model="detalisData1.contactMobile" :readonly="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>邮箱:</span>
                                <el-input size="small" v-model="detalisData1.contactEmail" :readonly="true"></el-input>
                            </el-col>


                        </el-row>
                    </div>
                </el-card>
                    <el-row>
                        <el-col>
                            <el-button type="warning" style="float: right;;width:120px;" @click="goOrderList">
                                      返回订单列表
                            </el-button>
                        </el-col>
                </el-row>
         
             

 
 

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

var currentOrderId = getQueryStringByName("out_trade_no");
var currentPaymentMode = getQueryStringByName("paymentMode");
var is_success = getQueryStringByName("is_success");

export default {
  data() {
    return {
      detalisData1: {
        segments: []
      },

      userId: "",
      orderquest: {
        flightStartAndEndDate: undefined,
        pnr: undefined,
        arrCity: undefined,
        bookingStartAndEndDate: undefined,
        passengerName: undefined,
        orderId: currentOrderId,
        ticketno: undefined,
        mainStatus: undefined,
        depCity: undefined
      },
      payStatusNow: 5,
 
      intervalid1: undefined,
      tradeNo: undefined,
      orderId: currentOrderId,
      paymentMode: currentPaymentMode
    };
  },
  methods: {
    async getQueryRefundBtn(isBtn) {
      try {
        var _self = this;
        var searchObj = Object.assign({}, _self.orderquest);

        searchObj.pageIndex = this.pageIndex;
        searchObj.pageSize = this.pageSize;

        if (isBtn) {
          _self.pageIndex = 1;
        }

        if (isBtn) {
          this.pageIndex = 1;
        }

        const res = await requestAPIServiceAsync(
          "user/getOrderList.do",
          searchObj
        );
        var tabledata = res.orders;
        if (tabledata.length > 0) {
          this.detalisData1 = tabledata[0];
        }
      } catch (error) {
        this.$message.error(error.errorMsg || error.statusText);
      }
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
    goOrderList() {
      this.$router.push({ path: "/orderList" });
    },
    async paymentSerivce() {
        // debugger;
      try {
        // debugger;
        const paramStr = $.param({
          orderId: this.orderId,
          paymentMode: this.paymentMode
        });
        var res = await requestAPIServiceAsync(
          "/payment/getPayStatus.do?" + paramStr,
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
              clearInterval(this.intervalid1);
            } else {
              if (res.status != 1) {
                throw new Error(res.message);
              }
            }
          },
          err => {
            //   debugger
            clearInterval(this.intervalid1);
          }
        );
      } catch (error) {}
    }
  },
  created() {
    // debugger;
    if (is_success == "T") {
      this.getQueryRefundBtn(true);
      this.intervalid1 = setInterval(() => {
        this.paymentSerivce();
      }, 5 * 1000);
    } else {
      this.$message.error("支付失败");
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalid1);
  }
};
</script>


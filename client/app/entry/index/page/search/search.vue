<template>

    <div style="margin-bottom:20px;height:auto;min-height:700px;">
        <div>
            <shoppingSearchBar :adultCount="Shopping1Request.adultNumber"
                               :childCount="Shopping1Request.childNumber"
                               :cabin="Shopping1Request.cabinGrade"
                               @searchClick="searchClick">
            </shoppingSearchBar>

        </div>
        <!-- 循环所有 -->
        <div class="container">
            <div v-if="routingCount == 0 && searchTable" class="searchTable">
                <h3>该航班在请求日期暂无报价，请更换航线或者日期查询。</h3>
            </div>


            <div class="most_div" v-if="dataTableSuccess &&  routingCount !=0">
                <div class="directFirst">
                    <input type="checkbox" name="directFirst" @click="directFirst" id="directFirst">
                    <label for="directFirst">直飞优先</label>

                    <input type="checkbox" name="lowCostAirline" @click="lowCostAirline" id="lowCostAirline">
                    <label for="lowCostAirline">只看廉航</label>


                    <el-select v-model="condictionCarrier" filterable clearable @change="carrierList1Data"
                               size="small">
                        <el-option value="" label="全部航空公司"></el-option>
                        <el-option v-for="item in carrierList" :key="item.code" :label="item.codeCN+'('+item.code+')'" :value="item.code">
                        </el-option>
                    </el-select>

                    <el-select v-model="condictionTransiteAirport" filterable clearable  @change="transAirportListData"
                             
                               size="small">
                        <el-option value="" label="全部中转机场" ></el-option>
                        <el-option v-for="item in transAirportList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>

                    <el-select v-model="transCity" @change="transCityData" filterable clearable  
                               size="small">
                        <el-option value="" label="全部中转地" ></el-option>
                        <el-option v-for="item in transCityList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>


                    <!-- <el-select v-model="cabinGradeData" @change="cabinGradeListData" placeholder="舱位类型" size="small" style="display:none">
                        <el-option value="" label="全部舱位类型"></el-option>
                        <el-option value="Y" label="经济舱"></el-option>
                        <el-option value="S" label="高端经济舱"></el-option>
                        <el-option value="C" label="公务舱"></el-option>
                        <el-option value="F" label="头等舱"></el-option>
                    </el-select> -->

                    <el-select v-model="TakeoffTimeStr" clearable @change="TakeoffTimeData" placeholder="起飞时段"
                               size="small">
                        <el-option value="" label="全部起飞时段" ></el-option>
                        <el-option value="00:00-11:59" label="上午(00:00-11:59)"></el-option>
                        <el-option value="12:00-17:59" label="下午(12:00-17:59)"></el-option>
                        <el-option value="18:00-23:59" label="晚上(18:00-23:59)"></el-option>
                    </el-select>

                    <el-select v-model="ArroffTimeStr"  @change="ArroffTimeData" clearable  placeholder="到达时段" size="small">
                        <el-option value="" label="全部到达时段"> </el-option>
                        <el-option value="00:00-11:59" label="上午(00:00-11:59)"></el-option>
                        <el-option value="12:00-17:59" label="下午(12:00-17:59)"></el-option>
                        <el-option value="18:00-23:59" label="晚上(18:00-23:59)"></el-option>
                    </el-select>

                </div>

                <div class="all_flight" v-if="routingCount !=0">
                    <span class="most_name">所有航班线路 组合</span>
                    <span class="most_result">{{routingCount}}个组合</span>
                    <span class="iconfont  icon-feiji4"></span>
                </div>

                <div class="all_flight" v-if="routingCount !=0">
                    <span class="most_name">性价比最高&yen;{{lowFlightCountPrice}}</span>
                    <span class="most_result">{{Math.round(lowFlightCountDuration / 60, 0) + '小时' + (lowFlightCountDuration % 60) + '分钟'}}</span>
                    <span class="iconfont icon-piao"></span>
                </div>

                <div class="all_flight" v-if="routingCount !=0">
                    <span class="most_name"
                          style="width:101px">飞行时长最短 {{Math.round(lessDuration / 60.0) + '小时' + (lessDuration % 60) + '分钟'}}</span>
                    <span class="most_result">&yen;{{lessDurationPrice}}</span>
                    <span class="iconfont icon-Speed"></span>
                </div>

                <div class="all_flight" style="margin-right:0;width:284px;" v-if="routingCount !=0">
                    <span class="most_name">最低价格 &yen;{{lowestPrice}}</span>
                    <span class="most_result">{{Math.round(lowestPriceDuration / 60.0) + '小时' + (lowestPriceDuration % 60) + '分钟'}} </span>
                    <span class="iconfont icon-renminbi"></span>
                </div>
            </div>
            <!-- 勾选廉航后无结果 -->

            <!-- <div v-if="onlyLCC==true  &&   LCClist.indexOf(routing.validatingCarrier)" class="searchTable">
              <h3>您查询的航班暂时没有廉航航司执飞，请取消勾选查看其他航司报价</h3>
            </div> -->

            <!-- 循环单个 -->
            <div style="border:1px solid #b4bccc; margin-bottom:10px;position:relative;background-color: white;"

                 v-if="(
                          (!onlyLCC || LCClist.indexOf(routing.validatingCarrier)>=0 )&&
                          (TakeoffTime.length ==0 ||(TakeoffTime[0]<= routing.fromSegments[0].depTimeSmall&& TakeoffTime[1]>=routing.fromSegments[0].depTimeSmall)) &&
                          (ArroffTime.length == 0 || (routing.retSegments.length==0 && (ArroffTime[0]<=  routing.fromSegments[routing.fromSegments.length -1].arrTimeSmall && ArroffTime[1]>=routing.fromSegments[routing.fromSegments.length -1].arrTimeSmall) ||
                          (routing.retSegments.length>0 && (ArroffTime[0] <= routing.retSegments[routing.retSegments.length-1].arrTimeSmall && ArroffTime[1]>=routing.retSegments[routing.retSegments.length -1].arrTimeSmall)) )) &&

                          (cabinGradeData == '' || routing.fromSegments[0].cabinGrade ==cabinGradeData )&&
                          (condictionCarrier == '' || routing.validatingCarrier==condictionCarrier)
                          &&
                          (
                              condictionTransiteAirportCode==''
                              ||
                              routing.transiteAirport.indexOf('_'+condictionTransiteAirportCode+'_')>=0
                          )
                          &&
                          (
                              transCityCode==''
                              ||
                              routing.transiteCity.indexOf('_'+transCityCode+'_')>=0
                          )
                         
                        )"
                 v-for="routing in routings" v-bind:key="routing" :key="routing.ID">

                <!-- 去程 -->
                <div class="flightInfoList">
                    <div class="flightNumber">
                        <div style="margin-right: 10px;">
                            <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.fromSegments[0].carrier}.png`"
                                 alt="">
                        </div>
                        <div>
                            <div v-if="routing.fromSegments.length>1">
                                <span>
                                    <label for="">{{(routing.fromSegments[0].carrierCN)}}{{handleSomeCarrierStr(routing.fromSegments)}}</label>
                                    <label for=""> {{handleSomeFlightNumberStr(routing.fromSegments)}}</label>
                                </span>
                            </div>
                            <div v-else>
                                <span>{{routing.fromSegments[0].carrierCN}}({{routing.fromSegments[0].flightNumber}})</span>

                            </div>
                        </div>
                    </div>
                    <div class="flightPassage">

                        <div class="fl_dep">
                            <span>{{routing.fromSegments[0].depTimeSmall}}</span>
                            <span>{{routing.fromSegments[0].depAirport}} {{routing.fromSegments[0].depAirportCN}} {{routing.fromSegments[0].depTerminal}}
                            </span>

                        </div>

                        <div class="fl_time">
               
                            <span>{{(parseInt(routing.goTotalTime / 60)) + '小时' + (routing.goTotalTime % 60)
                            + '分钟'}}</span>
                            <span>
                                <i class="iconfont  icon-straight"></i>
                            </span>
                            <span v-if="routing.fromSegments.length==1">直飞</span>
                            <span v-if="routing.fromSegments.length>1 && routing.fromSegments.length<3">1程中转</span>
                            <span v-if="routing.fromSegments.length>=3">2程中转以上</span>

                        </div>

                        <div class="fl_arr" style="position:relative">
                            <span>{{routing.fromSegments[routing.fromSegments.length - 1].arrTimeSmall}}</span><span class="kuari">{{routing.from_kuari}}</span>
                            <span>{{routing.fromSegments[routing.fromSegments.length - 1].arrAirport}} {{routing.fromSegments[routing.fromSegments.length - 1].arrAirportCN}}
                                  <label v-if="routing.fromSegments[routing.fromSegments.length-1].arrTerminal != '' ">&nbsp;{{routing.fromSegments[routing.fromSegments.length - 1].arrTerminal}}</label>
                            </span>
                        </div>


                    </div>
                    <div class="flightPrice" v-if="routing.retSegments.length>0" style="position: relative;top:71px;">

                        <span>&yen; {{routing.adultPrice + routing.adultTax}}
                            <label>含税</label>
                        </span>

                    </div>
                    <div class="flightPrice" v-else style="color:yellow">

                        <span>&yen; {{routing.adultPrice + routing.adultTax}}
                            <label>含税</label>
                        </span>

                    </div>


                    <div class="flightBtn" v-if="routing.retSegments.length>0" style="position: relative;top:71px;">
                            <span>
                                <el-button @click="handleClick(routing)">预订</el-button>
                            </span>
                        <span v-if="routing.maxSeats<=4">仅剩{{routing.maxSeats}}张</span>
                        <span>
                                <el-button type="text" @click="routing.showDetail=!routing.showDetail;">航班详情</el-button>
                            </span>

                    </div>


                    <div class="flightBtn" v-else style="margin-top:15px;">
                        <span>
                            <el-button @click="handleClick(routing)">预订</el-button>
                        </span>
                        <span v-if="routing.maxSeats<=4">仅剩{{routing.maxSeats}}张</span>
                        <span>
                            <el-button type="text" @click="routing.showDetail=!routing.showDetail;">航班详情</el-button>
                        </span>

                    </div>
                    <div class="bianji" @click="flightInfoText(routing)">
                        <span class="iconfont icon-bianji"></span>
                    </div>
                </div>
                <!-- 回程 -->
                <div class="flightInfoList" v-if="routing.retSegments.length>0">
                    <div class="flightNumber">
                        <div style="margin-right: 10px;">
                            <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.retSegments[0].carrier}.png`"
                                 alt="暂无图标">

                        </div>
                        <div>
                            <div >
                                <label for="">{{(routing.retSegments[0].carrierCN)}}{{handleSomeCarrierStr(routing.retSegments)}}</label>
                                <label for=""> {{handleSomeFlightNumberStr(routing.retSegments)}}</label>
                            </div>

                            

                            

                        </div>
                    </div>
                    <div class="flightPassage">

                        <div class="fl_dep">
                            <span>{{routing.retSegments[0].depTimeSmall}}</span>
                            <span>{{routing.retSegments[0].depAirport}} {{routing.retSegments[0].depAirportCN}} {{routing.retSegments[0].depTerminal}}
                            </span>
                            <!-- <span>PEK 首都国际机场 T3</span> -->
                        </div>

                        <div class="fl_time">
                            <!-- <span>6小时35分</span> -->
                            <span>{{parseInt(routing.retTotalTime / 60) + '小时' + (routing.retTotalTime % 60)
                            + '分钟'}}</span>
                            <span>
                                <i class="iconfont  icon-straight"></i>
                            </span>


                            <span v-if="routing.retSegments.length==1">直飞</span>
                            <span v-if="routing.retSegments.length>1 && routing.retSegments.length<3">1程中转</span>
                            <span v-if="routing.retSegments.length>=3">2程中转以上</span>
                        </div>

                        <div class="fl_arr"  style="position:relative">
                            <span>{{routing.retSegments[routing.retSegments.length - 1].arrTimeSmall}}</span><span class="kuari">{{routing.ret_kuari}}</span>
                            <span>{{routing.retSegments[routing.retSegments.length - 1].arrAirport}} {{routing.retSegments[routing.retSegments.length - 1].arrAirportCN}}
                                {{routing.retSegments[routing.retSegments.length - 1].arrTerminal}}
                            </span>
                        </div>

                    </div>


                </div>
                <transition name="fade">
                    <!-- 航班详情 -->
                    <div style="height:inherit;background:#fff;border-top:1px solid #ccc;" v-if="routing.showDetail">
                        <div class="onlyOneWAY">

                            <div>
                                <div style="width:100px;height:30px;background:#199ed8;color:#fff;text-align:center;line-height:30px;">
                                    去程
                                </div>
                            </div>
                            <flightDetail :Segments="routing.fromSegments"></flightDetail>
                        </div>
                        <div class="ReturnWAY" v-if="routing.retSegments.length>0">

                            <div>
                                <div style="width:100px;height:30px;background:#199ed8;color:#fff;text-align:center;line-height:30px;">
                                    返程
                                </div>
                            </div>
                            <flightDetail :Segments="routing.retSegments"></flightDetail>
                        </div>

                    </div>
                </transition>
            </div>

            <div v-if="otherroutings.length>0 && routings.length>0" class="searchTip">为您查到同城市其他机场的航班组合:</div>
            <div v-if="otherroutings.length>0 && routings.length==0" class="searchTip">未查询到满足条件的航班，为您找到 {{searchDepCity}} – {{searchArrCity}} 的所有航班:</div>
     
            <!-- 循环单个 -->
            <div style="border:1px solid #b4bccc; margin-bottom:10px;position:relative;background-color: white;"

                 v-if="(
                          (!onlyLCC || LCClist.indexOf(routing.validatingCarrier)>=0 )&&
                          (TakeoffTime.length ==0 ||(TakeoffTime[0]<= routing.fromSegments[0].depTimeSmall&& TakeoffTime[1]>=routing.fromSegments[0].depTimeSmall)) &&
                          (ArroffTime.length == 0 || (routing.retSegments.length==0 && (ArroffTime[0]<=  routing.fromSegments[routing.fromSegments.length -1].arrTimeSmall && ArroffTime[1]>=routing.fromSegments[routing.fromSegments.length -1].arrTimeSmall) ||
                          (routing.retSegments.length>0 && (ArroffTime[0] <= routing.retSegments[routing.retSegments.length-1].arrTimeSmall && ArroffTime[1]>=routing.retSegments[routing.retSegments.length -1].arrTimeSmall)) )) &&
                         
                          (cabinGradeData == '' || routing.fromSegments[0].cabinGrade ==cabinGradeData )&&
                          (condictionCarrier == '' || routing.validatingCarrier==condictionCarrier)
                            &&
                          (
                              condictionTransiteAirportCode==''
                              ||
                              routing.transiteAirport.indexOf('_'+condictionTransiteAirportCode+'_')>=0
                          )
                          &&
                          (
                              transCityCode==''
                              ||
                              routing.transiteCity.indexOf('_'+transCityCode+'_')>=0
                          )
                        )"
                 v-for="routing in otherroutings" v-bind:key="routing" :key="routing.ID">

                <!-- 去程 -->
                <div class="flightInfoList">
                    <div class="flightNumber">
                        <div style="margin-right: 10px;">
                            <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.fromSegments[0].carrier}.png`"
                                 alt="暂无图标">
                        </div>
                        <div>
                            <div>
                                <label for="">{{(routing.fromSegments[0].carrierCN)}}{{handleSomeCarrierStr(routing.fromSegments)}}</label>
                                <label for=""> {{handleSomeFlightNumberStr(routing.fromSegments)}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="flightPassage">

                        <div class="fl_dep">
                            <span>{{routing.fromSegments[0].depTimeSmall}}</span>
                            <span>{{routing.fromSegments[0].depAirport}} {{routing.fromSegments[0].depAirportCN}} {{routing.fromSegments[0].depTerminal}}
                            </span>

                        </div>

                        <div class="fl_time">
               
                            <span>{{(parseInt(routing.goTotalTime / 60)) + '小时' + (routing.goTotalTime % 60)
                            + '分钟'}}</span>
                            <span>
                                <i class="iconfont  icon-straight"></i>
                            </span>
                            <span v-if="routing.fromSegments.length==1">直飞</span>
                            <span v-if="routing.fromSegments.length>1 && routing.fromSegments.length<3">1程中转</span>
                            <span v-if="routing.fromSegments.length>=3">2程中转以上</span>

                        </div>

                        <div class="fl_arr"  style="position:relative">
                            <span>{{routing.fromSegments[routing.fromSegments.length - 1].arrTimeSmall}}</span><span class="kuari">{{routing.from_kuari}}</span>
                            <span>{{routing.fromSegments[routing.fromSegments.length - 1].arrAirport}} {{routing.fromSegments[routing.fromSegments.length - 1].arrAirportCN}}
                                  <label v-if="routing.fromSegments[routing.fromSegments.length-1].arrTerminal != '' ">&nbsp;{{routing.fromSegments[routing.fromSegments.length - 1].arrTerminal}}</label>
                            </span>
                        </div>


                    </div>
                    <div class="flightPrice" v-if="routing.retSegments.length>0" style="position: relative;top:71px;">

                        <span>&yen; {{routing.adultPrice + routing.adultTax}}
                            <label>含税</label>
                        </span>

                    </div>
                    <div class="flightPrice" v-else style="color:yellow">

                        <span>&yen; {{routing.adultPrice + routing.adultTax}}
                            <label>含税</label>
                        </span>

                    </div>


                    <div class="flightBtn" v-if="routing.retSegments.length>0" style="position: relative;top:71px;">
                            <span>
                                <el-button @click="handleClick(routing)">预订</el-button>
                            </span>
                        <span v-if="routing.maxSeats<=4">仅剩{{routing.maxSeats}}张</span>
                        <span>
                                <el-button type="text" @click="routing.showDetail=!routing.showDetail;">航班详情</el-button>
                            </span>

                    </div>


                    <div class="flightBtn" v-else style="margin-top:15px;">
                        <span>
                            <el-button @click="handleClick(routing)">预订</el-button>
                        </span>
                        <span v-if="routing.maxSeats<=4">仅剩{{routing.maxSeats}}张</span>
                        <span>
                            <el-button type="text" @click="routing.showDetail=!routing.showDetail;">航班详情</el-button>
                        </span>

                    </div>
                    <div class="bianji" @click="flightInfoText(routing)">
                        <span class="iconfont icon-bianji"></span>
                    </div>
                </div>
                <!-- 回程 -->
                <div class="flightInfoList" v-if="routing.retSegments.length>0">
                    <div class="flightNumber">
                        <div style="margin-right: 10px;">
                            <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.retSegments[0].carrier}.png`"
                                 alt="暂无图标">

                        </div>
                        <div>
                            <div >
                                <label for="">{{(routing.retSegments[0].carrierCN)}}{{handleSomeCarrierStr(routing.retSegments)}}</label>
                                <label for=""> {{handleSomeFlightNumberStr(routing.retSegments)}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="flightPassage">

                        <div class="fl_dep">
                            <span>{{routing.retSegments[0].depTimeSmall}}</span>
                            <span>{{routing.retSegments[0].depAirport}} {{routing.retSegments[0].depAirportCN}} {{routing.retSegments[0].depTerminal}}
                            </span>
                            <!-- <span>PEK 首都国际机场 T3</span> -->
                        </div>

                        <div class="fl_time">
                            <!-- <span>6小时35分</span> -->
                            <span>{{parseInt(routing.retTotalTime / 60) + '小时' + (routing.retTotalTime % 60)
                            + '分钟'}}</span>
                            <span>
                                <i class="iconfont  icon-straight"></i>
                            </span>


                            <span v-if="routing.retSegments.length==1">直飞</span>
                            <span v-if="routing.retSegments.length>1 && routing.retSegments.length<3">1程中转</span>
                            <span v-if="routing.retSegments.length>=3">2程中转以上</span>
                        </div>

                        <div class="fl_arr" style="position:relative">
                            <span>{{routing.retSegments[routing.retSegments.length - 1].arrTimeSmall}}</span><span class="kuari">{{routing.ret_kuari}}</span>
                            <span>{{routing.retSegments[routing.retSegments.length - 1].arrAirport}} {{routing.retSegments[routing.retSegments.length - 1].arrAirportCN}}
                                {{routing.retSegments[routing.retSegments.length - 1].arrTerminal}}
                            </span>
                        </div>

                    </div>


                </div>
                <transition name="fade">
                    <!-- 航班详情 -->
                    <div style="height:inherit;background:#fff;border-top:1px solid #ccc;" v-if="routing.showDetail">
                        <div class="onlyOneWAY">

                            <div>
                                <div style="width:100px;height:30px;background:#199ed8;color:#fff;text-align:center;line-height:30px;">
                                    去程
                                </div>
                            </div>
                            <flightDetail :Segments="routing.fromSegments"></flightDetail>
                        </div>
                        <div class="ReturnWAY" v-if="routing.retSegments.length>0">

                            <div>
                                <div style="width:100px;height:30px;background:#199ed8;color:#fff;text-align:center;line-height:30px;">
                                    返程
                                </div>
                            </div>
                            <flightDetail :Segments="routing.retSegments"></flightDetail>
                        </div>

                    </div>
                </transition>
            </div>


            <div class="search_div" v-show="search_wait">
                <div class="confirm_berths">
                    <div class="loader">

                        <div class="loader-inner ball-clip-rotate-multiple">

                            <div></div>

                            <div></div>

                        </div>

                    </div>
                    <div class="loadingText">
                        <h4>正在搜索全球资源，请稍等…</h4>
                    </div>

                </div>

                <!-- <div class="confirm_berths">
                    <h4>正在确认价格，请稍后......</h4>
                </div> -->

            </div>
            <div class="showImg" v-show="!search_wait && dataTableSuccess ==false">

                暂无图片

            </div>
            <el-dialog :visible.sync="dialogValidate" size="large" id="validateDetailsShow" :before-close="handleClose"
                       @close='closeDialog'>

                <el-dialog
                        width="50%"
                        title="退改 政策"
                        :visible.sync="refundChangePolicyDate"
                        append-to-body>
            
                </el-dialog>
                

                <el-dialog
                        center
                        width="586px"
                        title="生单提醒"
                        :visible.sync="innerVisible"
                        append-to-body>

                    <el-row>
                        <el-col :span="24">
                            <label>
                                <i class="el-icon-info" style="color:#E6A23C;"></i> 当前价格仅限成人预定,如需购买儿童票,重新搜索价格优惠的航班
                            </label>
                        </el-col>
                        <el-col :span="24" style="padding:20px;background:#f6f6f6">
                            <el-col :span="12">
                                <div style="text-align:center;letter-spacing:3.2px;">
                                    成人(大于12岁)
                                </div>
                                <div style="padding-left:54px;margin-top:16px;">
                                    <el-input-number v-model="tempShopping1Request.adultNumber" size="mini" :min="1"
                                                     :max="8"></el-input-number>
                                </div>


                            </el-col>
                            <el-col :span="12">
                                <div style="text-align:center;letter-spacing:3.2px;">
                                    儿童(2~12岁)
                                </div>
                                <div style="padding-left:54px;margin-top:16px;">
                                    <el-input-number v-model="tempShopping1Request.childNumber" size="mini" :min="0"
                                                     :max="8"></el-input-number>
                                </div>

                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <label v-show="tempShopping1Request.childNumber/2 > tempShopping1Request.adultNumber">
                                <i class="el-icon-error" style="color: red"></i> 每名成人最多可携带2名儿童和1名婴儿乘机   </label>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-button type="warning" :loading="isSubmitOrder" style="width:148px;margin-left:66px;"
                                       :disabled="tempShopping1Request.childNumber/2 > tempShopping1Request.adultNumber"
                                       @click="reSearchFlight();innerVisible=false;dialogValidate=false;showWaringChild=false;">
                                重新搜索航班
                            </el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button :loading="isSubmitOrder" style="margin-left:43px;"
                                       @click="tempShopping1Request={adultNumber:1,childNumber:0};innerVisible=false;">
                                返回生单页面填写
                            </el-button>
                        </el-col>


                    </el-row>
                </el-dialog>
                <el-form ref="form" :data="detalisData1">
                    <!--航班信息-->
                    <el-card class="box-card">
                        <header>航班信息</header>
                        <div class="range_info">

                            <el-table ref="multipleTable" :data="segments" tooltip-effect="dark" style="width: 100%">

                                <el-table-column label="航司">
                                    <template scope="scope">
                                        <span>{{ scope.row.carrier }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="航班号">
                                    <template scope="scope">
                                        <span>{{ scope.row.flightNumber }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="出发机场">
                                    <template scope="scope">
                                        <span>{{scope.row.depAirport}}{{ scope.row.depAirportCN }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="到达机场">
                                    <template scope="scope">
                                        <span>{{scope.row.arrAirport}}{{ scope.row.arrAirportCN }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="起飞时间">
                                    <template scope="scope">
                                        <span>{{scope.row.depDatetime }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="到达时间">
                                    <template scope="scope">
                                        <span>{{ scope.row.arrDatetime }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="飞行时长(min)">
                                    <template scope="scope">
                                        <span>{{ scope.row.duration }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="舱等/舱位">
                                    <template scope="scope">

                                        <span>{{scope.row.cabinGradeCN}}/{{scope.row.cabin}}</span>
                                    </template>
                                </el-table-column>


                            </el-table>
                        </div>
                    </el-card>


                    <!-- 联系人信息 -->
                    <el-card class="box-card">
                        <header>乘客信息</header>

                        <div class="passenger_info">

                            <el-table ref="multipleTable" class="passengersCell" :data="passengers"
                                      tooltip-effect="dark">
                                <el-table-column label="姓名" width="200px">

                                    <template scope="scope">


                                        <el-input v-model="scope.row.name" :minlength="3" :maxlength="27" size="small"
                                                  @change="scope.row.name=(scope.row.name).toUpperCase()"
                                                  id="booking_upper1" placeholder="姓名拼音用/分割"></el-input>

                                    </template>

                                </el-table-column>

                                <el-table-column label="乘客类型" width="80px">
                                    <template scope="scope">

                                        <el-select v-model="scope.row.ageType" @change="changeAgeType(scope.row)"
                                                   placeholder=""
                                                   size="small">
                                            <el-option label="成人" :value="0"></el-option>
                                            <el-option label="儿童" :value="1"></el-option>
                                        </el-select>

                                    </template>
                                </el-table-column>
                                <el-table-column label="性别" width="65px">
                                    <template scope="scope">
                                        <el-select size="small" v-model="scope.row.gender" placeholder="">
                                            <el-option label="男" value="M"></el-option>
                                            <el-option label="女" value="F"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="出生日期" width="120px">
                                    <template scope="scope">
                                        <el-date-picker class="pnrBirthday" size="small"
                                                        v-model="scope.row.birthday"
                                                        type="date"
                                                        @change="checkBirthValidate(scope.row)"
                                                        value-format="yyyy-MM-dd" placeholder="">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column label="国籍" width="105px">
                                    <template scope="scope">
                                        <country size="small" :maxlength="2" id="booking_upper2"
                                                 v-model="scope.row.nationality"></country>
                                        <!--<el-input v-model="scope.row.nationality" size="small" :maxlength="2" id="booking_upper2" placeholder=""></el-input>-->
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件类型" width="125px">
                                    <template scope="scope">

                                        <el-select size="small" v-model="scope.row.cardType" placeholder="">
                                            <el-option label="护照" value="PP"></el-option>
                                            <el-option label="港澳通行证" value="GA"></el-option>
                                            <el-option label="台湾通行证 " value="TW"></el-option>
                                            <el-option label="台胞证" value="TB"></el-option>
                                            <el-option label="回乡证" value="HX"></el-option>
                                            <el-option label="国际海员证" value="HY"></el-option>
                                            <el-option label="其他" value="OT"></el-option>
                                        </el-select>

                                    </template>
                                </el-table-column>
                                <el-table-column label="证件号" width="150px;">
                                    <template scope="scope">

                                        <el-input v-model="scope.row.cardNum" size="small" :maxlength="19"
                                                  @change="(scope.row.cardNum)=(scope.row.cardNum).toUpperCase()"
                                                  id="booking_upper4" placeholder=""></el-input>

                                    </template>
                                </el-table-column>
                                <el-table-column label="证件签发地" width="105">
                                    <template scope="scope">
                                        <country size="small" :maxlength="2" id="booking_upper3"
                                                 v-model="scope.row.cardIssuePlace"></country>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件有效期" width="120px">
                                    <template scope="scope">

                                        <el-date-picker size="small" class="pnrBirthday" v-model="scope.row.cardExpired"
                                                        @change="checkCardExpireValidate(scope.row)"
                                                        type="date"
                                                        value-format="yyyy-MM-dd" placeholder="">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">

                                    <template scope="scope">
                                        <div>
                                            <span v-if="passengers.length>1">
                                                 <el-button @click="removePassenger(scope.row)" type="warning"
                                                            style="width: 68px; padding-left: 5px;padding-right: 5px;padding-top: 5px;
                                                    padding-bottom: 5px;">删除
                                                 </el-button>
                                            </span>
                                            <span v-else>

                                            </span>
                                        </div>


                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-row>
                                <el-col :span="3">
                                    <el-button @click="addPassenger" type="warning" style="margin-top:10px;">添加乘客
                                    </el-button>
                                </el-col>
                                <el-col :span="20" v-if="showWaringChild" style="margin-top:16px;">
                                    <div class="showWaringChildDiv">
                                        <i class="el-icon-info" style="color:#E6A23C;"></i>
                                        当前价格仅限成人预订，如需购买儿童票，请 <a href="javascript:void(0)" @click="innerVisible = true;">重新搜索</a>
                                        价格优惠的航班
                                    </div>
                                </el-col>
                            </el-row>


                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <header>联系人信息</header>


                        <div class="order_search">
                            <el-row>
                                <el-col :span="8">
                                    <span>
                                        <label style="color:red">*</label>联系人:</span>
                                    <el-input size="small" v-model="contact.name"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>
                                        <label style="color:red">*</label>联系方式:</span>
                                    <el-input size="small" v-model="contact.mobile"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>
                                        <label style="color:red">*</label>邮箱:</span>
                                    <el-input size="small" v-model="contact.email"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>地址:</span>
                                    <el-input size="small" v-model="contact.address"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>邮编:</span>
                                    <el-input size="small" v-model="contact.postcode"></el-input>
                                </el-col>
                            </el-row>
                        </div>


                    </el-card>
                    <el-card class="box-card" id="orderDetailsPrice">
                        <header>价格信息</header>
                        <el-row style="margin-left: 20px;    color: #5a5e66;">
                            <el-col :span="4">
                                <span>乘客类型</span>
                            </el-col>
                            <el-col :span="4">
                                <span>人数(位)</span>
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

                        <el-row style="margin-left: 20px;" v-if="adultCount!=''">
                            <el-col :span="4">
                                <span>成人</span>
                            </el-col>

                            <el-col :span="4">
                                <!-- <span>{{detalisData1.adultCount}}</span> -->
                                <span>{{adultCount}}</span>
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

                        <el-row style="margin-left: 20px;" v-if="childCount!=''">
                            <el-col :span="4">
                                <span>儿童</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{childCount}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{detalisData1.childPrice || detalisData1.childPrice1 || 0}}</span>

                            </el-col>
                            <el-col :span="4">
                                <span>{{detalisData1.childTax || detalisData1.childTax1 || 0}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span>0</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{((detalisData1.childPrice || detalisData1.childPrice1 || 0) + (detalisData1.childTax || detalisData1.childTax1 || 0))}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:10px;">
                            <el-col>
                                <div style="float:right;margin-right:50px;">
                                    机票价格：
                                    <label style="font-size:30px;color:#ff8247">&yen;{{(detalisData1.adultPrice +
                                    detalisData1.adultTax) * adultCount + ((detalisData1.childPrice || detalisData1.childPrice1 || 0)
                                    + (detalisData1.childTax || detalisData1.childTax1 || 0)) * childCount}}</label>
                                </div>
                            </el-col>
                        </el-row>

                    </el-card>

                    <el-card class="box-card">
                        <header>客规</header>
                        <div class="rule_info" style="position:relative">
                            <el-form label-position="left" class="demo-table-expand">
                                <el-form-item label="退票规定">
                                    <span>{{textrule.validateRefundCn}}</span>
                                </el-form-item>
                                <el-form-item label="改期规定">
                                    <span>{{textrule.validateChangeCn}}</span>
                                </el-form-item>
                                <el-form-item label="行李额规定">
                                    <span>{{textrule.validatebaggageCn}}</span>
                                </el-form-item>
                                <el-form-item label="票本说明">
                                    <span>{{rule.ticketRemarkCn}}</span>
                                </el-form-item>
                                <el-form-item label="其他说明">
                                    <span>无</span>
                                </el-form-item>
                            </el-form>
                            <el-button class="policyBtn" @click="refundChangePolicy">退改政策</el-button>
                        </div>
                    </el-card>

                    <el-row>

                        <el-button type="primary" :loading="isSubmitOrder" style="float:right;margin-bottom: 20px"
                                   @click="submitOrder()">
                            {{submitBtnContent}}
                        </el-button>
                    </el-row>
                </el-form>
            </el-dialog>

            <!--是否支付 -->
            <el-dialog title="订单详情" :visible.sync="prepareToPay" size="large" id="orderDetailsShow">
                <el-dialog
                        width="50%"
                        title="退改 政策"
                        :visible.sync="refundChangePolicyDate"
                        append-to-body>
                    等待接口
                </el-dialog>
                <el-form ref="form" :data="detalisData1" label-width="80px">

                    <el-card class="box-card" id="orderDetailsPrice">
                        <header>价格信息</header>
                        <el-row style="margin-left:63px;     color: #5a5e66;">
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
                        <el-row style="margin-left:63px;">
                            <el-col :span="4">
                                <b>
                                    <span>成人</span>
                                </b>
                            </el-col>
                            <el-col :span="4">
                                <span>{{adultCount}}</span>
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
                                <span>{{(detalisData1.adultPrice + detalisData1.adultTax) * (adultCount)}}</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-left:63px;" v-if="childCount > '0'">
                            <el-col :span="4">
                                <span>儿童</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{childCount}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{detalisData1.childPrice || detalisData1.childPrice1 || 0}}</span>

                            </el-col>
                            <el-col :span="4">
                                <span>{{detalisData1.childTax || detalisData1.childTax || 0}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span>0</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{((detalisData1.childPrice || detalisData1.childPrice1 || 0) + (detalisData1.childTax || detalisData1.childTax1 || 0)) * (childCount)}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:10px;">
                            <el-col>
                                <div style="float:right;margin-right:50px;">
                                    机票价格：
                                    <label style="font-size:30px;color:#ff8247">&yen;{{(detalisData1.adultPrice +
                                    detalisData1.adultTax) * adultCount + ((detalisData1.childPrice || detalisData1.childPrice1 || 0)
                                    + (detalisData1.childTax || detalisData1.childTax1 || 0)) * childCount}}</label>
                                </div>
                            </el-col>
                        </el-row>

                    </el-card>

                    <el-card class="box-card">
                        <header>航班信息</header>
                        <div class="range_info">

                            <el-table ref="multipleTable" :data="segments" tooltip-effect="dark" style="width: 100%">
                                <el-table-column label="航班号">
                                    <template scope="scope">
                                        <span>{{ scope.row.flightNumber }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="舱等/舱位">
                                    <template scope="scope">
                                        <span>{{scope.row.cabinGradeCN}}/{{scope.row.cabin}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="出发机场">
                                    <template scope="scope">
                                        <span>{{scope.row.depAirport}}{{ scope.row.depAirportCN }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="到达机场">
                                    <template scope="scope">
                                        <span>{{scope.row.arrAirport}}{{scope.row.arrAirportCN }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="起飞时间">
                                    <template scope="scope">
                                        <span>{{ scope.row.depDatetime }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="到达时间">
                                    <template scope="scope">
                                        <span>{{scope.row.arrDatetime}}</span>
                                    </template>
                                </el-table-column>

                            </el-table>

                        </div>
                    </el-card>

                    <!-- 乘客信息 -->
                    <el-card class="box-card">
                        <header>乘客信息</header>

                        <div class="passenger_info upper">

                            <el-table ref="multipleTable" :data="passengers" tooltip-effect="dark" style="width: 100%">

                                <el-table-column label="姓名">
                                    <template scope="scope">
                                        <span class="upper">{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="乘客类型">
                                    <template scope="scope">
                                        <span>{{ scope.row.ageType == 0 ? '成人' : '儿童' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="性别" width="50" prop="gender">
                                    <template scope="scope">
                                        <label v-if="scope.row.gender=='M'">男</label>
                                        <label v-if="scope.row.gender=='F'">女</label>
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
                                        <span v-if="scope.row.cardType=='GA'"> 港澳通行证</span>
                                        <span v-if="scope.row.cardType=='TW'"> 台湾通行证</span>
                                        <span v-if="scope.row.cardType=='TB'"> 台胞证</span>
                                        <span v-if="scope.row.cardType=='HX'"> 回乡证</span>
                                        <span v-if="scope.row.cardType=='HY'"> 国际海员证</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件号" width="100">
                                    <template scope="scope">
                                        <span>{{ scope.row.cardNum }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件签发地" width="120">
                                    <template scope="scope">
                                        <span class="upper">{{ getCountryNameByCode(scope.row.cardIssuePlace) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="国籍" width="120">
                                    <template scope="scope">
                                        <span class="upper">{{getCountryNameByCode(scope.row.nationality) }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件有效期">
                                    <template scope="scope">
                                        <span>{{ (scope.row.cardExpired).replace('T', ' ').substr(0, 10) }}</span>
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
                                    <el-input size="small" class="noneBorder" v-model="contact.name"
                                              :readonly="true"></el-input>


                                </el-col>
                                <el-col :span="8">
                                    <span>联系方式:</span>
                                    <el-input size="small" class="noneBorder" v-model="contact.mobile"
                                              :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>邮箱:</span>
                                    <el-input size="small" class="noneBorder" v-model="contact.email"
                                              :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>地址:</span>
                                    <el-input size="small" class="noneBorder" v-model="contact.address"
                                              :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <span>邮编:</span>
                                    <el-input size="small" class="noneBorder" v-model="contact.postcode"
                                              :readonly="true"></el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <header>客规</header>
                        <div class="rule_info" style="position:relative">
                            <el-form label-position="left" class="demo-table-expand">
                                <el-form-item label="退票规定">
                                    <span>{{textrule.validateRefundCn}}</span>
                                </el-form-item>
                                <el-form-item label="改期规定">
                                    <span>{{textrule.validateChangeCn}}</span>
                                </el-form-item>
                                <el-form-item label="行李额规定">
                                    <span>{{textrule.validatebaggageCn}}</span>
                                </el-form-item>
                                <el-form-item label="票本说明">
                                    <span>{{rule.ticketRemarkCn}}</span>
                                </el-form-item>
                                <el-form-item label="其他说明">
                                    <span>无</span>
                                </el-form-item>
                            </el-form>
                            <el-button class="policyBtn" @click="refundChangePolicy">退改政策</el-button>
                        </div>
                    </el-card>


                </el-form>
                <div slot="footer" class="dialog-footer">


                    <!-- <el-button style=" margin-right: 5px;float: right;width: 84px;padding-left: 5px;padding-right: 5px;" @click="prepareToPay =false">取消订单</el-button> -->
                    <el-button style="margin-right:5px;float:right;width:84px;" type="warning"
                               :disabled="!haveRemainingTime" @click="gotoPay()">支付
                    </el-button>
                    <div class="payTimehints" v-show="haveRemainingTime" style="width:400px;">
                        <span>生单时间：{{bookingDatetime}}</span>
                        <span style="color:#ff5452;">剩余支付时间：
                            <label>{{remainingTimeStr}}</label>
                        </span>
                    </div>


                </div>
            </el-dialog>
            <!-- 文本信息 -->
            <el-dialog title="航班信息" :visible.sync="textShow" :data="routing" size="small" width="60%" center>

                <div id="content"
                     v-if="textRouting.hasOwnProperty('fromSegments') && textRouting.fromSegments instanceof  Array">
                    <h5>尊敬的旅客,您的航班信息如下</h5>

                    <el-row v-for="fromSegment in (textRouting.fromSegments.concat(textRouting.retSegments))">

                        <el-col :span="2">
                            {{fromSegment.flightNumber}}
                        </el-col>
                        <el-col :span="2">
                            {{(fromSegment.depDatetime).substr(5, 2)}}月{{(fromSegment.depDatetime).substr(8, 2)}}日
                        </el-col>

                        <el-col :span="13" style="text-align:center">
                            {{fromSegment.depAirport}}{{fromSegment.depAirportCN}}-{{fromSegment.arrAirport}}{{fromSegment.arrAirportCN}}
                        </el-col>

                        <el-col :span="3">
                            起飞{{fromSegment.depTimeSmall}}
                        </el-col>

                        <el-col :span="3">
                            到达{{fromSegment.arrTimeSmall}}
                        </el-col>
                    </el-row>
                    <div style="height:10px;width:100%"></div>

                    <el-row style="margin-top:10px;">
                        <h5>请仔细核对!</h5>
                        (注：起飞到达均为当地时间,税金以出票当天为准，客票需按顺序使用)
                    </el-row>

                    <el-row style="margin-top:10px;">

                        <el-col :span="6">折扣票面价格：{{textRouting.adultPrice}}元</el-col>
                        <br/>
                        <el-col :span="6">税金：{{textRouting.adultTax}}元</el-col>
                        <br/>
                        <el-col :span="6">总计：{{textRouting.adultPrice + textRouting.adultTax}}元</el-col>
                    </el-row>
                    <el-row>
                        <br/>
                        <el-col :span="24">客票包含行李：{{(textrule.baggageInfoListCN)}}</el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="24">客票退改规则为：

                            <span v-for="refundFee1 in textrule.refundInfoList">
                               <label v-if="refundFee1.refundFee=='0'">退票:{{textrule.refundCn}}</label>
                               <label v-else>退票：{{refundFee1.refundFee}}元;</label>
                           </span>


                            <span v-for="changesFee1 in textrule.changesInfoList">
                                <label v-if="changesFee1.changesFee=='0'">改期:{{textrule.changeCn}}</label>
                                <label v-else>改期：{{changesFee1.changesFee}}元;</label>
                              </span>

                            <span>
                                  <label>误机费 元</label>
                              </span>

                        </el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="24">境外服务手续费: 元</el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="24">平台服务费: 元</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">{{textrule.note}}</el-col>
                    </el-row>
                </div>


                <span slot="footer" class="dialog-footer">

                            <el-button type="primary" @click="copyBtn">复 制</el-button>

                         </span>


            </el-dialog>

        </div>

    </div>

</template>
<script>
    import flightCity from "./flightCity.vue";
    import shoppingSearchBar from "component/shoppingSearchBar/shoppingSearchBar.vue";
    import flightDetail from "component/flightDetail/flightDetail.vue";
    import country from "component/country";
    import APIService from "js/api";
    import countryJson from 'json/country.json';

    function testSort(a, b) {
        return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
    }
    function testSort1(a, b) {
        const a0 = (a.fromSegments.length || 0) + (a.retSegments.length || 0);
        const b0 = (b.fromSegments.length || 0) + (b.retSegments.length || 0);
        // routing.fromSegments.length==1
        if (a0 == b0) {
            return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
        } else {
            return a0 - b0;
        }

        if (a0 == b0) {
            return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
        }
        else {
            return a0 - b0;
        }

        //    return((a.adultPrice+a.adultTax)-(b.adultPrice+b.adultTax))
    }
    function takeoffTimeSort(a, b) {


        const taketimeA = (a.fromSegments[0].depTimeSmall);
        const taketimeB = (b.fromSegments[0].depTimeSmall);
        if (taketimeA == taketimeB) {
            return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
        } else {
            if (taketimeA > taketimeB) return 1;
            else return -1;
        }

    }
    function arroffTimeSort(a, b) {


        if(a.retSegments.length == 0){
            const arrTimeA = (a.fromSegments[a.fromSegments.length - 1 ].arrTimeSmall);
            const arrTimeB = (b.fromSegments[b.fromSegments.length - 1 ].arrTimeSmall);
            if(arrTimeA == arrTimeB){
                return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
            }else {
                   if (arrTimeA > arrTimeB) return 1;
                   else return -1; 
            } 
        }else {
            const arrTimeC = (a.retSegments[a.retSegments.length -1].arrTimeSmall); 
            const arrTimeD = (b.retSegments[a.retSegments.length -1].arrTimeSmall);
            if(arrTimeC == arrTimeD){
                return a.adultPrice + a.adultTax - (b.adultPrice + b.adultTax);
            }else {
                   if (arrTimeC > arrTimeD) return 1;
                   else return -1; 
            } 
        }


    }
    function getTimeStr(date1Str, date2) {
        var date1 = new Date(Date.parse(date1Str.replace(/-/g, "/")));
        date1.setMinutes(date1.getMinutes() + 30);
        var result = "";
        var seconds = parseInt((date1 - date2) / 1000);
        if (seconds <= 0) {
            return "";
        }
        var minute = parseInt(seconds / 60);
        var second = seconds - minute * 60;
        return (result = minute + "分" + second + "秒");
    }

    export default {
        data() {
            return {
                showWaringChild: false,
                innerVisible: false,
                tempShopping1Request: {
                    adultNumber: 1,
                    childNumber: 0,
                },

                transAirportList1: "",
                carrierList1: "",
                transAirportList: [],
                transCityList: [],
         
                carrierList: [],
                dataTableSuccess: false,
                searchTable: false,
                remainingTimeStr: "",
                hasRemain: false,
                dialogValidate: false,
                refundChangePolicyDate: false,
                prepareToPay: false,
                haveRemainingTime: true,
                textShow: false,

                tripType: {},
                contact: {},
                onlyLCC: false,
                segments: [],
                rule: {},
                textrule: {},
                routing: {},
                textRouting: {},
                detalisData1: {},
                select: "",
                input: "",
                date: "",
                LCClist: "|0B|3K|3L|3O|4O|4U|5B|5J|5W|6E|7C|9C|A5|AD|AK|AQ|B6|BC|BL|BV|BY|D7|D8|DD|DG|DJ|DM|DS|DY|E8|EW|F7|F9|FA|FD|FL|FN|FR|FY|FZ|G3|G4|G8|G9|GK|GR|H2|HB|HG|HV|I4|I5|IG|IJ|IT|IX|J9|JE|JQ|JT|JW|JX|KK|LB|LS|MJ|MM|MN|NK|NL|NO|OD|PC|PD|PN|PQ|Q6|QG|QZ|S8|SG|SL|SX|T3|TO|TR|TS|TT|TW|TZ|U2|UO|V7|V9|VB|VF|VJ|VY|VZ|W5|W6|WG|WN|WS|WW|WX|X3|XJ|XQ|XT|XW|XY|Y4|Y5|YB|YT|Z2|ZB|ZE|ZL|ZV|",
                sortType: 0,
                search_wait: false,
                passengers: [
                    {
                        name: '',
                        ageType: 0,
                        gender: "M",
                        nationality: "",
                        cardType: "PP",
                        cardNum: "",
                        birthday: "",
                        cardIssuePlace: "",
                        cardExpired: "",
                        id: 1
                    }
                ],

                adultCount: 1,
                childCount: 0,
                maxPassengerCount: 9,
                from_dep_city: undefined,
                from_arr_city: undefined,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                Shopping1Request: {
                    cid: undefined,
                    tripType: undefined,
                    adultNumber: 1,
                    childNumber: 0,
                    fromCity: undefined,
                    toCity: undefined,
                    fromType:'city',
                    toType:'city',
                    fromDate: undefined,
                    retDate: undefined
                },
                routings: [],
                otherroutings: [],
                searchDepCity:"",
                searchArrCity:"",
                lowestPrice: null,
                lowestPriceDuration: null,
                lessDuration: null,
                lessDurationPrice: null,
                lowFlightCount: null,
                lowFlightCountDuration: null,
                lowFlightCountPrice: null,
                routingCount: 0,
                dataTripType: 1,
                username: null,
                token: null,
                orderId: null,
                userId: null,
                bookingDatetime: null,
                condictionTransiteAirport: "",
                transCity: '',
                condictionTransiteAirportCode: "",
                transCityCode: '',
                cabinGradeData: '',
                TakeoffTimeStr: '',
                ArroffTimeStr: '',
                TakeoffTime: [],
                ArroffTime: [],
                selectableRange: '',
                condictionCarrier: "",

                isSubmitOrder: false,
                submitBtnContent: "提交订单"
            };
        },
        methods: {

            /**
             * 计算时长
             * @augments 航段
             */
            calcDifferenceTimes(segments) {
                var segmentLength = segments.length;
                var flightAllTimes1 = 0;

                segments
                    .sort((a, b) => a.segmentIndex - b.segmentIndex)
                    .forEach((segment, index, array) => {
                        if (segmentLength > index + 1) {
                            flightAllTimes1 +=
                                parseInt(
                                    (new Date(array[index + 1].depDatetime).getTime() -
                                    new Date(segment.arrDatetime).getTime()) /
                                    (60 * 1000)
                                );
                        }
                    });
                if (flightAllTimes1 == 0)
                    flightAllTimes1 = segments[0].duration

                return flightAllTimes1;
            },
            getAllCountryList(){
                return countryJson.CountryInfoList;
            },
            getCountryNameByCode(queryString){

                let res = this.getAllCountryList().filter(e => e.ShortEnName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                if (res.length > 0) {
                    return res[0].ChName;
                } else {
                    return '未知'
                }
            },
            async searchClick(requestData) {
                if (requestData.tripType > 1 && requestData.retDate.length == 0) {
                    this.$message.error("请选择返程日期");
                    return;
                }
                this.searchDepCity=""
                this.searchArrCity=""
                this.dataTableSuccess = false;
                this.search_wait = true;
                this.routings = [];
                this.otherroutings = [];
                this.searchTable = false;
                this.Shopping1Request = requestData;

                try {
                    const res1 = await APIService("/shopping/shoppingList.do", requestData);

                    if (!res1.success) {
                        this.$message.error(res1.errorMsg);
                        return;
                    }

                    this.searchDepCity=res1.fromCityCN
                    this.searchArrCity=res1.toCityCN
                    this.sortType = 0
                    var res = res1.orgShopping1Response;

                    this.dataTableSuccess = true;
                    this.carrierList = res.carrierList;
                    this.transAirportList = res.transAirportList;
                    this.transCityList = res.transCityList;
                    this.lowestPrice = res.lowestPrice;
                    this.lowestPriceDuration = res.lowestPriceDuration;
                    this.lessDuration = res.lessDuration;
                    this.lessDurationPrice = res.lessDurationPrice;
                    this.lowFlightCount = res.lowFlightCount;
                    this.lowFlightCountDuration = res.lowFlightCountDuration;
                    this.lowFlightCountPrice = res.lowFlightCountPrice;
                    this.routingCount = res.routings.length+res.otherroutings.length;
                    this.onlyLCC = false;
                    this.dataTripType = requestData.tripType;
                    this.condictionCarrier = "";
                    this.condictionTransiteAirport = "";
                    this.transCity = "";
                    this.condictionTransiteAirportCode= "";
                    this.transCityCode= '';
                

                    this.routings = this.setRoutingList(res.routings);
                    this.routings.sort(testSort);

                    this.otherroutings = this.setRoutingList(res.otherroutings);
                    this.otherroutings.sort(testSort);

                    if (this.routingCount == 0) {
                        this.searchTable = true;
                    } else {
                        this.searchTable = false;
                    }
                    // }
                    this.search_wait = false;
                } catch (e) {
                    this.$message.error(e.errorMsg || e.statusText);
                    this.search_wait = false;
                }
            },

            setRoutingList(routingList)
            {
                var routings=routingList

                routings.forEach(item => {
                    item.showDetail = false;

                    var goTotalTime = 0;
                    var retTotalTime = 0;

                    for (var i = 0; i < item.fromSegments.length; i++) {
                        var segment = item.fromSegments[i];
                        segment.transTime = 0;
                        if (i > 0) {
                            var transTime = (new Date(segment.depDatetime).getTime() -
                                new Date(item.fromSegments[i - 1].arrDatetime).getTime()) /
                                (60 * 1000)
                            segment.transTime = transTime;
                            goTotalTime += transTime;
                        }
                        goTotalTime += segment.duration;
                    }
                    for (var i = 0; i < item.retSegments.length; i++) {
                        var segment = item.retSegments[i];
                        segment.transTime = 0;
                        if (i > 0) {
                            var transTime = (new Date(segment.depDatetime).getTime() -
                                new Date(item.retSegments[i - 1].arrDatetime).getTime()) /
                                (60 * 1000)
                            segment.transTime = transTime;
                            retTotalTime += transTime;
                        }
                        retTotalTime += segment.duration;
                    }
                    item.goTotalTime = goTotalTime
                    item.retTotalTime = retTotalTime

                });

                return routings;
            },
            addPassenger() {
                this.maxPassengerCount = this.detalisData1.maxSeats;
                if (this.passengers.length < this.maxPassengerCount) {
                    this.passengers.push({
                        name: "",
                        ageType: 0,
                        gender: "M",
                        nationality: "",
                        cardType: "PP",
                        cardNum: "",
                        birthday: "",
                        cardIssuePlace: "",
                        cardExpired: "",
                        id: this.passengers.length > 0 ? ( this.passengers[this.passengers.length - 1].id + 1) : (1)
                    });
                    this.adultCount = this.adultCount + 1;
                } else {
                    window.app1.$message.error("超过了可预订的乘客数量，添加失败");
                    return;
                }
            },
            /**
             * 验证乘客正确与否
             * @param psgItem 当前操作乘客
             * @param operatorType 1：删除乘客 2:修改乘客类型
             */
            validatePsger(psgItem, operatorType){

                let validate = false;
                try {

                    let adtCounts = 0, chdCount = 0;
                    this.passengers.forEach(psg => {
                        if (psg.ageType == 0) adtCounts++;
                        else if (psg.ageType == 1) chdCount++;
                    });

                    if (chdCount == this.passengers.length || (adtCounts == 1 && psgItem.ageType == 0 && operatorType == 1)) {
                        if (operatorType == 2) {
                            psgItem.ageType = 0;
                        }
                        throw new Error("不可单独乘机：12周岁以下的乘客须由18周岁以上的同等舱位成人陪同登机");
                    }
                    if (chdCount / 2 > adtCounts) {
                        psgItem.ageType = 0;
                        throw new Error("每名成人最多允许携带两名儿童登机");
                    }
                    if ((this.detalisData1.childPrice + this.detalisData1.childTax < 1 ) && psgItem.ageType == 1 && operatorType == 2) {
                        this.showWaringChild = true;
                        this.detalisData1.childPrice1 = this.detalisData1.adultPrice;
                        this.detalisData1.childTax1 = this.detalisData1.adultTax;

                    }
                    if ((chdCount == 0 || (chdCount == 1 && psgItem.ageType == 1 && operatorType == 1)) && (this.showWaringChild)) {
                        this.showWaringChild = false;
                    }

                    validate = true;

                } catch (error) {
                    this.$message.error(error.message);
                }
                return validate;
            },
            /**
             * 计算乘客数
             */
            calculatePsger(){
                let adtCounts = 0, chdCount = 0;
                this.passengers.forEach(psg => {
                    if (psg.ageType == 0) adtCounts++;
                    else if (psg.ageType == 1) chdCount++;
                });
                this.adultCount = adtCounts;
                this.childCount = chdCount;
            },
            removePassenger(psg) {
                if (this.validatePsger(psg, 1)) {
                    this.passengers.splice(this.passengers.indexOf(psg), 1);
                    this.calculatePsger();
                }
            },
            changeAgeType(scope) {
                if (this.validatePsger(scope, 2)) {
                    this.calculatePsger();
                    this.checkBirthValidate(scope);
                }
            },
            //选择航空公司
            carrierList1Data() {
                // console.log(this.condictionCarrier);
            },
            //选择中转地
            transCityData() {
                
                var list=this.transCity.split('(')
                if(list.length>1)
                    this.transCityCode=list[1].substr(0,3)
                else
                    this.transCityCode=""
            },
            //选择中转机场
            transAirportListData() {
                
                var list=this.condictionTransiteAirport.split('(')
                if(list.length>1)
                    this.condictionTransiteAirportCode=list[1].substr(0,3)
                else
                    this.condictionTransiteAirportCode=""
            },
            directFirst() {
                //直飞优先
                if (this.sortType == 0) {
                    this.sortType = 1;
                    this.routings.sort(testSort1);
                    this.otherroutings.sort(testSort1);
                } else {
                    //默认
                    this.sortType = 0;
                    this.routings.sort(testSort);
                    this.otherroutings.sort(testSort);
                }
            },
            lowCostAirline(){
                if (this.onlyLCC == false) {
                    this.onlyLCC = true;
                    // console.log(this.LCClist)
                    this.routings.sort(testSort);
                    this.otherroutings.sort(testSort);
                }
                else {
                    this.onlyLCC = false
                    this.routings.sort(testSort);
                    this.otherroutings.sort(testSort);
                }
            },
            // 弹出文本
            flightInfoText(routing){
                this.textRouting = routing;
                this.textrule = routing.rule;
                this.textShow = true;
            },

            // 复制文本
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
                textarea.value = document.getElementById("content").innerText
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand("copy");
                $(textarea).remove();

                this.textShow = false;


            },
            /**
             * 退改政策
             */
            refundChangePolicy(){
                this.refundChangePolicyDate = true;
            },

            cabinGradeListData() {

            },
            /**起飞时间段 */
            TakeoffTimeData(){

                if (this.TakeoffTimeStr != '') {
                    this.TakeoffTime = this.TakeoffTimeStr.split('-')

                }
                else {
                    this.TakeoffTime = []
                }

                this.routings.sort(takeoffTimeSort)

            },
            /**
             * 到达时间段
             */
            ArroffTimeData(){
                if (this.ArroffTimeStr != '') {
                    this.ArroffTime = this.ArroffTimeStr.split('-')
                }
                else {
                    this.ArroffTime = []
                }
                this.routings.sort(arroffTimeSort)
            },

            async submitOrder() {
                if (this.adultCount == '0') {
                    this.$message.error("不可单独乘机：12周岁以下的乘客须由18周岁以上的同等舱位成人陪同登机");
                    return;
                }

                if (
                    this.contact.name == undefined ||
                    this.contact.mobile == undefined ||
                    this.contact.email == undefined
                ) {
                    this.$message.error("请将联系人信息填写完整");
                    return;
                }

                //验证乘客联系方式
                if (!(/^((13[0-9]{1})|159|153|185|170|186|133|180|181|189|177|173|149|155|156|145|185|176|175|134135|150|151|152|157|158|159|182|183|184|187|188|147|178)+\d{8}$/.test(this.contact.mobile))) {
                    this.$message.error("联系方式格式不正确");
                    return;
                }
                if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.contact.email))) {
                    this.$message.error("邮箱格式不正确")
                    return;
                }

                for (let psg of this.passengers) {
                    let index = this.passengers.indexOf(psg) + 1;
                    if (psg.name == undefined || psg.name.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的姓名没有填写");
                        return;
                    }
                    if (psg.name.indexOf("/") < 0) {
                        this.$message.error("乘客姓与名的大写拼音需要 / 分割");
                        return;
                    }

                    if (psg.birthday == undefined || psg.birthday.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的生日没有填写");
                        return;
                    }
                    if (psg.nationality == undefined || psg.nationality.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的国籍没有填写");
                        return;
                    }
                    if (psg.cardNum == undefined || psg.cardNum.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的证件号没有填写");
                        return;
                    }
                    if (psg.cardIssuePlace == undefined || psg.cardIssuePlace.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的证件签发地没有填写");
                        return;
                    }
                    if (psg.cardExpired == undefined || psg.cardExpired.toString().trim() == "") {
                        this.$message.error("第" + (index) + "位的证件有效期没有填写");
                        return;
                    }
                }

                //处理按钮状态
                this.isSubmitOrder = true;
                this.submitBtnContent = "您的订单正在生成中，请稍等…";

                try {
                    var request = {
                        data: this.detalisData1.data,
                        passengers: this.passengers,
                        contact: this.contact
                    };

                    const res1 = await APIService("/booking/booking.do", request);

                    this.maxPassengerCount = res1.maxSeat;
                    this.orderId = res1.orderId;
                    this.bookingDatetime = res1.bookingDatetime;
                    this.hasRemain = true;
                    this.dialogValidate = false;
                    this.prepareToPay = true;

                    this.isSubmitOrder = false;
                    this.submitBtnContent = "提交订单";


                } catch (e) {
                    this.$message.error("生单失败，请联系管理员或者稍后再试");
                    this.dialogValidate = false;
                    this.isSubmitOrder = false;
                    this.submitBtnContent = "提交订单";
                }
            },
            async gotoPay() {
                const loading = this.$loading({
                    lock: true,
                    text: "正在跳转支付页面...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                try {
                    var request = {
                        orderId: this.orderId
                    };

                    const res1 = await APIService("/booking/paycheck.do", request);
                    if (!res1.success) {
                        this.$message.error(res1.errorMsg);
                        loading.close();

                        return;
                    }

                    // console.log(this.orderId);

                    loading.close();
                    this.$router.push({path: '/changePay', query: {orderId: this.orderId}});
                } catch (e) {
                    this.$message.error(e.errorMsg || e.statusText);
                }
            },

            /**
             * 验价
             */
            async handleClick(routing) {
                const loading = this.$loading({
                    lock: true,
                    text: "正在校验价格、舱位…",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });

                this.detalisData1 = Object.assign({}, routing);
                this.segments = this.detalisData1.fromSegments.concat(
                    this.detalisData1.retSegments
                );

                this.rule = this.detalisData1.rule;

                try {
                    var request = {
                        tripType: this.dataTripType,
                        adultNumber: this.Shopping1Request.adultNumber,
                        childNumber: this.Shopping1Request.childNumber,
                        routing: routing
                    };

                    const res1 = await APIService("/booking/validate.do", request);
                    if (!res1.success) {
                        this.$message.error("验价失败，请联系管理员或者稍后再试");
                        loading.close();
                        return;
                    }
                    this.maxPassengerCount = res1.maxSeat;
                    this.contact.name = '';
                    this.contact.email = '';
                    this.contact.address = '';
                    this.contact.postcode = '';
                    this.contact.mobile = '';

                    this.adultCount = request.adultNumber;
                    this.childCount = request.childNumber;

                    //重置
                    this.passengers = [
                        {
                            name: '',
                            ageType: 0,
                            gender: "M",
                            nationality: "",
                            cardType: "PP",
                            cardNum: "",
                            birthday: "",
                            cardIssuePlace: "",
                            cardExpired: "",
                            id: 1
                        }
                    ]
                    //默认1个成人
                    if (this.adultCount > 1) {
                        for (var j = 1; j < this.adultCount; j++) {
                            this.passengers.push({
                                name: "",
                                ageType: 0,
                                gender: "M",
                                nationality: "",
                                cardType: "PP",
                                cardNum: "",
                                birthday: "",
                                cardIssuePlace: "",
                                cardExpired: "",
                                id: this.passengers[this.passengers.length - 1].id + 1
                            });
                        }
                    }
                    if (this.childCount > 0) {
                        for (var i = 0; i < this.childCount; i++) {
                            this.passengers.push({
                                name: "",
                                ageType: 1,
                                gender: "M",
                                nationality: "",
                                cardType: "PP",
                                cardNum: "",
                                birthday: "",
                                cardIssuePlace: "",
                                cardExpired: "",
                                id: this.passengers[this.passengers.length - 1].id + 1
                            });

                        }

                    }


                    this.dialogValidate = true;

                    this.detalisData1 = res1.routing;
                    this.textrule = res1.routing.rule;


                    loading.close();
                } catch (e) {
                    this.$message.error("验价失败，请联系管理员或者稍后再试");
                    loading.close();
                }
            },
            /**
             * 预定弹出层阻止方法
             * @param done
             */
            handleClose(done) {
                this.$confirm("确定要关闭预定窗口吗？(关闭后当前填写的内容不会被保存!)")
                    .then(_ => {

                        this.showWaringChild = false;
                        this.contact.name = '';
                        this.contact.email = '';
                        this.contact.address = '';
                        this.contact.postcode = '';
                        this.contact.mobile = '';

                        this.childCount = 0;
                        this.adultCount = 1;
                        this.passengers = [
                            {
                                name: '',
                                ageType: 0,
                                gender: "M",
                                nationality: "",
                                cardType: "PP",
                                cardNum: "",
                                birthday: "",
                                cardIssuePlace: "",
                                cardExpired: "",
                                id: 1
                            }
                        ];
                        done();
                    })
                    .catch(_ => {
                    });
            },
            /**
             * 关闭弹窗时 清空数据
             */
            closeDialog(){
                this.showWaringChild = false;
                // this.contact.name = '';
                // this.contact.email = '';
                // this.contact.address = '';
                // this.contact.postcode = '';
                // this.contact.mobile = '';
                // this.childCount = 0;
                // this.adultCount = 1;
                // this.passengers = [
                //     {
                //         name: '',
                //         ageType: 0,
                //         gender: "M",
                //         nationality: "",
                //         cardType: "PP",
                //         cardNum: "",
                //         birthday: "",
                //         cardIssuePlace: "",
                //         cardExpired: "",
                //         id: 1
                //     }
                // ]
            },
            /**
             *  验证出生日期是否与乘客类型一致
             * @param val
             */
            checkBirthValidate(item) {

                if (item.birthday == undefined || item.birthday.trim().length < 1) return;

                let isValidate = false;
                let limitMaxDate = new Date(item.birthday).getTime() + (12 * 365 * 24 * 60 * 60 * 1000);
                let limitMinDate = new Date(item.birthday).getTime() + (2 * 365 * 24 * 60 * 60 * 1000);
                let depDate = new Date(this.segments[0].depDatetime).getTime();

                let currentPsgIsAdult = depDate > limitMaxDate ? true : false;
                let currentPsgIsChild = depDate < limitMaxDate && depDate > limitMinDate ? true : false;

                if ((item.ageType == 0 && currentPsgIsAdult ) || (item.ageType == 1 && currentPsgIsChild)) {
                    // 下面的注释代码: 打开后儿童即可购买成人票
                    //if ((item.ageType == 0 && (currentPsgIsAdult || currentPsgIsChild)) || (item.ageType == 1 && currentPsgIsChild)) {
                    isValidate = true;
                }

                if (!isValidate) {
                    this.$message.error('乘客出生日期与乘客类型不匹配，请重新选择');
                    item.birthday = undefined;
                }
            },
            /**
             *  验证出生日期是否与乘客类型一致
             * @param val
             */
            checkCardExpireValidate(item) {
                if (item.cardExpired == undefined || item.cardExpired.trim().length < 1) return;

                let isValidate = false;
                let tempDate = new Date(item.cardExpired);
                tempDate.setMonth(tempDate.getMonth() - 6);
                let limitMinDate = tempDate.getTime();
                let depDate = new Date(this.segments[this.segments.length - 1].depDatetime).getTime();

                isValidate = depDate < limitMinDate ? true : false;


                if (!isValidate) {
                    this.$message.error('证件有效期不足6个月，请重新选择');
                    item.cardExpired = undefined;
                }
            },
            /**
             * 重新搜索航班数据
             */
            reSearchFlight(){
                
                this.Shopping1Request.adultNumber = this.tempShopping1Request.adultNumber;
                this.Shopping1Request.childNumber = this.tempShopping1Request.childNumber
                this.searchClick(this.Shopping1Request);
                this.tempShopping1Request.adultNumber = 1;
                this.tempShopping1Request.childNumber = 0;
            },
            handleSomeCarrierStr(routings){
                let resultStr='';
                if(routings instanceof  Array && routings.length>0){
                    const a=$.unique(routings.map(e=>e.carrier));
                    if(a.length>1){
                        resultStr= `等 ${a.length} 个航司`;
                    }
                }
                return resultStr;
            },
            handleSomeFlightNumberStr(routings){
                let resultStr='';
                if(routings instanceof  Array && routings.length>0){
                   resultStr=routings.map(e=>e.flightNumber).join('|')
                }
                return resultStr;
            },
        },
        components: {
            country,
            flightCity,
            flightDetail,
            shoppingSearchBar: shoppingSearchBar
        },
        created: function () {
            this.moment = window.moment;
            // `this` 指向 vm 实例
            this.intervalid1 = setInterval(() => {
                if (this.bookingDatetime != null && this.hasRemain) {
                    this.remainingTimeStr = getTimeStr(this.bookingDatetime, new Date());
                    if (this.remainingTimeStr == "") {
                        this.hasRemain = false;
                        this.haveRemainingTime = false;
                    }
                }
            }, 1000);
        }
    };

</script>

<style>
    #validateDetailsShow .el-dialog {
        width: 1240px !important;
        margin-top: 7vh !important;
    }

    .ValidatePassenger_span {
        display: inline-block;
        width: 80px;
    }

    .Validate_input {
        width: 195px !important;
    }

    .ValidatePassenger_row .el-col {
        margin-top: 8px;
    }

    .searchDiv {
        width: 100%;
        box-shadow: 2px 5px 5px #7a7f8a;
    }

    .city_chose {
        width: 1140px;
        margin: 0 auto;
        padding: 20px 20px 0 20px;
    }

    .city_chose span {
        /* display: inline-block;
          width:80px; */
        font-size: 13px;
        color: #666;
    }

    .demo-table-expand span {
        display: inherit;
        margin-left: 80px;
    }

    .el-autocomplete {
        width: 100%;
    }

    .city_choseName {
        width: 6.16667%;
        line-height: 30px;
    }

    .time_chose span {
        display: inline-block;
        font-size: 13px;
        color: #666;
    }

    .city_chose_input,
    .cabin_chose,
    .time_chose_input {
        width: 200px !important;
    }

    .most_div {
        height: 120px;
        padding: 10px 0;
    }

    .most_div .iconfont {
        font-size: 28px;
        color: #fa5555;
    }

    #searchBtn {
        float: right;
    }

    #searchBtn span {
        color: #fff !important;
    }

    .most_name,
    .most_result {
        height: 36px;
        line-height: 36px;
        display: inline-block;
        width: 91px;
    }

    .most_name {
        font-weight: bold;
        font-size: 15px;
    }

    .most_result {
        color: #bfbfbf;
        font-size: 12px;
    }

    .all_flight {
        width: 275px;
        padding: 2px 10px 10px 18px;
        float: left;
        height: 80px;
        margin-right: 10px;
        background: #fff;
        box-sizing: border-box;
        border: 2px solid #96d0f4;
    }

    .all_flight span:nth-child(3) {
        position: relative;
        top: -15px;
        left: 5px;
        font-size: 33px;
    }

    .most_price {
        width: 260px;
    }

    .priceInfo {
        margin-top: 10px;
    }

    .priceInfo_left {
        width: 40%;
        float: left;
        color: #61626f;
    }

    .priceInfo_right {
        width: 60%;
        float: left;
        color: #61626f;
    }

    .lower_price {
        margin-top: 10px;
        width: 100%;
        border: 2px solid #f6adcf;
        box-sizing: border-box;
        height: 250px;
        clear: both;
        padding: 0 20px;
        float: right;
    }

    .pnrBirthday {
        width: 105px !important;
        padding-right: 10px !important;
    }

    .pnrBirthday > .el-input__inner {
        padding-left: 10px !important;
    }

    .pnrBirthday > .el-input__prefix {
        display: none;
    }

    .flight_info {
        padding: 25px 10px;
    }

    .el-table .cell {
        padding-left: 6px;
        padding-right: 6px;
    }

    .flight_info .el-col span {
        display: block;
    }

    .flight_info .el-col span:nth-child(1) {
        font-size: 14px;
    }

    .flight_info .el-col span:nth-child(2) {
        font-size: 12px;
        color: #9da2b8;
    }

    .airlines,
    .departure,
    .arrival,
    .direct,
    .space {
        padding-top: 20px;
    }

    .flight_details {
        margin-top: 12px;
    }

    .flightDetails_row {
        padding: 20px;
    }

    .flightDetails_row .el-col span {
        display: block;
        color: #61626f;
    }

    .law_info {
        height: 30px;
        margin: 0 auto;
        line-height: 30px;
        width: 600px;
        padding: 10px;
        color: #a3a7bf;
        font-size: 14px;
        text-align: center;
    }

    .lower_span {
        display: block;
        float: right;
        color: #f1007e;
    }

    .faster_span {
        display: block;
        float: right;
        color: #4fbff6;
    }

    .fly_co {
        color: #61626f;
        font-size: 14px;
    }

    .flightResults {
        margin-top: 10px;
        width: 100%;
        border: 2px solid #96d0f4;
        box-sizing: border-box;
        clear: both;
    }

    .flightResults:hover {
        background: #f5f7fa;
        border: 2px solid #f6adcf;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
    }

    .flight_info {
        padding: 25px 10px;
    }

    .flight_info .el-col span {
        display: block;
    }

    .flight_info .el-col span:nth-child(1) {
        font-size: 14px;
    }

    .flight_info .el-col span:nth-child(2) {
        font-size: 12px;
        color: #9da2b8;
    }

    .airlines,
    .departure,
    .arrival,
    .direct,
    .space {
        padding-top: 20px;
    }

    .flightDetails_row {
        padding: 20px;
    }

    .flightDetails_row .el-col span {
        display: block;
        color: #61626f;
    }

    .line_div {
        width: 90%;
        height: 2px;
        background: rgba(224, 221, 7, 0.945);
        margin: 0 auto;
    }

    .turn_info {
        display: block;
        padding: 10px;
        border: 2px dashed #3f4553;
        text-align: center;
    }

    .turn_info {
        display: block;
        padding: 10px;
        border: 2px dashed #3f4553;
        text-align: center;
    }

    .flightTipRow {
        padding: 8px 10px;
    }

    .flightTipRow button {
        width: 50px;
    }

    .adult_price_span {
        display: block;
        color: #ff6600;
        font-weight: bold;
        font-size: 25px;
    }

    .adult_price_span label {
        font-size: 15px;
    }

    .yuding_btn {
        height: 100px;
        margin-top: 40px;
    }

    .prompt {
        font-size: 12px;
        color: #9da2b8;
    }

    .confirm_berths {
        width: 100%;
        height: 200px;
        padding: 100px 0;
    }

    .search_div {
        width: 1140px;
        height: 350px;
        z-index: 9999;
        position: absolute;
        top: 350px;
        left: 50%;

        margin: 0 auto;
        margin-left: -570px;
    }

    h4 {
        margin: 0 auto;
        text-align: center;
    }

    .loader {
        width: 100px;
        height: 80px;

        position: absolute;
        left: 50%;
        margin-left: -50px;
    }

    .loadingText {
        margin-top: 80px;
        padding: 40px;
    }

    .ball-clip-rotate-multiple {
        position: relative;
    }

    .ball-clip-rotate-multiple > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;zx
        left: 0px;
        top: 0px;
        border: 2px solid #67c23a;
        border-bottom-color: transparent;
        border-top-color: transparent;
        border-radius: 100%;
        height: 66px;
        width: 66px;
        -webkit-animation: rotate 1s 0s ease-in-out infinite;
        animation: rotate 1s 0s ease-in-out infinite;
    }

    .directFirst {
        margin-bottom: 12px;
    }

    .ball-clip-rotate-multiple > div:last-child {
        display: inline-block;
        top: 20px;
        left: 20px;
        width: 26px;
        height: 26px;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        border-color: #67c23a transparent #67c23a transparent;
        -webkit-animation-direction: reverse;
        animation-direction: reverse;
        animation-iteration-count: infinite;
    }

    .price_fix {
        margin-top: 14px;
    }

    #booking_upper1,
    #booking_upper2,
    #booking_upper3 {
        text-transform: uppercase !important;
    }

    #booking_upper1 {
        padding-left: 7px;
    }

    #orderDetailsShow .el-dialog .el-dialog__footer {
        height: 80px !important;
    }

    .payTimehints {
        width: 240px;
        height: 50px;
        float: right;
    }

    .payTimehints span {
        display: inline-block;
        width: 240px;
        font-size: 14px;
        text-align: left;
    }

    .ruleDiv span {
        display: block;
    }

    .searchTable {
        text-align: center;
        padding-top: 225px;
    }

    .showImg {
        width: 1140px;
        height: 300px;
        border: 1px solid #ccc;
        margin: 0 auto;
        text-align: center;
        line-height: 300px;
    }

    #mainBody {
        width: 1140px;
        margin: 0 auto;
        overflow-x: hidden;
        background-color: #fff;
    }

    .el-collapse-item__wrap {
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .bianji {
        width: 50px;
        height: 40px;
        position: absolute;
        right: 0;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        top: 6px;
        cursor: pointer;
    }

    .policyBtn {
        position: absolute;
        right: 0;
        top: -26px;
    }

    .showWaringChildDiv a {
        color: #409eff;
    }

    .showWaringChildDiv a:hover {
        color: #00b2d6;
    }
    .searchTip{
        font-size:22px;
    }
    .kuari{
        position:absolute;
        right:77px;
        top:-8px;
    }
</style>
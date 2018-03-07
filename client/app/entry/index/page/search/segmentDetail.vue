<template>
    <div class="segmentDetail">
        <!-- 去程 -->
        <div class="flightInfoList">
            <div class="flightNumber">
                <div style="margin-right: 10px;">
                    <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.fromSegments[0].carrier}.png`"
                         alt="">
                </div>
                <div>
                    <div v-if="routing.fromSegments.length>1">
                        <span>{{routing.fromSegments[0].carrierCN}}({{routing.fromSegments[0].flightNumber}})</span>
                        <span>({{routing.fromSegments.length}})段  机型{{routing.fromSegments[0].aircraftCode}}</span>
                    </div>
                    <div v-else>
                        <span>{{routing.fromSegments[0].carrierCN}}({{routing.fromSegments[0].flightNumber}})</span>
                        <span> 机型{{routing.fromSegments[0].aircraftCode}}</span>
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

                <div class="fl_arr">
                    <span>{{routing.fromSegments[routing.fromSegments.length - 1].arrTimeSmall}}</span>
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
                <div>
                    <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${routing.retSegments[0].carrier}.png`"
                         alt="暂无图标">

                </div>
                <div>
                    <div v-if="routing.retSegments.length>1">
                        <span>{{routing.retSegments[0].carrierCN}}({{routing.retSegments[0].flightNumber}})</span>
                        <span>({{routing.retSegments.length}})段 机型{{routing.retSegments[0].aircraftCode}}</span>
                    </div>
                    <div v-else>
                        <span>{{routing.retSegments[0].carrierCN}}({{routing.retSegments[0].flightNumber}})</span>
                        <span> 机型{{routing.retSegments[0].aircraftCode}}</span>
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

                <div class="fl_arr">
                    <span>{{routing.retSegments[routing.retSegments.length - 1].arrTimeSmall}}</span>
                    <span>{{routing.retSegments[routing.retSegments.length - 1].arrAirport}} {{routing.retSegments[routing.retSegments.length - 1].arrAirportCN}}
                                {{routing.retSegments[routing.retSegments.length - 1].arrTerminal}}
                            </span>
                </div>

            </div>
        </div>
        <transition name="fade">
            <!-- 航班详情 -->
            <div style="height:inherit;background:#fff;border-top:1px solid #ccc;"
                 v-if="routing.showDetail">
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
</template>
<script>
    import flightDetail from "component/flightDetail/flightDetail.vue";
    export default {
        components: {
            flightDetail
        },
        props: {
            routerItem: {
                required: true,
                type: Object
            }
        },
        data(){
            return {
                routing: this.routerItem
            };
        },
        methods: {
            handleClick(item){
                this.$emit('handleClick', item);
            },
            flightInfoText(item){
                this.$emit('flightInfoText', item);
            }
        }

    }
</script>
<style scoped="">
    .waringDIV {
        margin: 10px 0;
        color: rgba(255, 153, 0, 1);;
        padding: 10px;
        font-size: 16px;
        font-weight: 600;
    }

    .segmentDetail {
        border: 1px solid #b4bccc;
        margin-bottom: 10px;
        position: relative;
        background-color: white;
    }

    #validateDetailsShow .el-dialog {
        width: 1240px !important;
        margin-top: 7vh !important;
    }

    .ValidatePassenger_row .el-col {
        margin-top: 8px;
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

    .time_chose span {
        display: inline-block;
        font-size: 13px;
        color: #666;
    }

    .most_div .iconfont {
        font-size: 28px;
        color: #fa5555;
    }

    #searchBtn span {
        color: #fff !important;
    }

    .all_flight span:nth-child(3) {
        position: relative;
        top: -15px;
        left: 5px;
        font-size: 33px;
    }

    .pnrBirthday > .el-input__inner {
        padding-left: 10px !important;
    }

    .pnrBirthday > .el-input__prefix {
        display: none;
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

    .flightDetails_row .el-col span {
        display: block;
        color: #61626f;
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

    .flightDetails_row .el-col span {
        display: block;
        color: #61626f;
    }

    .flightTipRow button {
        width: 50px;
    }

    .adult_price_span label {
        font-size: 15px;
    }

    h4 {
        margin: 0 auto;
        text-align: center;
    }

    .ball-clip-rotate-multiple > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
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

    #orderDetailsShow .el-dialog {
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

    .showWaringChildDiv a {
        color: #409eff;
    }

    .showWaringChildDiv a:hover {
        color: #00b2d6;
    }

</style>
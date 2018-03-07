<template>
    <div>
        <span v-for="(segment,index) in Segments" :key="segment.flightNumber">
            <span>
                <div class="flight_name">
                    <span>
                          <img :src="`https://pic.c-ctrip.com/flight_intl/airline_logo/40x35/${segment.carrier}.png`" alt="暂无图标">
                        {{segment.carrierCN}}({{segment.flightNumber}})</span>
                    <span>{{segment.cabinGradeCN}}{{segment.cabin}}舱位</span>
                    <span>机型{{segment.aircraftCode}}</span>
                </div>
                <div class="flight__TimePlace">
                    <div class="flight__time">
                        {{parseInt(segment.duration / 60) + '小时' + parseInt(segment.duration % 60) + '分钟'}}
                    </div>
                    <div class="SegmentingLine">
                        <!-- <span class="iconfont icon-lianjiexian1"></span> -->
                    </div>

                    <div class="flight__place">
                        <div class="flight__place__info">
                            <span>{{moment(segment.depDatetime).format("YYYY-MM-DD")}}</span>
                            <span>{{segment.depTimeSmall}}</span>
                            <span>{{segment.depAirport}}{{segment.depAirportCN}}&nbsp;&nbsp;{{segment.depTerminal}}</span>
                        </div>
                        <div class="flight__place__line"></div>
                        <div class="flight__place__info">
                            <span>{{moment(segment.arrDatetime).format("YYYY-MM-DD")}}</span>
                            <span>{{segment.arrTimeSmall}}</span>
                            <span>{{segment.arrAirport}}{{segment.arrAirportCN}}&nbsp;&nbsp;{{segment.arrTerminal}}</span>
                        </div>
                    </div>
                </div>
            </span>

            <div v-if="index+1<Segments.length">
                <!-- 中转内容 -->
                <div class="transfer">
                    <div class="transfer__time">
                        {{ parseInt(calcDifferenceTimes([segment,Segments[index+1]]) / 60) + '小时' + parseInt(calcDifferenceTimes([segment,Segments[index+1]])
                        % 60) + '分钟'}}
                    </div>
                    <div class="SegmentingLine1">
                        <!-- <span class="iconfont icon-lianjiexian1"></span> -->
                    </div>
                    <div class="transfer__info">
                        中转 {{segment.arrAirport}}{{segment.arrAirportCN}}
                    </div>
                </div>
            </div>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            Segments: {
                type: Array,
                require: true
            }
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
                return flightAllTimes1;
            }
        },
        created() {
            this.moment = window.moment;
        }
    };
</script>

<style scoped>
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
        width: 120px !important;
        padding-right: 10px !important;
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

    .ball-clip-rotate-multiple>div {
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

    .directFirst {
        margin-bottom: 12px;
    }

    .ball-clip-rotate-multiple>div:last-child {
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
        animation-iteration-count: 2;
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
</style>
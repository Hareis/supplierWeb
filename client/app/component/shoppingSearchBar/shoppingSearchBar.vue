<template>


    <div id="txsearchbox">
        <div class="list_search " id="flight-search-box" style="padding-bottom:28px;height:100px">
            <div class="wrap pb6" style="padding-bottom:17px;">
                <label class="demo--label">
                    <input class="demo--radio mgl20" value="1" ref="single" type="radio" name="roundType"
                           id="roundType-input-1">
                    <span class="demo--radioInput"></span>单程
                </label>
                <label class="demo--label">
                    <input class="demo--radio mgl20" value="2" ref="double" type="radio" name="roundType"
                           id="roundType-input-2">
                    <span class="demo--radioInput"></span>往返
                </label>


                <div class="additional_service">

                    <input type="checkbox" name="hasBaggage" id="hasBaggage">
                    <label for="hasBaggage">免费行李额</label>

                    <input type="checkbox" name="allowRefund" id="allowRefund">
                    <label for="allowRefund">允许退票</label>

                    <input type="checkbox" name="allowChange" id="allowChange">
                    <label for="allowChange">允许改期</label>
                </div>

            </div>


            <div id="search-box-s">
                <div class="wrap block">
                    <div class="city">
                        <div class="city_citybox_jp fl">
                            <input id="depCity" type="text" class="destination-input input_all" value="南京(NKG)"
                                   autocomplete="off"/>
                            <input type="hidden" id="depCityCountry" value="中国" autocomplete="off"/>
                            <input type="hidden" id="depCityCountryCode" value="CN"/>
                            <input type="hidden" id="depCityCode" value="CNKG" autocomplete="off"/>
                            <input type="hidden" id="depCityCode4" value="CNKG"/>
                            <input type="hidden" id="depType" value="city"/>
                            <span class="input-helper_list">出发地</span>
                        </div>
                        <span title="调换出发地和目的地" class="list_search_trade fl"></span>
                        <div class="city_citybox_jp fr">
                            <input id="dstCity" type="text" class="destination-input input_all" value="首尔(SEL)"
                                   autocomplete="off"/>
                            <input type="hidden" id="dstCityCountry" value="韩国" autocomplete="off"/>
                            <input type="hidden" id="dstCityCountryCode" value="KR" autocomplete="off"/>
                            <input type="hidden" id="dstCityCode" value="SELA" autocomplete="off"/>
                            <input type="hidden" id="dstCityCode4" value="SELA"/>
                            <input type="hidden" id="dstType" value="city"/>
                            <span class="input-helper_list">目的地</span>
                        </div>
                    </div>
                    <div class="date">
                        <div class="flysch_datebox_cklx fl">
                            <input type="text" id="departDate" ref="departDate" class="date-input input_all"
                                   :value="departDate"
                                   style="font-size:14px;"/>
                            <span class="icon_date"></span>
                        </div>
                        <div class="flysch_datebox_cklx fl">
                            <input type="text" id="returnDate" class="date-input input_all date-input_no"
                                   :value="returnDate" style="font-size:14px;"/>
                            <span class="icon_date"></span>
                        </div>
                        <div class="flysch_datebox_cklx fl">
                            <div id="advanced-search-box-domestic" class="fl none">
                                <div class="city_citybox_jp fl">
                                    <div class="dropdown dropdown3 fl">
                                        <span class="fl fs14">经济舱</span>
                                        <input type="hidden" id="search-option-class-domestic" value="Economy"
                                               autocomplete="off">
                                        <i class="icon_down_gray icon_down_gray_flight fr"></i>
                                        <ul class="dropdownlist">
                                            <li data-val="Economy">经济舱</li>
                                            <li data-val="First">头等/公务舱</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="block" style="height:100%;display:block" id="advanced-search-box">
                                <div id="advanced-search-box-intl">
                                    <div class="block" id="passengers-box">
                                        <div class="people-info cursor" id="passengers" rel="people-option">
                                            <span class="fl pl10 fs14" id="passengers_and_cabin"
                                                  v-text="allPassenger+'位乘客，'+cabinClass"> </span>
                                            <span class="fl mgl10 none">成人</span>
                                            <span class="fl mgl6 fw none"
                                                  id="search-option-adult-txt">{{adtCount}}</span>
                                            <span class="fl mgl20 none">儿童</span>
                                            <span class="fl mgl6 fw none"
                                                  id="search-option-child-txt">{{chdCount}}</span>
                                            <!-- <span class="fl mgl20 none">婴儿</span>
                                            <span class="fl mgl6 fw none" id="search-option-infant-txt">0</span> -->
                                            <i class="icon_down_gray fr icon_down_gray_fight mgt15"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="but_search">
                        <button class="large-button list-button fl mgl5">
                            搜 索
                        </button>
                    </div>
                </div>
                <div class="cboth"></div>
            </div>


        </div>


        <div class="people-option absolute none" id="people-option">
            <div class="city_citybox_jp mgb10">
                <div class="dropdown dropdown2">
                    <span class="fl" id="selectedCabin" v-text="cabinClass"></span>
                    <input type="hidden" id="search-option-class" :value="cabinClassText" autocomplete="off">
                    <i class="icon_down_gray icon_down_gray_flight fr"></i>
                    <ul class="dropdownlist" style="top:-2px;">
                        <li data-val="Economy">经济舱</li>
                        <li data-val="PremiumEconomy">高端经济舱</li>
                        <li data-val="Business">公务舱</li>
                        <li data-val="First">头等舱</li>
                    </ul>
                </div>
            </div>

            <label>
                <span class="fl "></span>
                <span class="fl mgl4 note">成人(12岁以上)</span>
                <span class="fr next-icon next-icon-hot">+</span>
                <input class="fr" type="text" id="search-option-adult" min="1" max="9" maxlength="1" autocomplete="off"
                       :value="adtCount"/>
                <span class="fr prev-icon">-</span>
            </label>
            <label>
                <span class="fl "></span>
                <span class="fl mgl6 note">儿童(2到12岁)</span>
                <span class="fr next-icon next-icon-hot">+</span>
                <input class="fr" type="text" id="search-option-child" min="0" max="8" maxlength="1" autocomplete="off"
                       :value="chdCount"/>
                <span class="fr prev-icon">-</span>
            </label>
            <label style="display:none">
                <span class="fl "></span>
                <span class="fl mgl4 note">婴儿(2岁以下)</span>
                <span class="fr next-icon next-icon-hot">+</span>
                <input class="fr" type="text" id="search-option-infant" min="0" max="8" maxlength="1" autocomplete="off"
                       value="0"/>
                <span class="fr prev-icon">-</span>
            </label>
        </div>

        <!-- <link rel="stylesheet" type="text/css" href="http://7bv7bi.com1.z0.glb.clouddn.com/base.css?210071" />
        <link rel="stylesheet" type="text/css" href="http://7bv7bi.com1.z0.glb.clouddn.com/common.widgets.css?210071" />
        <link rel="stylesheet" type="text/css" href="http://7bv7bi.com1.z0.glb.clouddn.com/tianxun.suggest.css?210071" />
        <link rel="stylesheet" type="text/css" href="http://7bv7bi.com1.z0.glb.clouddn.com/flight.css?210071" /> -->

        <!-- <link rel="stylesheet" type="text/css" href="http://7bv7bi.com1.z0.glb.clouddn.com/shoppingAutoCompletebundle.css?210071" /> -->
        <link rel="stylesheet" type="text/css"
              href="http://7bv7bi.com1.z0.glb.clouddn.com/shoppingAutoCompletebundle.css?110"/>


    </div>


</template>
<script>

    let EnCabinMap = new Map();
    EnCabinMap.set('Economy', '经济舱');
    EnCabinMap.set('PremiumEconomy', '高端经济舱');
    EnCabinMap.set('Business', '公务舱');
    EnCabinMap.set('First', '头等舱');

    let CodeCabinMap = new Map();
    CodeCabinMap.set('Y', 'Economy');
    CodeCabinMap.set('S', 'PremiumEconomy',);
    CodeCabinMap.set('C', 'Business');
    CodeCabinMap.set('F', 'First');

    export default {
        props: ['adultCount', 'childCount', 'cabin'],
        data() {
            return {
                adtCount: this.adultCount || 1,
                chdCount: this.childCount || 0,
                cabinClassText: 'Economy',
                cabinClass: '经济舱',
                radio: "1",
                departDate: moment().add(2, 'd').format("YYYY-MM-DD"),
                returnDate: moment().add(7, 'd').format("YYYY-MM-DD"),
            };
        },
        methods: {
            getData1 () {
                let x = window.getACResult();
                let tripType = 1;
                if (x.tripType != "OneWay") tripType = 2;

                let hasBaggage = 0;
                let allowRefund = 0;
                let allowChange = 0;
                let cabinGrade = 'Y';

                if ($('input[name="hasBaggage"]:checked').length > 0) hasBaggage = 1;
                if ($('input[name="allowRefund"]:checked').length > 0) allowRefund = 1;
                if ($('input[name="allowChange"]:checked').length > 0) allowChange = 1;

                switch (x.cabinClass) {
                    case "Economy":
                        cabinGrade = "Y";
                        break;
                    case "PremiumEconomy":
                        cabinGrade = "S";
                        break;
                    case "Business":
                        cabinGrade = "C";
                        break;
                    case "First":
                        cabinGrade = "F";
                        break;

                }

                return {
                    tripType: tripType,
                    adultNumber: x.adults,
                    childNumber: x.children,
                    fromCity: x.originCodeLeg1,
                    toCity: x.originCodeLeg2,
                    fromType: $("#depType").val(),
                    toType: $("#dstType").val(),
                    fromDate: x.dateLeg1,
                    retDate: x.dateLeg2,
                    hasBaggage: hasBaggage,
                    allowRefund: allowRefund,
                    allowChange: allowChange,
                    cabinGrade: cabinGrade
                };
            },
            calcPassenger(){
                this.$nextTick(() => {

                    this.adtCount = this.adultCount;
                    this.chdCount = this.childCount;

                    let fromDate = $("#departDate").val();
                    this.departDate = fromDate;
                    let retDate = $("#returnDate").val();
                    this.returnDate = retDate;
                });
            },
            listenCabinChange(){
                this.$nextTick(() => {

                    let code = CodeCabinMap.get(this.cabin);
                    this.cabinClassText = code;
                    this.cabinClass = EnCabinMap.get(code);
                });

            }
        },
        watch: {
            adultCount: "calcPassenger",
            childCount: "calcPassenger",
            cabin: "listenCabinChange",
        },
        computed: {
            allPassenger(){
                return this.adtCount + this.chdCount;
            },
        },
        mounted() {
            const _self = this;
            document.getElementById('roundType-input-1').checked=true;
            window.path_domain = "https://www.tianxun.com";
            window.path_flight = "/comm";
            window.path_res = "https://res.tianxun.com";
            window.res_version = "?210071";
            window.newUser = 0;
            window.gaq = [];
            window.$LAB
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/base64.js?1114")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/common.js?1113")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/widget.js?1113")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/jquery.cookie.min.js?1112")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/suggest.js?210071?1112")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/city.js?210071?1112")
                .script("http://7bv7bi.com1.z0.glb.clouddn.com/searchbox_v41.js?1112")

                .wait(function () {
                    window.i1();
                    $("#flight-search-box button").bind("click", () => {
      
                        _self.$emit("searchClick", _self.getData1());

                    });
                });
        }
    };
</script>
<style scoped>
    .city_box_tit a:hover {
        background: #f5f5f5;
        color: #453d54;
    }

    .city_box_flight a {
        text-align: center !important;
        padding-left: 0 !important;
        color: red;
    }

    .large-button {
        border-radius: 4px !important;
    }

    #txsearchbox {
        background: url(../../img/huwai.jpg);
        font-family: Arial, Lucida, Verdana, Helvetica, sans-serif;
        font-size: 12px;
        color: #474747;
        line-height: 150%;
        background: #fff;
        margin: 0 auto;
        margin: 0;
        padding: 0;
    }

    .people-option input {
        height: 24px !important;
    }

    /* CSS Document */

    #txsearchbox ol,
    ul,
    li,
    lu li {
        list-style: none;
    }

    #txsearchbox img {
        border: 0;
    }

    #txsearchbox span,
    a,
    input,
    button {
        outline: 0;
    }

    /*html5*/
    #txsearchbox article,
    aside,
    dialog,
    footer,
    header,
    section,
    footer,
    nav,
    figure,
    menu {
        display: block;
    }

    #txsearchbox ins {
        text-decoration: none;
    }

    #txsearchbox del {
        text-decoration: line-through;
    }

    /*连接样式*/
    /* #txsearchbox a {
      cursor: pointer;
      color: #00b2d6;
    }
    #txsearchbox a:link,
    a:visited,
    .spanLink,
    a:hover,
    .spanLink:hover {
      text-decoration: none;
    }
    #txsearchbox a:hover {
      color: #ff6600;
    }
    /*白色链接*/
    #txsearchbox a.white:link,
    a.white:visited {
        color: #fff;
        text-decoration: none;
    }

    #txsearchbox a.white:hover {
        color: #fff;
        text-decoration: none;
    }

    #txsearchbox .white {
        color: #fff;
    }

    /*灰色链接*/
    #txsearchbox a.grey:link,
    a.grey:visited {
        color: #666;
        text-decoration: none;
    }

    #txsearchbox a.grey:hover {
        color: #ff6600;
        text-decoration: none;
    }

    #txsearchbox a:link,
    a:visited,
    .spanLink,
    a:hover,
    .spanLink:hover {
        text-decoration: none;
    }

    .csResults a {
        text-decoration: none;
    }

    .csResults {
        font-size: 12px;
    }

    .date_picker a {
        text-decoration: none;
    }

    .date_picker {
        font-size: 12px;
    }

    .additional_service {
        width: 352px;
        float: right;
        margin-top: 14px;
        margin-right: 54px;
    }

    .additional_service input {
        width: 17px;
        height: 33px;
        vertical-align: bottom;
        margin-bottom: 3px;
        margin-top: -1px;
        margin-left: 11px;
    }

    .additional_service label {
        display: inline-block;
        padding-bottom: 9px;
        height: 22px;
        line-height: 22px;
    }

    /* 单程返程选择 */
    /*
    @keyframes boom {
        0% {
            opacity: .2;
            -webkit-transform: scale(2);
            transform: scale(2)
        }
        90% {
            opacity: .01;
            -webkit-transform: scale(6);
            transform: scale(6)
        }
        100% {
            -webkit-transform: none;
            transform: none
        }
    }
    .checked-boom{
        position: relative;
        top:2px;
        width:15px;
        height:15px;
    }
    .checked-boom:hover{
       cursor: pointer;
    }
    :checked +.checked_label{
        color: #409EFF !important;
    }
    .checked_label{
        color:#5a5e66;
    }
    .checked-boom:checked {
        -webkit-animation: boom .2s ease-in;
        animation: boom .2s ease-in;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1
    }
    .list_search_span{

        display: inline-block;
        width:40px;
        height: 20px;
        font-size:16px;
        font-family: Arial, Lucida, Verdana, Helvetica, sans-serif;
    } */
    .demo--label {
        margin: 20px 20px 0 0;
        display: inline-block;
    }

    .demo--radio {
        display: none;
    }

    .demo--radioInput {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 100%;
        display: inline-block;
        height: 16px;
        margin-right: 10px;
        margin-top: -1px;
        vertical-align: middle;
        width: 16px;
        line-height: 1;
    }

    .demo--radio:checked + .demo--radioInput:after {
        background-color: #57ad68;
        border-radius: 100%;
        content: "";
        display: inline-block;
        height: 12px;
        margin: 2px;
        width: 12px;
    }

    .demo--checkbox.demo--radioInput,
    .demo--radio:checked + .demo--checkbox.demo--radioInput:after {
        border-radius: 0;
    }
</style>
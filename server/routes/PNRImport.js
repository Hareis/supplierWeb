'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');
const moment = require('moment');

//region parseEtermFormattedRTContentLite

class ParseEtermFormattedRTContentLiteReponse extends JSONResponse {
    constructor() {

        super();
        this.tripType = null;
        this.segCount = null;

    }
}


router.get('/parseEtermFormattedRTContentLite.do', async function (req, res, next) {

    try {
        res.redirect("/orderList");

        // req.validateLogin();
        // const token = ""
        // const username = req.userName
        // const userId = req.userId

        // //const token=req.token
        // const RTContent = req.body.RTContent;

        // var handle = ServiceFactory.getHandle_net("orderService", "PNRImport", "parseEtermFormattedRTContentLite");
        // var invokeResult = await handle.postAsync(RTContent);

        // if (!invokeResult.data.success) {
        //     throw new BusinessException(invokeResult.data.errorMsg);
        // }

        // let result = new ParseEtermFormattedRTContentLiteReponse();
        // result.success = invokeResult.data.success;
        // result.tripType=invokeResult.data.tripType;
        // result.segCount=invokeResult.data.segCount;

        // res.send(result);

    }
    catch (e) {

        if (e instanceof BusinessException) {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }
        else {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }

    }


});

//#endregion

//region bestBuy

class BestBuyReponse extends JSONResponse {
    constructor() {

        super();
        this.routings = null;
        this.passengers = null;
        this.contact = null;

    }
}

function isEmptyObject(obj) {

    for (var key in obj) {
        return false
    }
    ;
    return true
};

router.post('/bestBuy.do', async function (req, res, next) {

    try {

        req.validateLogin();
        const token = req.session.token
        const username = req.userName
        const userId = req.userId

        const hasBaggage = req.body.hasBaggage;
        const allowRefund = req.body.allowRefund;
        const allowChange = req.body.allowChange;

        const RTContent = req.body.RTContent;
        const PnrObj = {
            "username": req.userName,
            "userId": req.userId,
            "token": token,
            "RTContent": RTContent,
            "onlySameCabin": false, // default false
            "hasBaggage": hasBaggage, // default false
            "allowRefund": allowRefund, // default false
            "allowChange": allowChange // default false
        }

        var invokeResult1 = await ServiceFactory.getHandle("orderService", "PNRImport", "bestbuy", "v1").postAsync(PnrObj);
        invokeResult1 = invokeResult1.data;
//         var result1={"success":true,"errorMsg":"success","routings":[
//              {"type":"sameCabin","message":"success","routing":{"adultPrice":1954,"adultTax":151,"adultTaxType":0,"applyType":0,"childPrice":1954,"childTax":151,"childTaxType":0,"data":"H4sIAAAAAAAAAF2PS2/CMBCE/4vPFWDyLLd0jUiUF/QRRG8RmBCIncRO2QbU/96kh6rq3mbn29HOnRzyLicL4rthBN7vJGheWbExWMG84CkOEWsJF/D8NCvE8mKA0Onj8/w0RccyscUdqjM0blhim71HOuXY0hd0JJQ4hbObtmhJ1vURVLc1SEFNtN9WWA+3allhO2TH6R7r2EY7oYEbblfbGwgRCzT3R1QR054Psjiy6jPj44Pkgei84q99w8liPgiudVnL4DB0WcebHbWoQW1qGrbrGCP80TRVydUPgLXqTn2nyuaPk+SC//euXI2pw5pOZpMZ+foGpNh9UDABAAA="
//              ,"fromSegments":[
//                  {"aircraftCode":"332","arrAirport":"HKG","arrDatetime":"2017-12-25 10:55:00","arrTerminal":"1","cabin":"M","cabinGrade":"Y","carrier":"HX","codeShare":false,"depAirport":"TSN","depDatetime":"2017-12-25 07:15:00","depTerminal":"1","duration":220,"flightNumber":"HX363","itineraryIndex":1,"segmentIndex":1,"stopTime":0}
//                  ,{"aircraftCode":"332","arrAirport":"HKG","arrDatetime":"2017-12-25 10:55:00","arrTerminal":"1","cabin":"F","cabinGrade":"Y","carrier":"HX","codeShare":false,"depAirport":"TSN","depDatetime":"2017-12-25 07:15:00","depTerminal":"1","duration":220,"flightNumber":"HX364","itineraryIndex":1,"segmentIndex":1,"stopTime":0}
//                 ]
//                 ,"invoiceType":"E","maxSeats":9,"priceType":0,"productType":"private","reservationType":"OT","retSegments":[],"rule":{"baggageInfoList":[{"adultBaggage":"20KG","childBaggage":"","itineraryIndex":1,"segmentIndex":1}],"changesInfoList":[{"changesFee":0,"changesStatus":"T","changesType":3,"currency":"CNY"}],"note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.所有机票须按顺序使用。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.选座、购买额外行李、购买保险等增值服务以及其他详情请咨询卖家,祝旅途愉快。","refundInfoList":[{"currency":"CNY","refundFee":0,"refundStatus":"T","refundType":3}]

//                  ,"serviceFee":{"currency":"CNY","refundFeeByCarrier":0,"revalidationFeeByCarrier":0}},"ticketLimittime":144,"validatingCarrier":"HX"}

//                  ,"status":0}
//             ,{"type":"lowestPrice","message":"success","routing":{"adultPrice":1800,"adultTax":100,"adultTaxType":0,"applyType":0,"childPrice":1954,"childTax":151,"childTaxType":0,"data":"H4sIAAAAAAAAAF2PS2/CMBCE/4vPFWDyLLd0jUiUF/QRRG8RmBCIncRO2QbU/96kh6rq3mbn29HOnRzyLicL4rthBN7vJGheWbExWMG84CkOEWsJF/D8NCvE8mKA0Onj8/w0RccyscUdqjM0blhim71HOuXY0hd0JJQ4hbObtmhJ1vURVLc1SEFNtN9WWA+3allhO2TH6R7r2EY7oYEbblfbGwgRCzT3R1QR054Psjiy6jPj44Pkgei84q99w8liPgiudVnL4DB0WcebHbWoQW1qGrbrGCP80TRVydUPgLXqTn2nyuaPk+SC//euXI2pw5pOZpMZ+foGpNh9UDABAAA=","fromSegments":[{"aircraftCode":"332","arrAirport":"HKG","arrDatetime":"2017-12-25 10:55:00","arrTerminal":"1","cabin":"E","cabinGrade":"Y","carrier":"HX","codeShare":false,"depAirport":"TSN","depDatetime":"2017-12-25 07:15:00","depTerminal":"1","duration":220,"flightNumber":"HX363","itineraryIndex":1,"segmentIndex":1,"stopTime":0}],"invoiceType":"E","maxSeats":9,"priceType":0,"productType":"private","reservationType":"OT","retSegments":[],"rule":{"baggageInfoList":[{"adultBaggage":"20KG","childBaggage":"","itineraryIndex":1,"segmentIndex":1}],"changesInfoList":[{"changesFee":0,"changesStatus":"T","changesType":3,"currency":"CNY"}],"note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.所有机票须按顺序使用。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.选座、购买额外行李、购买保险等增值服务以及其他详情请咨询卖家,祝旅途愉快。","refundInfoList":[{"currency":"CNY","refundFee":0,"refundStatus":"T","refundType":3}],"serviceFee":{"currency":"CNY","refundFeeByCarrier":0,"revalidationFeeByCarrier":0}},"ticketLimittime":144,"validatingCarrier":"HX"},"status":0}
//         ]
//         ,"passengers":[ {
//             "name": "Huang/Su",
//             "ageType": 0,
//             "birthday": "1989-12-18",
//             "gender": "F",
//             "cardType": "PP",
//             "cardNum": "G51509611",
//             "cardExpired": "2030-05-12",
//             "cardIssuePlace": "CN",
//             "nationality": "CN"

//           }
//   ],"contact":{"address":"","email":"ffff","mobile":"15035241117","name":"ddd","postcode":""}
//         }
//         result1.routings[0].routing.segments=result1.routings[0].routing.fromSegments.concat(result1.routings[0].routing.retSegments)
//         result1.routings[1].routing.segments=result1.routings[1].routing.fromSegments.concat(result1.routings[1].routing.retSegments)
//         var cabins=""
//         for(var i=0;i<result1.routings[0].routing.fromSegments.length;i++)
//         {
//             cabins+=result1.routings[0].routing.fromSegments[i].cabin;
//         }
//         cabins+=" ";
//         for(var i=0;i<result1.routings[0].routing.retSegments.length;i++)
//         {
//             cabins+=result1.routings[0].routing.retSegments[i].cabin;
//         }
//         result1.routings[0].routing.cabins=cabins;
//         cabins=""
//         for(var i=0;i<result1.routings[1].routing.fromSegments.length;i++)
//         {
//             cabins+=result1.routings[1].routing.fromSegments[i].cabin;
//         }
//         cabins+=" ";
//         for(var i=0;i<result1.routings[1].routing.retSegments.length;i++)
//         {
//             cabins+=result1.routings[1].routing.retSegments[i].cabin;
//         }
//         result1.routings[1].routing.cabins=cabins;


//         res.send(result1);

//         return;


        if (invokeResult1.status != 0) {
            throw new BusinessException(invokeResult1.message);
        }

        let result = new BestBuyReponse();
        result.errorMsg = invokeResult1.message;
        result.success = invokeResult1.status == 0 ? true : false;

        // routings : Array  
        // passengers : Object
        // contact : Object

        var sameResult = {routing: {}};
        if (invokeResult1.hasOwnProperty("sameCabin"))
            sameResult = (Object.assign({type: "sameCabin"}, invokeResult1.sameCabin))
        else if (invokeResult1.hasOwnProperty("queryCabin"))
            sameResult = (Object.assign({type: "queryCabin"}, invokeResult1.queryCabin))

        result.routings = [
            sameResult,
            invokeResult1.hasOwnProperty("lowestPrice") ? (Object.assign({type: "lowestPrice"}, invokeResult1.lowestPrice)) : {routing: {}}
        ];

        var cabins = ""
        var cabinG = ""
        var hasPrice = false;
        if (!isEmptyObject(result.routings[0].routing)) {
            hasPrice = true;
            result.routings[0].routing.segments = result.routings[0].routing.fromSegments.concat(result.routings[0].routing.retSegments)
            var seg1 = result.routings[0].routing.fromSegments[0]
            cabinG += seg1.cabinGrade;
            for (var i = 0; i < result.routings[0].routing.fromSegments.length; i++) {
                var seg = result.routings[0].routing.fromSegments[i]

                cabins += seg.cabin + ' 舱 ';

                seg.arrAirportCN = seg.arrAirport;
                if (appConfig.airportDict[seg.arrAirport] != null) {
                    seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                }
                seg.depAirportCN = seg.depAirport;
                if (appConfig.airportDict[seg.depAirport] != null) {
                    seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                }

                switch (seg.cabinGrade) {
                    case "Y":
                        seg.cabinGradeCN = "经济舱";
                        break;
                    case "C":
                        seg.cabinGradeCN = "公务舱";
                        break;
                    case "F":
                        seg.cabinGradeCN = "头等舱";
                        break;
                    default:
                        seg.cabinGradeCN = "经济舱";
                        break;
                }

            }
            if (result.routings[0].routing.retSegments.length > 0) {
                cabins += " / ";
                cabinG = ''
                var seg1 = result.routings[0].routing.retSegments[0]
                cabinG += seg1.cabinGrade;
                for (var i = 0; i < result.routings[0].routing.retSegments.length; i++) {
                    var seg = result.routings[0].routing.retSegments[i]
                    cabins += seg.cabin + ' 舱 ';


                    seg.arrAirportCN = seg.arrAirport;
                    if (appConfig.airportDict[seg.arrAirport] != null) {
                        seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                    }
                    seg.depAirportCN = seg.depAirport;
                    if (appConfig.airportDict[seg.depAirport] != null) {
                        seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                    }

                    switch (seg.cabinGrade) {
                        case "Y":
                            seg.cabinGradeCN = "经济舱";
                            break;
                        case "C":
                            seg.cabinGradeCN = "公务舱";
                            break;
                        case "F":
                            seg.cabinGradeCN = "头等舱";
                            break;
                        default:
                            seg.cabinGradeCN = "经济舱";
                            break;
                    }
                }
            }

            result.routings[0].routing.cabins = cabins;
            result.routings[0].routing.cabinG = cabinG;

            //region 退改签

            var routing = result.routings[0].routing;
            if (routing.rule != null) {
                var baggageCn = "";
                var refundCn = "";
                var changeCn = "";
                var ticketRemarkCn = "境外电子行程单";
                if (routing.rule.refundInfoList != null && routing.rule.refundInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.refundInfoList.length; j++) {
                        switch (routing.rule.refundInfoList[j].refundType) {
                            case 0:
                                refundCn += "客票全部未使用;";
                                break;
                            case 1:
                                refundCn += "客票部分使用;";
                                break;
                        }
                        switch (routing.rule.refundInfoList[j].refundStatus) {
                            case "T":
                                refundCn += "不可退;";
                                break;
                            case "H":
                                refundCn += "有条件退;";
                                break;
                            case "F":
                                refundCn += "免费退;";
                                break;
                            case "E":
                                refundCn += "按航司客规;";
                                break;
                        }
                        if (routing.rule.refundInfoList[j].refundFee > 0) {
                            refundCn += "退票费" + routing.rule.refundInfoList[j].refundFee + routing.rule.refundInfoList[j].currency + ";";
                        }
                    }
                }
                if (routing.rule.changesInfoList != null && routing.rule.changesInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.changesInfoList.length; j++) {
                        switch (routing.rule.changesInfoList[j].changesType) {
                            case 0:
                                changeCn += "客票全部未使用;";
                                break;
                            case 1:
                                changeCn += "客票部分使用;";
                                break;
                        }
                        switch (routing.rule.changesInfoList[j].changesStatus) {
                            case "T":
                                changeCn += "不可改期;";
                                break;
                            case "H":
                                changeCn += "有条件改期;";
                                break;
                            case "F":
                                changeCn += "免费改期;";
                                break;
                            case "E":
                                changeCn += "按航司客规;";
                                break;
                        }
                        if (routing.rule.changesInfoList[j].changesFee > 0) {
                            changeCn += "改期金额" + routing.rule.changesInfoList[j].changesFee + routing.rule.changesInfoList[j].currency + ";";
                        }
                    }
                }
                if (routing.rule.baggageInfoList != null && routing.rule.baggageInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.baggageInfoList.length; j++) {
                        baggageCn += "第" + routing.rule.baggageInfoList[j].segmentIndex + "段行程"
                        if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                            baggageCn += ",成人免费托运行李" + routing.rule.baggageInfoList[j].adultBaggage
                        }
                        if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                            baggageCn += ",儿童免费托运行李" + routing.rule.baggageInfoList[j].childBaggage
                        }
                        baggageCn += ";"
                    }
                }
                routing.rule.baggageCn = baggageCn
                routing.rule.refundCn = refundCn
                routing.rule.changeCn = changeCn
                routing.rule.ticketRemarkCn = ticketRemarkCn
            }
            result.routings[0].routing = routing

            //#endregion

        }
        if (!isEmptyObject(result.routings[1].routing)) {
            hasPrice = true;
            result.routings[1].routing.segments = result.routings[1].routing.fromSegments.concat(result.routings[1].routing.retSegments)
            cabins = ""

            var seg1 = result.routings[1].routing.fromSegments[0]

            for (var i = 0; i < result.routings[1].routing.fromSegments.length; i++) {
                var seg = result.routings[1].routing.fromSegments[i]

                cabins += seg.cabin + ' 舱 ';


                seg.arrAirportCN = seg.arrAirport;
                if (appConfig.airportDict[seg.arrAirport] != null) {
                    seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                }
                seg.depAirportCN = seg.depAirport;
                if (appConfig.airportDict[seg.depAirport] != null) {
                    seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                }

                switch (seg.cabinGrade) {
                    case "Y":
                        seg.cabinGradeCN = "经济舱";
                        break;
                    case "C":
                        seg.cabinGradeCN = "公务舱";
                        break;
                    case "F":
                        seg.cabinGradeCN = "头等舱";
                        break;
                    default:
                        seg.cabinGradeCN = "经济舱";
                        break;
                }

            }
            if (result.routings[1].routing.retSegments.length > 0) {
                cabins += " / ";
                for (var i = 0; i < result.routings[1].routing.retSegments.length; i++) {
                    var seg = result.routings[1].routing.retSegments[i]
                    cabins += seg.cabin + ' 舱 ';

                    seg.arrAirportCN = seg.arrAirport;
                    if (appConfig.airportDict[seg.arrAirport] != null) {
                        seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                    }
                    seg.depAirportCN = seg.depAirport;
                    if (appConfig.airportDict[seg.depAirport] != null) {
                        seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                    }

                    switch (seg.cabinGrade) {
                        case "Y":
                            seg.cabinGradeCN = "经济舱";
                            break;
                        case "C":
                            seg.cabinGradeCN = "公务舱";
                            break;
                        case "F":
                            seg.cabinGradeCN = "头等舱";
                            break;
                        default:
                            seg.cabinGradeCN = "经济舱";
                            break;
                    }
                }
            }


            result.routings[1].routing.cabins = cabins;
            result.routings[1].routing.cabinG = result.routings[1].routing.fromSegments[0].cabinGrade;

            //region 退改签

            var routing = result.routings[1].routing;
            if (routing.rule != null) {
                var baggageCn = "";
                var refundCn = "";
                var changeCn = "";
                var ticketRemarkCn = "境外电子行程单";
                if (routing.rule.refundInfoList != null && routing.rule.refundInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.refundInfoList.length; j++) {
                        switch (routing.rule.refundInfoList[j].refundType) {
                            case 0:
                                refundCn += "客票全部未使用;";
                                break;
                            case 1:
                                refundCn += "客票部分使用;";
                                break;
                        }
                        switch (routing.rule.refundInfoList[j].refundStatus) {
                            case "T":
                                refundCn += "不可退;";
                                break;
                            case "H":
                                refundCn += "有条件退;";
                                break;
                            case "F":
                                refundCn += "免费退;";
                                break;
                            case "E":
                                refundCn += "按航司客规;";
                                break;
                        }
                        if (routing.rule.refundInfoList[j].refundFee > 0) {
                            refundCn += "退票费" + routing.rule.refundInfoList[j].refundFee + routing.rule.refundInfoList[j].currency + ";";
                        }

                    }
                }
                if (routing.rule.changesInfoList != null && routing.rule.changesInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.changesInfoList.length; j++) {
                        switch (routing.rule.changesInfoList[j].changesType) {
                            case 0:
                                changeCn += "客票全部未使用;";
                                break;
                            case 1:
                                changeCn += "客票部分使用;";
                                break;
                        }
                        switch (routing.rule.changesInfoList[j].changesStatus) {
                            case "T":
                                changeCn += "不可改期;";
                                break;
                            case "H":
                                changeCn += "有条件改期;";
                                break;
                            case "F":
                                changeCn += "免费改期;";
                                break;
                            case "E":
                                changeCn += "按航司客规;";
                                break;
                        }
                        if (routing.rule.changesInfoList[j].changesFee > 0) {
                            changeCn += "改期金额" + routing.rule.changesInfoList[j].changesFee + routing.rule.changesInfoList[j].currency + ";";
                        }
                    }
                }
                if (routing.rule.baggageInfoList != null && routing.rule.baggageInfoList.length > 0) {
                    for (var j = 0; j < routing.rule.baggageInfoList.length; j++) {
                        baggageCn += "第" + routing.rule.baggageInfoList[j].segmentIndex + "段行程"
                        if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                            baggageCn += ",成人免费托运行李" + routing.rule.baggageInfoList[j].adultBaggage
                        }
                        if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                            baggageCn += ",儿童免费托运行李" + routing.rule.baggageInfoList[j].childBaggage
                        }

                        if (routing.rule.baggageInfoList[j].adultBaggage == '') {
                            baggageCn += "不提供免费托运行李额；"
                        }
                    }
                }
                routing.rule.baggageCn = baggageCn
                routing.rule.refundCn = refundCn
                routing.rule.changeCn = changeCn
                routing.rule.ticketRemarkCn = ticketRemarkCn
            }
            result.routings[1].routing = routing

            //#endregion
        }

        //没有返回价格
        if (hasPrice == false) {
            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = "没有匹配到合适的运价";
            res.send(r);
            return;
        }

        result.passengers = invokeResult1.passengers;
        result.contact = invokeResult1.contact;

        res.send(result);

    }
    catch (e) {

        if (e instanceof BusinessException) {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }
        else {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }

    }


});

//#endregion

//region booking

class BookingResponse extends JSONResponse {
    constructor() {

        super();
        this.orderId = null;
        this.bookingDatetime = null;

    }
}

router.post('/booking.do', async function (req, res, next) {

    try {

        req.validateLogin();
        const token = req.session.token
        const username = req.session.userName
        const userId = req.session.userId

        //const token=req.token
        const data = req.body.data;
        const passengers = req.body.passengers;
        const contact = req.body.contact;

        // let result1 = new BookingResponse()
        // result1.orderId='110'
        // var a=new Date();
        // result1.bookingDatetime=a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes();
        // result1.success = true;
        // res.send(result1)

        // return;


        var invokeResult = await ServiceFactory.getHandle("orderService", "PNRImport", "booking", "v1").postAsync({
            "username": username,
            "userId": userId,
            "token": token
            , data: data
            , passengers: passengers
            , contact: contact
        });

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new BookingResponse()
        result.orderId = invokeResult.data.orderId;
        result.bookingDatetime = moment().format('YYYY-DD-MM HH:mm:ss');
        result.success = true;
        res.send(result);

    }
    catch (e) {

        if (e instanceof BusinessException) {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }
        else {

            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = e.message;
            res.send(r);

        }

    }


});

//#endregion

module.exports = router;
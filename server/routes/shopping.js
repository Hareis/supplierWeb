'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');
const axios = require("axios");
const moment = require('moment');
var airlineDictConfig = require('./../lib/airlineDict.json');

//region shopping1

class Shopping1Response extends JSONResponse {
    constructor() {

        super();
        this.orgShopping1Response = null;
        this.fromCity = null;
        this.toCity = null;
        this.fromCityCN = null;
        this.toCityCN = null;


    }
}

Array.prototype.contain = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return true;
        }
    }
    return false;
};


/**
 * 判断方法是否为空
 * @param {*} e
 */
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

router.post('/shoppingList.do', async function (req, res, next) {

    try {

        req.validateLogin();
        const token = req.session.token
        const username = req.session.userName
        const userId = req.session.userId
        const userType = "UserTypeBuyer"

        //const token=req.token
        const tripType = req.body.tripType;
        const adultNumber = req.body.adultNumber || 1;
        const childNumber = req.body.childNumber || 0;
        var orgFromCity = req.body.fromCity;
        const hasBaggage = req.body.hasBaggage || 0;
        const allowRefund = req.body.allowRefund || 0;
        const allowChange = req.body.allowChange || 0;
        const cabinGrade = req.body.cabinGrade || "Y";
        var orgToCity = req.body.toCity;
        var fromCity=orgFromCity;
        var toCity=orgToCity;
        var fromCityCN = orgFromCity;
        var toCityCN = orgToCity;
        if (appConfig.airportDict[orgFromCity] != null) {
            fromCity = appConfig.airportDict[orgFromCity].CityThCode;
            fromCityCN = appConfig.airportDict[orgFromCity].CityCNName;
        }
        if (appConfig.airportDict[orgToCity] != null) {
            toCity = appConfig.airportDict[orgToCity].CityThCode;
            toCityCN = appConfig.airportDict[orgToCity].CityCNName;

        }
        
        var fromType=req.body.fromType;
        var toType=req.body.toType;

        if(fromType==null)fromType='city'
        if(toType==null)toType='city'

        const fromDate = req.body.fromDate;
        var retDate = "";
        if (req.body.retDate.length == 10) {
            retDate = req.body.retDate;
        }

        var shoppingRequest = {
            username: username,
            userId: userId,
            token: token,
            userType: userType,
            tripType: tripType,
            adultNumber: adultNumber,
            childNumber: childNumber,
            fromCity: fromCity,
            toCity: toCity,
            fromDate: fromDate
            , retDate: retDate
            , hasBaggage: hasBaggage
            , allowRefund: allowRefund
            , allowChange: allowChange
            , cabinGrade: cabinGrade
        }
        var t1 = process.uptime() * 1000;
        var invokeResult = await ServiceFactory.getHandle("dataService", "ota", "shopping", "v1").postAsync(shoppingRequest);
        var t2 = process.uptime() * 1000;
        var elpesed = (t2 - t1);

        if (invokeResult.data.status != 0) {

            req.info(JSON.stringify(shoppingRequest), username, userId, userType, false, elpesed, 0, null, token);
            throw new BusinessException(invokeResult.data.message);
        }

        req.info(JSON.stringify(shoppingRequest), username, userId, userType, true, elpesed, invokeResult.data.routings.length, null, token);

        let result = new Shopping1Response();
        result.success = true;
        var returnRoutings = invokeResult.data;
        result.orgShopping1Response={};
        result.orgShopping1Response.routings = [];
        result.orgShopping1Response.otherroutings = [];

        var lowestPrice = 999999
        var lowestPriceDuration = 9999

        var lessDuration = 99999
        var lessDurationPrice = 999999

        var lowFlightCount = 10
        var lowFlightCountDuration = 99999
        var lowFlightCountPrice = 999999

        var transAirportList = []
        var transCityList = []
        var transAirportDict = {}
        var transCityDict = {}
        var carrierList = []
        var tempCarrierMap = new Map();
        var tempCarrierMap = new Map();

        let tempCityMap = new Map();

        if (returnRoutings.routings != null) {

            for (var i = 0; i < returnRoutings.routings.length; i++) {

                var routing = returnRoutings.routings[i];
                //去程跨日
                routing.from_kuari=""
                //回程跨日
                routing.ret_kuari=""

                var fromStartTime = new Date(moment(routing.fromSegments[0].depDatetime.substr(0,10), "YYYY-MM-DD"));
                var fromendTime = new Date(moment(routing.fromSegments[routing.fromSegments.length-1].arrDatetime.substr(0,10), "YYYY-MM-DD"));
                var  fromDiff=parseInt((fromendTime.getTime() - fromStartTime.getTime()) / parseInt(3600*24*1000));
                if(fromDiff>0)routing.from_kuari="+"+fromDiff;
                else if(fromDiff<0)routing.from_kuari=fromDiff;


                var flightCount = routing.fromSegments.concat(routing.retSegments || []).length;

                //region 推荐航班获取

                var durationTotal = 0;
                routing.transiteAirport="_"
                routing.transiteCity="_"

                for (var j = 0; j < routing.fromSegments.length; j++) {
                    var seg = routing.fromSegments[j];
                    durationTotal += seg.duration;
                    //到达机场中文
                    seg.arrAirportCN = seg.arrAirport;
                    seg.arrCityCN = seg.arrAirport;
                    seg.arrCity = seg.arrAirport;
                    if (appConfig.airportDict[seg.arrAirport] != null) {
                        seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                        seg.arrCityCN = appConfig.airportDict[seg.arrAirport].CityCNName;
                        seg.arrCity = appConfig.airportDict[seg.arrAirport].CityThCode;
                    }
                    seg.arrAirportCNName = seg.arrAirportCN+'('+seg.arrAirport+')';
                    
                    //出发机场中文
                    seg.depAirportCN = seg.depAirport;
                    seg.depCityCN = seg.depAirport;
                    seg.depCity = seg.depAirport;
                    if (appConfig.airportDict[seg.depAirport] != null) {
                        seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                        seg.depCityCN = appConfig.airportDict[seg.depAirport].CityCNName;
                        seg.depCity = appConfig.airportDict[seg.depAirport].CityThCode;
                    }

                    //记录中转点

                    if(j!=0&&j!=routing.fromSegments.length-1)
                    {

                        if(transAirportDict[seg.depAirport]==null)
                        {
                            transAirportList.push(seg.depAirportCN+"("+seg.depAirport+")")
                            transAirportDict[seg.depAirport]=true
                        }
                        routing.transiteAirport+=seg.depAirport+"_"
                        if(transCityDict[seg.depCity]==null)
                        {
                            transCityList.push(seg.depCityCN+"("+seg.depCity+")")
                            transCityDict[seg.depCity]=true
                        }
                        routing.transiteCity+=seg.depCity+"_"
                    }

                    //航司中文
                    seg.carrierCN = seg.carrier;
                    if (appConfig.airlineDict[seg.carrier] != null) {
                        seg.carrierCN = appConfig.airlineDict[seg.carrier].CnFName;
                    }
                    //到达时间
                    seg.arrTimeSmall = moment(seg.arrDatetime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
                    //出发时间
                    seg.depTimeSmall = moment(seg.depDatetime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
                    //舱等中文
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
                        case "S":
                            seg.cabinGradeCN = "高端经济舱";                   
                            break;
                    }
                }
                if (routing.retSegments != null&&routing.retSegments.length>0) {

                    var retStartTime = new Date(moment(routing.retSegments[0].depDatetime.substr(0,10), "YYYY-MM-DD"));
                    var retendTime = new Date(moment(routing.retSegments[routing.retSegments.length-1].arrDatetime.substr(0,10), "YYYY-MM-DD"));
                    var  retDiff=parseInt((retendTime.getTime() - retStartTime.getTime()) / parseInt(3600*24*1000));
                    if(retDiff>0)routing.ret_kuari="+"+retDiff;
                    else if(retDiff<0)routing.ret_kuari=retDiff;

                    for (var j = 0; j < routing.retSegments.length; j++) {
                        var seg = routing.retSegments[j];
                        durationTotal += seg.duration;
                        //到达机场中文
                        seg.arrAirportCN = seg.arrAirport;
                        seg.arrCityCN = seg.arrAirport;
                        seg.arrCity = seg.arrAirport;
                        if (appConfig.airportDict[seg.arrAirport] != null) {
                            seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
                            seg.arrCityCN = appConfig.airportDict[seg.arrAirport].CityCNName;
                            seg.arrCity = appConfig.airportDict[seg.arrAirport].CityThCode;
                        }
                        seg.arrAirportCNName = seg.arrAirportCN+'('+seg.arrAirport+')';

                        //出发机场中文
                        seg.depAirportCN = seg.depAirport;
                        seg.depCityCN = seg.depAirport;
                        seg.depCity = seg.depAirport;
                        if (appConfig.airportDict[seg.depAirport] != null) {
                            seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
                            seg.depCityCN = appConfig.airportDict[seg.depAirport].CityCNName;
                            seg.depCity = appConfig.airportDict[seg.depAirport].CityThCode;
                        }

                        //记录中转点
                        
                        if(j!=0&&j!=routing.retSegments.length-1)
                        {

                            if(transAirportDict[seg.depAirport]==null)
                            {
                                transAirportList.push(seg.depAirportCN+"("+seg.depAirport+")")
                                transAirportDict[seg.depAirport]=true
                            }
                            routing.transiteAirport+=seg.depAirport+"_"
                            if(transCityDict[seg.depCity]==null)
                            {
                                transCityList.push(seg.depCityCN+"("+seg.depCity+")")
                                transCityDict[seg.depCity]=true
                            }
                            routing.transiteCity+=seg.depCity+"_"
                        }

                        //航司中文
                        seg.carrierCN = seg.carrier;
                        if (appConfig.airlineDict[seg.carrier] != null) {
                            seg.carrierCN = appConfig.airlineDict[seg.carrier].CnFName;
                        }
                        //到达时间
                        seg.arrTimeSmall = moment(seg.arrDatetime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
                        //出发时间
                        seg.depTimeSmall = moment(seg.depDatetime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
                        //舱等中文
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
                            case "S":
                                seg.cabinGradeCN = "高端经济舱";    
                                break;
                        }
                    }
     
                };

                //获取最低价格 和飞行时长
                if (lowestPrice > routing.adultPrice + routing.adultTax) {
                    lowestPrice = routing.adultPrice + routing.adultTax
                    lowestPriceDuration = durationTotal
                }

                //性价比最高
                if (lowFlightCount > flightCount) {
                    lowFlightCount = flightCount;
                    lowFlightCountDuration = durationTotal;
                    lowFlightCountPrice = routing.adultPrice + routing.adultTax;
                }
                else if (lowFlightCountPrice > routing.adultPrice + routing.adultTax) {
                    lowFlightCountDuration = durationTotal;
                    lowFlightCountPrice = routing.adultPrice + routing.adultTax;
                }

                //飞行时长最短 
                if (lessDuration > durationTotal) {
                    lessDuration = durationTotal
                    lessDurationPrice = routing.adultPrice + routing.adultTax;
                }

                //#endregion

                //region 获取航司列表

                var tempCarrierCode = routing.validatingCarrier;
                if (tempCarrierMap.get(tempCarrierCode) == undefined) {

                    tempCarrierMap.set(tempCarrierCode, 1);
                    carrierList.push({
                        code: tempCarrierCode,
                        codeCN: airlineDictConfig[tempCarrierCode] == undefined ? '未知' : airlineDictConfig[tempCarrierCode].CnFName
                    });
                }

                //#endregion

                //region 退改签

                if (routing.rule != null) {
                    var baggageCn = "";
                    var baggageInfoListCN = "";
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

                            baggageCn += "第" + (j + 1) + "段行程"
                            baggageInfoListCN += ''
                            if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                                baggageCn += ",成人免费托运行李" + routing.rule.baggageInfoList[j].adultBaggage
                                baggageInfoListCN += routing.rule.baggageInfoList[j].adultBaggage + ';'
                            }
                            if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                                baggageCn += ",儿童免费托运行李" + routing.rule.baggageInfoList[j].childBaggage + ';'

                            }
                            // baggageCn += ";"
                            if (routing.rule.baggageInfoList[j].adultBaggage == '') {
                                baggageCn += "不提供免费托运行李额;"
                                baggageInfoListCN += "不提供免费托运行李额;"
                            }
                        }
                    }
                    routing.rule.baggageCn = baggageCn
                    routing.rule.baggageInfoListCN = baggageInfoListCN
                    routing.rule.refundCn = refundCn
                    routing.rule.changeCn = changeCn
                    routing.rule.ticketRemarkCn = ticketRemarkCn
                }
                //#endregion

                var isOrg=true;
                if(fromType=="city"&&toType=="city")
                {
                }
                else if(fromType=="airport"||toType=="airport")
                {
                    if(fromType=="airport")
                    {
                        if(routing.fromSegments[0].depAirport==orgFromCity)
                        {
                            if(tripType==1)
                            {
                            }
                            else if(routing.retSegments[routing.retSegments.length-1].arrAirport==orgFromCity)
                            {
                            }
                            else
                            {
                                isOrg=false;
                            }
                        } 
                        else
                        {
                            isOrg=false;
                        }
                    }
                    if(isOrg)
                    {
                        if(toType=="airport")
                        {
                            if(routing.fromSegments[routing.fromSegments.length-1].arrAirport==orgToCity)
                            {
                                if(tripType==1)
                                {
                                }
                                else if(routing.retSegments[0].depAirport==orgToCity)
                                {
                                }
                                else
                                {
                                    isOrg=false;
                                }
                            } 
                            else
                            {
                                isOrg=false;
                            }
                        }
                    }

                }

                if(isOrg)
                {
                    result.orgShopping1Response.routings.push(routing);
                }
                else
                {
                    result.orgShopping1Response.otherroutings.push(routing);
                }
            }
        }

        result.orgShopping1Response.lowestPrice = lowestPrice
        result.orgShopping1Response.lowestPriceDuration = lowestPriceDuration

        result.orgShopping1Response.lessDuration = lessDuration
        result.orgShopping1Response.lessDurationPrice = lessDurationPrice

        result.orgShopping1Response.lowFlightCount = lowFlightCount
        result.orgShopping1Response.lowFlightCountDuration = lowFlightCountDuration
        result.orgShopping1Response.lowFlightCountPrice = lowFlightCountPrice

        result.orgShopping1Response.transCityList = transCityList
        result.orgShopping1Response.transAirportList = transAirportList

        result.orgShopping1Response.carrierList = carrierList
        result.fromCity=fromCity
        result.toCity=toCity
        result.fromCityCN=fromCityCN
        result.toCityCN = toCityCN

    
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
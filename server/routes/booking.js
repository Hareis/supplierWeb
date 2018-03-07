'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');
const axios=require("axios");
const moment = require('moment');

//region validate

class validateResponse extends JSONResponse {
    constructor() {

        super();
        this.maxSeat=null;
        this.routing=null;
    }
}

router.post('/validate.do', async function (req, res, next) {

    try{

        req.validateLogin();
        const token = req.session.token
        const username = req.session.userName
        const userId = req.session.userId

        //const token=req.token
        var request={
             username:username
             ,userId:userId
             ,token:token
            ,tripType:req.body.tripType
            ,adultNumber:req.body.adultNumber||1
            ,childNumber:req.body.childNumber||0
            ,routing:req.body.routing
        }

        var invokeResult = await ServiceFactory.getHandle("orderService","ota","validate","v1").postAsync(request);

         if(invokeResult.data.status!=0)
         {
            throw new BusinessException(invokeResult.data.message);
         }

        let result = new validateResponse();
        result.success = true;
        result.maxSeat=invokeResult.data.routing.maxSeats;
        result.routing=req.body.routing;
        result.routing.data=invokeResult.data.routing.data; 
        var routing = invokeResult.data.routing;

        var validateRefundCn = "";
        var validateChangeCn = "";

        if (routing.rule.refundInfoList != null && routing.rule.refundInfoList.length > 0) {
            for (var j = 0; j < routing.rule.refundInfoList.length; j++) {
                switch (routing.rule.refundInfoList[j].refundType) {
                    case 0:
                        validateRefundCn += "客票全部未使用;";
                        break;
                    case 1:
                        validateRefundCn += "客票部分使用;";
                        break;
                }
                switch (routing.rule.refundInfoList[j].refundStatus) {
                    case "T":
                        validateRefundCn += "不可退;";
                        break;
                    case "H":
                        validateRefundCn += "有条件退;";
                        break;
                    case "F":
                        validateRefundCn += "免费退;";
                        break;
                    case "E":
                        validateRefundCn += "按航司客规;";
                        break;
                }
                if (routing.rule.refundInfoList[j].refundFee > 0) {
                    validateRefundCn += "退票费" + routing.rule.refundInfoList[j].refundFee + routing.rule.refundInfoList[j].currency + ";";
                }
            }
        }
        if (routing.rule.changesInfoList != null && routing.rule.changesInfoList.length > 0) {
            for (var j = 0; j < routing.rule.changesInfoList.length; j++) {
                switch (routing.rule.changesInfoList[j].changesType) {
                    case 0:
                        validateChangeCn += "客票全部未使用;";
                        break;
                    case 1:
                        validateChangeCn += "客票部分使用;";
                        break;
                }
                switch (routing.rule.changesInfoList[j].changesStatus) {
                    case "T":
                        validateChangeCn += "不可改期;";
                        break;
                    case "H":
                        validateChangeCn += "有条件改期;";
                        break;
                    case "F":
                        validateChangeCn += "免费改期;";
                        break;
                    case "E":
                        validateChangeCn += "按航司客规;";
                        break;
                }
                if (routing.rule.changesInfoList[j].changesFee > 0) {
                    validateChangeCn += "改期金额" + routing.rule.changesInfoList[j].changesFee + routing.rule.changesInfoList[j].currency + ";";
                }
            }
        }    
        
                if (routing.rule.baggageInfoList != null && routing.rule.baggageInfoList.length > 0) {
                var  validatebaggageCn = '';
                var baggageInfoListCN1 = '';
                for (var j = 0; j < routing.rule.baggageInfoList.length; j++) {
    
                    validatebaggageCn += "第" + (j + 1) + "段行程"
                    baggageInfoListCN1 += ''
                    if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                        validatebaggageCn += ",成人免费托运行李" + routing.rule.baggageInfoList[j].adultBaggage
                        baggageInfoListCN1 += routing.rule.baggageInfoList[j].adultBaggage+'/'
                    }
                    if (routing.rule.baggageInfoList[j].adultBaggage.length > 0) {
                        validatebaggageCn += ",儿童免费托运行李" + routing.rule.baggageInfoList[j].childBaggage+';'
    
                    }
                    // validatebaggageCn += ";"
                    if (routing.rule.baggageInfoList[j].adultBaggage == '') {
                        validatebaggageCn += "不提供免费托运行李额;"
                        baggageInfoListCN1 += "不提供免费托运行李额;"
                    }
                }
            }
            routing.rule.validatebaggageCn = validatebaggageCn
            routing.rule.baggageInfoListCN1 = baggageInfoListCN1 
            routing.rule.validateRefundCn = validateRefundCn
            routing.rule.validateChangeCn = validateChangeCn
            
            result.routing.rule=routing.rule;

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

class BookingResponse extends JSONResponse{
    constructor() {
        super();
        this.orderId=null;
        this.bookingDatetime=null;

    }
}

router.post('/booking.do', async function (req, res, next) {

    try{
 

        req.validateLogin();
        const token = req.session.token
        const username = req.session.userName
        const userId = req.session.userId

        //const token=req.token
        const data = req.body.data;
        const passengers = req.body.passengers;
        const contact = req.body.contact;
        var request={
            username:username
            ,userId:userId
            ,token:token
            ,data:data
            ,passengers:passengers
            ,contact:contact
        }
        var invokeResult = await ServiceFactory.getHandle("orderService","ota","booking","v1").postAsync(request);
         if(invokeResult.data.status!=0)
         {
            throw new BusinessException(invokeResult.data.message);
         }
        
        var a=new Date(); 
        let result = new BookingResponse()
        result.orderId=invokeResult.data.orderId        
        result.bookingDatetime= a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes();

         

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

//region validateBeforePay

router.post('/paycheck.do', async function (req, res, next) {

    try{
        
        req.validateLogin();
        const token = req.session.token
        const username = req.session.userName
        const userId = req.session.userId

        //const token=req.token
        const orderId = req.body.orderId;
        var request={
            username:username
            ,userId:userId
            ,token:token
            ,orderId:orderId
        }

        var invokeResult = await ServiceFactory.getHandle("orderService","ota","paycheck","v1").postAsync(request);
         if(invokeResult.data.status!=0)
         {
            throw new BusinessException(invokeResult.data.message);
         }

      
        let result = new BookingResponse()
        result.orderId=orderId;
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
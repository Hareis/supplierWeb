'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');


class GetOrderListResponse extends JSONResponse {
    constructor() {

        super();
        this.totalRow = null;
        this.totalPage = null;
        this.orders = null;

    }
}

function bookingTimeSort(b, a) {
    return (new Date(a.bookingTime).getTime() - new Date(b.bookingTime).getTime());
}
/**
 * 获取订单列表
 */
router.post('/getOrderList.do', async function (req, res, next) {


    try {
        req.validateLogin();
        const username = req.session.userName;
        const userId = req.session.userId;
        const token = req.session.token;

        const refundType = req.body.refundType;
        const refundTypes = req.body.refundType;

        const buyerId = req.body.buyerId;
        const buyerName = req.body.buyerName;
        const depDateStart = req.body.depDateStart;
        const depDateEnd = req.body.depDateEnd;
        const bookDateStart = req.body.bookDateStart;
        const bookDateEnd = req.body.bookDateEnd;
        const orderId = req.body.orderId;
        const pnr = req.body.pnr;
        const depCity = req.body.depCity;
        const arrCity = req.body.arrCity;
        const ticketNo = req.body.ticketNo;
        
        var mainStatus = req.body.mainStatus;


        var mainStatusList=[]
        if(mainStatus.indexOf('_')>0)
        {
            mainStatusList=mainStatus.split('_')
            mainStatus=null
        }

        const dataSource = req.body.dataSource;
        const orderSource = req.body.orderSource;
        const paymentType = req.body.paymentType;
        const supplierId = req.body.supplierId;
        const supplierName = req.body.supplierName;
        const carrier = req.body.carrier;
        const flightNumber = req.body.flightNumber;
        const passengerName = req.body.passengerName;

        const pageIndex = req.body.pageIndex || 1;
        const pageSize = req.body.pageSize || 10;

        

        const requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",

            passengerName: passengerName,
            refundType: refundType,
            refundTypes: refundTypes,
            buyerId: buyerId,
            buyerName: buyerName,
            depDateStart: depDateStart,
            depDateEnd: depDateEnd,
            bookDateStart: bookDateStart,
            bookDateEnd: bookDateEnd,
            orderId: orderId,
            pnr: pnr,
            depCity: depCity,
            arrCity: arrCity,
            mainStatus: mainStatus,
            mainStatusList: mainStatusList,
            ticketNo: ticketNo,

            dataSource: dataSource,
            orderSource: orderSource,
            paymentType: paymentType,
            supplierId: supplierId,
            supplierName: supplierName,
            carrier: carrier,
            flightNumber: flightNumber,

            pageIndex: pageIndex,
            pageSize: pageSize
        };


        var handle = ServiceFactory.getHandle("refundService", "refund/order", "list", "v1");
        var invokeResult = await handle.postAsync(requestObj);


        if (invokeResult.data.status == 1) {
            //没有查到对应订单
            let result = new GetOrderListResponse();
            result.success = true;
            result.totalRow = 0;
            result.totalPage = 0;
            result.orders = [];
            res.send(result);
            return;
        }
        else if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }


        let result = new GetOrderListResponse();


        result.success = true;
        result.orders = invokeResult.data.orders;

        if (result.orders != null) {
            for (var i = 0; i < result.orders.length; i++) {
                var order = result.orders[i];

                for (var j = 0; j < order.segments.length; j++) {
                    var seg = order.segments[j];
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
        }



        result.orders.sort(bookingTimeSort);
        result.totalRow = invokeResult.data.totalRow;
        result.totalPage = invokeResult.data.totalPage;


        for (var i = 0; i < result.orders.length; i++) {

            switch (result.orders[i].mainStatus) {
                case 0:
                    result.orders[i].statusCn = "无效状态";
                    break;
                case 1:
                    result.orders[i].statusCn = "申请";
                    break;
                case 2:
                    result.orders[i].statusCn = "待确认";
                    break;
                case 3:
                    result.orders[i].statusCn = "已确认";
                    break;
                case 4:
                    result.orders[i].statusCn = "取消";
                    break;
                case 5:
                    result.orders[i].statusCn = "完成";
                    break;
                case 6:
                    if (refundType == 2) {
                        result.orders[i].statusCn = "完成"
                    }
                    break;
            }


            result.orders[i].totalPrice
                = (result.orders[i].adultPrice + result.orders[i].adultTax) * result.orders[i].adultNumber
                + (result.orders[i].childPrice + result.orders[i].childTax) * result.orders[i].childNumber


        }


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

class GetOrderGetResponse extends JSONResponse {
    constructor() {

        super();
        this.totalRow = null;
        this.totalPage = null;
        this.order = null;

    }
}

/**
 * 获取订单信息
 */
router.post('/getOrderGet.do', async function (req, res, next) {


    try {
        req.validateLogin();
        const userId = req.session.userId
        const username = req.session.userName
        const token = req.session.token
        const userType = 'UserTypeBuyer'
        const orderId = req.body.orderId


        var handle = ServiceFactory.getHandle("refundService", "refund/order", "get", "v1");
        var invokeResult = await handle.postAsync({
            userId: userId,
            username: username,
            token: token,
            userType: userType,
            orderId: orderId
        });


        if (invokeResult.data.status == 1) {

            let result = new GetOrderGetResponse();
            result.success = true;
            result.totalRow = 0;
            result.totalPage = 0;
            result.orders = [];
            res.send(result);
            return;
        }
        else if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }


        let result = new GetOrderGetResponse();


        result.success = true;
        result.order = invokeResult.data.order;

            // var order = result.order;
            // var seg = order.segments;

            // if (result.order != null) {
            //     for (var i = 0; i < result.order.length; i++) {
            //         var order1 = result.order[i];
            //         for (var j = 0; j < order1.segments.length; j++) {
            //             var seg = order1.segments[j];
            //             seg.arrAirportCN = seg.arrAirport;
            //             if (appConfig.airportDict[seg.arrAirport] != null) {
            //                 seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
            //             }
            //             seg.depAirportCN = seg.depAirport;
            //             if (appConfig.airportDict[seg.depAirport] != null) {
            //                 seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
            //             }
            //         }
            //     }
            // }

            var order = result.order;
            var seg = order.segments;

            if(result.order != null){
                var segment = result.order.segments;
                for(var i = 0;i<segment.length;i++){
                    var segment1 = segment[i];
                        segment1.arrAirportCN =  segment1.arrAirport;
                        if (appConfig.airportDict[segment1.arrAirport] != null) {
                            segment1.arrAirportCN = appConfig.airportDict[segment1.arrAirport].CnFName;
                        }
                        seg.depAirportCN = segment1.depAirport;
                        if (appConfig.airportDict[segment1.depAirport] != null) {
                            segment1.depAirportCN = appConfig.airportDict[segment1.depAirport].CnFName;
                        }
                }


            }



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
/**
 * 退改申请（买家端）
 */
router.post('/refundApply.do', upload.any(), async function (req, res, next) {

    try {

        req.validateLogin();
        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token;
        const userType = 'UserTypeBuyer';

        req.body = JSON.parse(req.body.data);

        const refundType = req.body.refundType;
        const sourceOrderId = req.body.sourceOrderId;

        const passengers = req.body.passengers;
        const segments = req.body.segments;
        const contact = req.body.contact;
        let reason = req.body.reason;

        let attachments = [];

        //读取文件转base64 并删除文件
        if (req.files != undefined && req.files instanceof Array && req.files.length > 0) {

            attachments = req.files.map(item => {
                let filePath = path.resolve(item.path);
                let data = fs.readFileSync(filePath);
                data = new Buffer(data).toString('base64');
                //删除文件出错则直接抛出错误
                fs.unlink(filePath, function (err) {
                    if (err) throw err;
                });
                return {
                    name: item.fieldname,
                    base64: data
                }
            })
        }
        reason.attachments = attachments || [];


        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            if (segment.newDepDatetime == undefined)
                segment.newDepDatetime = ""
            if (segment.newCabin == undefined)
                segment.newCabin = ""
            if (segment.newFlightNumber == undefined)
                segment.newFlightNumber = ""
        }

        //const token=req.token
        const request = {
            userId: userId
            , username: username
            , token: token
            , userType: userType
            , refundType: refundType
            , sourceOrderId: sourceOrderId,
            passengers: passengers,
            segments: segments,
            contact: contact,
            reason: reason
        };

        let invokeResult = await ServiceFactory.getHandle("refundService", "refund", "apply", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();
        result.orderId = invokeResult.data.orderId;
        result.mainStatus = invokeResult.data.mainStatus;
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
/**
 * 退改方案确认(买家端)
 */
router.post('/refundVilidate.do', async function (req, res, next) {

    try {

        req.validateLogin();
        const username = req.session.userName
        const userId = req.session.userId
        const token = req.session.token
        const userType = 'UserTypeBuyer'
        const orderId = req.body.orderId
        // const paymentType = req.session.paymentType
        const status = 1


        //const token=req.token
        var request = {
            username: username
            , userId: userId
            , token: token
            , userType: userType
            , orderId: orderId
            , status: status
        }

        var invokeResult = await ServiceFactory.getHandle("refundService", "refund", "validate", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();

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
/**
 * 退票取消
 */
router.post('/refundCancel.do', async function (req, res, next) {

    try {

        req.validateLogin();
        const username = req.session.userName
        const userId = req.session.userId
        const token = req.session.token
        const userType = 'UserTypeBuyer'
        const orderId = req.body.orderId


        //const token=req.token
        var request = {
            username: username
            , userId: userId
            , token: token
            , userType: userType
            , orderId: orderId
        }


        var invokeResult = await ServiceFactory.getHandle("refundService", "refund", "cancel", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();

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
/**
 * 获取退改订单状态数
 */
router.post('/getRefundOrderStatus.do', async function (req, res, next) {
    try {

        req.validateLogin();
        const username = req.session.userName;
        const userId = req.session.userId;
        const token = req.session.token;
        const userType = 'UserTypeBuyer';
        const refundType = req.body.refundType;

        const request = {
            username: username
            , userId: userId
            , token: token
            , userType: userType
            , refundType: refundType
        };

        const invokeResult = await ServiceFactory.getHandle("refundService", "refund/order", "status", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();

        result.success = true;
        result.orderStatus = invokeResult.data.orderStatus;

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

//获取退改订单状态数（买家端）
router.post('/getRefundStatusList.do', async function (req, res, next) {
    try {
        req.validateLogin();
        const username = req.session.userName
        const userId = req.session.userId
        const token = req.session.token
        const userType = 'UserTypeBuyer'
        const refundType = req.body.refundType

        var request = {
            username: username
            , userId: userId
            , token: token
            , userType: userType
            , refundType: refundType
        }
        var invokeResult = await ServiceFactory.getHandle("refundService", "refund/order", "status", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();

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

/**
 * 获取附件
 */
router.get('/getAttachmentDetail.do', async function (req, res, next) {

    try {
        req.validateLogin();
        const username = req.session.userName;
        const userId = req.session.userId;
        const token = req.session.token;
        const userType = 'UserTypeBuyer';

        const orderId = req.query.orderId;
        const attachmentId = req.query.attachmentId;

        let request = {
            username: username
            , userId: userId
            , token: token
            , userType: userType
            , orderId: orderId
            , attachmentId: attachmentId
        };

        let invokeResult = await ServiceFactory.getHandle("refundService", "refund/attachment", "get", "v1").postAsync(request);

        if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new JSONResponse();
        result.attachment = invokeResult.data.attachment;
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

module.exports = router;












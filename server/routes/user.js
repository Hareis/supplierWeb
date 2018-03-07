'use strict';
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const ccapWrapper = require('../lib/ccapWrapper.js');
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');

//region getOrderList


function bookingTimeSort(b, a) {
    return (new Date(a.bookingTime).getTime() - new Date(b.bookingTime).getTime());
}
class GetOrderListResponse extends JSONResponse {
    constructor() {

        super();
        this.totalRow = null;
        this.totalPage = null;
        this.orders = null;

    }
}

router.post('/getOrderList.do', async function (req, res, next) {


    try {
        req.validateLogin();
        const token = req.session.token
        const userId = req.session.userId
        const passengerName = req.body.passengerName
        const depDateStart = req.body.depDateStart
        const depDateEnd = req.body.depDateEnd
        const bookDateStart = req.body.bookDateStart
        const bookDateEnd = req.body.bookDateEnd
        const orderId = req.body.orderId
        const pnr = req.body.pnr
        const ticketNo = req.body.ticketNo
        const depCity = req.body.depCity
        const arrCity = req.body.arrCity
        const mainStatus = req.body.mainStatus

        //const token=req.token
        const pageIndex = req.body.pageIndex || 1;
        const pageSize = req.body.pageSize || 10;

        var handle = ServiceFactory.getHandle("DBService", "order", "list", "v1");
        var invokeResult = await handle.postAsync({
            passengerName: passengerName,
            userId: userId,
            token: token,
            depDateStart: depDateStart,
            depDateEnd: depDateEnd,
            bookDateStart: bookDateStart,
            bookDateEnd: bookDateEnd,
            orderId: orderId,
            pnr: pnr,
            ticketNo: ticketNo,
            depCity: depCity,
            arrCity: arrCity,
            mainStatus: mainStatus,
            pageIndex: pageIndex,
            pageSize: pageSize,
        });


        if (invokeResult.data.status == 1) {
            //没有查到对应订单
            let result = new GetOrderListResponse();
            result.success = true;
            result.totalRow = 0;
            result.totalPage = 0;
            result.orders = [];
            res.send(result);
            1
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

        var orders = result.orders;


        for (var i = 0; i < orders.length; i++) {
            var order = orders[i]

            order.passengers.forEach(psger => {
                psger.tickets = [];
                if (order.hasOwnProperty('tickets')) {
                    psger.tickets = _.uniqBy(order.tickets.map(ticket => {
                        let temp = ticket.passengers.filter(e => e.cardNum === psger.cardNum);
                        if (temp.length > 0) {
                            return {
                                segmentIndex: ticket.segmentIndex,
                                ticketNo: temp[0]['ticketNo']
                            }
                        }
                        else {
                            return {
                                segmentIndex: undefined,
                                ticketNo: undefined
                            }
                        }
                    }), 'ticketNo')
                }
            });
        }


        result.orders.sort(bookingTimeSort);
        result.totalRow = invokeResult.data.totalRow;
        result.totalPage = invokeResult.data.totalPage;


        for (var i = 0; i < result.orders.length; i++) {
            switch (result.orders[i].mainStatus) {
                case 0:
                    result.orders[i].statusCn = "无效状态"
                    break;
                case 1:
                    result.orders[i].statusCn = "生单失败"
                    break;
                case 2:
                    result.orders[i].statusCn = "待支付"
                    break;
                case 3:
                    result.orders[i].statusCn = "待出票"
                    break;
                case 4:
                    result.orders[i].statusCn = "已出票"
                    break;
                case 5:
                    result.orders[i].statusCn = "已取消"
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

class GetOrderDetailsResponse extends JSONResponse {
    constructor() {

        super();
        this.order = null;

    }
}

router.post('/getOrderDetails.do', async function (req, res, next) {


    try {
        req.validateLogin();
        const username = req.session.userName
        const userId = req.session.userId
        const userType = req.body.userType
        const token = req.session.token
        const orderId = req.body.orderId

        var handle = ServiceFactory.getHandle("DBService", "order", "details", "v1");
        var invokeResult = await handle.postAsync({
            username: username,
            userId: userId,
            userType: userType,
            token: token,
            orderId: orderId

        });

        if (invokeResult.data.status == 1) {
            //没有查到对应订单
            let result = new GetOrderDetailsResponse();
            result.success = true;
            result.orders = [];
            res.send(result);
            1
            return;
        }
        else if (invokeResult.data.status != 0) {
            throw new BusinessException(invokeResult.data.message);
        }

        let result = new GetOrderDetailsResponse();

        result.success = true;
        result.order = invokeResult.data.order;


        // var seg =  result.order.segments;
        // seg.arrAirportCN = seg.arrAirport;
        // if (appConfig.airportDict[seg.arrAirport] != null) {
        //     seg.arrAirportCN = appConfig.airportDict[seg.arrAirport].CnFName;
        // }
        // seg.depAirportCN = seg.depAirport;
        // if (appConfig.airportDict[seg.depAirport] != null) {
        //     seg.depAirportCN = appConfig.airportDict[seg.depAirport].CnFName;
        // }

        // for(var i=0;i<invokeResult.data.order.segments.length;i++)
        // {
        //     var segment=invokeResult.data.order.segments[i];
        //     segment.newDepDatetime=null;
        // }

        var order = result.order;
        var seg = order.segments;

        if (result.order != null) {
            var segment = result.order.segments;
            for (var i = 0; i < segment.length; i++) {
                var segment1 = segment[i];
                segment1.arrAirportCN = segment1.arrAirport;
                if (appConfig.airportDict[segment1.arrAirport] != null) {
                    segment1.arrAirportCN = appConfig.airportDict[segment1.arrAirport].CnFName;
                    segment1.arrAirportEN = appConfig.airportDict[segment1.arrAirport].EnFName;
                }
                seg.depAirportCN = segment1.depAirport;
                if (appConfig.airportDict[segment1.depAirport] != null) {
                    segment1.depAirportCN = appConfig.airportDict[segment1.depAirport].CnFName;
                    segment1.depAirportEN = appConfig.airportDict[segment1.depAirport].EnFName;
                }
            }


            order.passengers.forEach(psger => {
                psger.tickets = [];
                if (order.hasOwnProperty('tickets')) {
                    psger.tickets = _.uniqBy(order.tickets.map(ticket => {
                        let temp = ticket.passengers.filter(e => e.cardNum === psger.cardNum);
                        if (temp.length > 0) {
                            return {
                                segmentIndex: ticket.segmentIndex,
                                ticketNo: temp[0]['ticketNo']
                            }
                        }
                        else {
                            return {
                                segmentIndex: undefined,
                                ticketNo: undefined
                            }
                        }
                    }), 'ticketNo')
                }
            });

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
 * 获取订单列表状态
 */
router.post('/getOrderStatus.do', async function (req, res, next) {

    try {
        req.validateLogin();
        const username = req.session.userName;
        const userId = req.session.userId;
        const userType = "UserTypeBuyer";
        const token = req.session.token;

        let handle = ServiceFactory.getHandle("DBService", "db/order", "status/count", "v1");
        let invokeResult = await handle.postAsync({
            username: username,
            userId: userId,
            userType: userType,
            token: token
        });
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

module.exports = router;
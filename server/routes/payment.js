

'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');
const moment = require('moment');

class paymentResponse extends JSONResponse {
    constructor() {
        super();
        this.payUrl = '';
    }


}


function getBJErrorMsg(status,messageStr)
{
    var result="";
    switch(status)
    {
        case 0:
            result = "";
            break;
        case 1:
            result = "用户访问限制";
            break;
        case 2:
            result = "参数验证失败";
            break;
        case 3:
            result = "系统错误";
            break;
        case 4:
            result = "Error";
            break;
        case 1001:
            result = "账号无效";
            break;
        case 1002:
            result = "不支持此操作";
            break;
        case 1003:
            result = "重复的操作";
            break;
        case 1004:
            result = "操作金额必须大于0";
            break;
        case 1005:
            result = "额度不足";
            break;
        case 1006:
            result = "结算失败";
            break;
        case 1101:
            result = "授信未开启";
            break;
        case 1102:
            result = "超出授信最晚还款时间";
            break;
        case 1103:
            result = "授信账单未还清";
            break;
        case 1104:
            result = "还款金额小于账单欠款金额";
            break;
        default:
            result=messageStr;
            break;

    }
    return result;
}

router.post('/payment.do', async function (req, res, next) {
    try {
        req.validateLogin();
        const username = req.username
        const userId = req.userId
        const token = req.session.token
        const orderDesc = '扫码支付'
        const orderName = "国际机票"
        const orderNo = req.body.orderNo
        const paymentAmount = req.body.paymentAmount
        const paymentMode = req.body.paymentMode
        const tempOrderDetail = req.session.payOrdersMap;
        const bookingDatetime = tempOrderDetail.bookingDatetime;

        var url = appConfig.envConfig.service["buyerWebUrl"].urlPrefix;
        //url="http://localhost:9000"
        const returnUrl = url + "/payment/zfbPayReturn.do"

        let paymentObj = {
            username: username,
            userId: userId,
            token: token,
            orderDesc: orderDesc,
            orderName: orderName,
            orderNo: orderNo,
            paymentAmount: paymentAmount,
            paymentMode: paymentMode,
            returnUrl: returnUrl,
            bookingDatetime: bookingDatetime
        }

        let paymentResult = await ServiceFactory.getHandle('paymentService', 'payment', 'pay', 'v1').postAsync(paymentObj)

        if (paymentResult.data.status != 0) {
            throw new BusinessException(paymentResult.data.message);
        }

        let result = new paymentResponse();
        result.success = true;
        result.payUrl = paymentResult.data.payUrl;
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
}
)

class limitResponse extends JSONResponse {
    constructor() {
        super();
        this.orderId = null;
        this.payType = null;
        this.accountType = null;
        this.price = 0;
    }
}
//申请支付额度并且通知出票
router.post('/otherPaymentType.do',async function(req,res,netx)
{

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token
        const orderId = req.body.orderId;
        const payType = req.body.payType;
        const price = req.body.price;
        const accountType = req.body.accountType;
        const tradeNo = req.body.tradeNo;

        let limitResultObj = {

            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            orderId: orderId,
            payType: payType,
            accountType: accountType,
            price: price,
            tradeNo: tradeNo
        };

        let limitResult = await ServiceFactory.getHandle('accountingService', 'accounting/limit', 'require', 'v1').postAsync(limitResultObj)

        if(limitResult.data.status !=0)
        {
            var errorMsg=getBJErrorMsg(limitResult.data.status,limitResult.data.message)
            throw new BusinessException(errorMsg);
        }
        else
        {
            let result = new paymentResponse();
            var handle4 = ServiceFactory.getHandle("ticketingService", "ticketing", "issue", "v1");
            var invokeResult4 = await handle4.postAsync({
                username: username,
                userId: userId,
                userType:"UserTypeSystem",
                token: token,
                orderId: orderId
            });
            if (invokeResult4.data.status == 0) {
                let result = new limitResponse();
                result.orderId = limitResult.data.order;
                result.payType = limitResult.data.payType;
                result.accountType = limitResult.data.accountType;
                result.price = limitResult.data.price;
                result.success = true;
                res.send(result);
            }  
            else
            {
                throw new BusinessException(invokeResult4.data.message);       
            }
        }

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


})

router.post('/paymentChanged.do', async function (req, res, next) {
    try {
        req.validateLogin();
        const username = req.username
        const userId = req.userId
        const token = req.session.token
        const orderDesc = "测试支付"
        const orderName = "test"
        const orderNo = req.body.orderNo
        const paymentAmount = req.body.paymentAmount
        const paymentMode = req.body.paymentMode

        const tempOrderDetail = req.session.payOrdersMap;
        const bookingDatetime = req.body.bookingDatetime;

        var url = appConfig.envConfig.service["buyerWebUrl"].urlPrefix;
        //  url="http://localhost:9000"
        const returnUrl = url + "/payment/zfbPayChangedReturn.do"

        let paymentObj = {
            username: username,
            userId: userId,
            token: token,
            orderDesc: orderDesc,
            orderName: orderName,
            orderNo: orderNo,
            paymentAmount: paymentAmount,
            paymentMode: paymentMode,
            returnUrl: returnUrl,
            bookingDatetime: bookingDatetime
        }

        let paymentResult = await ServiceFactory.getHandle('paymentService', 'payment', 'pay', 'v1').postAsync(paymentObj)

        if (paymentResult.data.status != 0) {
            throw new BusinessException(paymentResult.data.message);
        }

        let result = new paymentResponse();
        result.success = true;
        result.payUrl = paymentResult.data.payUrl;
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
}
)

router.get("/zfbPayChangedReturn.do", async function (req, res, next) {

    try {

        req.validateLogin();
        var x = "";
        for (var i in req.query) {
            x += "&" + i + "=" + req.query[i];
            if(i=="out_trade_no")
            {
                x+="&orderId=" + req.query[i];         
            }
        }
        
        res.redirect("/changeResult?paymentMode=3" + x);

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

})

router.get("/zfbPayReturn.do", async function (req, res, next) {
    try {

        req.validateLogin();
        var x="";
        for(var i in req.query)
        {
            x+="&"+i+"="+req.query[i];
        }
        res.redirect("/payResult?paymentMode=3"+x);

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
})

class getPayStatusResponse extends JSONResponse {
    constructor() {
        super();
        this.status = null;
        this.tradeNo = null;
    }

}

router.get('/getPayStatus.do', async function (req, res, next) {
    try {
        req.validateLogin();
        var paymentMode = req.query.paymentMode
        var orderId = req.query.orderId

        const token = req.session.token
        const username = req.userName
        const userId = req.userId

        //获取支付状态
        var handle = ServiceFactory.getHandle("paymentService", "payment", "status", "v1");
        var invokeResult = await handle.postAsync({
            username: username,
            userId: userId,
            userType:"UserTypeBuyer",
            token: token,
            orderNo: orderId,
            paymentMode: paymentMode
        });
        var result = new getPayStatusResponse()
        result.status = invokeResult.data.status;
        result.errorMsg = "";
        result.success = false;

         if (invokeResult.data.status == 0) {
            result.success = true;
            result.tradeNo = invokeResult.data.tradeNo
            result.errorMsg = "支付失败，系统异常请联系管理员";
            result.status = 2;
            //设置支付额度申请
            var handle2 = ServiceFactory.getHandle("accountingService", "accounting/limit", "require", "v1");
            var invokeResult2 = await handle2.postAsync({
                username: username,
                userId: userId,
                userType:"UserTypeBuyer",
                token: token,
                orderId: orderId,
                payType: paymentMode,
                accountType: 4,
                price: invokeResult.data.paymentAmount,
                tradeNo: result.tradeNo
            });

            if (invokeResult2.data.status ==0) {
                //设置订单支付
                var handle3 = ServiceFactory.getHandle("DBService", "order", "pay", "v1");
                var invokeResult3 = await handle3.postAsync({
                    username: username,
                    userId: userId,
                    userType:"UserTypeBuyer",
                    token: token,
                    orderId: orderId,
                    paymentType: paymentMode,
                    paymentTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    paymentVoucher: result.tradeNo
                });
                if (invokeResult3.data.status == 0) {
                    //通知出票
                    var handle4 = ServiceFactory.getHandle("ticketingService", "ticketing", "issue", "v1");
                    var invokeResult4 = await handle4.postAsync({
                        username: username,
                        userId: userId,
                        userType:"UserTypeSystem",
                        token: token,
                        orderId: orderId
                    });
                    if (invokeResult4.data.status == 0) {
                        result.success = true;
                        result.status = 0;
                    }
                 }
            }

        }
        else if (invokeResult.data.status == 1) {
            result.success = true;
        }
        else {
            result.errorMsg = invokeResult.data.message;
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
}
)

router.get('/getChangePayStatus.do', async function (req, res, next) {
    try {
        req.validateLogin();

        var orderId = req.query.orderId
        var paymentMode = req.query.paymentMode
        
        if(orderId==null||paymentMode==null)
        {
            let r = new JSONResponse();
            r.success = false;
            r.errorMsg = "没有支付";
            res.send(r);
        }

        const token = req.session.token
        const username = req.userName
        const userId = req.userId
    
        //获取支付状态
        var handle = ServiceFactory.getHandle("paymentService", "payment", "status", "v1");
        var invokeResult = await handle.postAsync({
            username: username,
            userId: userId,
            userType:"UserTypeBuyer",
            token: token,
            orderNo: orderId,
            paymentMode: paymentMode
        });
        var result = new getPayStatusResponse()
        result.status = invokeResult.data.status;
        result.errorMsg = "";
        result.success = false;
    
        if (invokeResult.data.status == 0) {
            result.success = true;
            result.tradeNo = invokeResult.data.tradeNo
            result.errorMsg = "支付失败，系统异常请联系管理员";
            result.status = 2;
            //设置支付额度申请
            var handle2 = ServiceFactory.getHandle("accountingService", "accounting/limit", "require", "v1");
            var invokeResult2 = await handle2.postAsync({
                username: username,
                userId: userId,
                userType:"UserTypeBuyer",
                token: token,
                orderId: orderId,
                payType: paymentMode,
                accountType: 5,
                price: invokeResult.data.paymentAmount,
                tradeNo: result.tradeNo
            });
    
            if (invokeResult2.data.status == 0) {
                var handle3 = ServiceFactory.getHandle("refundService", "refund", "validate", "v1");
                var invokeResult3 = await handle3.postAsync({
                    username: username,
                    userId: userId,
                    userType:"UserTypeBuyer",
                    token: token,
                    orderId:orderId,
                    status:1,
                    paymentType:paymentMode,
                    paymentVoucher: result.tradeNo
                });
                if(invokeResult3.data.status==0)
                {
                    result.success = true;
                    result.status = 0;
                }
            }
    
        }
        else if (invokeResult.data.status == 0) {
            result.success = true;
        }
        else {
            result.errorMsg = invokeResult.data.message;
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
}
)

class paySignResponse extends JSONResponse {
    constructor() {
        super();

    }
}

router.post('/GetPaySign.do', async function (req, res, next) {
    try{
        const username = req.session.userName;         
        const userId = req.session.userId;
        const token = req.session.token;
        const userType = "userType";
        const paymentMode = 1;

        let paySignObj = {
            username: username,
            userId: userId,
            token:  token,
            userType: userType,
            paymentMode: paymentMode

        }

        let paySignResult = await ServiceFactory.getHandle('paymentService', 'payment', 'sign', 'v1').postAsync(paySignObj)

        if (paySignResult.data.status != 0) {
            throw new BusinessException(paySignResult.data.message);
        }

        let result = new paySignResponse();
        result.success = true;
        result.signUrl = paySignResult.data.signUrl;
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
 


}
)
module.exports = router;
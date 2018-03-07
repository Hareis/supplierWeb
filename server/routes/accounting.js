'use strict';
const express = require('express');
const router = express.Router();
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');
const moment = require('moment');

const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');

class limitPrerequireReques extends JSONResponse {

    constructor() {

        super();
        this.orderId = null;
        this.price = 0;
        this.company = null;
        this.bookingDatetime = null;
        this.payTypes = []

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

router.post('/prerequire.do', async function (req, res, next) {

    try {
        req.validateLogin();
        const userId = req.session.userId
        const username = req.session.userName
        const token = req.session.token
        const orderId = req.body.orderId

        let limitResultObj = {
            userId: userId,
            username: username,
            token: token,
            userType: "UserTypeBuyer",
            orderId: orderId
        }
        let limitResult = await ServiceFactory.getHandle('accountingService', 'accounting/limit/prerequire', 'get', 'v1').postAsync(limitResultObj)

        if (limitResult.data.status != 0) {
            var errorMsg=getBJErrorMsg(limitResult.data.status,limitResult.data.message)
            throw new BusinessException(errorMsg);
        }

        // var tempMap=req.session.payOrdersMap;
        // //新增payOrdersMap 对象，其Key为orderId
        // if(tempMap==undefined|| isEmptyObject(tempMap)|| !tempMap instanceof Map){
        //     tempMap =new Map();
        // }
        // if(tempMap instanceof Map && tempMap.get(orderId)==undefined){

        //     tempMap.set(limitResult.data.orderId,{
        //         orderId: limitResult.data.orderId,
        //         bookingDatetime: limitResult.data.bookingDatetime
        //     });
        // }
        // req.session.payOrdersMap=tempMap

        req.session.payOrdersMap = {
            orderId: limitResult.data.orderId,
            bookingDatetime: limitResult.data.bookingDatetime
        }

        let result = new limitPrerequireReques();
        result.success = true;
        result.orderId = limitResult.data.orderId;
        result.price = limitResult.data.price;
        // todo...
        result.bookingDatetime = limitResult.data.bookingDatetime;

        result.company = null;
        result.payTypes = limitResult.data.payTypes;

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

class limitResponse extends JSONResponse {
    constructor() {
        super();
        this.orderId = null;
        this.payType = null;
        this.accountType = null;
        this.price = 0;
    }
}

/**
 * 支付额度申请(支付/收款接口)
 */
router.post('/limit.do', async function (req, res, next) {

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

        // http://host:port/accouting/limit/require/v1

        if(limitResult.data.status !=0)
        {
            var errorMsg=getBJErrorMsg(limitResult.data.status,limitResult.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new limitResponse();
        result.orderId = limitResult.data.order;
        result.payType = limitResult.data.payType;
        result.accountType = limitResult.data.accountType;
        result.price = limitResult.data.price;
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
 * 恢复额度申请(买家端接口)
 */
router.post('/creditSettlementOfRechage.do', upload.any(), async function (req, res, next) {

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token

        const accountType = req.body.accountType;
        const paymentVoucher = req.body.paymentVoucher;
        const creditPrice = req.body.creditPrice;
        const depositPrice = req.body.depositPrice;

        let attachments = [];

        //读取文件转base64 并删除文件
        if (req.files != undefined && req.files instanceof Array) {

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

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",

            accountType: accountType,
            paymentVoucher: paymentVoucher,
            creditPrice: creditPrice,
            depositPrice: depositPrice,
            attachments: attachments
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/limit/rechaging', 'require', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
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

class limit_rechaging_listResponse extends JSONResponse {
    constructor() {
        super();
        this.totalRow = 0;
        this.totalPage = 0;
        this.recharges = [];
    }
}

/**
 * 获取恢复额度申请记录
 */
router.post('/rechargingList.do', async function (req, res, next) {

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token
        const operatorId = req.body.operatorId;
        const operatorName = req.body.operatorName;

        const payType = req.body.payType;
        const accountType = req.body.accountType;
        const status = req.body.status;
        const agentName = req.body.agentName;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const paymentVoucher = req.body.paymentVoucher;
        const billingId = req.body.billingId;
        const pageIndex = req.body.pageIndex;
        const pageSize = req.body.pageSize;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            operatorName: operatorName,
            operatorId: operatorId,

            payType: payType,
            accountType: accountType,
            status: status,
            agentName: agentName,
            startDate: startDate,
            endDate: endDate,
            paymentVoucher: paymentVoucher,
            billingId: billingId,
            pageIndex: pageIndex,
            pageSize: pageSize
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/limit/rechaging/', 'list', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new limit_rechaging_listResponse();
        result.success = true;
        result.errorMsg = responseObj.data.errorMsg;

        result.totalPage = responseObj.data.totalPage;
        result.totalRow = responseObj.data.totalRow;
        result.recharges = responseObj.data.recharges;

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
 * 获取账单日
 * @param item
 * @returns {string}
 */
function getBillDayStr(item) {
    try {
        const lastDay = new Date(item.repaymentTime).getTime();
        const diffrenceDay = parseInt(item.accountPeriod) * 24 * 60 * 60 * 1000;
        if (isNaN(lastDay) || isNaN(diffrenceDay)) {
            throw  new Error("格式错误");
        }
        return moment(lastDay - diffrenceDay).format("YYYY-MM-DD");
    } catch (e) {
        return '';
    }
}

/**
 * 获取收支类型
 * @param accountType
 */
function getAccountType(accountType) {
    let typeStr = '';
    switch (accountType) {
        case 1:
            typeStr = "充值";
            break;
        case 2:
            typeStr = "提现";
            break;
        case 3:
            typeStr = "结算收款";
            break;
        case 4:
            typeStr = "购票支付";
            break;
        case 5:
            typeStr = "改期支付";
            break;
        case 6:
            typeStr = "辅营项目支付";
            break;
        case 7:
            typeStr = "退废收款";
            break;
        default:
            typeStr = "未知状态";
            break;
    }
    return typeStr;
}

/**
 * 获取结算状态
 * @param type
 */
function getSettlement(type) {
    let typeStr = '';
    switch (type) {
        case 0:
            typeStr = '初始账单'; 
        case 1:
            typeStr = '未结算';
            break;
        case 2:
            typeStr = '已结算';
            break;
        case 3:
            typeStr = '驳回';
            break;
        default:
            typeStr = '未知状态';
            break;
    }
    return typeStr;
}

/**
 * 获取支付类型
 * @param type
 * @returns {string}
 */
function getPaymentType(type) {
    let typeStr = '';
    switch (type) {
        case 1:
            typeStr = '预付款';
            break;
        case 2:
            typeStr = '授信';
            break;
        case 3:
            typeStr = '支付宝扫码';
            break;
        case 4:
            typeStr = '支付宝代扣';
            break;
        default:
            typeStr = '未知状态';
            break;
    }
    return typeStr;
}

class limitRechagingRepaymentListResponse extends JSONResponse {
    constructor() {
        super();
        this.totalRow = 0;
        this.totalPage = 0;
        this.repayments = [];
    }
}

/**
 * 获取授信账单信息
 */
router.post('/creditSettlementOfList.do', async function (req, res, next) {

    try {
        req.validateLogin();

        let isExportXLS = false;
        if (req.body.bodys != null) {
            isExportXLS = true;
            req.body = JSON.parse(req.body.bodys);
        }
        const needExport = req.body.needExport;

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token

        const operatorId = req.body.operatorId;
        const operatorName = req.body.operatorName;

        const status = req.body.status;
        const agentName = req.body.agentName;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const paymentVoucher = req.body.paymentVoucher;
        const pageIndex = req.body.pageIndex;
        const pageSize = req.body.pageSize;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            operatorName: operatorName,
            operatorId: operatorId,

            status: status,
            agentName: agentName,
            startDate: startDate,
            endDate: endDate,
            paymentVoucher: paymentVoucher,
            pageIndex: pageIndex,
            pageSize: pageSize

        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/limit/rechaging/repayment', 'list', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        if ((needExport && responseObj.data.repayments.length > 0) || isExportXLS) {


            const dataList = responseObj.data.repayments.map(item => {
                let itemObj = {};
                itemObj.paymentVoucher = item.paymentVoucher;
                itemObj.billingId = item.billingId;
                itemObj.buyerName = item.buyerName;//"代理商名称";
                itemObj.accountPeriod = 'T+' + item.accountPeriod;
                itemObj.payDay = item.payDay;
                itemObj.repaymentTime = item.repaymentTime;
                itemObj.repaymentAmount = item.repaymentAmount;
                itemObj.status = getSettlement(item.status);
                itemObj.billDate = getBillDayStr(item);
                itemObj.applyTime = item.applyTime;
                itemObj.confirmTime = item.confirmTime;
                itemObj.message = item.message;

                return itemObj;
            });

            const titles = [
                ["授信结算流水号", "billingId"]
                , ["授信结算账期号", "paymentVoucher"]
                , ["结算方式", "accountPeriod"]
                , ["账单日", "billDate"]
                , ["最后还款时间", "repaymentTime"]
                , ["本期结算金额", "repaymentAmount"]
                , ["结算状态", "status"]
                , ["账单详情", "message"]
                , ["提交还款时间", "applyTime"]
                , ["确认结算时间", "confirmTime"]
                , ["还款人", "buyerName"]
            ];

            res.exportExcel(dataList, titles);
            return;

        }

        let result = new limitRechagingRepaymentListResponse();
        result.success = true;
        result.errorMsg = responseObj.data.message;
        result.totalRow = responseObj.data.totalRow;
        result.totalPage = responseObj.data.totalPage;
        result.repayments = responseObj.data.repayments;

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

class paymentDetailListResponse extends JSONResponse {
    constructor() {
        super();
        this.totalRow = 0;
        this.totalPage = 0;
        this.details = [];
    }
}

/**
 * 支付明细列表(买家端/管理端)
 */
router.post('/creditChangeOfDetailListForWebAndManager.do', async function (req, res, next) {

    try {
        req.validateLogin();
        let isExportXLS = false;
        if (req.body.bodys != null) {
            isExportXLS = true;
            req.body = JSON.parse(req.body.bodys);
        }
        const needExport = req.body.needExport;
        const searchType = req.body.searchType;

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token
        const operatorId = req.body.operatorId;
        const operatorName = req.body.operatorName;
        const pnr = req.body.pnr;
        const agentOrderId = req.body.agentOrderId;

        const status = req.body.status;
        const payTypes = req.body.payTypes;
        const accountType = req.body.accountType;
        const orderId = req.body.orderId;
        const agentName = req.body.agentName;
        const billingId = req.body.billingId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const pageIndex = req.body.pageIndex;
        const pageSize = req.body.pageSize;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            operatorId: operatorId,
            operatorName: operatorName,
            status: status,
            agentName: agentName,
            startDate: startDate,
            endDate: endDate,
            payTypes: payTypes,
            accountType: accountType,
            orderId: orderId,
            billingId: billingId,
            needExport: needExport,
            searchType: searchType,
            pnr: pnr,
            agentOrderId: agentOrderId,
            pageIndex: pageIndex,
            pageSize: pageSize
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/payment/detail', 'list', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        responseObj.data.details.forEach((item, index) => {
            /**
             * sxze     :授信总额
             * zfje     :支付金额
             * skje     :收款金额
             * yfkye    :预付款余额
             * sysxed   :剩余授信额度
             * yjk      :溢缴款
             * sxkyed   :授信可用总额度
             * jdye     :借贷余额
             * zhhksj   :最后还款时间
             * */
            if ([1, 3, 7].indexOf(item.accountType) > -1) {

                item.skje = item.depositPrice;
                if(item.payType == 2){
                    item.skje += item.creditPrice;
                }
            }
            if ([2, 4, 5, 6].indexOf(item.accountType) > -1) {
                item.zfje = item.depositPrice;
                if(item.payType == 2){
                    item.zfje += item.creditPrice;
                }
            }

            if (item.payType == 2) {
                item.sxze = item.creditLine;
                item.sysxed = item.creditLine - item.creditAmount;
                item.yjk = item.depositPrice;
                item.sxkyed = item.creditLine - item.creditAmount + item.depositPrice;
                item.jdye = item.depositPrice - item.creditAmount;
                item.zhhksj = item.creditRepaymentTime

            } else if (item.payType == 1 || item.payType == 3) {
                item.yfkye = item.depositBalance;
            }

        });


        if ((needExport && responseObj.data.details.length > 0) || isExportXLS) {
            var datalist = [];

            responseObj.data.details.forEach(item => {
                var itemObj = {};

                itemObj.orderId = item.orderId;
                itemObj.buyerOrderId = item.buyerOrderId;//"代理商名称";
                itemObj.payType = getPaymentType(item.payType);
                itemObj.accountType = getAccountType(item.accountType);
                itemObj.createtime = item.createtime;
                itemObj.depositBalance = item.depositBalance;
                itemObj.pnr = item.pnr;
                itemObj.status = getSettlement(item.status);

                itemObj.sxze= item.sxze;
                itemObj.zfje= item.zfje;
                itemObj.skje= item.skje;
                itemObj.yfkye= item.yfkye;
                itemObj.sysxed= item.sysxed;
                itemObj.yjk= item.yjk;
                itemObj.sxkyed= item.sxkyed;
                itemObj.jdye= item.jdye;
                itemObj.zhhksj= item.zhhksj;

                datalist.push(itemObj);

            });


            var exportData = datalist;//responseObj.data.details;
            var titles = []
            //balance 资金变动页面
            if (searchType == "balance") {

                titles = [
                    ["支付方式", "payType"]
                    , ["收支类型", "accountType"]
                    , ["变动时间", "createtime"]
                    , ["入账金额", "skje"]
                    , ["支出金额", "zfje"]
                ];
            }
            else {
                titles = [
                    ["平台订单号", "orderId"]
                    , ["代理商订单号", "buyerOrderId"]
                    , ["PNR", "pnr"]
                    , ["支付类型", "payType"]
                    , ["收支类型", "accountType"]
                    , ["授信总额", "sxze"]
                    , ["支付消耗额度", "zfje"]
                    , ["收款恢复额度", "skje"]
                    , ["授信变动时间", "createtime"]
                    , ["剩余授信额度", "sysxed"]
                    , ["溢缴款", "yjk"]
                    , ["可用总额度", "sxkyed"]
                    , ["借贷余额", "jdye"]
                    , ["最后还款时间", "zhhksj"]
                ];

            }

            res.exportExcel(exportData, titles);
            return;

        }

        let result = new paymentDetailListResponse();
        result.success = true;
        result.details = responseObj.data.details;
        result.totalPage = responseObj.data.totalPage;
        result.totalRow = responseObj.data.totalRow;
        result.errorMsg = responseObj.data.message;

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

class creditGetResponse extends JSONResponse {
    constructor() {
        super();
        this.credit = undefined;
    }
}

/**
 * 获取授信配置信息
 */
router.post('/creditManagementOfGetDetail.do', async function (req, res, next) {
    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token
        // const operatorId = req.body.operatorId;
        // const operatorName = req.body.operatorName;
        const id = 1;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            // operatorName: username,
            // operatorId: userId,
            id: id
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/credit', 'get', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new creditGetResponse();
        result.success = true;
        result.credit = responseObj.data.credit;
        result.userName = req.session.userName;
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
 * 获取预付款信息(买家端)*/

router.post('/depositGetAlert.do',async function (req, res , next){
     try{
         req.validateLogin();

         const userId = req.session.userId;
         const username =req.session.userName;
         const token = req.session.token;
         const userType = 'UserTypeBuyer';

         let depositObj = {
            userId : userId,
            username: username,
            token: token,
            userType: userType
         }
         let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/deposit', 'get', 'v1').postAsync(depositObj);
         if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new JSONResponse();
        result.success = true;
        result.deposit = responseObj.data.deposit
        res.send(result);


     }catch(e) {
         
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

/**
 * 获取买家余额不足提醒配置（买家端）
 */

router.post('/creditChangeOfGetAlert.do', async function (req, res, next) {

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token;

        const payType = req.body.payType;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            payType: payType
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/alert', 'get', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new JSONResponse();
        result.success = true;
        result.alert = responseObj.data.alert
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
 * 设置买家余额不足提醒配置（买家端）
 */

router.post('/creditChangeOfSetAlert.do', async function (req, res, next) {

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token;

        const alertObj = req.body.alert;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeBuyer",
            alert: alertObj
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/alert', 'set', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
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

class attachmentGetResponse extends JSONResponse {
    constructor() {
        super();
        this.attachments = [];
    }
}

/**
 * 获取凭证信息
 */
router.post('/getOrderAttachment.do', async function (req, res, next) {

    try {
        req.validateLogin();

        const userId = req.session.userId;
        const username = req.session.userName;
        const token = req.session.token;
        const billingId = req.body.billingId;

        let requestObj = {
            username: username,
            userId: userId,
            token: token,
            userType: "UserTypeOperator",
            billingId: billingId
        };

        let responseObj = await ServiceFactory.getHandle('accountingService', 'accounting/attachment', 'get', 'v1').postAsync(requestObj);

        if (responseObj.data.status != 0) {
            var errorMsg=getBJErrorMsg(responseObj.data.status,responseObj.data.message)
            throw new BusinessException(errorMsg);
        }

        let result = new attachmentGetResponse();
        result.success = true;
        result.attachments = responseObj.data.attachments;
        result.errorMsg = responseObj.data.message;
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
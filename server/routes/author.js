'use strict';
const express = require('express');
const router = express.Router();
const ccapWrapper = require('../lib/ccapWrapper.js');
const JSONResponse = require('../entity/JSONResponse.js');
const ServiceFactory = require('../lib/ServiceFactory');

//region getSecurityCode

router.get('/getSecurityCode.do', function (req, res, next) {

   

    var o = ccapWrapper();
    req.session.captchaCode = o.txt;
    res.end(o.buf);

});

//#endregion

//region login

class LoginResponse extends JSONResponse {
    constructor() {

        super();

        /// 0: 成功
        /// 1: 错误
        /// 2: 提示信息
        this.status = null;

    }
}

router.post('/login.do', async (req, res, next) => {

    let statusRes = 0;

    try {
       
        const userName = req.body.userName;
        const password = req.body.password;
        const securityCode = req.body.securityCode || "";

        const userType = "UserTypeBuyer";
        var code = req.session.captchaCode || "";
        req.session.captchaCode = null;
        if (securityCode.toLowerCase() != code.toLowerCase()) {
            throw new BusinessException("验证码不正确");
        }

        var handle = ServiceFactory.getHandle("authService","authservice", "login", "v1");
        var invokeResult = await handle.postAsync({ userName, password,userType });
        statusRes = invokeResult.data.status;

        if (invokeResult.data.status!=0) {
            throw new BusinessException(invokeResult.data.message);
        }
        var token=invokeResult.data.token;
        var userId=invokeResult.data.userId;
        
        var handle1 = ServiceFactory.getHandle("authService","authservice", "getUserInfo", "v1");
        var invokeResult1 = await handle1.postAsync({ userId:userId, username:userName, token:token,userType:userType });
        if (invokeResult1.data.status!=0) {
            throw new BusinessException(invokeResult1.data.message);
        }

        req.session.userName=userName;
        req.session.nickname=invokeResult1.data.nickname;
        req.session.userId=invokeResult1.data.userId;
        req.session.token=token;

        let r = new LoginResponse();

        r.success = true;
        r.status = statusRes;

        req.info("login success", req.session.userName||"",req.session.userId||"",userType||"", "",req.clientIP);

        res.send(r);

    }
    catch (e) {

        req.error("login failed:"+e.message,req.body.userName,statusRes.toString(),req.clientIP);

        if (e instanceof BusinessException) {

            let r = new LoginResponse();
            r.success = false;
            r.errorMsg = e.message;
            r.status = statusRes;
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


//region logout

router.post('/logout.do', async (req, res, next) => {

    let statusRes = 0;

    try {
       
        req.session.destroy(function(err) { // cannot access session here 
            
        })

        let r = new JSONResponse();
        r.success = true;
        r.errorMsg = "";
        res.send(r);

    }
    catch (e) {

        req.error("logout failed:"+e.message,req.body.userName,statusRes.toString(),req.clientIP);

        if (e instanceof BusinessException) {

            let r = new LoginResponse();
            r.success = false;
            r.errorMsg = e.message;
            r.status = statusRes;
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
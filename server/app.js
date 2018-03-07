
'use strict';
const express = require('express');
const app = express()
const glob = require("glob")
const pjson = require('./package.json');
const airportDict = require('./lib/airportDict.json');
const airlineDict = require('./lib/airlineDict.json');
const utility = require('./lib/utility.js');
require('./lib/Exception.js');
const Enumerable = require('linq');
const path = require('path');
const homeDir = path.join(__dirname);
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const compression = require('compression');
const history = require('connect-history-api-fallback');
const fs = require('fs');
const log4js = require('log4js');
const isWindows = (process.platform === "win32")
const child_process = require('child_process');
const xlsx = require('node-xlsx');


async function detectRedis(port, ip, pass, connectTimeout) {
    let Redis = require('ioredis');
    let localRedisAlive = false;
    var redis = new Redis(port, ip, {
        lazyConnect: true,
        password: pass,
        connectTimeout: connectTimeout
    });
    redis.on('error', function (error) {
        console.log("reids not detected:" + ip);
    })
    try {
        await redis.connect();
        localRedisAlive = true;
        return true;
    }
    catch (e) {

        localRedisAlive = false;
        return false;
    }
    finally {
        redis.disconnect();
    }


}

async function init() {

    //#region args

    let args = [];
    process.argv.forEach(function (val, index, array) {
        if (val.startsWith('--')) {
            args.push(val);
        }
    });

    //#endregion

    //#region env

    let env =
        Enumerable
            .from(args)
            .where(v => v.startsWith('--env'))
            .take(1)
            .select(v => v.split('=')[1])
            .toArray()[0];

    //#endregion

    //#region staticFilePath

    let staticFilePath = "";
    staticFilePath = path.join(homeDir, "../client/app/dist");

    //#endregion

    //#region appConfig

    global.appConfig = {
        pjson,
        utility,
        homeDir,
        args,
        env,
        envConfig: pjson.envConfig[env],
        staticFilePath,
        airportDict: airportDict,
        airlineDict: airlineDict
    }

    console.log(`env:${env}`);
    console.log(`homeDir:${homeDir}`);
    console.log(`staticFilePath:${staticFilePath}`);

    //#endregion

    //#region log4js

    let log4jsCfg = JSON.stringify(require('./log4js.json')[env]);
    log4jsCfg = log4jsCfg.replace('{env}', env);
    log4jsCfg = JSON.parse(log4jsCfg);
    log4js.configure(log4jsCfg);

    global.toLogStr = (msg, username, userId, userType, arg0, arg1, arg2, arg3, token) => {
        return msg + "{{" + (`"username":"${username || ''}"` + `,"token":"${token || ''}"` + `,"userId":"${userId || ''}"` + `,"userType":"${userType || ''}"` + `,"arg0":"${arg0 || ''}"` + `,"arg1":"${arg1 || ''}"` + `,"arg2":"${arg2 || ''}"` + `,"arg3":"${arg3 || ''}"`) + "}}";
    }

    //#endregion

    //#region middleware ref

    app.use(history());
    app.use(compression());
    app.use(express.static(staticFilePath, {
        etag: false,
        dotfiles: "ignore",
        lastModified: true,
        index: "index.html",
        maxAge: 0,//'1d',
        redirect: true,
        // setHeaders: function (res, path, stat) {
        //     res.set('x-timestamp', Date.now())
        // }

    }));

    if (fs.existsSync(path.join(staticFilePath, 'favicon.png')))
        app.use(favicon(path.join(staticFilePath, 'favicon.png')));

    //for parsing application/json
    //最好用 application/json;charset=utf-8 这种 Content-Type
    //4.x express.json()也可以
    //https://expressjs.com/en/4x/api.html#express.json
    app.use(bodyParser.json());

    //for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser(pjson.name));

    let s = null;
    // let redisDefaultAlive = await detectRedis(appConfig.envConfig.redisDefault.host, appConfig.envConfig.redisDefault.port, appConfig.envConfig.redisDefault.pass, 1000);
    // let localRedisAlive = null;
    // if (!redisDefaultAlive)
    //     localRedisAlive = await detectRedis('127.0.0.1', 6379, 1000);

    // if (!redisDefaultAlive && localRedisAlive) {
    //     s = new RedisStore({
    //         host: "127.0.0.1",
    //         port: 6379,
    //         pass: null
    //     });
    // } else {
    s = new RedisStore({
        host: appConfig.envConfig.redisDefault.host,
        port: appConfig.envConfig.redisDefault.port,
        pass: appConfig.envConfig.redisDefault.pass
    });

    //}

    app.use(session({
        name: "connect.sid_" + appConfig.pjson.name + "_" + env,
        store: s,
        resave: false,
        saveUninitialized: false,
        secret: 'p@ssw0rd1',
        cookie: {
            maxAge: 120 * 60 * 1000
        }
    }));

    //custom method
    app.use(function (req, res, next) {

        //property
        Object.defineProperty(req, "token", { get: () => req.session ? req.session.token : null });
        Object.defineProperty(req, "userId", { get: () => req.session ? req.session.userId : null });
        Object.defineProperty(req, "userName", { get: () => req.session ? req.session.userName : null });
        Object.defineProperty(req, "clientIP", { get: () => req.headers['x-real-ip'] || req.headers['X-Real-IP'] || req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'] || req.connection.remoteAddress });

        //#region middleware log4js
        let spOPCode = {
            "author_login": "op_ps_log_in",
            "PNRImport_bestBuy": "op_ps_pnr_import_best_buy",
            "PNRImport_booking": "op_ps_pnr_import_booking",
            "shopping_shoppingList": "op_ps_shopping_query",
            "booking_booking": "op_ps_shopping_booking",
            "user_getOrderList": "op_db_order_buyer_read_self",
            "user_payForAnOrder": "op_db_order_buyer_write_self",
        }
        req.app.locals.log4js = log4js;
        var suffix = req.path.replace(/\//g, "_").substr(1).split('.')[0];
        req.getLogger = () => req.app.locals.log4js.getLogger(
            !spOPCode[suffix] ? ("op_ct_" + suffix) : spOPCode[suffix]
        );
        req.getReqContextStr = () => `\r\nclientIP:${req.clientIP},\r\npath:${req.path},\r\nbody:${JSON.stringify(req.body)},\r\nheaders:${JSON.stringify(req.headers)}`

        req.info = (msg, username, userId, userType, arg0, arg1, arg2, arg3, token) => {
            req.getLogger().info(
                toLogStr(msg + "\r\n\r\n" + req.getReqContextStr(), username, userId, userType||"UserTypeBuyer", arg0, arg1, arg2, arg3, token)
            )
        };
        req.error = (msg, username, userId, userType, arg0, arg1, arg2, arg3, token) => {
            req.getLogger().error(
                toLogStr(msg + "\r\n\r\n" + req.getReqContextStr(), username, userId, userType||"UserTypeBuyer", arg0, arg1, arg2, arg3, token)
            )
        };
        req.commLog = () => {

            if (suffix == "comm_now")
                return;

            req.info("commLog", req.userName || "", req.userId || "", req.userType || "UserTypeBuyer", '', req.clientIP, '', '');
            
        }
        //#endregion

        req.validateLogin = () => {

            if (!req.session || !req.session.userId) {
                throw new noLoginException("未登录");
            }

            req.session.lastTouch = new Date().format('YYYY-MM-DD HH:mm:ss');

        }

        /**
         * 导出excel
         * @param dataSource 数据源
         * @param titles 列头
         * @param res httpResponse
         * @param filename 文件名
         */
        res.exportExcel = (dataSource, titles, filename = "Report.xlsx") => {

            try {
                const sheetHeaders = titles.map((item) => item[0]);
                const sheetProps = titles.map((item) => item[1]);
                const excelData = dataSource.map(item => {
                    return sheetProps.map(prop => eval('item.' + (prop.replace(/\|/g, '.') || 'a')));
                });

                let buffer = xlsx.build([
                    {"name": "Group", "data": [sheetHeaders].concat(excelData)}
                ]);

                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", "attachment; filename=" + filename);
                res.end(buffer, 'binary');
            } catch (e) {
                console.log(e);
            }
        };

        //log request
        req.commLog();

        next();

    });

    //#endregion

    //#region start listen

    let files = glob.sync("./routes/*.js");
    files.forEach(path => {
        let filename = /.*\/(.+?)\.js$/g.exec(path)[1];
        //console.log(`route found:${filename}`);
        let router = require('./routes/' + filename + '.js');
        app.use('/' + filename, router);
    });

    app.listen(appConfig.envConfig.webport, appConfig.envConfig.bindIP, () => console.log(pjson.name + `[${pjson.version}]` + ' app listening ' + appConfig.envConfig.bindIP + ' on port ' + appConfig.envConfig.webport + '!!!!!'))

    //#endregion

}

init().then().catch(e => {

    console.error(e);

});
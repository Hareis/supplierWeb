
'use strict'
const http = require('http')
const httpAppender = (config, layout) => {
    return (loggingEvent) => {
        let message
        if (config.object && config.object === true) { // log message is an object
            if (config.addLevel && config.addLevel === true) { // auto add level to object
                if (!loggingEvent.data[0].level) {
                    loggingEvent.data[0].level = loggingEvent.level.levelStr
                }
            }
            message = JSON.stringify(loggingEvent.data[0])
        } else {
            // log4js format    
            message = layout(loggingEvent)
        }

        const options = {
            protocol: config.protocol || 'http:',
            host: config.host,
            path: config.path || '/',
            port: config.port || 80,
            method: 'POST',
            headers: config.headers || {}
        }

        const req = http.request(options, (response) => {
            let status = response.statusCode
            if (status !== 200) {
                console.warn(`log4js-http appender - Error happened - Response statusCode ${response.statusCode}`)
            }

            // response.setEncoding('utf8');
            // response.on('data',function(data){
            //     console.log("data:",data);   //一段html代码
            // });

        })

        let i1 = message.indexOf('{{')
        let additional = message.substr(i1)
        additional = (additional.replace(/\{\{/g, '{').replace(/\}\}/g, '}'));
        additional = JSON.parse(additional);
        message = message.substr(0, i1)


        let sendObj = {
            "message": loggingEvent.data[0].toString(),
            "domain": "BuyerWeb",
            "token":additional.token,
            "opCode": loggingEvent.categoryName,
            "username": additional.username,
            "userId": additional.userId,
            "userType":additional.userType,
            "level": loggingEvent.level.levelStr,
            "arg0": additional.arg0 || "",
            "arg1": additional.arg1 || "",
            "arg2": additional.arg2 || "",
            "arg3": additional.arg3 || ""
        }

        req.write(JSON.stringify(sendObj, null, 1));//message



        req.on('err', (err) => {
            console.error('log4js-http appender - Error happened', err)
        })

        req.end()

    }
}

const configure = (config, layouts) => {
    let layout = layouts.messagePassThroughLayout
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout)
    }
    return httpAppender(config, layout)
}

module.exports.configure = configure
module.exports.appender = httpAppender
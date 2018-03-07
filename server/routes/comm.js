'use strict';
const express = require('express');
const JSONResponse = require('../entity/JSONResponse.js');
var router = express.Router();


class Nowesponse extends JSONResponse {
    constructor() {

        super();
        this.now = null;

    }
}

router.post('/now.do', function (req, res, next) {
    
    try {
        req.validateLogin();
        let r = new Nowesponse();
        r.now = new Date().format('YYYY-MM-DD HH:mm:ss');
        r.success=true;
        res.send(r);
    }
    catch (e) {

        let r = new JSONResponse();
        r.success = false;
        r.errorMsg = e.message;
        res.send(r);
    }

});

router.get('/flightCity.do', function (req, res, next) {
    
    try {
        var keyword=req.query["keyword"].toUpperCase();
        var jsoncallback=req.query["jsoncallback"];
        if(keyword.indexOf('(')>=0)
        {

            keyword=keyword.substr(keyword.indexOf('(')+1)
        }
        if(keyword.indexOf(')')>=0)
        {

            keyword=keyword.substr(0,keyword.indexOf(')'))
        }

        var result = []
        var maxCount = 8
        var result2 = []
        var resultDic={}
        for (const key in appConfig.airportDict) {

            if (appConfig.airportDict[key].CityThCode.indexOf(keyword) == 0) {
                var current = [
                    appConfig.airportDict[key].CityThCode
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].pingyin
                    , appConfig.airportDict[key].firstPY
                    , ""
                    , ""
                    , "city", ""
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].CityThCode, 1
                ];

                if(resultDic[current[6]+"_"+current[9]]==null)
                {
                    if (result.length < maxCount)
                    {
                        resultDic[current[6]+"_"+current[9]]=true;
    
                        result.push(current)
                    }
                }
            }
            else if (appConfig.airportDict[key].ThCode.indexOf(keyword) == 0) {
                var current = [
                    appConfig.airportDict[key].ThCode
                    , appConfig.airportDict[key].CnFName
                    , appConfig.airportDict[key].ThCode
                    , appConfig.airportDict[key].firstPY
                    , ""
                    , ""
                    , "airport", ""
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].ThCode, 1
                ];

                if(resultDic[current[6]+"_"+current[9]]==null)
                {
                    if (result.length < maxCount)
                    {
                        resultDic[current[6]+"_"+current[9]]=true;
    
                        result.push(current)
                    }
                }

            }
            else if (appConfig.airportDict[key].firstPY.indexOf(keyword) == 0) {
                var current = [
                    appConfig.airportDict[key].CityThCode
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].pingyin
                    , appConfig.airportDict[key].firstPY
                    , ""
                    , ""
                    , "city", ""
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].CityThCode, 1
                ];

                if(resultDic[current[6]+"_"+current[9]]==null)
                {
                    if (result2.length + result.length < maxCount)
                    {
                        resultDic[current[6]+"_"+current[9]]=true;
    
                        result2.push(current)
                    }
                }
            }
            else if (appConfig.airportDict[key].pingyin.indexOf(keyword) == 0) {
                var current = [
                    appConfig.airportDict[key].CityThCode
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].pingyin
                    , appConfig.airportDict[key].firstPY
                    , ""
                    , ""
                    , "city", ""
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].CityThCode, 1
                ];
                
                if(resultDic[current[6]+"_"+current[9]]==null)
                {
                    if (result2.length + result.length < maxCount)
                    {
                        resultDic[current[6]+"_"+current[9]]=true;
    
                        result2.push(current)
                    }
                }
            }
            else if (appConfig.airportDict[key].CityCNName.indexOf(keyword) == 0) {
                var current = [
                    appConfig.airportDict[key].CityThCode
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].pingyin
                    , appConfig.airportDict[key].firstPY
                    , ""
                    , ""
                    , "city", ""
                    , appConfig.airportDict[key].CityCNName
                    , appConfig.airportDict[key].CityThCode, 1
                ];
                
                if(resultDic[current[6]+"_"+current[9]]==null)
                {
                    if (result2.length + result.length < maxCount)
                    {
                        resultDic[current[6]+"_"+current[9]]=true;
    
                        result2.push(current)
                    }
                }
            }
            if (result.length >= maxCount) break;
        }

        if (result.length == 0)
            result = result2;
        if (result.length < maxCount)
            result.concat(result2)
        
        res.send(jsoncallback+"("+JSON.stringify(result)+")");

    }
    catch (e) {

        let r = new JSONResponse();
        r.success = false;
        r.errorMsg = e.message;
        res.send(r);
    }

});

module.exports = router;
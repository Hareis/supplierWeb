# Restful API

## [GET] **获取网站验证码**

### URL
- http://host:port/author/getSecurityCode.do

### Request

```
{
}
```

### Reponse

```
image : Byte[]
```

## [GET] **用户登录**

### URL
- http://host:port/author/login.do

### Request
-  userName : String
-  password : String
-  securityCode : String

```
{"userName":"李四","password":"aa234","securityCode":"yzhl"}
```

### Reponse
-  status : String .  0成功 1失败 2提醒
-  success : Boolean
-  errorMsg : String

```
{"success":true,"errorMsg":null,"status":0}
```

## [GET] **用户退出**

### URL
- http://host:port/author/logout.do

### Request

```
{}
```

### Reponse
-  success : Boolean
-  errorMsg : String

```
{"success":true,"errorMsg":null}
```

## [POST] **导入PNR信息并且验证价格**

### URL
- http://host:port/PNRImport/bestBuy.do

### Request
-  RTContent : String
-  onlySameCabin : Boolean // default false
-  hasBaggage : Boolean // default false
-  allowRefund : Boolean // default false
-  allowChange : Boolean // default false

```
{
    "RTContent":"
        1.LIU/QIUYU HP186X                                                             
        2.  HU482  I   WE27DEC  BOSPEK HK1   1610 1925+1        E E T2                 
        3.  HU7161 C   FR29DEC  PEKCKG HK1   1515 1820          E T1T3 
    ",
    "onlySameCabin" : true, 
    "hasBaggage" : false, 
    "allowRefund" : false,
    "allowChange" : false

}
```

### Reponse
-  routings : Array    
-  passengers : Object
-  contact : Object
-  success : Boolean
-  errorMsg : String

```json
{
"routings":[
    {
    "type":"queryCabin",
    "routing": {
                                 "maxSeats": 4,
                                 "adultPrice": 2577,
                                 "adultTax": 225,
                                 "adultTaxType": 0,
                                 "applyType": 0,
                                 "childPrice": 0,
                                 "childTax": 0,
                                 "childTaxType": 0,
                                 "data": "AD0777A70DE059F0932195596B",
                                 "fromSegments": [
                                   {
                                       "itineraryIndex" : 1, // 行程序号
                                       "segmentIndex" : 1, // 航段序号，从1开始
                                       "carrier" : "KE",
                                       "flightNumber" : "KE898",
                                       "aircraftCode": "777",
                                       "cabin": "B",
                                       "cabinGrade": "Y",
                                       "codeShare" : false,
                                       "depAirport" : "PVG",
                                       "arrAirport" : "ICN",
                                       "depTerminal": "1",
                                       "arrTerminal" : "3",
                                       "depDatetime": "2017-12-30 14:00:00",
                                       "arrDatetime": "2017-12-30 17:00:00",
                                       "duration": 190, // unit in minute
                                       "stopTime" : 120 // unit in minute
                                   }
                                 ],
                                 "priceType": 0,
                                 "reservationType": "1B",
                                 "retSegments": [],
                                 "validatingCarrier": "CA",
                                 "rule": {
                                     "changesInfoList": [
                                         {
                                             "changesFee": 0,
                                             "changesStatus": "T",
                                             "changesType": 0,
                                             "cnRemark": "",
                                             "currency": "",
                                             "enRemark": ""
                                         }
                                     ],
                                     "note": "温馨提示：1.出行前请办理好所需签证等材料，由于签证问题导致不能乘机，损失由旅客自行承担 2.所有机票须按顺序使用 3.下单时请仔细核对行程和旅客信息、修改证件信息需收取服务费 4.下单后请在30分钟内及时付款，付款超时会致订单取消 5.凡在本店购票，可享受特价选座、特价购买额外行李和特价购买保险等增值服务 6.可免费提供电子行程单、可付费开具增值税发票（部分境外客票只能提供invoice证明） 7.其他详情请咨询卖家，祝旅途愉快。",
                                     "refundInfoList": [
                                         {
                                             "cnRemark": "",
                                             "currency": "",
                                             "enRemark": "",
                                             "refundFee": 0,
                                             "refundStatus": "T",
                                             "refundType": 0
                                         }
                                     ]
                                 },
                                 "segments":[{"aircraftCode":"767","arrAirport":"PEK","arrDatetime":"2018-02-28 02:00:00","arrTerminal":"2","cabin":"Z","cabinGrade":"Y","carrier":"PS","codeShare":false,"depAirport":"KBP","depDatetime":"2018-02-27 10:20:00","depTerminal":"","duration":580,"flightNumber":"PS287","itineraryIndex":1,"segmentIndex":1,"stopTime":0,"arrAirportCN":"北京首都国际机场","depAirportCN":"鲍利斯波尔机场","cabinGradeCN":"经济舱"}]
                             }
    },
    {
    "type":"lowestPrice",
    "routing": {
                  "maxSeats": 4,
                  "adultPrice": 2577,
                  "adultTax": 225,
                  "adultTaxType": 0,
                  "applyType": 0,
                  "childPrice": 0,
                  "childTax": 0,
                  "childTaxType": 0,
                  "data": "AD0777A70DE059F0932195596B",
                  "fromSegments": [
                    {
                        "itineraryIndex" : 1, // 行程序号
                        "segmentIndex" : 1, // 航段序号，从1开始
                        "carrier" : "KE",
                        "flightNumber" : "KE898",
                        "aircraftCode": "777",
                        "cabin": "B",
                        "cabinGrade": "Y",
                        "codeShare" : false,
                        "depAirport" : "PVG",
                        "arrAirport" : "ICN",
                        "depTerminal": "1",
                        "arrTerminal" : "3",
                        "depDatetime": "2017-12-30 14:00:00",
                        "arrDatetime": "2017-12-30 17:00:00",
                        "duration": 190, // unit in minute
                        "stopTime" : 120 // unit in minute
                    }
                  ],
                  "priceType": 0,
                  "reservationType": "1B",
                  "retSegments": [],
                  "validatingCarrier": "CA",
                  "rule": {
                      "changesInfoList": [
                          {
                              "changesFee": 0,
                              "changesStatus": "T",
                              "changesType": 0,
                              "cnRemark": "",
                              "currency": "",
                              "enRemark": ""
                          }
                      ],
                      "note": "温馨提示：1.出行前请办理好所需签证等材料，由于签证问题导致不能乘机，损失由旅客自行承担 2.所有机票须按顺序使用 3.下单时请仔细核对行程和旅客信息、修改证件信息需收取服务费 4.下单后请在30分钟内及时付款，付款超时会致订单取消 5.凡在本店购票，可享受特价选座、特价购买额外行李和特价购买保险等增值服务 6.可免费提供电子行程单、可付费开具增值税发票（部分境外客票只能提供invoice证明） 7.其他详情请咨询卖家，祝旅途愉快。",
                      "refundInfoList": [
                          {
                              "cnRemark": "",
                              "currency": "",
                              "enRemark": "",
                              "refundFee": 0,
                              "refundStatus": "T",
                              "refundType": 0
                          }
                      ]
                  },
                  "segments":[{"aircraftCode":"767","arrAirport":"PEK","arrDatetime":"2018-02-28 02:00:00","arrTerminal":"2","cabin":"Z","cabinGrade":"Y","carrier":"PS","codeShare":false,"depAirport":"KBP","depDatetime":"2018-02-27 10:20:00","depTerminal":"","duration":580,"flightNumber":"PS287","itineraryIndex":1,"segmentIndex":1,"stopTime":0,"arrAirportCN":"北京首都国际机场","depAirportCN":"鲍利斯波尔机场","cabinGradeCN":"经济舱"}]
              }
    }
],
 "passengers": [
  {
   "name": "LIU/QIUYU",
   "ageType": 0
  }
 ],
 "contact": {
  "name": "",
  "address": "",
  "postcode": "",
  "email": "",
  "mobile": null
 },
 "success": true,
 "errorMsg": "success",
 "orderNo": null,
 "bookingDatetime": "2018-01-01 :12:30:30"
}
```

## [POST] **导入PNR后生单**

### URL
- http://host:port/PNRImport/booking.do

### Request
-  data : String
-  passengers : Array
-  contact : Object

```
{
  "data": "WOC21500279709166" ,
  "passengers": [
    {
      "name": "JI/MINGMINGMS",
      "ageType": 0,
      "birthday": "20000201",
      "gender": "M",
      "cardNum": "G234234",
      "cardType": "PP",
      "cardIssuePlace": "CN",
      "cardExpired": "20191031",
      "nationality": "CN"
    }
  ],
  "contact": {
    "name": "TEST",
    "address": "",
    "postcode": "",
    "email": "TEST@EMAIL.COM",
    "mobile": "1380000000"
  }
}
```

### Reponse
-  orderId : String   
-  bookingDatetime: Datetime
-  success : Boolean
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": null,
  "orderId": "jp15119524518190326",
  "bookingDatetime": "2017-12-12 12:12:00"
}
```

## [POST] ** shoppingList查询

### URL
- http://host:port/shopping/shoppingList.do

### Request
-  tripType : Int . 行程类型，1：单程；2：往返
-  adultNumber : Int
-  childNumber : Int
-  fromCity : String
-  fromType : String
-  toCity : String
-  toType : String
-  fromDate : String
-  retDate : String
-  hasBaggage : Int
-  allowRefund : Int
-  allowChange : Int
-  cabinGrade : String

```json
{
  "tripType": 1,
  "adultNumber": 1,
  "childNumber": 1,
  "fromCity": "NKG",
  "toCity": "SEL",
  "fromType":"city",
  "toType":"city",
  "fromDate": "2017-12-20",
  "retDate": "",
  "hasBaggage": 0,
  "allowRefund": 0,
  "allowChange": 0,
  "cabinGrade": "Y"
}
```

### Reponse
-  success : Boolean
-  errorMsg : String
-  fromCity : String,
-  fromCityCN : String,
-  toCity : String,
-  toCityCN : String
-  orgShopping1Response : Object

```json
{
    "success":true,
    "errorMsg":null,
    "orgShopping1Response":{
        "routings":[
            {
                "adultPrice":5594,
                "adultTax":1546,
                "adultTaxType":0,
                "applyType":0,
                "childPrice":0,
                "childTax":0,
                "childTaxType":0,
                "data":"H4sIAAAAAAAAALVWXU8aaRT+K2audhNKZ/gQdbMXMlYlqNRimrWbvRhggCmfO8yItjGhdVFREbeh9YvUj9WWNVXa1KIC1h/TeWeGq/6FPe8MCLR202yyXgDn+znPe877+phgfGJYGBMjHpYn+igDwfA8zQkzRB/hvjtGGAhvkAv7mnbSQPgYgQHjcI9zhO6//htMWoZpbpzsd4wH7iQtAzQXCk7eH3WOPwg9GhBHnWLS1uP2hCbZZMwrJmO3afH+PcbtdXoeuIPB4R6X3eF1Mcnu6EBo1Pm7j/QPJEIWj8vrGmW8LvPQqGswaY2PJS0eOjL4C/3Q63S4xnuTdohPWoLTg4+G6aDX1ZuM+enQwygthi0Y08+A3sfGG93c7b+nywOMwIJsIqmeW6TplqkH1DwrNNRYiIkCFw0QfY91cu7ynBdMVmuvxQgEaLoJZhrYslq62zUTM3FW44iJx8Mz15LGYCMJaWwqtAwd4nWAn49F3GwgwkaFBNH3K8DgeC/P+AU65sMYzT0YMxxUP8fHY7wAKgc9pqtwGwIXaXVovkVSXZQV4PeRpO4zwfIRLsqEsQ8+YcbDRfGRNn8P8YxWZ1JT8DyHj55w3sEiIHAHGR7MfiacYDVGWzDogaEWyR0wMNFdJgow6DDApx0Gzu0TeUbgYgCl22oFFsJcIHg9mVC+l8RoOTgblmf4GUfUx05rI5vQuWpTCLH4hFadnDV8RZ/N/BV9+qh/gz5TF2nqszRw/0eyBF78kiv9yG7iSjsy4Iq6kSuqgyqTjbyBKqvN1vs9XJk6ufoNQqJTMZhUfRYJ3EWEmXazDJ7EXgMR56+NJJZiPtErNJzBNoWXCK9TguWnNIQNG2XXt6xtrKEYL4ZZvGYeJhBgAqwj6o+NcAlBn3m8VHbdgBNI1bJBLuXgy2R2DjUvppbDd42GNg3/Q2ITps4bZKIBNtHRRUM3yLZ2X1O4BUYQEw2GGzqdKjPIIs+zUS++teixSQLnjsa020k+/7v+qijn1pSDyufaFmWUCxXlsIiu0vW9qrySqe9VUCUnXV4p+eJP6vKhXM6g3BI62FKKy+jZCvxA25fK1h/K8Ue19ARi1IUjZW3+U+qpyQjuaHtXt3xKPYFPoES62pOflEBEa1l0vF7Pb6qlknKcQas74IxKNXXhVF7fld8/VzarAAZXS5fRyVx9/aS+vyFnUlLltZLfgZpydgcdvJPX0+hkH8qqeyty5kpeTkNxsxGtrdS359H2vrp4hHLnKFdS5y7RQkVZfQv9yYU3UuUZqqVwmrk0mv/wubZST6XAhD+Lq/J6uV5Iyfky2n6JMln1Ko8OX6Cld5DbYlTmXqmlM+liAworeyfqyQFUk3fPAAHQIp1noVR9IYsOsurJPqq8htzo1VO5kGlX6riU91WluiPVtqABtFREuRdyeRHali6zOEqjAy2+RYVKOylgUk//kqrVG5u3GqXzZZR9jtZWASYqFM0kWpyvP9tB82mgE1qTqhvym48G/Ustp7EKQzjF0CBQQ9EFqbqNSuZCqp7pU2FAuSMYFenjtpL/gI7XlMyivHRYz6fQwjGcrgGaxKRpKvgB6dXTCyAZpc/Q/kuUqgGxKPcnZPqhPlcETGh/Dh28wCzCyOWOgDY9fePOgJzyxuqPgMNmRAt7jdnTYsAJVfLo+Tw+w8Mi5qpQ1A9Qzl/IBW0+1ssotQmNAfMUScLk30a1XWzILCvVY8AGmVFlB2K+8LZ+w1m7cvxi1Ne5kp3b1fRpragud2yormosKN5HfL9By1rQv6W0z9DNNwF60rNPMWHOp12ONzjMzhoIgfOGWGGEi3CC/i5QFouBaIZFA3T7MwP+CSbcuJPxxSTCPx9gdfjAbjfZ4UmxURRlJlqmMUZ7bKTaBgyksnmJ3uXAKvBc/DrLFMsntPeFoIyAipj9B14y0gcpCgAA",
                "fromSegments":[
                    {
                        "aircraftCode":"388",
                        "arrAirport":"ICN",
                        "arrDatetime":"2018-03-01 15:55:00",
                        "arrTerminal":"2",
                        "cabin":"H",
                        "cabinGrade":"Y",
                        "carrier":"KE",
                        "codeShare":false,
                        "depAirport":"CDG",
                        "depDatetime":"2018-02-28 21:00:00",
                        "depTerminal":"2E",
                        "duration":655,
                        "flightNumber":"KE902",
                        "itineraryIndex":1,
                        "segmentIndex":1,
                        "stopTime":0,
                        "arrAirportCN":"首尔仁川国际机场",
                        "arrCityCN":"首尔",
                        "arrCity":"SEL",
                        "arrAirportCNName":"首尔仁川国际机场(ICN)",
                        "depAirportCN":"查尔斯-戴高乐国际机场",
                        "depCityCN":"巴黎",
                        "depCity":"PAR",
                        "carrierCN":"大韩航空 ",
                        "arrTimeSmall":"15:55",
                        "depTimeSmall":"21:00",
                        "cabinGradeCN":"经济舱"
                    },
                    {
                        "aircraftCode":"738",
                        "arrAirport":"SPN",
                        "arrDatetime":"2018-03-02 02:40:00",
                        "cabin":"H",
                        "cabinGrade":"Y",
                        "carrier":"KE",
                        "codeShare":true,
                        "depAirport":"ICN",
                        "depDatetime":"2018-03-01 21:10:00",
                        "depTerminal":"1",
                        "duration":270,
                        "flightNumber":"KE5779",
                        "itineraryIndex":1,
                        "segmentIndex":2,
                        "stopTime":0,
                        "arrAirportCN":"塞班国际机场",
                        "arrCityCN":"塞班",
                        "arrCity":"SPN",
                        "arrAirportCNName":"塞班国际机场(SPN)",
                        "depAirportCN":"首尔仁川国际机场",
                        "depCityCN":"首尔",
                        "depCity":"SEL",
                        "carrierCN":"大韩航空 ",
                        "arrTimeSmall":"02:40",
                        "depTimeSmall":"21:10",
                        "cabinGradeCN":"经济舱"
                    }
                ],
                "invoiceType":"E",
                "maxSeats":9,
                "priceType":0,
                "productType":"private",
                "reservationType":"1B",
                "retSegments":[

                ],
                "rule":{
                    "baggageInfoList":[
                        {
                            "adultBaggage":"1件,每件23KG",
                            "childBaggage":"",
                            "itineraryIndex":1,
                            "segmentIndex":1
                        },
                        {
                            "adultBaggage":"1件,每件23KG",
                            "childBaggage":"",
                            "itineraryIndex":1,
                            "segmentIndex":2
                        }
                    ],
                    "changesInfoList":[
                        {
                            "changesFee":0,
                            "changesStatus":"E",
                            "changesType":3,
                            "currency":"CNY"
                        }
                    ],
                    "note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.同集团航司可能出现票本互开的情况，退票退税时需收回前返奖励。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.凡涉及境外供应商开票，在退票改期的时候会有100CNY/张的手续费。废票的时候会有50CNY/张的手续费。",
                    "refundInfoList":[
                        {
                            "currency":"CNY",
                            "refundFee":0,
                            "refundStatus":"E",
                            "refundType":3
                        }
                    ],
                    "serviceFee":{
                        "currency":"CNY",
                        "refundFeeByCarrier":100,
                        "revalidationFeeByCarrier":100
                    },
                    "baggageCn":"第1段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李;第2段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李;",
                    "baggageInfoListCN":"1件,每件23KG;1件,每件23KG;",
                    "refundCn":"按航司客规;",
                    "changeCn":"按航司客规;",
                    "ticketRemarkCn":"境外电子行程单"
                },
                "ticketLimittime":144,
                "validatingCarrier":"KE",
                "from_kuari":"+2",
                "ret_kuari":"",
                "transiteAirport":"_",
                "transiteCity":"_"
            }
		],
        "otherroutings":[
 {
                "adultPrice":5594,
                "adultTax":1546,
                "adultTaxType":0,
                "applyType":0,
                "childPrice":0,
                "childTax":0,
                "childTaxType":0,
                "data":"H4sIAAAAAAAAALVWXU8aaRT+K2audhNKZ/gQdbMXMlYlqNRimrWbvRhggCmfO8yItjGhdVFREbeh9YvUj9WWNVXa1KIC1h/TeWeGq/6FPe8MCLR202yyXgDn+znPe877+phgfGJYGBMjHpYn+igDwfA8zQkzRB/hvjtGGAhvkAv7mnbSQPgYgQHjcI9zhO6//htMWoZpbpzsd4wH7iQtAzQXCk7eH3WOPwg9GhBHnWLS1uP2hCbZZMwrJmO3afH+PcbtdXoeuIPB4R6X3eF1Mcnu6EBo1Pm7j/QPJEIWj8vrGmW8LvPQqGswaY2PJS0eOjL4C/3Q63S4xnuTdohPWoLTg4+G6aDX1ZuM+enQwygthi0Y08+A3sfGG93c7b+nywOMwIJsIqmeW6TplqkH1DwrNNRYiIkCFw0QfY91cu7ynBdMVmuvxQgEaLoJZhrYslq62zUTM3FW44iJx8Mz15LGYCMJaWwqtAwd4nWAn49F3GwgwkaFBNH3K8DgeC/P+AU65sMYzT0YMxxUP8fHY7wAKgc9pqtwGwIXaXVovkVSXZQV4PeRpO4zwfIRLsqEsQ8+YcbDRfGRNn8P8YxWZ1JT8DyHj55w3sEiIHAHGR7MfiacYDVGWzDogaEWyR0wMNFdJgow6DDApx0Gzu0TeUbgYgCl22oFFsJcIHg9mVC+l8RoOTgblmf4GUfUx05rI5vQuWpTCLH4hFadnDV8RZ/N/BV9+qh/gz5TF2nqszRw/0eyBF78kiv9yG7iSjsy4Iq6kSuqgyqTjbyBKqvN1vs9XJk6ufoNQqJTMZhUfRYJ3EWEmXazDJ7EXgMR56+NJJZiPtErNJzBNoWXCK9TguWnNIQNG2XXt6xtrKEYL4ZZvGYeJhBgAqwj6o+NcAlBn3m8VHbdgBNI1bJBLuXgy2R2DjUvppbDd42GNg3/Q2ITps4bZKIBNtHRRUM3yLZ2X1O4BUYQEw2GGzqdKjPIIs+zUS++teixSQLnjsa020k+/7v+qijn1pSDyufaFmWUCxXlsIiu0vW9qrySqe9VUCUnXV4p+eJP6vKhXM6g3BI62FKKy+jZCvxA25fK1h/K8Ue19ARi1IUjZW3+U+qpyQjuaHtXt3xKPYFPoES62pOflEBEa1l0vF7Pb6qlknKcQas74IxKNXXhVF7fld8/VzarAAZXS5fRyVx9/aS+vyFnUlLltZLfgZpydgcdvJPX0+hkH8qqeyty5kpeTkNxsxGtrdS359H2vrp4hHLnKFdS5y7RQkVZfQv9yYU3UuUZqqVwmrk0mv/wubZST6XAhD+Lq/J6uV5Iyfky2n6JMln1Ko8OX6Cld5DbYlTmXqmlM+liAworeyfqyQFUk3fPAAHQIp1noVR9IYsOsurJPqq8htzo1VO5kGlX6riU91WluiPVtqABtFREuRdyeRHali6zOEqjAy2+RYVKOylgUk//kqrVG5u3GqXzZZR9jtZWASYqFM0kWpyvP9tB82mgE1qTqhvym48G/Ustp7EKQzjF0CBQQ9EFqbqNSuZCqp7pU2FAuSMYFenjtpL/gI7XlMyivHRYz6fQwjGcrgGaxKRpKvgB6dXTCyAZpc/Q/kuUqgGxKPcnZPqhPlcETGh/Dh28wCzCyOWOgDY9fePOgJzyxuqPgMNmRAt7jdnTYsAJVfLo+Tw+w8Mi5qpQ1A9Qzl/IBW0+1ssotQmNAfMUScLk30a1XWzILCvVY8AGmVFlB2K+8LZ+w1m7cvxi1Ne5kp3b1fRpragud2yormosKN5HfL9By1rQv6W0z9DNNwF60rNPMWHOp12ONzjMzhoIgfOGWGGEi3CC/i5QFouBaIZFA3T7MwP+CSbcuJPxxSTCPx9gdfjAbjfZ4UmxURRlJlqmMUZ7bKTaBgyksnmJ3uXAKvBc/DrLFMsntPeFoIyAipj9B14y0gcpCgAA",
                "fromSegments":[
                    {
                        "aircraftCode":"388",
                        "arrAirport":"ICN",
                        "arrDatetime":"2018-03-01 15:55:00",
                        "arrTerminal":"2",
                        "cabin":"H",
                        "cabinGrade":"Y",
                        "carrier":"KE",
                        "codeShare":false,
                        "depAirport":"CDG",
                        "depDatetime":"2018-02-28 21:00:00",
                        "depTerminal":"2E",
                        "duration":655,
                        "flightNumber":"KE902",
                        "itineraryIndex":1,
                        "segmentIndex":1,
                        "stopTime":0,
                        "arrAirportCN":"首尔仁川国际机场",
                        "arrCityCN":"首尔",
                        "arrCity":"SEL",
                        "arrAirportCNName":"首尔仁川国际机场(ICN)",
                        "depAirportCN":"查尔斯-戴高乐国际机场",
                        "depCityCN":"巴黎",
                        "depCity":"PAR",
                        "carrierCN":"大韩航空 ",
                        "arrTimeSmall":"15:55",
                        "depTimeSmall":"21:00",
                        "cabinGradeCN":"经济舱"
                    },
                    {
                        "aircraftCode":"738",
                        "arrAirport":"SPN",
                        "arrDatetime":"2018-03-02 02:40:00",
                        "cabin":"H",
                        "cabinGrade":"Y",
                        "carrier":"KE",
                        "codeShare":true,
                        "depAirport":"ICN",
                        "depDatetime":"2018-03-01 21:10:00",
                        "depTerminal":"1",
                        "duration":270,
                        "flightNumber":"KE5779",
                        "itineraryIndex":1,
                        "segmentIndex":2,
                        "stopTime":0,
                        "arrAirportCN":"塞班国际机场",
                        "arrCityCN":"塞班",
                        "arrCity":"SPN",
                        "arrAirportCNName":"塞班国际机场(SPN)",
                        "depAirportCN":"首尔仁川国际机场",
                        "depCityCN":"首尔",
                        "depCity":"SEL",
                        "carrierCN":"大韩航空 ",
                        "arrTimeSmall":"02:40",
                        "depTimeSmall":"21:10",
                        "cabinGradeCN":"经济舱"
                    }
                ],
                "invoiceType":"E",
                "maxSeats":9,
                "priceType":0,
                "productType":"private",
                "reservationType":"1B",
                "retSegments":[

                ],
                "rule":{
                    "baggageInfoList":[
                        {
                            "adultBaggage":"1件,每件23KG",
                            "childBaggage":"",
                            "itineraryIndex":1,
                            "segmentIndex":1
                        },
                        {
                            "adultBaggage":"1件,每件23KG",
                            "childBaggage":"",
                            "itineraryIndex":1,
                            "segmentIndex":2
                        }
                    ],
                    "changesInfoList":[
                        {
                            "changesFee":0,
                            "changesStatus":"E",
                            "changesType":3,
                            "currency":"CNY"
                        }
                    ],
                    "note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.同集团航司可能出现票本互开的情况，退票退税时需收回前返奖励。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.凡涉及境外供应商开票，在退票改期的时候会有100CNY/张的手续费。废票的时候会有50CNY/张的手续费。",
                    "refundInfoList":[
                        {
                            "currency":"CNY",
                            "refundFee":0,
                            "refundStatus":"E",
                            "refundType":3
                        }
                    ],
                    "serviceFee":{
                        "currency":"CNY",
                        "refundFeeByCarrier":100,
                        "revalidationFeeByCarrier":100
                    },
                    "baggageCn":"第1段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李;第2段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李;",
                    "baggageInfoListCN":"1件,每件23KG;1件,每件23KG;",
                    "refundCn":"按航司客规;",
                    "changeCn":"按航司客规;",
                    "ticketRemarkCn":"境外电子行程单"
                },
                "ticketLimittime":144,
                "validatingCarrier":"KE",
                "from_kuari":"+2",
                "ret_kuari":"",
                "transiteAirport":"_",
                "transiteCity":"_"
            }
		
        ],
        "lowestPrice":6297,
        "lowestPriceDuration":910,
        "lessDuration":910,
        "lessDurationPrice":6297,
        "lowFlightCount":2,
        "lowFlightCountDuration":910,
        "lowFlightCountPrice":6297,
        "transCityList":[
            "北京(BJS)",
            "伊斯坦布尔(IST)"
        ],
        "transAirportList":[
            "北京首都国际机场(PEK)",
            "伊斯坦布尔机场(IST)"
        ],
        "carrierList":[
            {
                "code":"KE",
                "codeCN":"大韩航空 "
            },
            {
                "code":"OZ",
                "codeCN":"韩亚航空 "
            }
        ]
    },
    "fromCity":"PAR",
    "toCity":"SPN",
    "fromCityCN":"PAR",
    "toCityCN":"塞班"
}
```

## [POST] **预定校验**

### URL
- http://host:port/booking/validate.do

### Request
-  tripType : Int
-  adultNumber : Int
-  childNumber : Int
-  routing : Object

```json
{
    "tripType":1
    ,"adultNumber":1
    ,"childNumber":1
    ,"routing": 
    {
        "data": "3da0a93eba26c6e8f28955fe65f426fadbec03d9",
        "adultPrice": 800,
        "adultTax": 66,
        "childPrice": 400,
        "childTax": 66,
        "adultTaxType": 0,
        "childTaxType": 0,
        "priceType": 0,
        "applyType": 0,
        "reservationType": "1E",
        "productType":"public",
        "ticketLimittime":1,
        "invoiceType":"E",
        "validatingCarrier": "MU",
        "maxSeats":9,
        "rule": {
            "serviceFee":{ 
                "revalidationFeeByCarrier":0,
                "refundFeeByCarrier":0,
                "currency":"CNY"
            },
            "refundInfoList": [
                {
                    "refundType": 0,
                    "refundStatus": "H",
                    "refundFee": 100.01,
                    "currency": "CNY",
                    "cnRemark": "",
                    "enRemark": ""
                }
            ],
            "changesInfoList": [
                {
                    "changesType": 0,
                    "changesStatus": "T",
                    "changesFee": 0,
                    "currency": "",
                    "cnRemark": "",
                    "enRemark": ""
                }
            ],
            "baggageInfoList": [
                {
                    "adultBaggage": "15KG",
                    "childBaggage": "15KG",
                    "itineraryIndex" : 2, // 行程序号
                    "segmentIndex" : 1 // 航段序号
                }
            ],
            "note": "不得升舱，不得累积里程；"
        },
        "fromSegments": [
            {
                "itineraryIndex" : 1, // 行程序号
                "segmentIndex" : 1, // 航段序号，从1开始
                "carrier": "AA",
                "depAirport": "LAX",
                "depDatetime": "2017-03-14 01:40:00",
                "arrAirport": "PEK",
                "arrDatetime": "2017-03-15 05:30:00",
                "codeShare": false,
                "cabin": "B",
                "aircraftCode": "777",
                "flightNumber": "AA89",
                "depTerminal": "T2",
                "arrTerminal": "T1",
                "cabinGrade": "Y",
                "duration": 130,
                "stopTime": 0
            },
            {
                "itineraryIndex" : 1, // 行程序号
                "segmentIndex" : 2, // 航段序号，从1开始
                "carrier": "CA",
                "depAirport": "PEK",
                "depDatetime": "2017-03-15 14:00:00",
                "arrAirport": "TPE",
                "arrDatetime": "2017-03-15 17:15:00",
                "codeShare": false,
                "cabin": "M",
                "aircraftCode": "737",
                "flightNumber": "CA189",
                "depTerminal": "T2",
                "arrTerminal": "T2",
                "cabinGrade": "Y",
                "duration": 100,
                "stopTime": 0
            }
        ],
        "retSegments": []
    }
}
```

### Response
-  maxSeat : Int
-  success : Boolean
-  errorMsg : String
-  routing : Array

```json
{
    "success":true,
    "errorMsg":null,
    "maxSeat":9,
    "routing":{
        "adultPrice":9259,
        "adultTax":1546,
        "adultTaxType":0,
        "applyType":0,
        "childPrice":6934,
        "childTax":1546,
        "childTaxType":0,
        "data":"H4sIAAAAAAAAAE2POwrCQBiE77K1yP9I8mfTZXcTsLFSrAPZQvARjAoiltaW6jHs9TY+ruHGynLmG2aYvaqrdaUyhSVIjBqBgXTpJIotJSylywvi3DgBDcC2wEIsUlo6F9scc7SBSopgmKUga3QaMQRb9VRbzfxo13iVYRC+bafLxaAOW4MxTTCMJYggCZPuwpummU396hcwZAhQEJH/0LCahy71vF/e5+Pn+njdToFu/aor7i70oQ/q8AXMxRUp0wAAAA==",
        "fromSegments":[
            {
                "aircraftCode":"388",
                "arrAirport":"ICN",
                "arrDatetime":"2018-03-03 15:55:00",
                "arrTerminal":"2",
                "cabin":"B",
                "cabinGrade":"Y",
                "carrier":"KE",
                "codeShare":false,
                "depAirport":"CDG",
                "depDatetime":"2018-03-02 21:00:00",
                "depTerminal":"2E",
                "duration":655,
                "flightNumber":"KE902",
                "itineraryIndex":1,
                "segmentIndex":1,
                "stopTime":0,
                "arrAirportCN":"首尔仁川国际机场",
                "arrCityCN":"首尔",
                "arrCity":"SEL",
                "arrAirportCNName":"首尔仁川国际机场(ICN)",
                "depAirportCN":"查尔斯-戴高乐国际机场",
                "depCityCN":"巴黎",
                "depCity":"PAR",
                "carrierCN":"大韩航空 ",
                "arrTimeSmall":"15:55",
                "depTimeSmall":"21:00",
                "cabinGradeCN":"经济舱",
                "transTime":0
            },
            {
                "aircraftCode":"738",
                "arrAirport":"SPN",
                "arrDatetime":"2018-03-04 02:40:00",
                "cabin":"B",
                "cabinGrade":"Y",
                "carrier":"KE",
                "codeShare":true,
                "depAirport":"ICN",
                "depDatetime":"2018-03-03 21:10:00",
                "depTerminal":"1",
                "duration":270,
                "flightNumber":"KE5779",
                "itineraryIndex":1,
                "segmentIndex":2,
                "stopTime":0,
                "arrAirportCN":"塞班国际机场",
                "arrCityCN":"塞班",
                "arrCity":"SPN",
                "arrAirportCNName":"塞班国际机场(SPN)",
                "depAirportCN":"首尔仁川国际机场",
                "depCityCN":"首尔",
                "depCity":"SEL",
                "carrierCN":"大韩航空 ",
                "arrTimeSmall":"02:40",
                "depTimeSmall":"21:10",
                "cabinGradeCN":"经济舱",
                "transTime":315
            }
        ],
        "invoiceType":"E",
        "maxSeats":6,
        "priceType":0,
        "productType":"private",
        "reservationType":"1B",
        "retSegments":[

        ],
        "rule":{
            "baggageInfoList":[
                {
                    "adultBaggage":"1件,每件23KG",
                    "childBaggage":"1件,每件23KG",
                    "itineraryIndex":1,
                    "segmentIndex":1
                },
                {
                    "adultBaggage":"1件,每件23KG",
                    "childBaggage":"1件,每件23KG",
                    "itineraryIndex":1,
                    "segmentIndex":2
                }
            ],
            "changesInfoList":[
                {
                    "changesFee":0,
                    "changesStatus":"T",
                    "changesType":3,
                    "cnRemark":"",
                    "currency":""
                }
            ],
            "note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.同集团航司可能出现票本互开的情况，退票退税时需收回前返奖励。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.凡涉及境外供应商开票，在退票改期的时候会有100CNY/张的手续费。废票的时候会有50CNY/张的手续费。",
            "refundInfoList":[
                {
                    "cnRemark":"",
                    "currency":"",
                    "refundFee":0,
                    "refundStatus":"T",
                    "refundType":3
                }
            ],
            "serviceFee":{
                "currency":"CNY",
                "refundFeeByCarrier":0,
                "revalidationFeeByCarrier":0
            },
            "validatebaggageCn":"第1段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李1件,每件23KG;第2段行程,成人免费托运行李1件,每件23KG,儿童免费托运行李1件,每件23KG;",
            "baggageInfoListCN1":"1件,每件23KG/1件,每件23KG/",
            "validateRefundCn":"不可退;",
            "validateChangeCn":"不可改期;"
        },
        "ticketLimittime":144,
        "validatingCarrier":"KE",
        "from_kuari":"+2",
        "ret_kuari":"",
        "transiteAirport":"_",
        "transiteCity":"_",
        "showDetail":false,
        "goTotalTime":1240,
        "retTotalTime":0
    }
}
```

## [POST] **生单**

### URL
- http://host:port/booking/booking.do

### Request
-  data : String
-  passengers : Array
-  contact : Object

```json
{
    "data":"H4sIAAAAAAAAAE2POwrCQBiE77K1yP9I8mfTZXcTsLFSrAPZQvARjAoiltaW6jHs9TY+ruHGynLmG2aYvaqrdaUyhSVIjBqBgXTpJIotJSylywvi3DgBDcC2wEIsUlo6F9scc7SBSopgmKUga3QaMQRb9VRbzfxo13iVYRC+bafLxaAOW4MxTTCMJYggCZPuwpummU396hcwZAhQEJH/0LCahy71vF/e5+Pn+njdToFu/aor7i70oQ/q8AXMxRUp0wAAAA==",
    "passengers":[
        {
            "name":"SUN/WUKONG",
            "ageType":0,
            "gender":"M",
            "nationality":"CN",
            "cardType":"PP",
            "cardNum":"G00000001",
            "birthday":"1900-01-01",
            "cardIssuePlace":"CN",
            "cardExpired":"2099-01-01",
            "id":1
        },
        {
            "name":"HONG/HAIER",
            "ageType":1,
            "gender":"M",
            "nationality":"CN",
            "cardType":"PP",
            "cardNum":"G00000009",
            "birthday":"2012-01-01",
            "cardIssuePlace":"CN",
            "cardExpired":"2099-01-01",
            "id":2
        }
    ],
    "contact":{
        "name":"唐三藏",
        "email":"qq@qq.com",
        "address":"",
        "postcode":"",
        "mobile":"13888885555"
    }
}
```

### Response
-  success : Boolean
-  errorMsg : String
-  orderId : String
-  bookingDatetime : Datetime

```
{
   "success": true
  ,"errorMsg": ""
  ,"orderId": "201711280006"
  ,"bookingDatetime": "2017-11-28 00:06"
}
```

## [POST] **支付前校验**

### URL
- http://host:port/booking/paycheck.do

### Request
-  orderId : String

```
{
  "orderId": "uhe_order_id"
}
```

### Response
-  bookingDatetime : Date
-  orderId : String
-  success : Boolean
-  errorMsg : String

```json
{
    "success":true,
    "errorMsg":null,
    "orderId":"J180226101517501120Z",
    "bookingDatetime":null
}
```

## [POST] **获取用户订单列表**

### URL
- http://host:port/user/getOrderList.do

### Request
-  pageSize : Int . 页大小
-  depDateStart : Date . 起飞时间起
-  depDateEnd : Date . 起飞时间止
-  bookDateStart : Date . 预定时间起
-  bookDateEnd : Date . 预定时间止
-  orderId : String . 订单号
-  pnr : String . PNR
-  passengerName : String . 乘客姓名
-  ticketNo : String . 票号
-  depCity : String . 出发城市
-  arrCity : String . 到达城市
-  mainStatus : Int . 订单状态 0， 生单失败， 1，待支付
-  pageIndex : Int . 页码 1开始
-  pageSize : Int . 页大小

```
{
    "pnr":"ABCDEF",
    "arrCity":"BJS",
    "passengerName":"sunwukong",
    "orderId":"OrderId01234",
    "ticketNo":"T123456",
    "mainStatus":"",
    "depCity":"SHA",
    "pageIndex":1,
    "pageSize":10,
    "depDateStart":"2018-01-30",
    "depDateEnd":"2018-02-21",
    "bookDateStart":"2018-02-01 00:00:00",
    "bookDateEnd":"2018-02-21 23:59:59"
}
```

### Reponse
-  totalRow : Int . 总行数
-  totalPage : Int . 总页数
-  orders : Array 
-  success : Boolean
-  errorMsg : String

```json
{
    "success":true,
    "errorMsg":null,
    "totalRow":252,
    "totalPage":26,
    "orders":[
        {
            "adultNumber":1,
            "adultPrice":9259,
            "adultTax":1546,
            "arrCity":"SPN",
            "bookingTime":"2018-02-26 10:13:26",
            "buyerId":"1",
            "buyerName":"lisi",
            "childNumber":1,
            "childPrice":6934,
            "childTax":1546,
            "contactAddress":"",
            "contactEmail":"qq@qq.com",
            "contactMobile":"13888885555",
            "contactName":"唐三藏",
            "contactPostcode":"",
            "data":"05A1CD76F24906E0935C98D14F99DCF2FE1911B957F291BCCB69E7D4176959FCD03A976D011C40AC",
            "depCity":"PAR",
            "depDate":"2018-03-02",
            "forbiddenNationality":"",
            "lockStatus":0,
            "lockUserId":"",
            "lockUserName":"",
            "mainStatus":2,
            "maxSeats":9,
            "message":"success",
            "nationality":"",
            "orderId":"J180226101517501120Z",
            "passengers":[
                {
                    "ageType":0,
                    "birthday":"1899-12-31",
                    "cardExpired":"2099-01-01",
                    "cardIssuePlace":"CN",
                    "cardNum":"G00000001",
                    "cardType":"PP",
                    "gender":"M",
                    "name":"SUN/WUKONG",
                    "nationality":"CN",
                    "tickets":[

                    ]
                },
                {
                    "ageType":1,
                    "birthday":"2012-01-01",
                    "cardExpired":"2099-01-01",
                    "cardIssuePlace":"CN",
                    "cardNum":"G00000009",
                    "cardType":"PP",
                    "gender":"M",
                    "name":"HONG/HAIER",
                    "nationality":"CN",
                    "tickets":[

                    ]
                }
            ],
            "pnr":"TBJIHS",
            "reservationType":"1B",
            "rule":{
                "baggageInfoList":[
                    {
                        "adultBaggage":"1件,每件23KG",
                        "childBaggage":"1件,每件23KG",
                        "itineraryIndex":1,
                        "segmentIndex":1
                    },
                    {
                        "adultBaggage":"1件,每件23KG",
                        "childBaggage":"1件,每件23KG",
                        "itineraryIndex":1,
                        "segmentIndex":2
                    }
                ],
                "changesInfoList":[
                    {
                        "changesFee":0,
                        "changesStatus":"T",
                        "changesType":3,
                        "cnRemark":"",
                        "currency":""
                    }
                ],
                "note":"温馨提示：1.机票必须按顺序使用;若涉及多程和多国的签证须自理。2.若因签证、证件信息、名字错误等原因导致无法登机及其它问题所产生的损失旅客自行承担。3.同集团航司可能出现票本互开的情况，退票退税时需收回前返奖励。4.烦请乘客确认同样行程不能重复订座，如有重复订座航司系统会自动取消机位，导致到场无法登机，责任旅客自行承担。5.下单后请在30分钟内及时付款,付款超时会致订单取消 。6.特价机票,只提供电子版报销凭证,如需报销需付费开具增值税发票(部分境外客票只能提供invoice证明)。7.凡涉及境外供应商开票，在退票改期的时候会有100CNY/张的手续费。废票的时候会有50CNY/张的手续费。",
                "refundInfoList":[
                    {
                        "cnRemark":"",
                        "currency":"",
                        "refundFee":0,
                        "refundStatus":"T",
                        "refundType":3
                    }
                ],
                "serviceFee":{
                    "currency":"CNY",
                    "refundFeeByCarrier":0,
                    "revalidationFeeByCarrier":0
                }
            },
            "saleType":1,
            "segments":[
                {
                    "aircraftCode":"388",
                    "arrAirport":"ICN",
                    "arrDatetime":"2018-03-03 15:55:00",
                    "arrTerminal":"2",
                    "cabin":"B",
                    "cabinGrade":"Y",
                    "carrier":"KE",
                    "codeShare":false,
                    "depAirport":"CDG",
                    "depDatetime":"2018-03-02 21:00:00",
                    "depTerminal":"2E",
                    "duration":655,
                    "flightNumber":"KE902",
                    "itineraryIndex":1,
                    "segmentIndex":1,
                    "stopTime":0,
                    "arrAirportCN":"首尔仁川国际机场",
                    "depAirportCN":"查尔斯-戴高乐国际机场",
                    "cabinGradeCN":"经济舱"
                },
                {
                    "aircraftCode":"738",
                    "arrAirport":"SPN",
                    "arrDatetime":"2018-03-04 02:40:00",
                    "arrTerminal":"",
                    "cabin":"B",
                    "cabinGrade":"Y",
                    "carrier":"KE",
                    "codeShare":true,
                    "depAirport":"ICN",
                    "depDatetime":"2018-03-03 21:10:00",
                    "depTerminal":"1",
                    "duration":270,
                    "flightNumber":"KE5779",
                    "itineraryIndex":1,
                    "segmentIndex":2,
                    "stopTime":0,
                    "arrAirportCN":"塞班国际机场",
                    "depAirportCN":"首尔仁川国际机场",
                    "cabinGradeCN":"经济舱"
                }
            ],
            "sessionId":"IU2W1519611076329",
            "spendTime":6098,
            "status":0,
            "supplierId":"B2B20171113",
            "supplierName":"优旅白屏",
            "supplierOrderId":"jp15196112382646704",
            "tripType":1,
            "validatingCarrier":"KE",
            "statusCn":"待支付",
            "totalPrice":19285
        },
       ]
}
```


## [POST] **额度申请前获取订单金额和支付方式信息**

### URL
- http://host:port/accounting/prerequire.do

### Request
-  orderId : String

```
{
  "orderId": "201711280006"
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  orderId: String
-  price: Decimal
-  bookingDatetime: Date
-  company: String
-  payTypes: Array

```json
{
    "success":true,
    "errorMsg":null,
    "orderId":"J180226101517501120Z",
    "price":19285,
    "company":null,
    "bookingDatetime":"2018-02-26 10:13:26",
    "payTypes":[
        1,
        2,
        3
    ]
}
```

## [POST] **支付额度申请(支付/收款接口)**

### URL
- http://host:port/accounting/limit.do

### Request
-  orderId : String
-  payType : Int  // 1:预付款,2:授信
-  accountType : Int  // 4:购票支付,5:改期支付,6:辅营项目支付,7:退废收款
-  price : Decimal

```
{
  "orderId": "201711280006"
  ,"payType": 1
  ,"accountType": 4
  ,"price": 1000.00
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String    
-  balance :  Decimal //账户余额
-  paymentTime : Datetime
-  billingId : String // 支付流水号

```json
{
  "success": true,
  "errorMsg": "",//额度不够，手心账单未结算
  "payType": 1,
  "orderId": "orderId",
  "accountType": "",
  "price": 2500  
}
```

## [POST] **获取支付url接口**

### URL
- http://host:port/payment/payment.do

### Request
-  orderId : String
-  paymentMode:Int //1 支付宝

```
{
  "orderId": "201711280006"
  ,"paymentMode":1
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  payUrl: String

```
{
  "success": true,
  "payUrl":"https://",
  "errorMsg": ""
}
```

## [POST] **获取支付状态接口**

### URL
- http://host:port/payment/getPayStatus.do

### Request
-  orderId : String
-  paymentMode:Int //1 支付宝

```
{
  "orderId": "201711280006"
  ,"paymentMode":1
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  status : 2
-  tradeNo: String

```
{
  "success": true,
  "tradeNo":"12321332323232323",
  "status": 2
  "errorMsg": ""
}
```

## [POST] **通知出票**

### URL
- http://host:port/ticketing/noticeIssue.do

### Request
-  orderId : String

```
{
  "orderId": "201711280006"
  ,"paymentMode":1
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": ""
}
```

## [POST] **恢复额度申请（确认还款、确认充值、提现）**

### URL
- http://host:port/accounting/creditSettlementOfRechage.do

### Request
```
{
  "accountType":1
  ,"paymentVoucher":1
  ,"creditPrice":100
  ,"depositPrice":100
  ,"files":[]
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": ""
}
```

## [POST] **获取恢复额度申请记录**

### URL
- http://host:port/accounting/rechargingList.do

### Request
```
{
   "payType":1
  ,"accountType":1
  ,"status":1
  ,"agentName":1
  ,"startDate":"2017-06-20"
  ,"endDate":"2017-06-30"
  ,"paymentVoucher":""
  ,"billingId":"1234"
  ,"pageIndex":1
  ,"pageSize":10
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  totalRow : Int
-  totalPage : Int
-  recharges:Array

```
{
  "success": true,
  "errorMsg": "",
  "totalRow":10,
  "totalPage":1,
  "recharges": [
        {
            "id" : 1,
            "buyerId" : "1",
            "buyerName" : "user01",
            "payType" : 1, // 支付方式 1:预付款,2:授信
            "accountType" : 1, // 收支类型 1:充值,2:提现,3:授信还款
            "billingId": "2394", //流水号
            "creditPaymentVoucher" :"123", //授信账单
            "creditRepaymentAmount" : 0.00, //授信总金额
            "depositBalance" : 0.00, //账户金额
            "price" : 0.00, //操作金额
            "status" : 1, //结算状态 1:待确认,2:已确认,3:驳回
            "message" : "", //驳回原因
            "attachmentCount" : 0, //凭证数量
            "applyTime" : "2017-10-10 10:10:10", //申请时间
            "confirmTime" : "2017-10-10 10:10:10", //确认时间
            "lockUserId" : "", //锁单ID
            "lockUsername" : "", //锁单人
            "operatorName" : "" //操作人
        }
    ]
}
```

## [POST] **获取授信账单信息列表**

### URL
- http://host:port/accounting/creditSettlementOfList.do

### Request
```
{
   "operatorId":1
  ,"operatorName":"name"
  ,"status":1
  ,"agentName":1
  ,"startDate":"2017-06-20"
  ,"endDate":"2017-06-30"
  ,"paymentVoucher":""
  ,"needExport":false
  ,"pageIndex":1
  ,"pageSize":10
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  totalRow : Int
-  totalPage : Int
-  recharges:Array

```
{
  "success": true,
  "errorMsg": "",
  "totalRow":10,
  "totalPage":1,
  "repayments":[
        {
            "id" : 1,
            "payType" : 1, // 支付方式 1:预付款,2:授信
            "buyerId" : "1", // 买家ID
            "buyerName" : "test01",
            "billingId": "2394", //流水号
            "paymentVoucher": "1121001", // 账期号
            "accountPeriod" : 2, // 账期 T+2
            "payDay": "2017-12-24", // 账单日
            "repaymentTime" : "2017-12-30 16:30:00", // 最后还款时间
            "repaymentAmount" : 500.35, // 还款总额
            "paymentAmount" : 500.35, // 付款总额
            "status" : 1, //结算状态 1:未结算,2:已结算,3:驳回
            "message" : "", //驳回原因
            "applyTime" : "2017-10-10 10:10:10", //申请提交时间
            "confirmTime" : "2017-10-10 10:10:10", //确认时间
            "lockUserId" : "", //锁单ID
            "lockUsername" : "", //锁单人
        }
    ]
}
```

## [POST] **支付明细列表**

### URL
- http://host:port/accounting/creditChangeOfDetailListForWebAndManager.do

### Request
```
{
  "operatorId":1
  ,"operatorName":"name"
  ,"status":1
  ,"agentName":1
  ,"startDate":"2017-06-20"
  ,"endDate":"2017-06-30"
  ,"payType":""
  ,"accountType":""
  ,"orderId":""
  ,"agentName":""
  ,"billingId":""
  ,"needExport":false
  ,"searchType":1
  ,"pnr":""
  ,"agentOrderId":"11112"
  ,"pageIndex":1
  ,"pageSize":10
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  totalRow : Int
-  totalPage : Int
-  details:Array

```
{
  "success": true,
  "errorMsg": "",
  "totalRow":10,
  "totalPage":1,
  "details":[
        {
            "id" : 1, // key
            "buyerId" : "",
            "buyerName" : "",
            "buyerOrderId" : "sadfdfd", // 代理商订单号
            "payType" : 1, // 支付方式 1:预付款,2:授信
            "accountType" : 1, // 收支类型 1:充值,2:提现,3:结算收款,4:购票支付,5:改期支付,6:辅营项目支付,7:退废收款
            "orderId" : "sadfdfd", // 平台订单号
            "billingId" : "1233432", // 流水号
            "creditLine" : 1232.00, //授信总额
            "creditPrice" : 123.00, //授信变动金额
            "creditAmount" : 0.0, //授信使用总额
            "creditRepaymentTime" : "2017-10-19 11:23:00", // 最后还款时间
            "depositPrice" : 123.00, //储蓄变动金额
            "depositBalance" : 123.00, //储蓄余额
            "createtime" : "2017-10-19 11:23:00", //变动时间
            "attachmentCount" : 0, //凭证数量
            "pnr" : "123456"
        }
    ]
}
```

## [POST] **获取买家余额不足提醒配置**

### URL
- http://host:port/accounting/creditChangeOfGetAlert.do

### Request
```
{
  "payType":1
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  alert:Object

```
{
  "success": true,
  "errorMsg": "",
  "alert":{
        "id" : 1,
        "payType" : 1, // 支付方式 1:预付款,2:授信
        "alertPhone": "13829879986",
        "alertEmail" : "alert@mirosoft.com",
        "balanceThreshold" : 1000
    }
}
```

## [POST] **获取买家余额不足提醒配置**

### URL
- http://host:port/accounting/creditChangeOfSetAlert.do

### Request
```
{
  "alertObj":{
        "id" : 1,
        "payType" : 1, // 支付方式 1:预付款,2:授信
        "alertPhone": "13829879986",
        "alertEmail" : "alert@mirosoft.com",
        "balanceThreshold" : 1000
    }
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": ""
}
```

## [POST] **获取退改订单列表**

### URL
- http://host:port/refund/getOrderList.do

### Request
```
{
    "refundType":1, //1:退票 2:改期

    "buyerId":"1",//代理商ID
    "buyerName":"",//代理商名称
    "depDateStart":"2017-12-12 00:00:00",//起飞时间起
    "depDateEnd":"2017-12-31 23:59:59",//起飞时间止
    "bookDateStart":"2017-12-12 00:00:00",//预定时间起
    "bookDateEnd":"2017-12-31 23:59:59",//预定时间止
    "orderId":"",
    "pnr":"",
    "depCity":"",
    "arrCity":"",
    "mainStatus":1, // 订单状态 1:申请 2:待确认 3:已确认 4:取消 5:待结算 6:完成
    "mainStatusList":[],
    "ticketNo":"",// 票号
    "pageIndex" : 1,
    "pageSize" : 10,
}

```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  totalRow : Int
-  totalPage : Int
-  orders:Array

```
{
  "success": true,
  "errorMsg": "",
   "totalRow":120,
   "totalPage":12,
   "orders":
    [
        {
            "refundType":1, //1:退票 2:改期
            "orderId" : "order_id",
            "sourceOrderId" : "order_id",//原始订单号
            "sourceAdultPrice" : 100.00,//原始订单成人票面
            "sourceAdultTax" : 100.00,//原始订单成人税
            "sourceChildPrice" : 100.00,//原始订单儿童票面
            "sourceChildTax" : 100.00,//原始订单儿童税
            "dataSource":"", //数据来源
            "orderSource":""//订单来源

            "tripType" : 2, // 1 单程，2 往返
            "depCity" : "BJS",
            "arrCity" : "HKG",
            "depDate" : "2017-12-30",
            "retDate" : "2018-01-06",

            "adultNumber" : 1,
            "childNumber": 0,
            "supplierName" : "供应商名字",
            "supplierId" : "供应商ID",
            "buyerId" : "买家Id",
            "buyerName" : "买家名称",

            "mainStatus" : 1, // 订单状态 0:无效 1:申请 2:待确认 3:已确认 4:取消 5:完成
            "paymentType" : 1, // 1：预付款，2：授信，3：支付宝 4：代扣
            "paymentTime" : "2017-12-30 16:50:30", // 支付时间
            "paymentVoucher" : "2394", // 支付流水号
            "ticketPnr": "", //退票拆分pnr
            "ticketTime": "2017-12-08 20:15:59", //出票时间

            "passengers" : [
                {
                    "name": "JI/MINGMINGMS",
                    "gender": "M",
                    "ageType": 0,
                    "birthday": "2001-02-01",
                    "nationality": "CN",
                    "cardType": "PP",
                    "cardNum": "G234324",
                    "cardExpired": "2018-11-07",
                    "cardIssuePlace": "CN"
                }
            ],
            "segments" : [
                {
                    "itineraryIndex" : 1,
                    "segmentIndex" : 1,
                    "carrier" : "KE",
                    "flightNumber" : "KE898",
                    "aircraftCode": "777",
                    "cabin": "B",
                    "cabinGrade": "Y",
                    "codeShare" : false,
                    "depAirport" : "PVG",
                    "arrAirport" : "ICN",
                    "depTerminal": "1",
                    "arrTerminal" : "3",
                    "depDatetime": "2017-12-30 14:00:00",
                    "arrDatetime": "2017-12-30 17:00:00",
                    "duration": 190,
                    "stopTime" : 120,
                    "newDepDatetime": "2017-12-30 14:00:00",// 新的起飞时间
                    "newCabin": "B",// 新的舱位
                    "newFlightNumber" : "KE898"// 新的航班号
                }
            ],
            "contact": {
                "address": "",
                "email": "",
                "mobile": "13635446627",
                "name": "晏霞",
                "postcode": ""
            },
            "reason": {
                "type":1, // 1:自愿 2:非自愿
                "subType":"",//非自愿子类型
                "remark":"", //备注
                "time": "2017-12-08 20:15:59", //申请时间
                "attachments":[
                    {
                        "id":1,
                        "name":"",
                        "base64":""
                    }
                ]
            },
            "answer": {
                "type":1, // 1:同意 2:不同意
                "adultPrice": 100.00,// 成人单价
                "childPrice": 100.00,// 儿童单价
                "expiryTime": "2017-12-30 14:00:00",//价格有效期
                "remark":"", //退改方案
                "chargeAmount": 100.00,// 收费总价
                "returnAmount": 0.00,// 退费总价
                "time": "2017-12-08 20:15:59" //方案确认时间
            },
            "tickets" : [//改期票号PNR信息
                {
                    "itineraryIndex" : 1, // 行程序号
                    "segmentIndex" : 1, // 第1个航段
                    "depAirport" : "PEK",
                    "arrAirport" : "HKG",
                    "flightNumber" : "MU234",
                    "cabin" : "S",
                    "passengers" : [
                        {
                            "name": "JI/MINGMINGMS",
                            "gender": "M",
                            "ageType": 0,
                            "cardType": "PP",
                            "cardNum": "G234324",
                            "sourceTicketNo" "2177658388",
                            "ticketNo" "2177658388",
                            "pnr" : "ADBE2D"
                        }
                    ]
                }
            ]
            "lockUserId":"",
            "lockUsername":"",
            "lockTime":"2017-12-30 17:00:00"
        }
    ]

}
```

## [POST] **获取退改订单信息**

### URL
- http://host:port/refund/getOrderGet.do

### Request
```
{
  "orderId":"12345678"
}
```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  order:Object

```json
{
    "success":true,
    "errorMsg":null,
    "totalRow":null,
    "totalPage":null,
    "order":{
        "adultNumber":1,
        "answer":{
            "adultCabinPrice":0,
            "adultPlatformPrice":100,
            "adultServicePrice":700,
            "attachments":[

            ],
            "chargeAmount":800,
            "childCabinPrice":0,
            "childPlatformPrice":0,
            "childServicePrice":0,
            "expiryTime":"2018-02-06 19:25:39",
            "remark":"111111111",
            "returnAmount":879,
            "time":"2018-02-06 17:26:59",
            "type":1
        },
        "arrCity":"SEL",
        "buyerId":"1",
        "buyerName":"lisi",
        "childNumber":0,
        "contact":{
            "address":"",
            "email":"11@11.COM",
            "mobile":"13941571324",
            "name":"SSS",
            "postcode":""
        },
        "dataSource":"",
        "depCity":"NKG",
        "depDate":"2018-02-08",
        "lockTime":"2018-02-06 17:27:53",
        "lockUserId":"",
        "lockUsername":"",
        "mainStatus":6,
        "orderId":"J180206170508643120F-1",
        "orderSource":"",
        "passengers":[
            {
                "ageType":0,
                "birthday":"1985-06-04",
                "cardExpired":"2045-06-06",
                "cardIssuePlace":"CN",
                "cardNum":"G321312132",
                "cardType":"PP",
                "gender":"M",
                "name":"FSDF/SS",
                "nationality":"CN"
            }
        ],
        "paymentTime":"2018-02-06 17:28:07",
        "paymentVoucher":"I180206172807630120TFHIOE",
        "reason":{
            "attachments":[

            ],
            "remark":"111",
            "time":"2018-02-06 17:11:32",
            "type":1
        },
        "refundType":1,
        "saleType":1,
        "segments":[
            {
                "aircraftCode":"320",
                "arrAirport":"ICN",
                "arrDatetime":"2018-02-09 12:20:00",
                "arrTerminal":"1",
                "cabin":"L",
                "cabinGrade":"Y",
                "carrier":"CZ",
                "codeShare":false,
                "depAirport":"CGQ",
                "depDatetime":"2018-02-09 09:30:00",
                "depTerminal":"",
                "duration":110,
                "flightNumber":"CZ687",
                "itineraryIndex":1,
                "newCabin":"",
                "newFlightNumber":"",
                "segmentIndex":2,
                "stopTime":0,
                "arrAirportCN":"首尔仁川国际机场",
                "depAirportCN":"长春龙嘉国际机场"
            }
        ],
        "sourceAdultPrice":1151,
        "sourceAdultTax":528,
        "sourceChildPrice":0,
        "sourceChildTax":0,
        "sourceOrderId":"J180206170508643120F",
        "supplierId":"B2B20171113",
        "supplierName":"优旅白屏",
        "ticketPnr":"111111",
        "ticketTime":"2018-02-06 17:28:07",
        "tickets":[

        ],
        "tripType":1
    }
}
```

## [POST] **退改申请**

### URL
- http://host:port/refund/refundApply.do

### Request
```
{
    "refundType":1, //1:退票 2:改期
    "sourceOrderId" : "uhe_order_id",//原始订单号
    "passengers" : [
        {
                "name": "JI/MINGMINGMS",
                "gender": "M",
                "ageType": 0,
                "birthday": "2001-02-01",
                "nationality": "CN",
                "cardType": "PP",
                "cardNum": "G234324",
                "cardExpired": "2018-11-07",
                "cardIssuePlace": "CN"
        }
    ],
    "segments" : [
        {
            "itineraryIndex" : 1, // 行程序号
            "segmentIndex" : 1, // 航段序号
            "carrier" : "KE",
            "flightNumber" : "KE898",
            "aircraftCode": "777",
            "cabin": "B",
            "cabinGrade": "Y",
            "codeShare" : false,
            "depAirport" : "PVG",
            "arrAirport" : "ICN",
            "depTerminal": "1",
            "arrTerminal" : "3",
            "depDatetime": "2017-12-30 14:00:00",
            "arrDatetime": "2017-12-30 17:00:00",
            "duration": 190,
            "stopTime" : 120,
            "newDepDatetime": "2017-12-30 14:00:00",// 新的起飞时间
            "newCabin": "B",// 新的舱位
            "newFlightNumber" : "KE898"// 新的航班号
        }
    ],
    "contact": {
        "address": "",
        "email": "",
        "mobile": "13635446627",
        "name": "晏霞",
        "postcode": ""
    },
    "reason":{
        "type":1, // 1:自愿 2:非自愿
        "subType":"",//非自愿子类型
        "remark":"" //备注
        "attachments":[
            {
                "name":"",
                "base64":""
            }
        ]
    }
}

```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  orderId:String
-  mainStatus:Int

```
{
  "success": true,
  "errorMsg": "",
  "orderId":"dddd",
  "mainStatus":1
}
```

## [POST] **退改方案确认**

### URL
- http://host:port/refund/refundVilidate.do

### Request
```
{
    "orderId":"ddddd",
    "paymentType" : 1
}

```

### Reponse
-  success : Boolean 
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": ""
}
```

## [POST] **退票取消**

### URL
- http://host:port/refund/refundCancel.do

### Request
```
{
    "orderId":"ddddd"
}

```

### Reponse
-  success : Boolean 
-  errorMsg : String

```
{
  "success": true,
  "errorMsg": ""
}
```

## [POST] **获取不同状态下订单数量**

### URL
- http://host:port/user/getOrderStatus.do

### Request
```
{
    "orderId":"ddddd"
}

```

### Reponse
-  success : Boolean 
-  errorMsg : String
-  orderStatus : Object

```json
{
    "success":true,
    "errorMsg":null,
    "orderStatus":{
        "cancel":68,
        "issueTicket":45,
        "waitPay":54,
        "waitTicket":86
    }
}
```

## [POST] **获取账户的预付款信息**

### URL
- http://host:port/accounting/depositGetAlert.do

### Request
```
{
}

```

### Reponse

```json
{
    "success":true,
    "errorMsg":null,
    "deposit":{
        "alert":{
            "alertEmail":"testman@126.com,userman@qq.com,testman@126.com,userman@qq.com,testman@126.com,userman@qq.com,testman@126.com,userman@qq.com,testman@126.com,userman@qq.com,qqqqqq@qq.com",
            "alertPhone":"13801790371,18544144454,13801790372,18652449105,13815765098",
            "balanceThreshold":1001,
            "id":5,
            "payType":1
        },
        "buyerId":"1",
        "buyerName":"lisi",
        "deportBalance":64897100.47,
        "deportRechargeAmount":65064323
    }
}
```

## [GET] **获取附件信息**

### URL
- http://host:port/refund/getAttachmentDetail.do

### Request
```
orderId：J180202185955498120D-1
attachmentId：85

```

### Reponse

```json
{
    "success":true,
    "errorMsg":null,
    "attachment":{
        "base64":"/9j/4AAQxxxx=",
        "createTime":"2018-02-02 19:03:58",
        "id":85,
        "name":"11111.png",
        "orderId":"J180202185955498120D-1"
    }
}

```


## [GET] **支付圈签约**

### URL
- http://host:port/payment/GetPaySign.do

### Request
```
  {
      "username": "user01",
      "userId" : "user_id",
      "token" : "token value provided bt auth-service",
      "userType" : "userType",
      "paymentMode": 1 //1:支付宝
  }
  
```
### Reponse
```json

  {   
    "status": 0,   0:获取签约地址成功，-1:签名失败
    "message":"获取签约地址成功",
    "signUrl": ""
  }





```
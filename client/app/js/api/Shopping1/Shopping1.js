import requestAPIServiceAsync from "js/api";

/*

@requestData:
{

      "cid":"B2B20171113",
      "tripType":"1",
      "adultNumber":1,
      "childNumber":0,
      "fromCity":"SHA",
      "toCity":"BKK",
      "fromDate":"2017-12-10",
      "retDate": "2018-02-20"

  }


@EG async:
import { Shopping1 } from "api/Shopping1/Shopping1.js";
let shopping1 = new Shopping1({
    cid: "B2B20171113",
    tripType: "1",
    adultNumber: 1,
    childNumber: 0,
    fromCity: "SHA",
    toCity: "BKK",
    fromDate: "2017-12-10",
    retDate: "2018-02-20"
});

try{
    let result = await shopping1.requestAsync();
    console.log(result);
}
catch(e){
    console.error(e);
}

@EG sync:
import { Shopping1 } from "api/Shopping1/Shopping1.js";
let shopping1 = new Shopping1({
    cid: "B2B20171113",
    tripType: "1",
    adultNumber: 1,
    childNumber: 0,
    fromCity: "SHA",
    toCity: "BKK",
    fromDate: "2017-12-10",
    retDate: "2018-02-20"
});

shopping1.requestAsync().then(data=>{
    
    console.log(data);

}).catch(err=>{

    console.log(err);

});

*/
export class Shopping1 {

    constructor(requestData) {
        this.requestData = requestData;
    }

    async requestAsync() {
        

        var result1 = await requestAPIServiceAsync('http://119.84.8.43:13203/ota/shopping/v1', this.requestData);

        if (!result1.success) {
            return Promise.reject(new Error(result1.errorMsg));
        }
        else if (!result1.orgShopping1Response) {
            return Promise.reject(new Error("orgShopping1Response not found"));
        }
        else if (result1.orgShopping1Response.status != 0) {
            return Promise.reject(result1.orgShopping1Response.msg);
        }
        
        return Promise.resolve(new ShoppingResult(result1.orgShopping1Response));

    }

}

class ShoppingResult {

    constructor(orgShopping1Response) {
        this.orgShopping1Response = orgShopping1Response;
    }

}


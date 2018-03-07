import {
  BASE_URL,
} from './apiAddress'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//#region requestAPIServiceAsync

function onAPIResponse(res) {

  if (!res.success && res.errorMsg == "noLogin") {
    
    window.app1.$router.push({ name: 'signin', query: { ref:window.app1.$route.name}},()=>{
      
      window.app1.$message({
          message: '请先登录',
          type: 'error'
      });

    });

    return false;

  }

  return true;

}

/**
 * 访问API方法
 *
 * @param {any} uri
 * @param {any} obj
 * @returns
 */
function requestAPIServiceAsync(uri, obj,onlyRequest,method) {

  return new Promise((resovle, reject) => {

    $.ajax({

      url: BASE_URL + uri,
      type: method||"POST",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      cache: false,
      data: typeof (a) === "string" ? obj : JSON.stringify(obj),
      timeout: 60 * 1000

    }).then((res) => {
      // debugger
      if(!onlyRequest){
        if (!onAPIResponse(res)) {
          reject(res);
        }
      }

      if(!onlyRequest){
        if (!res.success)
          reject(res)
        else
          resovle(res);
      }
      else
        resovle(res);

    }, (err) => {
      reject(err);
    });

  })
}

export default requestAPIServiceAsync;
//#endregion

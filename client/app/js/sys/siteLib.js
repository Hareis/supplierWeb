

import 'css/site.less'
import 'css/site.scss'


import footer from 'component/footer.vue'
import header from 'component/header.vue'

new Vue({
    el: '#footer',
    render: h => h(footer)
})

new Vue({
    el: '#header',
    render: h => h(header)
})


//#region string

String.prototype.formatCurrency = function () {

    return this.replace(/CNY/g, '￥')

}

//#endregion

//#region arr
Array.prototype.contain = function(val)  
{  
     for (var i = 0; i < this.length; i++)  
    {  
       if (this[i] == val)  
      {  
       return true;  
      }  
    }  
     return false;  
}; 
//#endregion

//#region date

//YYYY-MM-DD->20AUG 08:11
window.top.toT3 = (YYYY_MM_DD) => {
    return moment(YYYY_MM_DD).format("DDMMM hh:mm").toUpperCase()
}

//YYYY-MM-DD->20AUG
window.top.toT2 = (YYYY_MM_DD) => {
    return moment(YYYY_MM_DD).format("DDMMM").toUpperCase()
}

//20AUG ->YYYY-MM-DD
window.top.toT1 = (DDMMM) => {
    
    if (!DDMMM) return null;
    let d1 = moment(DDMMM + moment().year(),"DDMMMYYYY")
    let d2 = moment().startOf('day')
    if (d1.isBefore(d2))
        return (moment(DDMMM + (moment().year() + 1)).format('YYYY-MM-DD'))
    else
        return (d1.format('YYYY-MM-DD'))
}

String.prototype.toT4 = function () {
    return moment(this).format("YYYY-MM-DD HH:mm:ss");
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}



//#endregion
 
//#region trans

String.prototype.getDatasrouceTypeCN=function(){
    if(datasrouceTypeCNDict1[this])
        return datasrouceTypeCNDict1[this]
    return this
}

String.prototype.getDatasrouceClassCN=function(){
    if(datasrouceClassCNDict1[this])
        return datasrouceClassCNDict1[this]
    return this
}

String.prototype.getVenderCN=function(){
    if(venderCNDict[this])
        return venderCNDict[this]
    return this
}

//#endregion


'use strict';
const ccap = require('ccap');//Instantiated ccap class
var str_ary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const captcha = ccap({
    fontsize: 35,
    height: 38,
    width: 100,
    offset: 25,
    generate: function () {
        var str_num = 4,
            r_num = str_ary.length,
            text = '';
        for (var i = 0; i < str_num; i++) {
            var pos = Math.floor(Math.random() * r_num)
            text += str_ary[pos];//生成随机数
        }
        return text;
    }
});

module.exports = () => {

    var ary = captcha.get();
    return {
        txt: ary[0],
        buf: ary[1]
    }
};
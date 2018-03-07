const moment = require('moment');
var path = require('path');

Date.prototype.format = function (exp) {
    return moment(this).format(exp);
}

/*
    自定义跟根目录的require
    由于vscode不支持这个的类型定义查看所以,用的少
*/
global.require_ = (path1)=>{
    var paths=path1.split('/');
    return require(path.join(appConfig.homeDir,...paths));
}    
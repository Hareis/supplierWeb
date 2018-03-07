global.BusinessException = function (message) {
  this.name = "BusinessException";
  this.message = (message || "");
}
global.BusinessException.prototype = Error.prototype;


global.NotImplementedException = function (message) {
  this.name = "NotImplementedException";
  this.message = (message || "");
}
global.NotImplementedException.prototype = global.BusinessException.prototype;


global.noLoginException = function (message) {
  this.name = "noLoginException";
  this.message = (message || "");
}
global.noLoginException.prototype = global.BusinessException.prototype;
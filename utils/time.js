
module.exports = {
  getDateTime
}

function getDateTime() {
  var date = new Date();
  var year = date.getFullYear();    //  返回的是年份
  var month = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
  var dates = date.getDate();       //  返回的是几号
  var day = date.getDay();          //  周一返回的是1，周六是6，但是周日是0
  var housr = date.getHours();      //  获取当前小时数(0-23)
  var minutes = date.getMinutes();  //  获取当前分钟数(0-59)
  var seconds = date.getSeconds();  //  获取当前秒数(0-59)
  var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
  return year + '/' + month + '/' + dates + ' ' + housr + ':' + minutes + ':' + seconds + ' ' + arr[day]
}


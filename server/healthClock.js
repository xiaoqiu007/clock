const { post } = require('../libs/http');
const http = require('../libs/http');

module.exports = {
  async post(data, token) {
    const url3 = 'https://skl.zjweu.edu.cn/skl/healthClockInDay/saveHealthClockInDay'
    const clockData = {
      "stuName": data.stuName,
      "stuNo": data.stuNo,
      "domicilePlace": data.domicilePlace,
      "abodePlace": data.abodePlace,
      "campus": data.campus,
      "campus_text": "南浔校区",
      "mornTemp": "1",
      "healthState": "1",
      "otherHealthReason": "",
      "isTripArea": "0",
      "isTouchArea": "0",
      "isTouch": "0",
      "isDiagnosis": "0",
      "isQuarantine": "0",
      "quarantineReason": "",
      "quarantineReason_text": "",
      "quarantineOtherReason": "",
      "quarantineStyle": "",
      "quarantineStyle_text": "",
      "quarantineStyleOtherReason": "",
      "quarantineStartDate": "",
      "quarantineEndDate": "",
      "quarantineDate_text": "",
      "quarantinePlace": "",
      "isInoculate": data.isInoculate,
      "inoculateType": data.inoculateType,
      "isStrengthen": "",
      "unInoculateCause": "",
      "affirm": true,
      "latitude": 30.8342342376709,
      "longitude": 120.44358825683594
    }
    const clock = await http.post(url3, JSON.stringify(clockData), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Cookie': 'sklToken=' + token,
        'Authorization': token,
        'Origin': 'https://skl.zjweu.edu.cn'
      }
    })
    return {
      code: 1,
      msg: JSON.parse(clock.data)
    }
  }
}

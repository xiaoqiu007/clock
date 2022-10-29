const http = require('../libs/http')

module.exports = send

function send(msg) {
  const data = {
    "msgtype": "text",
    "text": {
      "content": msg
    }
  }
  http.post('https://oapi.dingtalk.com/robot/send?access_token=钉钉机器人webhook地址',
    JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }
  })
}





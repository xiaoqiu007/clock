const http = require('../libs/http')

module.exports = send

function send(msg) {
  const data = {
    "msgtype": "text",
    "text": {
      "content": msg
    }
  }
  http.post('https://oapi.dingtalk.com/robot/send?access_token=0fc8bb8bc38613ea9e711eb7bfd0c3822f879f9cea18ebfcf16b66fc0af156aa',
    JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }
  })
}





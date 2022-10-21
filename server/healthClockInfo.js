const http = require("../libs/http");

module.exports = {
    /**
     * 获取打卡信息
     */
    async get(token) {
        const url2 = 'https://skl.zjweu.edu.cn/skl/healthClockInDay/healthInfoByStuNo'
        const info = await http.get(url2, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Cookie': 'sklToken=' + token,
                'Authorization': token,
            }
        })
        const msg = JSON.parse(info.data)
        if(msg.message == '操作成功') {
          return {
            code: 1,
            msg: msg.data
          }
        } else {
          return {
            code: 0,
            msg: '获取个人健康打卡信息失败'
          }
        }
        
    }
}

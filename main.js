const authLogin = require('./server/authLogin')
const healthClockInfo = require('./server/healthClockInfo')
const healthClock = require('./server/healthClock')
const account = require('./user/account')
const send = require('./utils/send')

// 获取账户列表
account.forEach(a => {
  var user = a.split(",")
  clock(user[0], user[1])
})

console.log("开始打卡")


function clock(user, pass) {
  // 账户登录
  authLogin(user, pass).then(res => {
    if (res.code == 0) {
      send(res.msg)
    } else {
      const token = res.msg
      // 获取个人健康打卡信息
      healthClockInfo.get(token).then(res => {
        if (res.code == 0) {
          send(res.msg)
        } else {
          const data = res.msg
          console.log('获取到 ' + data.stuName + ' 个人健康打卡信息')
          // return
          // 进行健康打卡
          healthClock.post(data, token).then(res => {
            console.log(data.stuName + ', ' + res.msg.data)
            send(data.stuName + ', ' + res.msg.data)
          })
        }
      })
    }
  })
}



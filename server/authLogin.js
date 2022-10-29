const http = require('../libs/http');
const aes = require('../libs/aes');
const querystring = require('querystring');

module.exports = authLogin
/**
 * 进行登录操作，获取 Token
 */
async function authLogin(username, password) {
  const url = `https://authserver6.zjweu.edu.cn/authserver/login?service=https://skl.zjweu.edu.cn/skl/cas/login`;
  const casPage = await http.get(url)
  const cookie = (casPage.headers['set-cookie'] || []).join('; ').replace('; path=/; HttpOnly', '');
  let lt, execution, dllt, salt, rmShown, _eventId;
  try {
    lt = casPage.data.match(/<input.*?name=\"lt\".*?value=\"(.*?)\"/)[1];
    dllt = casPage.data.match(/<input.*?name=\"dllt\".*?value=\"(.*?)\"/)[1];
    execution = casPage.data.match(/<input.*?name=\"execution\".*?value=\"(.*?)\"/)[1];
    _eventId = casPage.data.match(/<input.*?name=\"_eventId\".*?value=\"(.*?)\"/)[1];
    rmShown = casPage.data.match(/<input.*?name=\"rmShown\".*?value=\"(.*?)\"/)[1];
    salt = casPage.data.match(/<input.*?id=\"pwdDefaultEncryptSalt\".*?value=\"(.*?)\"/)[1];
  } catch {
    return {
      code: 0,
      msg: '未获取到登录的关键参数,可能是登录页gg了'
    }
  }
  const ep_password = aes._ep(password, salt)
  const postData = {
    'username': username,
    'password': ep_password,
    'lt': lt,
    'dllt': dllt,
    'execution': execution,
    '_eventId': _eventId,
    'rmShown': rmShown
  }

  // 进行登录操作
  const loginPage = await http.post(url, querystring.stringify(postData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Cookie': cookie,
    },
  });

  let url1, cookie1;
  try {
    url1 = loginPage.headers.location
    cookie1 = (loginPage.headers['set-cookie'] || []).slice(2, 3).join('; ').replace('; domain=.zjweu.edu.cn; path=/', '')
  } catch {
    return {
      code: 0,
      msg: '未获取到302跳转信息,可能是账号密码错误'
    }
  }

  console.log(url1)
  console.log(cookie1)
  // 根据 location 进行 302 跳转 (获取 Token 信息)
  const ticket = await http.get(url1, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Cookie': cookie1,
      'rejectUnauthorized':'false'
    }
  })
  console.log(ticket.headers.location)
  let token = ''
  try {
    token = ticket.headers.location.replace('https://skl.zjweu.edu.cn/#/login?token=', '')
  } catch {
    return {
      code: 0,
      msg: '获取 Token 失败'
    }
  }
  return {
    code: 1,
    msg: 'Bearer ' + token
  }
  

}






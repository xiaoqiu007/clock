const http = require('http');
const https = require('https');

module.exports = {
    get: (targetUrl, options = {}) => request(targetUrl, {
        ...options,
        method: 'GET',
    }),
    post: (targetUrl, data, options = {}) => request(targetUrl, {
        ...options,
        method: 'POST',
        data,
    }),
};

function request(targetUrl, options = {}) {
    return new Promise((resolve, reject) => {
        // resolve 成功， reject 失败
        const targetHttp = targetUrl.includes('http://') ? http : https;
        targetHttp.request(targetUrl, options, res => {
            let rawData = '';
            res.setEncoding(options.encoding || 'utf8');
            res.on('data', chunk => rawData += chunk);
            res.on('error', error => reject(error));
            res.on('end', () => {
                // if (options.followLocation && res.statusCode === 302) {
                if (false) {
                    console.log(res.headers)
                    const cookie = (res.headers['set-cookie'] || []).slice(2,3).join('; ').replace('; domain=.zjweu.edu.cn; path=/', '')
                    request(res.headers.location, {
                        method: 'GET',
                        headers: {
                            'Cookie': cookie
                        },
                    }).then(
                        res => resolve(res),
                        err => reject(err),
                    );
                } else {
                    // console.log('res >>> ', res);
                    resolve({
                        statusCode: res.statusCode,
                        data: rawData,
                        headers: res.headers,
                    });
                }
            });
        }).on('error', error => reject(error))
            .end(options.data || '');
    });
}

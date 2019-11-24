const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
    const route = url.parse(req.url)
    const params = qs.parse(route.query)
    const path = url.parse(req.url).pathname;

    res.writeHead(200, {'Content-Type': 'text/plain'});
  
    if (path === '/hello' && 'name' in params) {
        if (params['name'] === 'martin') {
            res.write('Hello I am Martin, I am a 4th year student at ECE')
        }
        else {
            res.write('Hello ' + params['name'])
        }  
    res.end();
    } else {
        res.write('404 Error wrong path')
    }
    res.end();
}

module.exports = {
    serverHandle: serverHandle,
    anotherFunction: anotherFunction,
}
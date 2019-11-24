// Import a module
const http = require('http')
const handlesMyName = require('./handles')

http.createServer(handlesMyName.serverHandle).listen(8080);
// curl localhost:8080 or go to http://localhost:8080
var connect = require('connect');
var axios = require('axios');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function () {
  console.log('Server running on 8080...');
});
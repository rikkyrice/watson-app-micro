const express = require('express'),
      logger = require('morgan'),
      top = require('./routes/top'),
      app = express();

app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(function(err, req, res, next){
  res.send(err.message);
});

// serve the files out of ./public as our main files
app.use('/sample_site', express.static(__dirname + '/public'));

app.get('/sample_site', top.sample_site);

const PORT = 8080;
const HOST = '0.0.0.0';
// start server on the specified port and binding host
var server = app.listen(PORT, HOST, function() {
  // print a message when the server starts listening
  console.log(`server starting... on http://${HOST}:${PORT}/sample_site`);
});
exports.server = server;

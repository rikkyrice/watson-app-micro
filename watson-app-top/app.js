const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      top = require('./routes/top'),
      app = express();

app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(function(err, req, res, next){
  res.send(err.message);
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.get('/', top.index);

const PORT = 8080;
const HOST = '0.0.0.0';
// start server on the specified port and binding host
const server = app.listen(PORT, HOST, function() {
  // print a message when the server starts listening
  console.log(`server starting... on http://${HOST}:${PORT}`);
});
exports.server = server;

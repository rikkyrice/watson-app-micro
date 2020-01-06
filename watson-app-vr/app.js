const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      top = require('./routes/top'),
      methodOverride = require('method-override'),
      multer = require('multer'),
      app = express();

app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(logger('dev'));
app.use(function(err, req, res, next){
  res.send(err.message);
});

// serve the files out of ./public as our main files
app.use('/visual_recognition', express.static(__dirname + '/public'));
app.use(multer({ dest: './public/images/upload'}).single('upload_file'));

app.get('/visual_recognition', top.visual_recognition);
app.get('/visual_recognition/dogcat', top.dogcat);
app.post('/visual_recognition/dogcat/dogcat_judge', top.dogcat_judge);

const PORT = 8080;
const HOST = '0.0.0.0';
// start server on the specified port and binding host
var server = app.listen(PORT, HOST, function() {
  // print a message when the server starts listening
  console.log(`server starting... on http://${HOST}:${PORT}/visual_recognition`);
});
exports.server = server;

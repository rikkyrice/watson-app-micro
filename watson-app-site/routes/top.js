const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const app = require('../app');
const jimp = require('jimp');

exports.sample_site = function(req, res){
  var vr_credentials = {
    "apikey": "",
    "url": ""
  };

  res.render('top/sample_site.ejs');

  var io = require( 'socket.io' )( app.server );
  io.on( 'connection', function( socket ){
    console.log( 'io: connection...' );

    socket.on( 'recognizeVisual', function( data ){
      console.log( 'io: sendtofunction...' );

      jimp.read(data)
        .then(image => {
          const rate = image.bitmap.height/image.bitmap.width;
          const width = 1024;
          const height = width*rate;
          image.resize(width, height);

          var cnt_w = 1;
          var cnt_h = 1;

          for(var i=0; i<=4; i++){
            for(var j=0; j<cnt_w; j++){
              for(var k=0; k<cnt_h; k++){
                var left = width*j/cnt_w;
                var top = height*k/cnt_h;
                var right = width*(j+1)/cnt_w;
                var bottom = height*(k+1)/cnt_h;

                var x = left;
                var y = top;
                var w = right - left;
                var h = bottom - top;
                var cropped_image = image.clone();
                propData(cropped_image, x, y, w, h)
                  .then(results => {
                    socket.emit('vrResult', results);
                    delete cropped_image;
                  })
                  .catch(err => {
                    console.log('erro');
                  });
              }
            }
            if(i%2 == 0){
              cnt_w *= 2;
            }else{
              cnt_h *= 2;
            }
          }
        })
        .catch(err => {
          console.log('error:', err);
        });
    });
  });
  function propData(image, x, y, w, h){
    return new Promise(function(resolve, reject){
      image.crop(x, y, w, h);
      image.resize(256, jimp.AUTO);
      image.getBuffer(jimp.MIME_JPEG, function(err, result){
        if(err){throw err;};
        analyzeData(result, 0.0)
          .then(results => {
            resolve(results);
          })
          .catch(err => {
            console.log('error');
          });
      });
    });
  }
  function analyzeData(data, threshold){
    return new Promise(function(resolve, reject){
      const visual_recognition = new VisualRecognitionV3({
        version: '2019-12-14',
        authenticator: new IamAuthenticator({ apikey: vr_credentials['apikey'] }),
        url: vr_credentials['url'],
      });

      var params = {
        imagesFile: data,
        // owners: ['me'],
        classifierIds: '',
        threshold: threshold
      };

      visual_recognition.classify(params)
        .then(response => {
          const classifiedImages = response.result;
          var results = classifiedImages.images[0]
          results.classifiers[0].classes.sort(function(a,b){
            if(a.score<=b.score) return 1;
            if(a.score>=b.score) return -1;
            return 0;
          });
          resolve(results);
        })
        .catch(err => {
          console.log('error:', err);
        });
    });
  }
};

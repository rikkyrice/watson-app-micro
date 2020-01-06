const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const querystring = require('querystring');

exports.visual_recognition = function(req, res){
  res.render('top/vr.ejs');
}

exports.dogcat = function(req, res){
  res.render('top/dogcat.ejs', {results: req.query});
}

exports.dogcat_judge = function(req, res){
  const visual_recognition = new VisualRecognitionV3({
    version: '2019-12-06',
    authenticator: new IamAuthenticator({ apikey: '' }),
  });

  var params = {
    imagesFile: fs.createReadStream(req.file.path),
    // owners: ['me'],
    classifierIds: [''],
    // threshold: '0.2'
  };

  visual_recognition.classify(params)
    .then(response => {
      const results = {class: response.result.images[0].classifiers[0].classes[0].class,
                      score: response.result.images[0].classifiers[0].classes[0].score};
      console.log(results);
      const result = querystring.stringify(results);
      res.redirect('/visual_recognition/dogcat?' + result);
    })
    .catch(err => {
      const result = 'err';
      console.log('error:', err);
      res.redirect('/visual_recognition/dogcat?' + result);
    });
}

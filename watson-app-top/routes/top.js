var apis = [
  {name: 'Visual Recognition', url: 'visual_recognition', img: 'visual_recognition.png', color: '#FF0461'},
  {name: 'Speech to Text', url: 'text_to_speech', img: 'text_to_speech.png', color: '#5507FF'},
  {name: 'Watson Machine Learning', url: 'watson_machine_learning', img: 'watson_machine_learning.png', color: '#71A4E1'},
  {name: 'Update Your GEARS<br>BtoB(ECサイト)', url: 'sample_site', img: 'gear.png', color: '#FF0461'}
];

exports.index = function(req, res){
  res.render('top/index.ejs', {apis: apis});
}

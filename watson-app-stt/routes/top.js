const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const app = require('../app');
const axios = require('axios');

exports.text_to_speech = function(req, res){
  res.render('top/ts_st.ejs');
}

exports.word_relay = function(req, res){
  var stt_credentials = {
    "apikey": "xy_ps7BYE07pJeAlPx_IBtXbKoqjvnvKOl9zfKUpQ5Kh",
    "url": "https://gateway-tok.watsonplatform.net/speech-to-text/api"
  };
  res.render('top/word_relay.ejs');

  var io = require( 'socket.io' )( app.server );
  io.on( 'connection', function( socket ){
	  console.log( 'io: connection...' );

  	socket.on( 'speechToText', function( data ){
  		console.log( 'io: analyzeData...' );

      const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({ apikey: stt_credentials["apikey"] }),
        url: stt_credentials["url"]
      });

      const params = {
        audio: data,
        contentType: 'application/octet-stream',
        model: 'ja-JP_BroadbandModel'
      };

      console.log('io: sendingData...');

      speechToText.recognize(params)
        .then(response => {
          const results = {result: response.result.results[0].alternatives[0].transcript};
          console.log("results: " + results.result);
          socket.emit('sttResult', results.result);
          console.log("sendingtoejs");
        })
        .catch(err => {
          const result = err;
          console.log(err);
          socket.emit('sttResult', result);
        });
    });

    socket.on('convertHiragana', function(data){
      const options = {
          method: 'post',
          url: `https://labs.goo.ne.jp/api/hiragana`,
          headers: {
              'Content-Type': `application/x-www-form-urlencoded`,
          },
          data: {
              app_id: `fc273996cbea3e7b9a56a27a9a4617cb9163f60b087ebc9f6e642e487eb17ec9`,
              sentence: data,
              output_type: `hiragana`
          }
      };
      axios(options)
        .then((res) => {
          socket.emit('receiveHiragana', res.data.converted);
        })
        .catch((err) => {
            console.log(err);
        });
    });
  });
}

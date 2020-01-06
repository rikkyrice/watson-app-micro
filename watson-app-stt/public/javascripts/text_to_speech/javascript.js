const word_list = {
  'あ': ['雨', '明日', '蟻', 'あんこ', 'アゲハ', '網', '秋', '朝', '小豆', 'あご', 'アメリカ'],
  'い': ['椅子', '石', '井戸', '印鑑', 'いろり', 'いちご', '囲碁', '糸', 'イラン', 'イラク'],
  'う': ['海', '牛', 'うさぎ', '梅', 'ウラン', '臼', '浮き', '羽毛', '瓜', '歌'],
  'え': ['エサ', '笑顔', '円', '枝', 'エジプト', '絵ハガキ', 'エコ', '絵馬', '襟', 'エラ'],
  'お': ['男', '女', '音頭','お尻','おもち','おかん','オランダ','雄しべ','檻','丘'],
  'か': ['神', '傘','肩','鏡','殻','カエル','火炎','貝','鴨','火災'],
  'き': ['霧','キリン','キツツキ','木','キットカット','黄色','キジ', '危機管理','騎士','記憶'],
  'く': ['雲','クーバネティス','クラウド','草','車','クローン','クシ','クワガタ','くじ','クジラ'],
  'け': ['毛虫','毛糸','蹴鞠','剣技','血糖値','袈裟','剣','ケニア','県庁所在地','携帯'],
  'こ': ['コマ','言葉','恋','子供','コント','コスト','鯉','昆布','コーン','コンゴ'],
  'さ': ['さんま','サザエ','サイト','山茶花','サビ','サタン','サンタ','札幌','竿','サイ'],
  'し': ['ししとう','鹿','シンク','しめじ','島','島国','シンバル','芯','城','死体'],
  'す': ['すもも','スルメ','スーダン','すき焼き','スイカ','すす','裾','スープ','スチール','スロープ'],
  'せ': ['赤外線','扇子','蝉','線路','洗濯','政治','世界','成功','生徒','先生'],
  'そ': ['掃除','掃除機','空','ソリ','そば','疎遠','ソロ','祖父','祖母','粗相'],
  'た': ['タンス','畳','タン','退屈','田んぼ','玉','タレ','滝','タイ','タヒチ'],
  'ち': ['チーズ','珍味','地域','地図','知恵','痴漢','チート','チリ','血豆','地区'],
  'つ': ['筒','鶴','月','ツール','痛風','ツイン','杖','ツララ','机','妻'],
  'て': ['手','敵','手鏡','定期','テーマ','手斧','天','天気','天井','照り焼き'],
  'と': ['トイレ','鳥','トンビ','トヨタ','トンボ','虎','トーン','時','時計','鶏肉'],
  'な': ['ナース','ナイキ','奈良','梨','ナン','波','苗','難波','ナイト','納豆'],
  'に': ['ニート','新潟','煮物','肉','ニコン','ニラ','ニス','虹','ニモ','西'],
  'ぬ': ['塗り絵','盗人','ぬいぐるみ','縫い糸','ヌード','ヌードル','ぬか床','縫い針','縫い物','縫い針'],
  'ね': ['音色','寝床','ネック','猫','ネメシス','寝息','寝起き','ネット','ネイル','寝汗'],
  'の': ['脳','ノイズ','農業','能面','ノート','軒先','野良猫','野良犬','農園','ノック'],
  'は': ['歯車', 'ハリネズミ', '春', 'ハンドル', '針', 'ハンコ', 'ハート','肺','波紋','腹'],
  'ひ': ['火','ヒント','贔屓','火加減','光','皮膚','悲報','紐','疲労','ヒット'],
  'ふ': ['風船','笛','雰囲気','風紀','腐敗','富士山','船','鮒','冬','不毛'],
  'へ': ['平気','ヘリ','平和','兵器','へそ','ヘマ','ヘラ','ヘレン','部屋','変化'],
  'ほ': ['本気','本','本棚','ほうき','ほこら','矛','誉れ','ホログラム','飽和','放置'],
  'ま': ['薪','マント','魔界','魔王','魔物','マス','マット','丸','麻痺','マニア'],
  'み': ['みかん','ミント','幹','巫女','ミサ','ミス','味噌','未来','身元','見栄'],
  'む': ['無理','村','虫','無地','虫眼鏡','ムヒ','ムーミン','無味','無我','無機質'],
  'め': ['メガネ','メイド','メット','メンマ','メカ','メッキ','飯','メス','メタン','メトロ'],
  'も': ['門','モーダル','桃','文句','森','模試','催し','孟子','桃太郎','猛火'],
  'や': ['ヤカン','矢面','野次','野犬','矢先','ヤシ','やぎ','焼肉','焼き鳥','ヤニ'],
  'ゆ': ['雪','勇気','夕闇','行方','夕飯','夕日','百合','勇敢','昨夜','床'],
  'よ': ['予定','夜','ヨット','横','他所','予測','予想','嫁','黄泉','良い子'],
  'ら': ['ラード','ラーメン屋','ラー油','来学期','来客','来月','来週','ライセンス','雷雨','来世'],
  'り': ['リード','リアカー','料理','リアル','リーダー','りんご','りす','リーチ','リーダーシップ','リーグ'],
  'る': ['ルイージ','類語','ルーキー','ルーフ','ルパン','ルート','ルール','類似','累乗','ループ'],
  'れ': ['レア','レイアウト','礼儀','霊界','霊','冷風','例外','冷却','レズ','霊柩車'],
  'ろ': ['ロック','ローズ','ロッジ','ロリータ','老後','廊下','老眼鏡','労働者','ろうそく','労働'],
  'わ': ['ワトソン','わんこ','ワニ','脇','ワシ','ワープ','輪っか','輪投げ','藁','悪者'],
  'が': ['画鋲','餓鬼','崖','楽譜','学校','ガサツ','画質','ガス','ガリ','画伯'],
  'ぎ': ['偽名','義勇','ギガ','吟味','擬人','ギター','ギタリスト','疑心暗鬼','犠牲','ギミック'],
  'ぐ': ['グミ','グループ','具','愚問','愚行','グルメ','グー','軍手','グラノーラ','具履'],
  'げ': ['幻滅','現物','現象','元気','ゲーム','ゲイ','ゲオ','ゲージ','芸術','芸術家'],
  'ご': ['ゴール','語呂','語源','語録','ゴースト','ゴミ','五反田','娯楽','ゴミ箱','誤字'],
  'ざ': ['座学','雑多','財団','雑草','雑誌','雑談','雑','雑魚','在庫','ザーサイ'],
  'じ': ['時代','自意識','じじい','地雷','時間','地元','自前','時期','自白','ジレンマ'],
  'ず': ['随一','図','随所','ズーム','ズボン','ズームアップ','図形','頭蓋骨','図体','図解'],
  'ぜ': ['税','税込','贅沢','贅肉','ゼウス','絶叫','絶好','絶好調','絶景','絶句'],
  'ぞ': ['象','造花','雑炊','象印','造語','雑巾','象牙','雑木林','臓器','増刊号','憎悪'],
  'だ': ['ダニ','ダイアモンド','ダイエット','大学','大学ノート','大学生','大王','大家族','だるま','ダンゴムシ'],
  'ぢ': [],
  'づ': [],
  'で': ['電気','出会い','デモ','デマ','デブ','電源','電流','電動','電磁気','電磁石'],
  'ど': ['土曜日','ドア','ドアノブ','ドイツ','動画','同意','同級生','動向','道具箱','動作'],
  'ば': ['バーガー','バーチャル','バイク','場合','バツ','バグ','バーナー','バウム','バギー','バジル'],
  'び': ['ビーフ','ビール','ビーンズ','ビーム','ビタミン','ビル','美意識','鼻炎','美化','ビーズ'],
  'ぶ': ['無愛想','ブイヤベース','ブーケ','ブーツ','部下','部活','武器','不器用','ブサイク','部位'],
  'べ': ['別名','別件','別状','別府','ベネズエラ'],
  'ぼ': ['ボイコット','ボイス','棒','望遠鏡','防御','暴虐','忘却','妨害','棒切れ','暴君'],
  'ぱ': ['パイナップル','パイン','パイレーツ','パリ','パウダー','パイ','パイプ','パン粉','パグ','パエリア'],
  'ぴ': ['ピアス','ピアニスト','ピアノ','ピーチ','ピアノ教室','ピース','ピエロ','ピン','ピザ','ピカソ'],
  'ぷ': ['プーアル茶','プードル','プール','プッシュ','プチトマト','プリン','プラム'],
  'ぺ': ['ペア','ペソ','ペアリング','ペン','ページ','ペリー','ペルー'],
  'ぽ': ['ポンプ','ポイント','ポイ捨て','ポエム','ポーカー','ポーク'],
  'ゃ': ['ヤカン','矢面','野次','野犬','矢先','ヤシ','やぎ','焼肉','焼き鳥','ヤニ'],
  'ゅ': ['雪','勇気','夕闇','行方','夕飯','夕日','百合','勇敢','昨夜','床'],
  'ょ': ['予定','夜','ヨット','横','他所','予測','予想','嫁','黄泉','良い子'],
}

function __log(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}
var audio_context;
var recorder;
var used_word = [];
var wastedWords_raw = [];
var wastedWords_hira = [];
var pllose = false;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');
  // Uncomment if you want the audio to feedback directly
//  input.connect(audio_context.destination);
//  __log('Input connected to audio context destination.');
  recorder = new Recorder(input);
  if(recorder){
    __log('Recorder initialised.');
  }else{
    __log('Recorder failed');
  }
}

function disabledFlag(){
  // $('#submit').prop('disabled', true);
  if($('#words').val() != ""){
    $('#submit').prop('disabled', false);
  }else{
    $('#submit').prop('disabled', true);
  }
}
function disabled_clear(){
  if($('#clear').prop('disabled') == true){
    $('#clear').prop('disabled', false);
  }else{
    $('#clear').prop('disabled', true);
  }
}
function initInput(){
  $('input[type="textarea"]').val("");
  disabledFlag()
}

function recording(){
  initInput();
  wastedWords_raw = [];
  wastedWords_hira = [];
  if($('.voice-recorder').css('background-color') == 'rgb(0, 0, 0)'){
    startRecording();
  }else{
    stopRecording();
  }
}
function startRecording() {
  $('.voice-recorder').css('background', 'red');
  recorder && recorder.record();
  __log('Recording...');
}
function stopRecording() {
  $('.voice-recorder').css('background', 'black');
  recorder && recorder.stop();
//  __log('Stopped recording.');
  // create WAV download link using audio data blob
  createDownloadLink();
  recorder.clear();
}
function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    sendData("speechToText", blob);
    __log('posting__');
    var url = URL.createObjectURL(blob);
    var ul = document.getElementById('recordingslist');
    var li = document.createElement('li');
    var au = document.createElement('audio');
    var hf = document.createElement('a');

    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    ul.appendChild(li);
  });
  // sendData("textToSpeech", data);
}
function sttResultHandler(result){
//  __log('sttposting__');
  var data = result.slice(0, -1);
  __log(data)
  $('#words').val(data);
  disabledFlag();
  disabled_clear();
}

function getHiragana(data){
  wastedWords_hira.push(data);
  if(wastedWords_hira.length % 2 == 1){
    ai_controller(data);
  }else{
    pl_controller(data);
    disabled_clear();
  }
}

function ai_controller(data){
  if(used_word.includes(data)){
    pllose = true;
    judge();
    return;
  }else{
    used_word.push(data);
  }
  var lastLetter = data.slice(-1);
  if(lastLetter == 'ー'){
    lastLetter = data.slice(-2, -1);
  }else if(lastLetter == 'ん'){
    pllose = true;
    judge();
    return;
  }
  __log(lastLetter);
  var return_word = returnWord(lastLetter);
  __log(return_word);
  wastedWords_raw.push(return_word);
  changeHiragana(return_word);
//  sendData("textToSpeech", return_word);
}

function pl_controller(data){
  createComment(wastedWords_raw[wastedWords_raw.length-1]);
  if(used_word.includes(data)){
    judge();
    return;
  }
  if(data.slice(-1) == 'ん'){
    judge();
    return;
  }
  used_word.push(data);
}

function createComment(word){
  var ul = document.getElementById('chat-lists');
  var li = document.createElement('li');
  var p = document.createElement('p');

  p.textContent = word;
  p.classList.add('chat');
  if(wastedWords_raw.length % 2 == 1){
    li.style.textAlign = 'right';
  }else{
    li.style.textAlign = 'left';
  }

  li.appendChild(p);
  ul.appendChild(li);
  $('#chat-box').animate({scrollTop: $('#chat-box')[0].scrollHeight}, 'fast');
}

function clearWord(){
  initInput();
  // var ul = document.getElementById('chat-lists');
  // ul.removeChild(ul.lastChild);
  disabled_clear();
}


function returnWord(lastLetter) {
  var letter_words = word_list[lastLetter];
  var return_word = letter_words[Math.floor(Math.random() * letter_words.length)];
  return return_word;
}

function ttsResultHandler(data){
//  __log('ttsposting__');
  var ul = document.getElementById('recordingslist');
  var url = '/voices/' + data;
  var li = document.createElement('li');
  var au = document.createElement('audio');
  var hf = document.createElement('a');

  au.autoplay = true;
  au.controls = true;
  au.src = url;
  hf.href = url;
  hf.download = new Date().toISOString() + '.wav';
  hf.innerHTML = hf.download;
  li.appendChild(au);
  li.appendChild(hf);
  ul.appendChild(li);
}

function wait(){
  $('#chat-lists').children().remove();
//  sendData("textToSpeech", '好きな言葉を発してください');
  createComment('マイクボタンを押して好きな言葉を発してください');
  used_word = [];
}

function judge(){
  if(pllose){
//    sendData("textToSpeech", 'どうやら私の勝ちのようですね');
    wastedWords_raw.push('負け');
    createComment('どうやら私の勝ちのようですね');
  }else{
//    sendData("textToSpeech", "なに!?私の負け..だと!?");
    createComment("なに!?私の負け..だと!?");
  }
  setTimeout('wait()', 6000);
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });

//  sendData("textToSpeech", '好きな言葉を発してください');
  createComment('マイクボタンを押して好きな言葉を発してください');
};

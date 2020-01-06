var furnitures = {};
var results_list = {};
// startSlide();

function __log(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}

function handleFileSelect(evts){
  // __log("pass");
  for(var i=0; i<evts.length; i++){
    if(!files.includes(evts[i])){
      files.push(evts[i]);
    }
  }
  var disp = document.getElementById("disp");

  disp.innerHTML = "";
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var reader = new FileReader();

   if (!f.type.match('image.*')) {
     alert("Only IMAGE files are acceptable.");
     continue;
   }

   reader.onerror = function (evt) {
     disp.innerHTML = "Error!";
   }

   reader.onload = function (evt) {
     var li = document.createElement('li');
     var img = document.createElement('img');
     var ul = document.createElement('ul');
     img.src = evt.target.result;
     img.style.width = '192px';
     img.style.height = '144px';
     li.appendChild(img);
     li.classList.add("sumb_list");
     ul.appendChild(li);
     disp.appendChild(ul);
     $('.dnd-border-c').css('border', 'none');
   }
   reader.readAsDataURL(f);
  }
}

window.ondrop = function(e){
  e.preventDefault();
};
window.ondragover = function(e){
  e.preventDefault();
};

function fileOpen() {
  document.getElementById("files").click();
}

function onDrop(event) {
  $('.dnd-border-p').css('border-color', '#BBBBBB');
  for(var i=0; i<event.dataTransfer.files.length; i++){
    if(!files.includes(event.dataTransfer.files[i])){
      files.push(event.dataTransfer.files[i]);
    }
  }
  // var files = event.dataTransfer.files;
  var disp = document.getElementById("disp");

  disp.innerHTML = "";
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var reader = new FileReader();

   if (!f.type.match('image.*')) {
     alert("Only IMAGE files are acceptable.");
     continue;
   }

   reader.onerror = function (evt) {
     disp.innerHTML = "Error!";
   }

   reader.onload = function (evt) {
     var li = document.createElement('li');
     var img = document.createElement('img');
     var ul = document.createElement('ul');
     img.src = evt.target.result;
     img.style.width = '192px';
     img.style.height = '144px';
     li.appendChild(img);
     li.classList.add("sumb_list");
     ul.appendChild(li);
     disp.appendChild(ul);
     $('.dnd-border-c').css('border', 'none');
   }
   reader.readAsDataURL(f);
  }
  event.preventDefault();
}

function onDragOver(event) {
  $('.dnd-border-p').css('border-color', 'LightGreen');
  event.dataTransfer.dropEffect = 'copy';
  event.preventDefault();
}

function onDragLeave(event) {
  $('.dnd-border-p').css('border-color', '#BBBBBB');
  event.preventDefault();
}

// $('.dnd-border-p').css('border-color', '#BBBBBB');

function fileClear(){
  files = [];
  var disp = document.getElementById("disp");
  disp.textContent = null;
  $('.dnd-border-c').css('border', '5px dashed #BBBBBB');
}

if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', handleFileSelect);
} else {
    alert('お使いのブラウザはサポートしておりません');
}

function initResultsList(){
  $('#results').children().remove();
  // initDetailsList();
}
function initLinkList(){
  $('#link').children().remove();
  // initDetailsList();
}
function initDetailsList(){
  $('#details').children().remove();
}
function initDetail_box_id(){
  $('#detail_box_id').children().remove();
}

function vrResultHandler(results){
//  $('#result_page').css('background-image', 'url(/images/room/background.jpg)');
  initResultsList();
  document.getElementById( 'results_spinner' ).style.display = 'none';
  $('#return_page').css('display', 'block');
  var classes = results.classifiers[0].classes;
  for(var i=0; i<classes.length; i++){
    if(classes[i].score >= 0.7){
      var property = {};
      if(!(furnitures[classes[i].class])){
        property['score'] = classes[i].score;
        property['color'] = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" ;
        furnitures[classes[i].class] = property;

      }else if(furnitures[classes[i].class].score < classes[i].score){
        furnitures[classes[i].class].score = classes[i].score;
      }
    }
  }

  var rank = [];

  for(var classes in furnitures){
    if(rank.length == 0){
      rank.push(classes);
    }else{
      var pos = 0;
      for(var i=0; i<rank.length; i++){
        if(furnitures[classes].score < furnitures[rank[i]].score){
          pos += 1;
        }
      }
      rank.splice(pos, 0, classes);
    }
  }

  for (var i=0; i<rank.length; i++) {
    var ul = document.getElementById('results');
    var li = document.createElement('li');
    var div = document.createElement('div');
    var p_class = document.createElement('p');
    var p_score = document.createElement('p');

    p_class.textContent = rank[i];
    p_class.classList.add("detail_p");
    p_class.addEventListener('click', showNewGears, false);
    div.classList.add("progress_div");
    div.style.backgroundColor = furnitures[rank[i]].color;
    div.style.width = furnitures[rank[i]].score*70 + '%';

    p_score.textContent = furnitures[rank[i]].score;
    p_score.classList.add("detail_score");
    li.classList.add("detail_list");

    li.appendChild(p_class);
    li.appendChild(div);
    li.appendChild(p_score);
    ul.appendChild(li);
  }
}

function returnPage(){
  ret = confirm('本当に戻りますか?');
  if(ret == true){
    $('#dnd_page').css('display', 'block');
    $('#result_page').css('display', 'none');
  }
  furnitures = {};
}
function returnResult(){
  $('#return_result').css('display', 'none');
  $('#link').css('display', 'none');
  $('#lists').css('display', 'block');
}

function showNewGears(e){
  initLinkList();
  $('#lists').css('display', 'none');
  $('#return_result').css('display', 'block');
  $('#link').css('display', 'block');

  var div = document.getElementById('link');
  var h2 = document.createElement('h2');
  var a_amz = document.createElement('a');
  var img_amz = document.createElement('img');
  var a_rkt = document.createElement('a');
  var img_rkt = document.createElement('img');

  h2.textContent = e.target.textContent;
  a_amz.href = 'https://www.amazon.co.jp/s?k=' + e.target.textContent;
  a_amz.target = '_blank';
  img_amz.src = '/images/urls/amazon.png';
  a_amz.textContent = 'amazonで調べる';
  img_amz.classList.add("ec_img");
  a_rkt.href = 'https://search.rakuten.co.jp/search/mall/' + e.target.textContent;
  a_rkt.target = '_blank';
  img_rkt.src = '/images/urls/rakuten.png';
  a_rkt.textContent = '楽天で調べる';
  img_rkt.classList.add("ec_img");

  div.appendChild(h2);
  a_amz.appendChild(img_amz);
  div.appendChild(a_amz);
  a_rkt.appendChild(img_rkt);
  div.appendChild(a_rkt);
}

function openInstruction() {
  $('#instruction').css('display', 'block');
  $('.inst').css('color', '#142835');
  $('#try').css('display', 'none');
  $('.try').css('color', '#f4f7fb');
  $('#future_vision').css('display', 'none');
  $('.fv').css('color', '#f4f7fb');
}
function openTry() {
  $('#instruction').css('display', 'none');
  $('.inst').css('color', '#f4f7fb');
  $('#try').css('display', 'block');
  $('.try').css('color', '#142835');
  $('#future_vision').css('display', 'none');
  $('.fv').css('color', '#f4f7fb');
}
function openFutureVision() {
  $('#instruction').css('display', 'none');
  $('.inst').css('color', '#f4f7fb');
  $('#try').css('display', 'none');
  $('.try').css('color', '#f4f7fb');
  $('#future_vision').css('display', 'block');
  $('.fv').css('color', '#142835');
}

var sliderImages = document.getElementsByClassName("slide");
var current = 0;

function goRight() {
    sliderImages[current].style.display = 'none';
    if(current === sliderImages.length - 1){
        current = -1;
    }
    sliderImages[current + 1].style.display = 'block';
    current++;
}

function goLeft() {
    sliderImages[current].style.display = 'none';
    if(current === 0){
        current = sliderImages.length;
    }
    sliderImages[current - 1].style.display = 'block';
    current--;
}

